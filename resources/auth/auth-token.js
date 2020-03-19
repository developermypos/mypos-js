'use strict';

const util = require('util');

class AuthToken {
    constructor(data) {
        this._token = data.access_token;
        this._type = data.token_type;
        this._expiresIn = data.expires_in;
        this._error = data.error;
    }

    get token() {
        return this._token;
    }

    get type() {
        return this._type;
    }

    get expiresIn() {
        return parseInt(this._expiresIn);
    }

    get expiresAt() {
        return currentTimestamp + this.expiresIn;
    }

    get error() {
        return this._error;
    }

    get forHeader() {
        return `${this.type} ${this.token}`;
    }

    get isExpired() {
        return currentTimestamp > this.expiresAt;
    }

    get asJSON() {
        return {
            token: this.token,
            type: this.type,
            expiresIn: this.expiresIn,
            expiresAt: this.expiresAt,
            isExpired: this.isExpired,
            error: this.error
        };
    }
}

const currentTimestamp = parseInt(Date.now() / 1000);

module.exports = AuthToken;