'use strict';

const utils = require('../../utils/common');
const CheckoutApiRequest = require('../abstract/checkout-api-request');

class GetPaymentStatusRequest extends CheckoutApiRequest {
    constructor(mypos, params) {
        let language = utils.safeVal(params.lang, utils.safeVal(mypos.config.checkout.lang, 'EN'));
        let version = utils.safeVal(params.version, utils.safeVal(mypos.config.checkout.version, '1.4'));
        let sid = utils.safeVal(params.sid, mypos.config.checkout.sid);
        let walletNumber = utils.safeVal(params.sid, mypos.config.checkout.clientNumber);
        let outputFormat = utils.safeVal(params.outputFormat, utils.safeVal(mypos.config.checkout.outputFormat, 'JSON'));

        const refundParams = {
            IPCmethod: 'IPCGetPaymentStatus',
            IPCVersion: version,
            IPCLanguage: language,
            SID: sid,
            walletnumber: walletNumber,
            KeyIndex: mypos.config.checkout.keyIndex,
            OrderID: params.orderId,
            OutputFormat: outputFormat
        };

        super(mypos, refundParams);
    }
}

module.exports = GetPaymentStatusRequest;