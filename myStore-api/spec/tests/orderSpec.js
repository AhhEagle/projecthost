"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../src/models/order");
const user_1 = require("../../src/models/user");
const product_1 = require("../../src/models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
const order = new order_1.OrderController();
const user = new user_1.AuthController();
const product = new product_1.ProductController();
const id = 1;
const request = supertest_1.default(server_1.tell);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjUxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkRUFEUFZkS3ptOVlocEFBbGFrU0doLjBpWklxd0FKVlNqdEtmMHN2bUNJL2YvMDJWcVN3UnUifSwiaWF0IjoxNjE5ODg2MTg2fQ.URTT4W3JP82lyinErh3HaWvji9GxkU-wU89ep65ejFE";
describe("Order Model", () => {
    it('should have a create method', () => {
        expect(order.Create).toBeDefined();
    });
    it('should have an index method', () => {
        expect(order.Index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.Show).toBeDefined();
    });
    it('should have a addOrderProduct method', () => {
        expect(order.addOrderProduct).toBeDefined();
    });
});
describe('Orders test with a foreign key', () => {
    beforeAll(async () => {
        await user.Create({
            firstname: 'test',
            lastname: 'user',
            password: "testpassword",
        });
        await product.Create({
            name: 'test',
            price: '100',
            category: "test"
        });
    });
    afterAll(async () => {
        await order.Delete('1');
        await user.Delete(id);
        await product.Delete(id);
    });
    it('should create an order', async () => {
        const response = await order.Create({ status: "completed" }, id);
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.status).toBeDefined();
        expect(response.id).toBe(id);
    });
    it('should show current order by the given user id', async () => {
        const response = await order.Show(id);
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.status).toBeDefined();
        expect(response.id).toBe(id);
    });
});
describe("Orders handler endpoints", () => {
    beforeEach(() => {
        spyOn(order_1.OrderController.prototype, 'Create').and.returnValue(Promise.resolve({
            "id": id,
            "status": "completed",
            "user_id": 51
        }));
        spyOn(order_1.OrderController.prototype, 'Index').and.returnValue(Promise.resolve([{
                "id": id,
                "status": "completed",
                "user_id": 51
            }]));
        spyOn(order_1.OrderController.prototype, 'Show').and.returnValue(Promise.resolve({
            "id": id,
            "status": "completed",
            "user_id": 51
        }));
        spyOn(order_1.OrderController.prototype, 'Delete').and.returnValue(Promise.resolve({
            "id": id,
            "status": "completed",
            "user_id": 51
        }));
    });
    it('should test create order endpoint', async () => {
        const test = request.post('/orders').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return all created users', async () => {
        const test = request.get('/orders').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return users by the specified Id', async () => {
        const test = request.get('/orders/1').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return deleted user by the specified Id', async () => {
        const test = request.get('/orders/1').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
});
