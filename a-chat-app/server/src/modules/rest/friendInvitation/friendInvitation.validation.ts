import { z } from 'zod';

const inviteZodSchema = z.object({
  body: z.object({
    targetMailAddress: z.string({ required_error: 'target mail address is required' }).email(),
  }),
});

const acceptOrRejectZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
  }),
});

export const FriendInvitationValidation = {
  inviteZodSchema,
  acceptOrRejectZodSchema,
};
