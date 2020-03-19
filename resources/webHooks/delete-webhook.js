'use strict';

const WebHooksApiRequest = require('../abstract/webhooks-api-request');

class DeleteWebHookRequest extends WebHooksApiRequest {
    constructor(mypos, webHookId) {
        super(mypos,
            'DELETE',
            `webhooks/${webHookId}`);
    }
}

module.exports = DeleteWebHookRequest;