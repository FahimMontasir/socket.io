import mongoose from 'mongoose';
import { IGenericErrorMessage, IGenericErrorResponse } from '../interfaces/error';

const handleCastError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [{ path: err.path, message: err.message }];

  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
