import { createPool } from "mysql2/promise";
import {DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER} from './config.js'

const pool= createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export default pool;