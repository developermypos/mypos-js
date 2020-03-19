'use strict';

module.exports = {
    safeVal: (val, safe) => {
        return (val === undefined || val === null || val.length === 0) ? safe : val;
    },
};
