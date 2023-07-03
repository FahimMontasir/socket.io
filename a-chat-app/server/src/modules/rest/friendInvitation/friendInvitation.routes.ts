import express from 'express';
import validateRequest from '../../../middlewares/rest/validateRequest';
import { FriendInvitationController } from './friendInvitation.controller';
import { FriendInvitationValidation } from './friendInvitation.validation';

const router = express.Router();

router.post(
  '/invite',
  validateRequest(FriendInvitationValidation.inviteZodSchema),
  FriendInvitationController.invite
);

router.post(
  '/accept',
  validateRequest(FriendInvitationValidation.acceptOrRejectZodSchema),
  FriendInvitationController.accept
);

router.post(
  '/reject',
  validateRequest(FriendInvitationValidation.acceptOrRejectZodSchema),
  FriendInvitationController.reject
);

export const FriendInvitationRoutes = router;
