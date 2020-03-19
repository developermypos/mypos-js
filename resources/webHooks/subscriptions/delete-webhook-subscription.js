'use strict';

const WebHooksApiRequest = require('../../abstract/webhooks-api-request');

class DeleteWebHookSubscriptionsRequest extends WebHooksApiRequest {
    constructor(mypos, webHookSubscriptionId) {
        super(mypos,
            'DELETE',
            `subscriptions/${webHookSubscriptionId}`);
    }
}

module.exports = DeleteWebHookSubscriptionsRequest;