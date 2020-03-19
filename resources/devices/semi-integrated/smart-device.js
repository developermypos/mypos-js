'use strict';

const PaymentRequest = require('./payment-request');

module.exports = {
    makePayment(amount, tid = undefined, serialNumber = undefined, trnRef = undefined, callback) {
        let request = new PaymentRequest(undefined, amount, tid, serialNumber, trnRef);
        request.send(callback);
    }
};
