import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the head world!");
});

export default app;
