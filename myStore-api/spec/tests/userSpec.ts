import { User, AuthController } from '../../src/models/user';
import supertest from 'supertest';
import {tell} from '../../src/server';




const user = new AuthController();
const id : number = 2;
const request = supertest(tell);
const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjUxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkRUFEUFZkS3ptOVlocEFBbGFrU0doLjBpWklxd0FKVlNqdEtmMHN2bUNJL2YvMDJWcVN3UnUifSwiaWF0IjoxNjE5ODg2MTg2fQ.URTT4W3JP82lyinErh3HaWvji9GxkU-wU89ep65ejFE";



describe("User Model", ()=>{
    it('should have a create method', ()=>{
        expect(user.Create).toBeDefined();
       
    });

    it('should have a show method', ()=>{
        expect(user.Show).toBeDefined();
    });

    it('should have an index method', ()=>{
        expect(user.Index).toBeDefined();
    });

    it('should have a delete method', ()=>{
        expect(user.Delete).toBeDefined();
    });


   it('should create a user using the create method', async()=>{
   
       const result = await user.Create({
           firstname: 'test',
           lastname: 'user',
           password: "testpassword"
       });
       expect(result.password).toBeDefined();
       expect(result).toBeTruthy();
   });

   it('should return all created users', async()=>{
    const result = await user.Index();
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
    expect(result[0].password.length).toBeGreaterThan(10);
    expect(result[0].firstname).toBeDefined();
    });

    it('should return the user with the given Id', async()=>{
        const result = await user.Show(id);
        expect(result.id).toBe(id);
        expect(result.firstname).toEqual('test');
        expect(result.password.length).toBeGreaterThan(10);
    });

    it('should return the details of the deleted user', async()=>{
        const result = await user.Delete(id);
        expect(result.id).toBe(id);
        expect(result.firstname).toEqual('test');
        expect(result.lastname).toEqual('user');
        expect(result.password.length).toBeGreaterThan(10);
    });


});

describe("Users handler endpoints", ()=>{
    beforeEach(()=>{
        spyOn(AuthController.prototype, 'Create').and.returnValue(
            Promise.resolve(
                {
                    "id": id,
                    "firstname": "test",
                    "lastname": "user",
                    "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjUxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkRUFEUFZkS3ptOVlocEFBbGFrU0doLjBpWklxd0FKVlNqdEtmMHN2bUNJL2YvMDJWcVN3UnUifSwiaWF0IjoxNjE5ODg2MTg2fQ.URTT4W3JP82lyinErh3HaWvji9GxkU-wU89ep65ejFE"
                }
            )
        );
        spyOn(AuthController.prototype, 'Index').and.returnValue(
            Promise.resolve(
                [{
                    "firstname": "test",
                    "lastname": "user",
                    "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu"
                }]
            )
        );
        spyOn(AuthController.prototype, 'Show').and.returnValue(
            Promise.resolve(
                {
                    "id":id,
                    "firstname": "test",
                    "lastname": "user",
                    "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu"
                }
            )
        );

        spyOn(AuthController.prototype, 'Delete').and.returnValue(
            Promise.resolve(
                {
                    "id":id,
                    "firstname": "test",
                    "lastname": "user",
                    "password": "$2b$10$EADPVdKzm9YhpAAlakSGh.0iZIqwAJVSjtKf0svmCI/f/02VqSwRu"
                }
            )
        );
    });
   
    it('should test create user endpoint', async() => {
        const test = request.post('/users').set("Authorization",   token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });

    it('should return all created users', async() => {
        const test = request.get('/users').set("Authorization",   token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return users by the specified Id', async() => {
        const test = request.get('/users/2').set("Authorization",   token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });


    it('should return deleted user by the specified Id', async() => {
        const test = request.get('/users/2').set("Authorization",   token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
});