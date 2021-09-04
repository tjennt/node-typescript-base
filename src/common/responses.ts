import { Response } from "express";

interface IBaseSuccessRes {
  success: boolean;
  status: number;
  message: string;
  data: any;
}

interface IBaseErrorRes {
  success: boolean;
  status: number;
  message: string;
  errors: any;
}

export const baseSuccessRes = (
  data: any,
  message: string,
  status: number
): IBaseSuccessRes => {
  const results: IBaseSuccessRes = {
    success: true,
    status: status,
    message: message,
    data: data,
  };
  return results;
};

export const baseErrorRes = (
  errors: any,
  message: string,
  status: number
): IBaseErrorRes => {
  const results: IBaseErrorRes = {
    success: false,
    status: status,
    message: message,
    errors: errors,
  };
  return results;
};

export const success = (
  res: Response,
  data?: any,
  message?: any,
  status: number = 200
): any => {
  const results: Object = baseSuccessRes(data, message, status);
  return res.status(status).send(results);
};

export const error = (
  res: Response,
  errors?: any,
  message?: any,
  status: number = 400
): any => {
  const results: Object = baseErrorRes(errors, message, status);
  return res.status(status).send(results);
};
