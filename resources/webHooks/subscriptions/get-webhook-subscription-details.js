'use strict';

const WebHooksApiRequest = require('../../abstract/webhooks-api-request');

class GetWebHookSubscriptionDetailsRequest extends WebHooksApiRequest {
    constructor(mypos, webHookSubscriptionId) {
        super(mypos,
            'GET',
            `subscriptions/${webHookSubscriptionId}`);
    }
}

module.exports = GetWebHookSubscriptionDetailsRequest;