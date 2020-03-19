'use strict';

const WebHooksApiRequest = require('../abstract/webhooks-api-request');

class ListWebHooksRequest extends WebHooksApiRequest {
    constructor(mypos, params) {
        super(mypos,
            'GET',
            'webhooks',
            params);
    }
}

module.exports = ListWebHooksRequest;