# otgw2influxdb

This small package transforms messages published to MQTT by the [Opentherm Gateway](http://otgw.tclcode.com/) and stores them into [Influxdb](https://www.influxdata.com/time-series-platform/influxdb/)

## Installation

        npm install @anoppe/otgw2influxdb
  

##Usage
There are two options to use this: Running in a [Docker](http://docker.io)container or as stand alone service.

##Running native
- Execute this command

        $ node index.js
##Using Docker
- Pull image from docker hub

        $ docker pull anoppe/otgw2influxdb
- Run the image 

        $ docker run anoppe/otgw2influxdb        
- Happy plotting in Grafana!

**The container will try to connect to influxdb on `localhost:8086` and to MQTT on `localhost:1883` by default.**\
Follow these steps to change this behaviour:
- Change the properties `influx.host`, `influx.port`, `mqtt.host` and `mqtt.port` in the config.json to match your requirements 
- The docker command will then become
        
        $ docker run -v ./config.conf:config.json anoppe/otgw2influxdb


## Tests
        npm test
        


 
