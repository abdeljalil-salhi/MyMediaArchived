import { createSlice } from "@reduxjs/toolkit";

import { newPostsInitialState } from "../initialStates";
import { PaginatedPosts } from "../typenames";
import { IAddNewPostAction, INewPostsState } from "../types/newPostsTypes";

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
  },
});

export const { addNewPost } = newPostsSlice.actions;

export default newPostsSlice.reducer;
