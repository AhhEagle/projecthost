"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.tell = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_1 = require("./handlers/user");
var product_1 = require("./handlers/product");
var cors_1 = __importDefault(require("cors"));
var order_1 = require("./handlers/order");
var app = express_1["default"]();
var address = "0.0.0.0:8081";
app.use(body_parser_1["default"].json());
app.use(cors_1["default"]());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
user_1.users_routes(app);
product_1.products_routes(app);
order_1.order_routes(app);
exports.tell = app.listen(8080, function () {
    console.log("starting app on: " + address);
});
