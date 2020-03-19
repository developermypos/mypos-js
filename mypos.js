'use strict';

const defaultConfig = {
    logLevel: 'info',
    isSandbox: false
};

function MyPOS(config) {
    if (!(this instanceof MyPOS)) {
        return new MyPOS(config);
    }

    this.token = undefined;
    this.config = Object.assign(defaultConfig, config);

    this.setToken = (token) => {
        this.token = token;
    };

    require('./resources')(this);
    return this;
}

module.exports = MyPOS;
