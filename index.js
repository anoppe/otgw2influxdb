
const util = require('util');
const fs = require('fs');
const mqtt = require('mqtt');
const Influx = require('influx');

var influxhost = 'localhost';
var influxport = 8086;
var databasename = 'heatingsystem';
var mqtthost = 'localhost';
var mqttport = 1883;
var topics = [];

readConfiguration();

const influx = new Influx.InfluxDB({
    host: influxhost,
    port: influxport,
    database: databasename
});

influx.createDatabase('heatingsystem');

var mqttClient = mqtt.connect('mqtt://' + mqtthost + ':' + mqttport);

mqttClient.on('connect', function () {
    topics.forEach(function(topic) {
        // subscribeToTopic(topic);
        mqttClient.subscribe(topic);
    });
});

function subscribeToTopic(topic) {
}

mqttClient.on('message', function (topic, message) {
    var convertedMessage = convertToInfluxPoint(topic, JSON.parse(message));
    try {
        influx.writePoints([convertedMessage]);
    } catch (err) {
        console.error("Something went wrong writing to influxdb", e);
    }
});

function getMeasurementNameFromTopic(topic) {
    var parts = topic.split("/");
    return parts[parts.length - 1];
}

function extractValue(message) {
    switch (message.type) {
        case "boolean":
            return message.value ? 1 : 0;
        case "float":
        case "string":
        default:
            return message.value;
    }
}

function convertToInfluxPoint(topic, message) {
    var fieldName = getMeasurementNameFromTopic(topic);
    var value = extractValue(message);
    var fields = {};
    fields[fieldName] = value;
    return {
        measurement: 'otgw',
        tags: { measure: fieldName},
        fields : fields,
        "timestamp" : new Date(message.timestamp)
    };
}

function readConfiguration() {
    var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    console.log(util.format('Loaded config: %s', JSON.stringify(config)));
    influxhost = config.influx.host;
    influxport = config.influx.port;
    mqtthost = config.mqtt.host;
    mqttport = config.mqtt.port;
    topics = config.mqtt.topics;
}


