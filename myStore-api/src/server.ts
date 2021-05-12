import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { users_routes } from "./handlers/user";
import { products_routes } from "./handlers/product";
import cors from "cors";
import { order_routes } from "./handlers/order";

const app: express.Application = express();
const address: string = "0.0.0.0:8081";

app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req: Request, res: Response) {
  res.send("Hello World!");
});

users_routes(app);
products_routes(app);
order_routes(app);

export const tell = app.listen(8080, function() {
  console.log(`starting app on: ${address}`);
});
