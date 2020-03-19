'use strict';

const ApiRequest = require('./api-request');

class TransactionsApiRequest extends ApiRequest {

    get service() {
        return {
            host: this.mypos.config.isSandbox ? 'https://sandbox-transactions-api.mypos.com' : 'https://transactions-api.mypos.com',
            basePath: '/v1.1'
        };
    }
}

module.exports = TransactionsApiRequest;
