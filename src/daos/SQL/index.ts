import {Pool} from 'pg'

//build a connection pool - same db as lightly burning
export const connectionPool:Pool = new Pool ({ 
    host:process.env['FP_HOST'],
    user: process.env['FP_USER'],
    password: process.env['FP_PASSWORD'], 
    database: process.env['FP_DATABASE'], 
    port: 5432, 
    max: 5 
})
