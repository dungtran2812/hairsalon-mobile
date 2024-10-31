import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isFirstLogin: false,
  accessToken: "",
  username: "",
  name: "",
  phoneNumber: "",
  role: "",
  accessTokenExpired: false
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
    setName(state, action) {
      state.name = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAccessTokenExpired(state, action) {
      state.accessToken = action.payload;
    },
    signout(state) {
      state.isLoggedIn = false;
      state.isFirstLogin = false;
      state.accessToken = "";
      state.username = "";
      state.role = [];
    },
  },
});

export const {
  setIsLoggedIn,
  setFirstLogin,
  setAccessToken,
  setUsername,
  setPhoneNumber,
  setRole,
  signout,
  setAccessTokenExpired,
  setName
} = userSlice.actions;

export default userSlice.reducer;
