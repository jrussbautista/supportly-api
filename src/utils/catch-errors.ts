import { RequestHandler } from 'express';
import { CustomError } from './custom-error';

const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next): Promise<any> => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchErrors;
