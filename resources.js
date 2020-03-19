'use strict';

// Checkout
const CheckoutPurchaseRequest = require('./resources/checkout/purchase');
const CheckoutRefundRequest = require('./resources/checkout/refund');
const CheckoutReversalRequest = require('./resources/checkout/reversal');
const GetPaymentStatusRequest = require('./resources/checkout/get-payment-status');

// Devices
const ListDevicesRequest = require('./resources/devices/list-devices');
const GetDeviceDetailsRequest = require('./resources/devices/get-device-details');

// Device Transactions
const ListDeviceTransactionsRequest = require('./resources/devices/transactions/list-device-transactions');
const ListDevicesTransactionsRequest = require('./resources/devices/transactions/list-devices-transactions');

// Transactions
const ListTransactionsRequest = require('./resources/transactions/list-transactions');
const GetTransactionDetailsRequest = require('./resources/transactions/get-transaction-details');

// Accounts
const ListAccountsRequest = require('./resources/accounts/list-accounts');

// Web Hooks (CRUD)
const ListWebHooksRequest = require('./resources/webHooks/list-webhooks');
const GetWebHooksDetailsRequest = require('./resources/webHooks/get-webhook-details');
const CreateWebHookRequest = require('./resources/webHooks/create-webhook');
const UpdateWebHookRequest = require('./resources/webHooks/update-webhook');
const DeleteWebHookRequest = require('./resources/webHooks/delete-webhook');

// Web Hook Events
const ListWebHookEventsRequest = require('./resources/webHooks/events/list-webhook-events');

// Web Hook Event Subscriptions
const ListWebHookSubscriptionsRequest = require('./resources/webHooks/subscriptions/list-webhook-subscriptions');
const GetWebHookSubscriptionDetailsRequest = require('./resources/webHooks/subscriptions/get-webhook-subscription-details');
const CreateWebHookSubscriptionsRequest = require('./resources/webHooks/subscriptions/create-webhook-subscription');
const DeleteWebHookSubscriptionsRequest = require('./resources/webHooks/subscriptions/delete-webhook-subscription');


module.exports = (mypos) => {
    mypos.checkout = {
        purchase: (params, response) => {
            new CheckoutPurchaseRequest(mypos, params).send(response);
        },

        refund: (params, callback) => {
            new CheckoutRefundRequest(mypos, params).send(callback);
        },

        reversal: (params, callback) => {
            new CheckoutReversalRequest(mypos, params).send(callback);
        },

        getPaymentStatus: (params, callback) => {
            new GetPaymentStatusRequest(mypos, params).send(callback);
        },
    };

    mypos.devices = {
        list: (params, callback) => {
            new ListDevicesRequest(mypos, params).send(callback);
        },

        get: (terminalId, callback) => {
            new GetDeviceDetailsRequest(mypos, terminalId).send(callback);
        },

        transactions: {
            get: (terminalId, params, callback) => {
                new ListDeviceTransactionsRequest(mypos, terminalId, params).send(callback);
            },
            list: (params, callback) => {
                new ListDevicesTransactionsRequest(mypos, params).send(callback);
            },
        },
    };

    mypos.transactions = {
        list: (params, callback) => {
            new ListTransactionsRequest(mypos, params).send(callback);
        },
        get: (trnRef, callback) => {
            new GetTransactionDetailsRequest(mypos, trnRef).send(callback);
        },
    };

    mypos.accounts = {
        list: (params, callback) => {
            new ListAccountsRequest(mypos, params).send(callback);
        }
    };

    mypos.webhooks = {
        list: (params, callback) => {
            new ListWebHooksRequest(mypos, params).send(callback);
        },

        details: (webHookId, callback) => {
            new GetWebHooksDetailsRequest(mypos, webHookId).send(callback);
        },

        create: (payloadUrl, secret, callback) => {
            new CreateWebHookRequest(mypos, payloadUrl, secret).send(callback);
        },

        update: (webHookId, payloadUrl, secret, isActive, callback) => {
            new UpdateWebHookRequest(mypos, webHookId, payloadUrl, secret, isActive).send(callback);
        },

        delete: (webHookId, callback) => {
            new DeleteWebHookRequest(mypos, webHookId).send(callback);
        },

        events: {
            list: (params, callback) => {
                new ListWebHookEventsRequest(mypos, params).send(callback);
            }
        },

        subscriptions: {
            list: (params, callback) => {
                new ListWebHookSubscriptionsRequest(mypos, params).send(callback);
            },

            details: (webHookSubscriptionId, callback) => {
                new GetWebHookSubscriptionDetailsRequest(mypos, webHookSubscriptionId).send(callback);
            },

            create: (webHookId, webHookEventId, callback, filter=undefined) => {
                new CreateWebHookSubscriptionsRequest(mypos, webHookId, webHookEventId, filter).send(callback);
            },

            delete: (webHookSubscriptionId, callback) => {
                new DeleteWebHookSubscriptionsRequest(mypos, webHookSubscriptionId).send(callback);
            }
        }
    }
};
