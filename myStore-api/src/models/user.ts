import pool from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { PEPPER } = process.env;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class AuthController {
  async Create(user: User): Promise<User> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO users (firstname,lastname,password) VALUES($1,$2, $3) RETURNING *";
      const hash = bcrypt.hashSync(user.password + PEPPER, 10);
      const response = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash
      ]);
      const result = response.rows[0];
      conn.release();
      const token = jwt.sign({ result }, process.env.TOKEN_SECRET as string);
      result.token = token;
      return result;
    } catch (err) {
      throw new Error(
        `unable to create user ${user.firstname} ${user.lastname} : ${err}`
      );
    }
  }

  async Index(): Promise<User[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users";
      const response = await conn.query(sql);
      const result = response.rows;
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`unable to get all users ${err}`);
    }
  }

  async Show(userId: number): Promise<User> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users WHERE id=$1";
      const response = await conn.query(sql, [userId]);
      const result = response.rows[0];
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`unable to get user ${err}`);
    }
  }

  async Delete(userId: number): Promise<User> {
    try {
      const conn = await pool.connect();
      const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
      const response = await conn.query(sql, [userId]);
      const result = response.rows[0];
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`unable to delete user ${err}`);
    }
  }
}

export default AuthController;
