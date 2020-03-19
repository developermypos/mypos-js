'use strict';

const TransactionsApiRequest = require('../abstract/transcations-api-request');

class ListAccountsRequest extends TransactionsApiRequest {
    constructor(mypos, params) {
        super(mypos, 'GET', 'accounts', params);
    }
}

module.exports = ListAccountsRequest;