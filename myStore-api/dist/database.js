"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_PORT = _a.POSTGRES_PORT, ENV = _a.ENV;
var pool = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT)
});
/*host: POSTGRES_HOST,
database:POSTGRES_DB,
user:POSTGRES_USER,
password:POSTGRES_PASSWORD

host: POSTGRES_HOST,
database:POSTGRES_DB_TEST,
user:POSTGRES_USER_TEST,
password:POSTGRES_PASSWORD_TEST
*/
exports["default"] = pool;
