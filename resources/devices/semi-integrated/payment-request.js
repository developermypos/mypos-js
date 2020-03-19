'use strict';

const BasePOSRequest = require('./base-request');

class POSPaymentRequest extends  BasePOSRequest {
    constructor(mypos, amount, tid, serialNumber, trnRef = undefined) {
        super(mypos, {
            method: 'payment',
            amount: amount,
            tid: tid,
            sn: serialNumber,
            trnRef: trnRef,
        })
    }

    get isValid() {
        return super.isValid && (this.params['tid'] !== undefined || this.params['sn'] !== undefined)
    }
}

module.exports = POSPaymentRequest;
