import { mainApi } from "./index";

const friendInvitationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // invite invitation
    inviteInvitation: builder.mutation({
      query: (data) => ({
        url: "/friend-invitation/invite",
        method: "POST",
        body: data,
      }),
    }),
    // accept invitation
    acceptInvitation: builder.mutation({
      query: (data) => ({
        url: "/friend-invitation/accept",
        method: "POST",
        body: data,
      }),
    }),
    // reject invitation
    rejectInvitation: builder.mutation({
      query: (data) => ({
        url: "/friend-invitation/reject",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useInviteInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} = friendInvitationApi;
