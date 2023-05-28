import express, { Application, Request, Response } from "express";
import cors from "cors";
import productsRouter from "./routes/products.route";
import usersRouter from "./routes/user.route";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the head world!");
});

export default app;
