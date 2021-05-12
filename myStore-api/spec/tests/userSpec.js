"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../src/models/user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
const user = new user_1.AuthController();
const id = 2;
const request = supertest_1.default(server_1.tell);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjUxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkRUFEUFZkS3ptOVlocEFBbGFrU0doLjBpWklxd0FKVlNqdEtmMHN2bUNJL2YvMDJWcVN3UnUifSwiaWF0IjoxNjE5ODg2MTg2fQ.URTT4W3JP82lyinErh3HaWvji9GxkU-wU89ep65ejFE";
describe("User Model", () => {
    it('should have a create method', () => {
        expect(user.Create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.Show).toBeDefined();
    });
    it('should have an index method', () => {
        expect(user.Index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(user.Delete).toBeDefined();
    });
    it('should create a user using the create method', async () => {
        const result = await user.Create({
            firstname: 'test',
            lastname: 'user',
            password: "testpassword"
        });
        expect(result.password).toBeDefined();
        expect(result).toBeTruthy();
    });
    it('should return all created users', async () => {
        const result = await user.Index();
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result[0].password.length).toBeGreaterThan(10);
        expect(result[0].firstname).toBeDefined();
    });
    it('should return the user with the given Id', async () => {
        const result = await user.Show(id);
        expect(result.id).toBe(id);
        expect(result.firstname).toEqual('test');
        expect(result.password.length).toBeGreaterThan(10);
    });
    it('should return the details of the deleted user', async () => {
        const result = await user.Delete(id);
        expect(result.id).toBe(id);
        expect(result.firstname).toEqual('test');
        expect(result.lastname).toEqual('user');
        expect(result.password.length).toBeGreaterThan(10);
    });
});
describe("Users handler endpoints", () => {
    beforeEach(() => {
        spyOn(user_1.AuthController.prototype, 'Create').and.returnValue(Promise.resolve({
            "id": id,
            "firstname": "test",
            "lastname": "user",
            "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjUxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkRUFEUFZkS3ptOVlocEFBbGFrU0doLjBpWklxd0FKVlNqdEtmMHN2bUNJL2YvMDJWcVN3UnUifSwiaWF0IjoxNjE5ODg2MTg2fQ.URTT4W3JP82lyinErh3HaWvji9GxkU-wU89ep65ejFE"
        }));
        spyOn(user_1.AuthController.prototype, 'Index').and.returnValue(Promise.resolve([{
                "firstname": "test",
                "lastname": "user",
                "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu"
            }]));
        spyOn(user_1.AuthController.prototype, 'Show').and.returnValue(Promise.resolve({
            "id": id,
            "firstname": "test",
            "lastname": "user",
            "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu"
        }));
        spyOn(user_1.AuthController.prototype, 'Delete').and.returnValue(Promise.resolve({
            "id": id,
            "firstname": "test",
            "lastname": "user",
            "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu"
        }));
    });
    it('should test create user endpoint', async () => {
        const test = request.post('/users').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return all created users', async () => {
        const test = request.get('/users').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return users by the specified Id', async () => {
        const test = request.get('/users/2').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return deleted user by the specified Id', async () => {
        const test = request.get('/users/2').set("Authorization", token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
});
