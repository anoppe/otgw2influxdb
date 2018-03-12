'use strict';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

var otgw2influxdb = require('../index');

describe('#otgw2influxdb', function() {

    otgw2influxdb();
});