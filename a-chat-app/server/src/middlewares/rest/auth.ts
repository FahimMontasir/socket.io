import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import configs from '../../configs';
import ApiError from '../../errors/ApiError';
import { DecodedUser } from '../../interfaces/user';

// replace user with appropriate type
export const verifyToken = (
  req: Request & { user?: DecodedUser },
  res: Response,
  next: NextFunction
) => {
  let token: string = req.body.token || req.query.token || req.headers['authorization'];

  if (!token) {
    throw new ApiError(403, 'A token is required for authentication');
  }

  try {
    token = token.replace(/^Bearer\s+/, '');
    const decoded = jwt.verify(token, configs.token_key as Secret);
    req.user = decoded as DecodedUser;
  } catch (err) {
    throw new ApiError(401, 'Invalid Token');
  }

  return next();
};
