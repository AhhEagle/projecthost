"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products_routes = void 0;
const product_1 = require("../models/product");
const decodeToken_1 = __importDefault(require("../middlewares/decodeToken"));
const product = new product_1.ProductController();
const create = async (req, res) => {
    const input = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    const response = await product.Create(input);
    return res.status(200).json(response);
};
const index = async (req, res) => {
    const response = await product.Index();
    return res.status(200).json(response);
};
const show = async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await product.Show(productId);
    return res.status(200).json(response);
};
const deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await product.Delete(productId);
    return res.status(200).json(response);
};
const products_routes = (app) => {
    app.post("/products", decodeToken_1.default, create);
    app.get("/products", index);
    app.get("/products/:id", show);
    app.delete("/products/:id", deleteProduct);
};
exports.products_routes = products_routes;
