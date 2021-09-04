import { Request, Response } from "express";
import * as response from "../common/responses";
import { IUser, User } from "../models/user.model";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service";

export const get = async (req: Request, res: Response) => {
  const users = await User.find({});
  const countUsers = await User.count();
  return response.success(res, { user: req.user, countUsers, users });
};

export const create = async (req: Request, res: Response) => {
  const errors: any = validationResult(req);

  if (!errors.isEmpty()) {
    return response.error(res, errors.array(), "", 422);
  }
  const body: IUser = req.body.user;
  const user = await createUser(body);
  return response.success(res, user);
};

export const destroy = async (req: Request, res: Response) => {
  const items: string = "Deleted successfully";
  await User.deleteMany({});
  return response.error(res, items);
};
