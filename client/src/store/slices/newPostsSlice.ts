import { createSlice } from "@reduxjs/toolkit";

import { newPostsInitialState } from "../initialStates";
import { PaginatedPosts } from "../typenames";
import {
  IAddNewPostAction,
  IDeleteNewPostAction,
  INewPostsState,
} from "../types/newPostsTypes";

const initialState: INewPostsState = newPostsInitialState;

const newPostsSlice = createSlice({
  name: "newPosts",
  initialState,
  reducers: {
    addNewPost: (state: INewPostsState, action: IAddNewPostAction) => {
      state.data = {
        __typename: PaginatedPosts,
        errors: action.payload.errors,
        posts: [action.payload.post!, ...state.data!.posts!],
        hasMore: state.data!.hasMore!,
      };
    },
    deleteNewPost: (state: INewPostsState, action: IDeleteNewPostAction) => {
      state.data.posts = state.data.posts!.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});

export const { addNewPost, deleteNewPost } = newPostsSlice.actions;

export default newPostsSlice.reducer;
