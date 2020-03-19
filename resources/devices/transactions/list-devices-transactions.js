'use strict';

const DevicesApiRequest = require('../../abstract/devices-api-request');

class ListDevicesTransactionsRequest extends DevicesApiRequest {
    constructor(mypos, params) {
        super(mypos, 'GET', 'devices/transactions', params);
    }
}

module.exports = ListDevicesTransactionsRequest;
