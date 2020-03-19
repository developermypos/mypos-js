'use strict';

const WebHooksApiRequest = require('../../abstract/webhooks-api-request');

class ListWebHookSubscriptionsRequest extends WebHooksApiRequest {
    constructor(mypos, params) {
        super(mypos,
            'GET',
            'subscriptions',
            params);
    }
}

module.exports = ListWebHookSubscriptionsRequest;