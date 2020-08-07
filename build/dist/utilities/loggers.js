"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const log4js_1 = require("log4js");
log4js_1.configure({
    appenders: {
        console: { type: 'stdout', layout: { type: 'coloured' } },
        errorFile: { type: 'file', filename: 'logs/errors.log' }
    },
    categories: {
        default: { appenders: ['console'], level: 'ALL' },
        error: { appenders: ['errorFile'], level: 'WARN' }
    }
});
exports.logger = log4js_1.getLogger();
exports.errorLogger = log4js_1.getLogger('error');
//# sourceMappingURL=loggers.js.map