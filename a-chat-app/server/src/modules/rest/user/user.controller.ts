import { UserService } from './user.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';

const register = catchAsync(async (req, res) => {
  const result = await UserService.register(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'You have successfully registered!!!',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await UserService.login(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'You have successfully logged in!!!',
    data: result,
  });
});

export const UserController = {
  register,
  login,
};
