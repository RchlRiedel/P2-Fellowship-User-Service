"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
const pg_1 = require("pg");
//build a connection pool - same db as lightly burning
exports.connectionPool = new pg_1.Pool({
    host: process.env['LB_Host'],
    user: process.env['P2_User'],
    password: process.env['P2_Password'],
    database: process.env['P2_Database'],
    port: 5432,
    max: 5
});
//# sourceMappingURL=index.js.map