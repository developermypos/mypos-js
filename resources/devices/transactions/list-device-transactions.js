'use strict';

const DevicesApiRequest = require('../../abstract/devices-api-request');

class ListDeviceTransactionsRequest extends DevicesApiRequest {
    constructor(mypos, terminalId, params) {
        super(mypos, 'GET', `devices/${terminalId}/transactions`, params);
    }
}

module.exports = ListDeviceTransactionsRequest;
