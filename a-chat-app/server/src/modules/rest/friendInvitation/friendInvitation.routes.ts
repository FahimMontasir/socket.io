import express from 'express';
import validateRequest from '../../../middlewares/rest/validateRequest';
import { FriendInvitationController } from './friendInvitation.controller';
import { FriendInvitationValidation } from './friendInvitation.validation';
import { verifyToken } from '../../../middlewares/rest/auth';

const router = express.Router();

router.post(
  '/invite',
  verifyToken,
  validateRequest(FriendInvitationValidation.inviteZodSchema),
  FriendInvitationController.invite
);

router.post(
  '/accept',
  verifyToken,
  validateRequest(FriendInvitationValidation.acceptOrRejectZodSchema),
  FriendInvitationController.accept
);

router.post(
  '/reject',
  verifyToken,
  validateRequest(FriendInvitationValidation.acceptOrRejectZodSchema),
  FriendInvitationController.reject
);

export const FriendInvitationRoutes = router;
