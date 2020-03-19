'use strict';

const ApiRequest = require('./api-request');

class WebHooksApiRequest extends ApiRequest {

    get service() {
        return {
            host: this.mypos.config.isSandbox ? 'https://sandbox-webhook-api.mypos.com' : 'https://webhook-api.mypos.com',
            basePath: '/v1'
        };
    }

    reqIsValid = (callback) => {
        // TODO: Validate params
        return true;
    };
}

module.exports = WebHooksApiRequest;
