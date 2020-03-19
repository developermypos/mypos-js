'use strict';

const DevicesApiRequest = require('../abstract/devices-api-request');

class ListDevicesRequest extends DevicesApiRequest {
    constructor(mypos, params) {
        super(mypos,'GET', 'devices', params);
    }
}

module.exports = ListDevicesRequest;
