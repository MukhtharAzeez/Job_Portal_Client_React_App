import { SignalCellularNull } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserDetails {
  userName: string | null;
  email: string | null;
  userId: string | null;
  userToken: string | null;
  image: string;
}

const initialState: UserDetails = {
  userName: null,
  email: null,
  userId: null,
  userToken: null,
  image: '',
};

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails(state, actions) {
      const newItem = actions.payload;
      state.userName = newItem.result.firstName + " " + newItem.result.lastName;
      state.userId = newItem.result._id;
      state.email = newItem.result.email;
      state.image = newItem.result.image
      state.userToken = newItem.accessToken.access_token;
    },
    logoutUser(state) {
      state.userName = null
      state.userId = null
      state.email = null
      state.image = ''
      state.userToken = null
    },
  },
});

export const { addUserDetails, logoutUser } = userAuthSlice.actions;
export const currentUser = (state: RootState) => state.user;
export default userAuthSlice;

