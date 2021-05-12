import express, { Request, Response } from 'express';
import { User, AuthController } from '../models/user';
import decodeToken from "../middlewares/decodeToken";


const user = new AuthController();

const create = async (req:Request, res:Response)=>{
    const input: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password:req.body.password
    };
   const response =  await user.Create(input);

return res.status(200).json(response);
}

const index = async (req:Request, res:Response)=>{
    const response = await user.Index();
return res.status(200).json(response);
}

const show = async (req:Request, res:Response)=>{
    const userId = parseInt(req.params.id);
    const response = await user.Show(userId);
return res.status(200).json(response);
}

const deleteUser = async (req:Request, res:Response)=>{
    const userId = parseInt(req.params.id);
    const response = await user.Delete(userId);
return res.status(200).json(response);
}


export const users_routes = (app:express.Application)=>{
    app.post('/users', decodeToken, create);
    app.get('/users', decodeToken, index);
    app.get('/users/:id', decodeToken, show);
    app.delete('/users/:id',decodeToken, deleteUser);
}