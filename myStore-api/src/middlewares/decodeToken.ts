import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const decodeToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader: "";
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    res.locals.data = decoded;
    next();
  } catch (error) {
    res.status(401);
  }
};

export default decodeToken;
