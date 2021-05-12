"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PEPPER } = process.env;
class ProductController {
    async Create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO products (name, price , category) VALUES($1,$2, $3) RETURNING *";
            const response = await conn.query(sql, [
                product.name, product.price, product.category
            ]);
            conn.release();
            const result = response.rows[0];
            return result;
        }
        catch (err) {
            throw new Error(`unable to create product ${product.name}: ${err}`);
        }
    }
    async Index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const response = await conn.query(sql);
            conn.release();
            const result = response.rows;
            return result;
        }
        catch (err) {
            throw new Error(`unable to get all products ${err}`);
        }
    }
    async Show(productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products WHERE id=$1";
            const response = await conn.query(sql, [productId]);
            const result = response.rows[0];
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`unable to get product ${productId} ${err}`);
        }
    }
    async Delete(productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM products WHERE id=$1 RETURNING *";
            const response = await conn.query(sql, [productId]);
            const result = response.rows[0];
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`unable delete product ${err}`);
        }
    }
}
exports.ProductController = ProductController;
exports.default = ProductController;
