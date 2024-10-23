import { Response } from 'express';
import errorCodes from '../constants/errorCodes';

export const responseHandler = (data: any, res: Response, httpStatus: number = 200): void => {
  res.status(httpStatus).json({ data });
};

export const errorHandler = (errorCode: keyof typeof errorCodes, res: Response): void => {
  const error = errorCodes[errorCode];
  if (error) {
    res.status(error.httpStatus).json({
      code: errorCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      code: 'ERR_UNKNOWN',
      message: 'An unknown error occurred.',
    });
  }
};
