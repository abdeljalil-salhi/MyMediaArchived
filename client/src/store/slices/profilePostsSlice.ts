import { createSlice } from "@reduxjs/toolkit";

import { profilePostsInitialState } from "../initialStates";
import {
  IProfilePostsAction,
  IProfilePostsState,
} from "../types/profilePostsTypes";

const initialState: IProfilePostsState = profilePostsInitialState;

const profilePostsSlice = createSlice({
  name: "profilePosts",
  initialState,
  reducers: {
    setProfilePosts: (
      state: IProfilePostsState,
      action: IProfilePostsAction
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setProfilePosts } = profilePostsSlice.actions;

export default profilePostsSlice.reducer;
