import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorLogger } from '../../shared/logger';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/ValidationError';
import handleZodError from '../../errors/ZodError';
import handleCastError from '../../errors/CastError';
import ApiError from '../../errors/ApiError';
import configs from '../../configs';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  errorLogger.error(err);

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: configs.env !== 'production' ? err.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
