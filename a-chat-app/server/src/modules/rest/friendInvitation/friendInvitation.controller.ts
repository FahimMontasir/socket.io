import { DecodedUser } from '../../../interfaces/user';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { FriendInvitationService } from './friendInvitation.service';

const invite = catchAsync(async (req, res) => {
  const body = req.body;
  const decodedUser = req.user as DecodedUser;
  const message = await FriendInvitationService.invite(body, decodedUser);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: message,
  });
});

const accept = catchAsync(async (req, res) => {
  const body = req.body;
  const message = await FriendInvitationService.accept(body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: message,
  });
});

const reject = catchAsync(async (req, res) => {
  const body = req.body;
  const decodedUser = req.user as DecodedUser;
  const message = await FriendInvitationService.reject(body, decodedUser);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: message,
  });
});

export const FriendInvitationController = {
  invite,
  accept,
  reject,
};
