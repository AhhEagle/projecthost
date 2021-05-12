"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var decodeToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader ? authorizationHeader : "";
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        res.locals.data = decoded;
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports["default"] = decodeToken;
