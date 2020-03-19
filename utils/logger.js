'use strict';

const log = (msg, level) => {
    console.log(`[${new Date().toISOString()}] [myPOS API] [${level.toUpperCase()}] ${msg}`);
};

const Logger = {
    debug: (msg) => {
        // if (['debug'].includes('debug')) {
            log(msg, 'debug');
        // }
    },

    info: (msg) => {
        // if (['debug', 'info'].includes(global.mypos.config.logging.level)) {
            log(msg, 'info');
        // }
    },

    error: (msg) => {
        // if (['debug', 'info', 'error'].includes(global.mypos.config.logging.level)) {
            log(msg, 'debug');
        // }
    }
};

module.exports = Logger;
