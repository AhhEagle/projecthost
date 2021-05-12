"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_routes = void 0;
const order_1 = require("../models/order");
const decodeToken_1 = __importDefault(require("../middlewares/decodeToken"));
const order = new order_1.OrderController();
const index = async (req, res) => {
    const response = await order.Index();
    return res.status(200).json(response);
};
const create = async (req, res) => {
    const response = await order.Create(req.body, res.locals.data.result.id);
    return res.status(200).json(response);
};
const show = async (req, res) => {
    const userId = parseInt(req.params.user_id);
    const response = await order.Show(userId);
    return res.status(200).json(response);
};
const deleteOrder = async (req, res) => {
    const userId = req.params.id;
    const response = await order.Delete(userId);
    return res.status(200).json(response);
};
//To handle adding products to an order i.e many to many
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.products;
    const quantity = parseInt(req.body.quantity);
    try {
        const products = await order.addOrderProduct(quantity, orderId, productId);
        return res.status(200).json(products);
    }
    catch (error) {
        res.status(400);
    }
    ;
};
const order_routes = (app) => {
    app.post("/orders", decodeToken_1.default, create);
    app.get("/orders", decodeToken_1.default, index);
    app.post("/orders/:id/products", decodeToken_1.default, addProduct);
    app.get("/orders/:user_id", decodeToken_1.default, show);
    app.delete("/orders", decodeToken_1.default, deleteOrder);
};
exports.order_routes = order_routes;
