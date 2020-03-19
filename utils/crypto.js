'use strict';

const crypto = require('crypto');

module.exports = {
    generateSignature: (obj, secret) => {
        return crypto.createHmac("sha256", secret).update(JSON.stringify((obj))).digest("hex");
    }
};
