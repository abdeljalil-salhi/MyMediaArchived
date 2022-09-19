import { createSlice } from "@reduxjs/toolkit";

import { profilePostsInitialState } from "../initialStates";
import {
  ISetProfilePostsAction,
  IProfilePostsState,
  IDeleteProfilePostAction,
} from "../types/profilePostsTypes";

const initialState: IProfilePostsState = profilePostsInitialState;

const profilePostsSlice = createSlice({
  name: "profilePosts",
  initialState,
  reducers: {
    setProfilePosts: (
      state: IProfilePostsState,
      action: ISetProfilePostsAction
    ) => {
      state.data = action.payload;
    },
    deleteProfilePost: (
      state: IProfilePostsState,
      action: IDeleteProfilePostAction
    ) => {
      state.data.posts = state.data.posts!.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});

export const { setProfilePosts, deleteProfilePost } = profilePostsSlice.actions;

export default profilePostsSlice.reducer;
