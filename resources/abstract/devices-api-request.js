'use strict';

const ApiRequest = require('./api-request');

class DevicesApiRequest extends ApiRequest {

    get service() {
        return {
            host: this.mypos.config.isSandbox ? 'https://sandbox-devices-api.mypos.com' : 'https://devices-api.mypos.com',
            basePath: '/v1'
        };
    }
}

module.exports = DevicesApiRequest;
