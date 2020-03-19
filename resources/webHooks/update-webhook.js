'use strict';

const WebHooksApiRequest = require('../abstract/webhooks-api-request');

class UpdateWebHookRequest extends WebHooksApiRequest {
    constructor(mypos, webHookId, payloadUrl, secret, isActive) {
        super(mypos,
            'PATCH',
            `webhooks/${webHookId}`,
            undefined,
            {
                payload_url: payloadUrl,
                secret: secret,
                is_active: isActive
            });
    }
}

module.exports = UpdateWebHookRequest;