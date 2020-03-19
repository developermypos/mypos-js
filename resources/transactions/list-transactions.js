'use strict';

const TransactionsApiRequest = require('../abstract/transcations-api-request');

class ListTransactionsRequest extends TransactionsApiRequest {
    constructor(mypos, params) {
        super(mypos, 'GET', 'transactions', params);
    }
}

module.exports = ListTransactionsRequest;