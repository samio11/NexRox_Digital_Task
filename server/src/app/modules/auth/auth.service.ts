import { AppError } from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";

const registerUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const existUser = await User.findOne({ email: payload.email });
  if (!existUser) {
    throw new AppError(404, "User not found");
  }
  const passwordMatch = bcrypt.compare(payload.password, existUser.password);
  if (!passwordMatch) {
    throw new AppError(401, "Password is not Matched");
  }
  return existUser;
};

export const authServices = { registerUser, loginUser };
