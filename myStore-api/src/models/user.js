"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { PEPPER } = process.env;
class AuthController {
    async Create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users (firstname,lastname,password) VALUES($1,$2, $3) RETURNING *";
            const hash = bcrypt_1.default.hashSync(user.password + PEPPER, 10);
            const response = await conn.query(sql, [
                user.firstname,
                user.lastname,
                hash
            ]);
            const result = response.rows[0];
            conn.release();
            const token = jsonwebtoken_1.default.sign({ result }, process.env.TOKEN_SECRET);
            result.token = token;
            return result;
        }
        catch (err) {
            throw new Error(`unable to create user ${user.firstname} ${user.lastname} : ${err}`);
        }
    }
    async Index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const response = await conn.query(sql);
            const result = response.rows;
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`unable to get all users ${err}`);
        }
    }
    async Show(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id=$1";
            const response = await conn.query(sql, [userId]);
            const result = response.rows[0];
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`unable to get user ${err}`);
        }
    }
    async Delete(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
            const response = await conn.query(sql, [userId]);
            const result = response.rows[0];
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`unable to delete user ${err}`);
        }
    }
}
exports.AuthController = AuthController;
exports.default = AuthController;
