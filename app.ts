import express, { Application, Request, Response } from "express";
import cors from "cors";
import productsRouter from "./routes/products.route";
import usersRouter from "./routes/user.route";
import loginRouter from "./routes/login.route";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the head world!");
});

export default app;
