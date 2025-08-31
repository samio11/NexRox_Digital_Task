import { catchAsync } from "../../utils/catchAsync";
import { createUserToken } from "../../utils/createUserToken";
import { sendResponse } from "../../utils/sendResponse";
import { setCookie } from "../../utils/setCookies";
import { authServices } from "./auth.service";

const registerUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await authServices.registerUser(payload);
  sendResponse(res, {
    statusCode: 201,
    message: "User Created Done",
    success: true,
    data: result,
  });
});
const loginUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const loggedInUser = await authServices.loginUser(payload);
  const token = createUserToken(loggedInUser);
  setCookie(res, token);

  sendResponse(res, {
    statusCode: 201,
    message: "User Logged In Successfully",
    success: true,
    data: {
      accessToken: token.accessToken,
    },
  });
});

export const authController = { registerUser, loginUser };
