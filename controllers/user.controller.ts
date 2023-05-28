import { Request, Response } from "express";
import { createUserInDB, getAllUsersFromDB } from "../services/users.service";

export const createUser = async (req: Request, res: Response) => {
  const createdUser = await createUserInDB(req.body);

  res.status(200).json({
    status: 200,
    data: createdUser,
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await getAllUsersFromDB();

  res.status(200).json({
    status: 200,
    data: allUsers,
  });
};
