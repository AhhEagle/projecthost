import pool from "../database";
import {PoolClient, QueryResult} from 'pg';
import dotenv from "dotenv";

dotenv.config();

const { PEPPER } = process.env;

export type Product = {
  id?: number;
  name: string;
  price: string;
  category: string;
};

export class ProductController {
  async Create(product: Product): Promise<Product> {
    try {
      const conn:PoolClient = await pool.connect();
      const sql =
        "INSERT INTO products (name, price , category) VALUES($1,$2, $3) RETURNING *";
      const response : QueryResult = await conn.query(sql, [
        product.name, product.price, product.category
      ]);
      conn.release();
      const result = response.rows[0];
      return result;
    } catch (err) {
      throw new Error(
        `unable to create product ${product.name}: ${err}`
      );
    }
  }

  async Index(): Promise<Product[]> {
    try {
      const conn:PoolClient = await pool.connect();
      const sql = "SELECT * FROM products";
      const response:QueryResult = await conn.query(sql);
      conn.release();
      const result = response.rows;
      return result;
    } catch (err) {
      throw new Error(`unable to get all products ${err}`);
    }
  }

  async Show(productId: number): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const response = await conn.query(sql, [productId]);
      const result = response.rows[0];
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`unable to get product ${productId} ${err}`);
    }
  }

  async Delete(productId: number): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = "DELETE FROM products WHERE id=$1 RETURNING *";
      const response = await conn.query(sql, [productId]);
      const result = response.rows[0];
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`unable delete product ${err}`);
    }
  }
}

export default ProductController;
