import express, { Request, Response } from "express";
import { Product, ProductController } from "../models/product";
import decodeToken from "../middlewares/decodeToken";


const product = new ProductController();

const create = async (req: Request, res: Response) => {
  const input: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  const response = await product.Create(input);

  return res.status(200).json(response);
};

const index = async (req: Request, res: Response) => {
  const response = await product.Index();
  return res.status(200).json(response);
};

const show = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const response = await product.Show(productId);
  return res.status(200).json(response);
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const response = await product.Delete(productId);
  return res.status(200).json(response);
};

export const products_routes = (app: express.Application) => {
  app.post("/products", decodeToken, create);
  app.get("/products", index);
  app.get("/products/:id", show);
  app.delete("/products/:id", deleteProduct);
};
