import { Request, Response, NextFunction } from 'express';
import { DecodedUser } from '../interfaces/user';

type Ifn = (req: Request & { user?: DecodedUser }, res: Response) => Promise<void>;

export const catchAsync = (fn: Ifn) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};
