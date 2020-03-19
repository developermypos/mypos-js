'use strict';

const DevicesApiRequest = require('../abstract/devices-api-request');

class GetDeviceDetailsRequest extends DevicesApiRequest {
    constructor(mypos, terminalId) {
        super(mypos, 'GET', `devices/${terminalId}`);
    }
}

module.exports = GetDeviceDetailsRequest;
