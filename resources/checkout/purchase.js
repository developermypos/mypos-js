'use strict';

const uuidv4 = require('uuid/v4');
const utils = require('../../utils/common');
const CheckoutApiRequest = require('../abstract/checkout-api-request');

class CheckoutPurchaseRequest extends CheckoutApiRequest {
    constructor(mypos, params) {
        let language = utils.safeVal(params.lang, utils.safeVal(mypos.config.checkout.lang, 'EN'));
        let version = utils.safeVal(params.version, utils.safeVal(mypos.config.checkout.version, '1.4'));
        let sid = utils.safeVal(params.sid, mypos.config.checkout.sid);
        let walletNumber = utils.safeVal(params.sid, mypos.config.checkout.clientNumber);
        let currency = utils.safeVal(params.currency, mypos.config.checkout.currency);
        let orderId = utils.safeVal(params.orderId, uuidv4());
        let okUrl = utils.safeVal(params.okUrl, mypos.config.checkout.okUrl);
        let cancelUrl = utils.safeVal(params.cancelUrl, mypos.config.checkout.cancelUrl);
        let notifyUrl = utils.safeVal(params.notifyUrl, mypos.config.checkout.notifyUrl);
        let cardTokenRequest = utils.safeVal(params.cardTokenRequest, utils.safeVal(mypos.config.checkout.cardTokenRequest, 0));
        let paymentMethod = utils.safeVal(params.paymentMethod, utils.safeVal(mypos.config.checkout.paymentMethod, 1));
        let paymentParametersRequired = utils.safeVal(params.paymentParametersRequired, utils.safeVal(mypos.config.checkout.paymentParametersRequired, 1));

        const purchaseParams = {
            IPCmethod: 'IPCPurchase',
            IPCVersion: version,
            IPCLanguage: language,
            SID: sid,
            walletnumber: walletNumber,
            Amount: params.amount,
            Currency: currency,
            OrderID: orderId,
            URL_OK: okUrl,
            URL_Cancel: cancelUrl,
            URL_Notify: notifyUrl,
            CardTokenRequest: cardTokenRequest,
            KeyIndex: mypos.config.checkout.keyIndex,
            PaymentParametersRequired: paymentParametersRequired,
            PaymentMethod: paymentMethod,
            customeremail: params.customer.email,
            customerfirstnames: params.customer.firstNames,
            customerfamilyname: params.customer.familyName,
            customerphone: params.customer.phone,
            customercountry: params.customer.country,
            customercity: params.customer.city,
            customerzipcode: params.customer.zipCode,
            customeraddress: params.customer.address,
            Note: params.note,
            CartItems: params.cartItems.length
        };

        for (let i = 0; i < params.cartItems.length; i++) {
            let num = i + 1;
            purchaseParams[`Article_${num}`] = params.cartItems[i].name;
            purchaseParams[`Quantity_${num}`] = params.cartItems[i].quantity;
            purchaseParams[`Price_${num}`] = params.cartItems[i].price;
            purchaseParams[`Currency_${num}`] = currency;
            purchaseParams[`Amount_${num}`] = params.cartItems[i].quantity * params.cartItems[i].price;
        }

        super(mypos, purchaseParams);
    }
}

module.exports = CheckoutPurchaseRequest;