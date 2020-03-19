'use strict';

const WebHooksApiRequest = require('../abstract/webhooks-api-request');

class GetWebHooksDetailsRequest extends WebHooksApiRequest {
    constructor(mypos, webHookId) {
        super(mypos,
            'GET',
            `webhooks/${webHookId}`);
    }
}

module.exports = GetWebHooksDetailsRequest;