import { baseErrorRes } from "../common/responses";
import { IUser, User } from "../models/user.model";

export const createUser = async (data: IUser) => {
  const user = await User.create(data);
  // await user.save();
  return user;
};
