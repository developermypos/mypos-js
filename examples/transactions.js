const mypos = require('@mypos-ltd/mypos')({
    isSandbox: true,
    logLevel: 'debug',
    apiKey: 'CLIENT_ID',
    apiSecret: 'CLIENT_SECRET'
});

const params = {
    page: 1,
    pageSize: 20
};

mypos.transactions.list(params,(result) => {
    console.log(result);
});

mypos.transactions.latest(params,(result) => {
    console.log(result);
});

mypos.transactions.get('', (result) => {
    console.log(result);
});