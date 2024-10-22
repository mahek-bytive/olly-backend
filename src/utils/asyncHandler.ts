import { Request, Response, NextFunction } from 'express';
// import { MongoError } from 'mongodb';
// import MongoService from '../services/databaseServices/mongo.services';
import { errorHandler } from './responseHandler';
import { logError } from './logger';
import errorCodes from '../constants/errorCodes';

export const asyncHandler = (fn: any) => async (req:Request, res:Response, next:NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log(error);
    const errorCode = error instanceof Error ? error.message : 'ERR-004';
    logError(errorCode);
    errorHandler(errorCode, res);
  }
};

// export const transactionHandler = (fn: any) => async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   // eslint-disable-next-line
// ) => {
//   const mongoDB = MongoService.getInstance();
//   const session = await mongoDB.startTransaction();
//   try {
//     await fn(req, res, next, session);
//     await mongoDB.commitTransaction(session);
//   } catch (error) {
//     console.log(error);
//     await mongoDB.abortTransaction(session);
//     // @todo: Add error message to errorCodes
//     // const { _id: userId } = req.body.user;
//     // logError(errorMessage);
//     if (error instanceof MongoError && error.code === 11000) {
//       return errorHandler('ERR-101', res);
//     }
//     if (error instanceof Error && errorCodes[error.message]) {
//       return errorHandler(error.message, res);
//     }
//     return errorHandler('ERR-004', res);
//   }
// };
