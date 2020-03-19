'use strict';

const net = require('net');
const uuidv4 = require('uuid/v4');
const crypto = require('../../../utils/crypto');
const logger = require('../../../utils/logger');

class BasePOSRequest {
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

    get isValid() {
        return true;
    }

    get config() {
        return {
            host: '127.0.0.1',
            port: 8888
        };
    }

    send = (callback) => {
        if (!this.isValid) {
            callback({
                error: 'Invalid request',
                params: this.params
            });
            return;
        }

        let params = this.params;
        let trnRef = params['trn_ref'];

        params['api_key'] = this.mypos.config.apiKey;
        params['trn_ref'] = trnRef !== undefined && trnRef.trim().length > 0 ? trnRef : uuidv4();
        params['signature'] = crypto.generateSignature(params, this.mypos.config.apiSecret);

        let client = new net.Socket();
        client.connect(this.config.port, this.config.host, () => {
            logger.debug('Connected to Semi Integrated API');
            let data = JSON.stringify(params);
            logger.debug(`Sending data to Semi Integrated API: ${data}`);
            client.write(data);
        });
        client.on('data', (data) => {
            logger.debug('Received data from Semi Integrated API: ' + data);
            const response = JSON.parse(data);
            const status = parseInt(response['status']);

            if (status === 100) {
                return;
            }

            client.destroy();
            callback(response);
        });
        client.on('close', () => {
            logger.debug('Closed connection to Semi Integrated API');
        });
    }
}

module.exports = BasePOSRequest;
