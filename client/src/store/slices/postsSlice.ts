import { createSlice } from "@reduxjs/toolkit";

import {
  postsInitialState,
  homePostsInitialState,
  profilePostsInitialState,
} from "../initialStates";
import {
  IAddDeletedPostAction,
  IAddNewPostAction,
  IPostsState,
  ISetHomePostsAction,
  ISetProfilePostsAction,
} from "../types/postsTypes";

const initialState: IPostsState = postsInitialState;

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setHomePosts: (state: IPostsState, action: ISetHomePostsAction) => {
      state.data.homePosts = action.payload;
    },
    clearHomePosts: (state: IPostsState) => {
      state.data.homePosts = homePostsInitialState;
    },
    setProfilePosts: (state: IPostsState, action: ISetProfilePostsAction) => {
      state.data.profilePosts = action.payload;
    },
    clearProfilePosts: (state: IPostsState) => {
      state.data.profilePosts = profilePostsInitialState;
    },
    addNewPost: (state: IPostsState, action: IAddNewPostAction) => {
      if (action.payload.post)
        state.data.newPosts.posts = [
          action.payload.post,
          ...state.data.newPosts.posts!,
        ];
    },
    addDeletedPost: (state: IPostsState, action: IAddDeletedPostAction) => {
      state.data.deletedPosts.posts = [
        action.payload.deleted,
        ...state.data.deletedPosts.posts!,
      ];
    },
  },
});

export const {
  addNewPost,
  addDeletedPost,
  setHomePosts,
  clearHomePosts,
  setProfilePosts,
  clearProfilePosts,
} = postsSlice.actions;

export default postsSlice.reducer;
