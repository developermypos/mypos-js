'use strict';

const NodeRSA = require('node-rsa');
const logger = require('../../utils/logger');

class CheckoutApiRequest {
    constructor(mypos, params) {
        this._mypos = mypos;
        this._params = params;
    }

    get mypos() {
        return this._mypos;
    }

    get params() {
        return this._params;
    }

    get host() {
        return this.mypos.config.isSandbox ? 'https://www.mypos.eu/vmp/checkout-test' : 'https://www.mypos.eu/vmp/checkout';
    }

    send = (handler) => {
        const privateKey = new NodeRSA(this.mypos.config.checkout.privateKey);
        this._params['Signature'] = generateSignature(this.params, privateKey);
        logger.debug(`Sending request to myPOS Checkout API with params: ${JSON.stringify(this.params)}`);
        const data = generateForm(this.host, this.params);

        if (isFunction(handler)) {
            handler(data);
        }
        else {
            handler.write(data);
            handler.end();
        }
    };
}

const generateSignature = (params, privateKey) => {
    let dataToSign = '';

    for (const value of Object.values(params)) {
        dataToSign += `-${value}`
    }

    dataToSign = dataToSign.substr(1);

    let buff = Buffer.from(dataToSign);
    let base64data = buff.toString('base64');

    return privateKey.sign(Buffer.from(base64data), 'base64', 'utf8');
};

const generateForm = (host, params) => {
    let rawHtml = '<html><body onload="document.ipcForm.submit()">';
    rawHtml += `<form id="ipcForm" name="ipcForm" action="${host}" method="post">`;

    for (const [key, value] of Object.entries(params)) {
        rawHtml += `<input type="hidden" name="${key}" value="${value}"/><br>`;
    }

    rawHtml += `</form></body></html>`;
    return rawHtml;
};

const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

module.exports = CheckoutApiRequest;
