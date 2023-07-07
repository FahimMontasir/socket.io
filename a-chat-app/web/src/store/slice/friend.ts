import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setPendingFriendsInvitations: (state, action) => {
      state.pendingFriendsInvitations = action.payload;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setPendingFriendsInvitations, setFriends, setOnlineUsers } =
  friendSlice.actions;

export default friendSlice.reducer;
