import express, { Request, Response } from "express";
import { OrderController } from "../models/order";
import decodeToken from "../middlewares/decodeToken";

const order = new OrderController();

const index = async (req: Request, res: Response) => {
const response = await order.Index();
return res.status(200).json(response);
};

const create = async (req: Request, res: Response) => {
    const response = await order.Create(req.body, res.locals.data.result.id);
    return res.status(200).json(response);
  };


 const show = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id);
    const response = await order.Show(userId);
    return res.status(200).json(response);
  };

  const deleteOrder = async (req:Request, res:Response)=>{
    const userId = req.params.id;
    const response = await order.Delete(userId);
    return res.status(200).json(response);
}

//To handle adding products to an order i.e many to many
  const addProduct = async(req:Request, res:Response) =>{
      const orderId: string = req.params.id;
      const productId: string = req.body.products;
      const quantity: number = parseInt(req.body.quantity);

      try{
          const products = await order.addOrderProduct(quantity, orderId, productId);
          return res.status(200).json(products);
      } catch (error){
        res.status(400);
      };
      
  }

  export const order_routes = (app: express.Application) => {
    app.post("/orders", decodeToken, create);
    app.get("/orders", decodeToken, index);
    app.post("/orders/:id/products", decodeToken, addProduct);
    app.get("/orders/:user_id", decodeToken, show);
    app.delete("/orders", decodeToken, deleteOrder)
  };
  

