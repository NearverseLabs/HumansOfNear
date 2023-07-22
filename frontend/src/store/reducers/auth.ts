import { createSlice } from '@reduxjs/toolkit';
import { UserType, initialStateType } from "types";

const initialUser: UserType = {
  _id: "",
  accountId: "",
  avatar: "",
  name: "",
  social: "",
  twitter: "",
};

const initialState: initialStateType = {
  token: "",
  user: initialUser,
  dialog: "",
  isLoggedIn: false,
  loading: false,
  signinState: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    showDialog(state, action) {
      state.dialog = action.payload;
      state.loading = false;
    },

    setAccount(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.loading = false;
      state.signinState = false;
    },

    setSignin(state, action) {
      state.signinState = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    changeUser(state, action) {
      state.user = action.payload;
    },

    removeAccount(state) {
      state.token = "";
      state.user = initialUser;
      state.isLoggedIn = false;
    }
  }
});

export default auth.reducer;

export const { showDialog, setAccount, setLoading, setSignin, changeUser, removeAccount } = auth.actions;
