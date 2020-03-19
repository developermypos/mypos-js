'use strict';

const WebHooksApiRequest = require('../../abstract/webhooks-api-request');

class ListWebHookEventsRequest extends WebHooksApiRequest {
    constructor(mypos, params) {
        super(mypos, 'GET', 'events', params);
    }
}

module.exports = ListWebHookEventsRequest;