import { ProductController } from '../../src/models/product';
import supertest from 'supertest';
import {tell} from '../../src/server';


const product = new ProductController();
const id : number = 2;
const request = supertest(tell);
const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjUxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkRUFEUFZkS3ptOVlocEFBbGFrU0doLjBpWklxd0FKVlNqdEtmMHN2bUNJL2YvMDJWcVN3UnUifSwiaWF0IjoxNjE5ODg2MTg2fQ.URTT4W3JP82lyinErh3HaWvji9GxkU-wU89ep65ejFE";


describe("Product Model", ()=>{
    it('should have a create method', ()=>{
        expect(product.Create).toBeDefined();
       
    });

    it('should have a show method', ()=>{
        expect(product.Show).toBeDefined();
    });

    it('should have an index method', ()=>{
        expect(product.Index).toBeDefined();
    });

    it('should have a delete method', ()=>{
        expect(product.Delete).toBeDefined();
    });

   it('should create a product using the create method', async()=>{
       const result = await product.Create({
           name: 'test',
           price: '100',
           category: "test"
       });
       expect(result.category).toBeDefined();
       expect(result).toBeTruthy();
   });

   it('should return all created products', async()=>{
    const result = await product.Index();
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
    expect(result[0].name).toBeDefined();
    expect(result[0].name).toBe('test');
    });

    it('should return the product with the given Id', async()=>{
        const result = await product.Show(id);
        expect(result.id).toBe(id);
        expect(result.name).toEqual('test');
        expect(result.category).toBe('test');
    });

    it('should return the details of the deleted product', async()=>{
        const result = await product.Delete(id);
        expect(result.id).toBe(id);
        expect(result.name).toEqual('test');
        expect(result.category).toEqual('test');
    });
});

describe("Products handler endpoints", ()=>{
    beforeEach(()=>{
        spyOn(ProductController.prototype, 'Create').and.returnValue(
            Promise.resolve(
                {
                    "id": id,
                    name: 'test',
                    price: '100',
                    category: "test"
                }
            )
        );
        spyOn(ProductController.prototype, 'Index').and.returnValue(
            Promise.resolve(
                [{
                    "id":id,
                    name: 'test',
                    price: '100',
                    category: "test"
                }]
            )
        );
        spyOn(ProductController.prototype, 'Show').and.returnValue(
            Promise.resolve(
                {
                    "id":id,
                    name: 'test',
                    price: '100',
                    category: "test"
                }
            )
        );

        spyOn(ProductController.prototype, 'Delete').and.returnValue(
            Promise.resolve(
                {
                    "id":id,
                    name: 'test',
                    price: '100',
                    category: "test"
                }
            )
        );
    });
   
    it('should test create products endpoint', async() => {
        const test = request.post('/products').set("Authorization",   token);
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });

    it('should return all created product', async() => {
        const test = request.get('/products');
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
    it('should return products by the specified Id', async() => {
        const test = request.get('/products/2');
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });

    it('should return deleted user by the specified Id', async() => {
        const test = request.get('/products/2');
        const response = await test;
        expect(response.status).toBe(200);
        expect(response.unauthorized).toBe(false);
    });
});