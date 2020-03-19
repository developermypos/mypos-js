'use strict';

const TransactionsApiRequest = require('../abstract/transcations-api-request');

class GetTransactionDetailsRequest extends TransactionsApiRequest {
    constructor(mypos, trnRef) {
        super(mypos, 'GET', `transactions/${trnRef}`);
    }
}

module.exports = GetTransactionDetailsRequest;
