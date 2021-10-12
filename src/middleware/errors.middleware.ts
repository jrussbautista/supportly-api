import { ErrorRequestHandler } from 'express';

import { CustomError } from '../utils/custom-error';

const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log(error);

  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? {
        message: error.message,
        code: error.code,
        status: error.status,
        data: error.data,
      }
    : {
        message: 'Something went wrong, please contact our support.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
      };

  res.status(clientError.status).send(clientError);
};

export default handleError;
