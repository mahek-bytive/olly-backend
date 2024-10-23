import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { responseHandler } from '../utils/responseHandler';
import { logError } from '../utils/logger';

class Validator {
  private static defaults = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  public body(schema: Schema) {
    return function validate(req: Request, res: Response, next: NextFunction) {
      const { error, value } = schema.validate(req.body, Validator.defaults);
      if (error) {
        logError(error.details[0].message);
        return responseHandler(error.details[0].message, res, 400);
      }
      req.body = value;
      next();
      return undefined;
    };
  }

  public query(schema: Schema) {
    return function validate(req: Request, res: Response, next: NextFunction) {
      const { error, value } = schema.validate(req.query, Validator.defaults);
      if (error) {
        logError(error.details[0].message);
        return responseHandler(error.details[0].message, res, 400);
      }
      req.query = value;
      next();
      return undefined;
    };
  }

  public params(schema: Schema) {
    return function validate(req: Request, res: Response, next: NextFunction) {
      const { error, value } = schema.validate(req.params, Validator.defaults);
      if (error) {
        logError(error.details[0].message);
        return responseHandler(error.details[0].message, res, 400);
      }
      req.params = value;
      next();
      return undefined;
    };
  }
}

export default new Validator();