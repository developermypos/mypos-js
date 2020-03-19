'use strict';

const WebHooksApiRequest = require('../../abstract/webhooks-api-request');

class CreateWebHookSubscriptionsRequest extends WebHooksApiRequest {
    constructor(mypos, webHookId, webHookEventId, filter) {
        super(mypos,
            'POST',
            'subscriptions',
            undefined,
            {
                webhook_id: webHookId,
                event_id: webHookEventId,
                filter: filter
            });
    }
}

module.exports = CreateWebHookSubscriptionsRequest;