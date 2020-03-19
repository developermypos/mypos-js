

# myPOS SDK NodeJS

This repository provides a native NodeJS SDK, which enables to integrate your solution with myPOS APIs such as Checkout, Transactions, Devices, Webhooks and more to come.

### Table of Contents

* [Installation](#installation)
* [Checkout](#checkout)  
  * [Purchase](#purchase)
  * [Refund](#refund)
  * [Reversal](#reversal)
  * [Check Payment Status](#check-payment-status)
* [Transactions](#transactions)
  * [List Transactions](#list-transactions)
  * [Get Transaction Details](#get-transaction-details)
* [Devices](#devices)
  * [List Devices](#list-devices)
  * [Get Device Details](#get-device-details)
  * [List Device Transactions](#list-device-transactions)
  * [List All Devices Transactions](#list-all-devices-transactions)
* [Webhooks](#webhooks)
  * [List Webhooks](#list-webhooks)
  * [Get Webhook Details](#get-webhook-details)
  * [Create a Webhook](#create-a-webhook)
  * [Update a Webhook](#update-a-webhook)
  * [Delete a Webhook](#delete-a-webhook)
  * [List Webhook Events](#list-webhook-events)
  * [Subscribe for an event](#subscribe-for-an-event)
  * [List Event Subscriptions](#list-event-subscriptions)
  * [Get Event Subscription Details](#get-event-subscription-details)
  * [Unsubscribe from an Event](#unsubscribe-from-an-event)
  
  
  
## Installation

### Install via NPM package manager
```npm install mypos-js```

## Checkout
Before calling any of the Checkout API methods, you need to initialize the SDK.
```javascript
const mypos = require('mypos')({
    isSandbox: true,
    logLevel: 'debug',                  // Logging level
    checkout: {                         // Checkout API specific configuration
        sid: '',                        // Stored ID
        lang: 'EN',                     // Preferred language
        currency: '',                   // Store currency 
        clientNumber: '',               // Available in the myPOS Account
        okUrl: '',                      // Redirect URL on successful operation
        cancelUrl: '',                  // Redirect URL on cancelled operation
        notifyUtr: '',                  // Callback URL to be notified on operation result
        cardTokenRequest: 0,            // View details at https://developers.mypos.eu/en/doc/online_payments/v1_4/21-purchase-with-payment-card-(api-call--ipcpurchase) 
        paymentMethod: 1,               // View details at https://developers.mypos.eu/en/doc/online_payments/v1_4/21-purchase-with-payment-card-(api-call--ipcpurchase)
        paymentParametersRequired: 3,   // https://developers.mypos.eu/en/doc/online_payments/v1_4/21-purchase-with-payment-card-(api-call--ipcpurchase)
        keyIndex: 1,                    // Key index for the particular store
        privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' + // The private key for the particular store in PEM format
            '...\n' +
            '...\n' +
            '...\n' +
            '-----END RSA PRIVATE KEY-----'
    }
});
```
### Purchase
#### Gathering purchase data.
```javascript
const purchaseParams = {
    orderId: uuidv4(), // A unique reference
    amount: 23.45,
    cartItems: [
        {
            name: 'HP ProBook 6360b sticker',
            quantity: 2,
            price: 10.00
        },
        {
            name: 'Delivery',
            quantity: 1,
            price: 3.45
        }
    ], 
    customer: {
        email: 'name@website.com',
        firstNames: 'John',
        familyName: 'Smith',
        phone: '+23568956958',
        country: 'DEU',
        city: 'Hamburg',
        zipCode: '20095',
        address: 'Kleine Bahnstr. 41'
    },
    note: 'Some note'
};
```
_Note: The customer object can contain only the customer's **email** and **names** (first and family), however the rest of the information can be required during Checkout._
#### Calling the "Purchase" method.
Now that you have collected the purchase data, call the "purchase" method from the SDK and provide the purchase parameters and the response object. MyPOS will handle the redirect to the Online Checkout page after validating the provided parameters.
```javascript
app.post('/purchase', (req, res) => {
    mypos.checkout.purchase(purchaseParams, res);
});
```
### Refund
#### Gathering refund data.
```javascript
const refundParams = {
    orderId: uuidv4(), // A unique reference
    amount: 9.99,
    trnRef: "MyTransactionReference"
};
```
#### Calling the "Refund" method.
Now that you have collected the refund data, call the "refund" method from the SDK and provide the refund parameters.
```javascript
app.post('/refund', (req, res) => {
    mypos.checkout.refund(refundParams, (result) => {
        res.send(result);
    });
});
```
### Reversal
#### Gathering reversal data.
```javascript
const reversalParams = {
    trnRef: "MyTransactionReference"
};
```
#### Calling the "Reversal" method.
Now that you have collected the reversal data, call the "reversal" method from the SDK and provide the reversal parameters.
```javascript
app.post('/reversal', (req, res) => {
    mypos.checkout.reversal(reversalParams, (result) => {
        res.send(result);
    });
});
```
### Check Payment Status
In order to check the status of a payment, you need to provide myPOS with the order ID.
#### Gathering payment data.
```javascript
const paymentParams = {
    orderId: "MyOrderID"
};
```
#### Calling the "Get Payment Status" method.
Now that you have collected the request data, call the "getPaymentStatus" method from the SDK and provide the required parameters.
```javascript
app.post('/getPaymentStatus', (req, res) => {
    mypos.checkout.getPaymentStatus(paymentParams, (result) => {
        res.send(result);
    });
});
```

The below APIs use a different type of authentication and require a much simpler way of initializing the SDK.
```javascript
const mypos = require('mypos')({
    isSandbox: true,    // Whether to use the Sandbox environment
    apiKey: '',         // Generated via the myPOS Account
    apiSecret: '',      // Generated via the myPOS Account
    logLevel: 'debug',  // Logging level
});
```
## Transactions
### List Transactions
```javascript
app.get('/transactions', (req, res) => {
    mypos.transactions.list(req.query, (result) => {
        res.send(result);
    });
});
```
### Get Transaction Details
```javascript
app.get('/transactionDetails', (req, res) => {
    mypos.transactions.get('POSA01720049UZNE', (result) => {
        res.send(result);
    });
});
```
## Devices
### List Devices
```javascript
app.get('/devices', (req, res) => {
    mypos.devices.list({
        page: 1,
        count: 5
    }, (result) => {
        res.send(result);
    });
});
```
### Get Device Details
```javascript
app.get('/deviceDetails', (req, res) => {
    mypos.devices.get('90005195', (result) => {
        res.send(result);
    });
});
```
### List Device Transactions
```javascript
app.get('/deviceTransactions', (req, res) => {
    mypos.devices.transactions.get('90004284', {},(result) => {
        res.send(result);
    });
});
```
### List All Devices Transactions
```javascript
app.get('/deviceTransactionsAll', (req, res) => {
    mypos.devices.transactions.list({}, (result) => {
        res.send(result);
    });
});
```

## Webhooks
### List Webhooks
```javascript
app.get('/webhooks', (req, res) => {
    mypos.webhooks.list(req.query, (result) => {
        res.send(result);
    });
});
```
### Get Webhook Details
```javascript
app.get('/webhooks/details', (req, res) => {
    mypos.webhooks.details('d3fca256-ebbc-42d8-9195-d7f0784d546a' /* Webhook ID */, (result) => {
        res.send(result);
    });
});
```
### Create a Webhook
```javascript
app.get('/webhooks/create', (req, res) => {
    mypos.webhooks.create(
        'https://example.com',  // Payload URL
        'my-secret',            // Secret
        (result) => {
            res.send(result);
        });
});
```
### Update a Webhook
```javascript
app.get('/webhooks/update', (req, res) => {
    mypos.webhooks.update(
        'd3fca256-ebbc-42d8-9195-d7f0784d546a', // Webhook ID
        'https://example.com',                  // Payload URL
        'my-secret',                            // Secret
        0,                                      // Active flag 
        (result) => {
            res.send(result);
        });
});
```
### Delete a Webhook
```javascript
app.get('/webhooks/delete', (req, res) => {
    mypos.webhooks.delete(
        'd3fca256-ebbc-42d8-9195-d7f0784d546a', // Webhook ID
        (result) => {
            res.send(result);
        });
});
```
### List Webhook Events
```javascript
app.get('/webhook-events', (req, res) => {
    mypos.webhooks.events.list(req.query, (result) => {
        res.send(result);
    });
});
```
### Subscribe for an Event
```javascript
app.get('/webhooks/subscribe', (req, res) => {
    mypos.webhooks.subscriptions.create(
        'd3fca256-ebbc-42d8-9195-d7f0784d546a', // Webhook ID
        '0c2ac3dd-c62b-404b-ac7f-ac805ea268ff', // Event ID
        (result) => {
            res.send(result);
        });
});
```
### List Event Subscriptions
```javascript
app.get('/webhook-subscriptions', (req, res) => {
    mypos.webhooks.subscriptions.list(
        req.query,
        (result) => {
            res.send(result);
        });
});
```
### Get Event Subscription Details
```javascript
app.get('/webhook-subscriptions/details', (req, res) => {
    mypos.webhooks.subscriptions.details(
        '2b5b37ae-c88a-4563-936d-36d6e8280912', // Subscription ID
        (result) => {
            res.send(result);
        });
});
```
### Unsubscribe from an Event
```javascript
app.get('/webhooks/unsubscribe', (req, res) => {
    mypos.webhooks.subscriptions.delete(
        '18912b44-5c37-45ea-b933-103ff813cb71', // Subscription ID
        (result) => {
            res.send(result);
        });
});
```
