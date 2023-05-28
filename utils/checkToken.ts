import { Request } from "express";

export const getTokenFrom = (req: Request) => {
  // Getting the authorization from request
  const authorization = req.get("authorization");

  // Checking if authorization is available and starts with Bearer
  if (authorization && authorization.startsWith("Bearer ")) {
    console.log("authorization", authorization);

    // replacing the auth header from 'Bearer ' to '' empty string
    return authorization.replace("Bearer ", "");
  }
  return null;
};
