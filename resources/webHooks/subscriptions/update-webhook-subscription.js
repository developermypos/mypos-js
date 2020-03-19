'use strict';

const WebHooksApiRequest = require('../../abstract/webhooks-api-request');

class UpdateWebHookSubscriptionsRequest extends WebHooksApiRequest {
    constructor(mypos, webHookSubscriptionId, filter) {
        super(mypos,
            'PUT',
            `subscriptions/${webHookSubscriptionId}`,
            undefined,
            {
                filter: filter
            });
    }
}

module.exports = UpdateWebHookSubscriptionsRequest;