import jwtDecode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { socket } from "@/socket/mainNsp";

const initialState = {
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("a-chat-app", state.token);
    },
    logout: (state) => {
      state.token = null;
      localStorage.clear();
      socket.disconnect();
    },
    setUserDetails: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("a-chat-app-user", JSON.stringify(action.payload));
    },
  },
});

// all selector
export const getToken = (state) => state.auth.token;
export const getDecodedToken = (state) => jwtDecode(state.auth.token);
// usage: const token = useSelector(getToken);

export const { setToken, logout, setUserDetails } = authSlice.actions;
// usage:
// const dispatch = useDispatch();
// dispatch(login({ token: response.data.data }));

export default authSlice.reducer;
