import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { ICreatedUser, IUser } from './user.interface';
import { User } from './user.model';
import configs from '../../../configs';

const register = async (body: IUser): Promise<ICreatedUser | null> => {
  const { username, mail, password } = body;
  // check if user exists
  const userExists = await User.exists({ mail: mail.toLowerCase() });
  if (userExists) {
    throw new ApiError(400, 'This Email is already in use.');
  }

  // encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // create user document and save in database
  const user = await User.create({
    username,
    mail: mail.toLowerCase(),
    password: encryptedPassword,
  });

  // create JWT token
  const token = jwt.sign(
    {
      userId: user._id,
      mail,
    },
    configs.token_key as Secret,
    {
      expiresIn: '24h',
    }
  );

  return {
    _id: user._id,
    mail: user.mail,
    username: user.username,
    token: token,
  };
};

const login = async (body: IUser): Promise<ICreatedUser | null> => {
  const { mail, password } = body;

  const user = await User.findOne({ mail: mail.toLowerCase() });
  if (!user) {
    throw new ApiError(404, 'Your email is wrong!!!');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(404, 'Your password is wrong!!!');
  }

  // send new token
  const token = jwt.sign(
    {
      userId: user._id,
      mail,
    },
    configs.token_key as Secret,
    {
      expiresIn: '24h',
    }
  );

  return {
    _id: user._id,
    mail: user.mail,
    username: user.username,
    token: token,
  };
};

export const UserService = {
  register,
  login,
};
