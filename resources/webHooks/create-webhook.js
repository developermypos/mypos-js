'use strict';

const WebHooksApiRequest = require('../abstract/webhooks-api-request');

class CreateWebHookRequest extends WebHooksApiRequest {
    constructor(mypos, reqData, payloadUrl, secret) {
        super(mypos,
            'POST',
            'webhooks',
            undefined,
            {
                payload_url: payloadUrl,
                secret: secret
            });
    }
}

module.exports = CreateWebHookRequest;