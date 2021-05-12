"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const database_1 = __importDefault(require("../database"));
class OrderController {
    async Create(order, user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *";
            const response = await conn.query(sql, [order.status, user_id]);
            conn.release();
            const result = response.rows[0];
            return result;
        }
        catch (err) {
            throw new Error(`unable to create order : ${err}`);
        }
    }
    async Index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const response = await conn.query(sql);
            conn.release();
            const result = response.rows;
            return result;
        }
        catch (err) {
            throw new Error(`unable to get all orders ${err}`);
        }
    }
    async Show(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=$1";
            const response = await conn.query(sql, [userId]);
            const result = response.rows[0];
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`unable to get order ${userId} ${err}`);
        }
    }
    async addOrderProduct(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3)";
            const response = await conn.query(sql, [quantity, orderId, productId]);
            const result = response.rows[0];
            conn.release();
            return result;
        }
        catch (err) {
            throw new Error(`could not add product to order`);
        }
    }
    async Delete(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM orders WHERE id=$1 RETURNING *";
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
exports.OrderController = OrderController;
