import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isFirstLogin: false,
  accessToken: "",
  username: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setFirstLogin(state, action) {
      state.isFirstLogin = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    signout(state) {
      state.ok = false;
      state.isLoggedIn = false;
      state.isFirstLogin = false;
      state.errorMessage = "";
      state.accessToken = "";
      state.username = "";
      state.role = [];
      state.isLoading = false;
      state.accessTokenExpired = false;
    },
  },
});

export const {
  setIsLoggedIn,
  setFirstLogin,
  setAccessToken,
  setUsername,
  setRole,
  signout,
} = userSlice.actions;

export default userSlice.reducer;
