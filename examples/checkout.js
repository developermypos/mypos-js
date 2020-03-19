const app = express();
const uuidv4 = require('uuid/v4');
const http = require('http');
const path = require('path');

const mypos = require('@mypos-ltd/mypos')({
    isSandbox: true,
    logLevel: 'debug',
    checkout: {
        sid: '',
        lang: 'EN',
        currency: '',
        clientNumber: '',
        okUrl: '',
        cancelUrl: '',
        notifyUrl: '',
        cardTokenRequest: 0,
        paymentMethod: 1,
        paymentParametersRequired: 3,
        keyIndex: 1,
        privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
            '...\n' +
            '...\n' +
            '...\n' +
            '-----END RSA PRIVATE KEY-----'
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/examples.html'));
});
app.post('/purchase', (req, res) => {
    mypos.checkout.purchase(purchaseParams, res);
});
app.post('/refund', (req, res) => {
    mypos.checkout.refund(refundParams(req.body.trnRef), (result) => {
        res.send(result);
    });
});
app.post('/reversal', (req, res) => {
    mypos.checkout.reversal({ trnRef: req.body.trnRef }, (result) => {
        res.send(result);
    });
});
app.post('/getPaymentStatus', (req, res) => {
    mypos.checkout.getPaymentStatus({ orderId: req.body.orderId }, (result) => {
        res.send(result);
    });
});

const purchaseParams = {
    orderId: uuidv4(),
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

refundParams = (trnRef) => {
    return {
        orderId: uuidv4(),
        amount: 9.99,
        trnRef: trnRef
    };
};

const server = http.createServer(app);
server.listen(8080, '127.0.0.1');
