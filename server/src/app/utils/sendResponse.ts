import { Response } from "express";

type TResponse<T> = {
  success: true;
  message: string;
  statusCode: number;
  data: T | T[] | null;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};
