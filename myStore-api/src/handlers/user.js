"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_routes = void 0;
const user_1 = require("../models/user");
const decodeToken_1 = __importDefault(require("../middlewares/decodeToken"));
const user = new user_1.AuthController();
const create = async (req, res) => {
    const input = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    const response = await user.Create(input);
    return res.status(200).json(response);
};
const index = async (req, res) => {
    const response = await user.Index();
    return res.status(200).json(response);
};
const show = async (req, res) => {
    const userId = parseInt(req.params.id);
    const response = await user.Show(userId);
    return res.status(200).json(response);
};
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const response = await user.Delete(userId);
    return res.status(200).json(response);
};
const users_routes = (app) => {
    app.post('/users', decodeToken_1.default, create);
    app.get('/users', decodeToken_1.default, index);
    app.get('/users/:id', decodeToken_1.default, show);
    app.delete('/users/:id', decodeToken_1.default, deleteUser);
};
exports.users_routes = users_routes;
