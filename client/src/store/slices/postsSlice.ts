import { createSlice } from "@reduxjs/toolkit";

import {
  postsInitialState,
  homePostsInitialState,
  profilePostsInitialState,
} from "../initialStates";
import {
  IAddDeletedPostAction,
  IAddNewPostAction,
  IAddUpdatedPostAction,
  IPostsState,
  ISetHomePostsAction,
  ISetProfilePostsAction,
} from "../types/postsTypes";
import { UpdatePost_updatePost_post } from "../../generated/types/UpdatePost";

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
    addUpdatedPost: (state: IPostsState, action: IAddUpdatedPostAction) => {
      // Check if post is alreay in updatedPosts, if so, replace it, else add it
      const updatedPost = action.payload.post;
      const alreadyUpdatedPosts = state.data.updatedPosts.posts;
      const updatedPostIndex = alreadyUpdatedPosts?.findIndex(
        (post: UpdatePost_updatePost_post | null) =>
          post?._id === updatedPost?._id
      );
      if (updatedPostIndex !== undefined && updatedPostIndex !== -1)
        alreadyUpdatedPosts![updatedPostIndex] = updatedPost;
      else
        state.data.updatedPosts.posts = [
          updatedPost,
          ...state.data.updatedPosts.posts!,
        ];
    },
  },
});

export const {
  addNewPost,
  addDeletedPost,
  addUpdatedPost,
  setHomePosts,
  clearHomePosts,
  setProfilePosts,
  clearProfilePosts,
} = postsSlice.actions;

export default postsSlice.reducer;
