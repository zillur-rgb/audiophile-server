import { Request, Response } from "express";
import { sendLoginRequest } from "../services/login.service";

export const sendLoginRequestController = async (
  req: Request,
  res: Response
) => {
  const token = await sendLoginRequest(req.body);

  if (token === "invalid") {
    res.status(401).json({
      status: 401,
      message: "Invalid credentials!",
    });
  }

  res.status(200).json({
    status: 200,
    token,
  });
};
