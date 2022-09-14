import { createSlice } from "@reduxjs/toolkit";

import { IPostsAction, IPostsState } from "../types/postsTypes";

const initialState: IPostsState = {
  data: {
    __typename: "PaginatedPostsResponse",
    errors: [],
    posts: [],
    hasMore: true,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state: IPostsState, action: IPostsAction) => {
      state.data = action.payload;
    },
    fetchMore: (state: IPostsState, action: IPostsAction) => {
      if (action.payload.errors)
        state.data!.errors!.push(...action.payload.errors);
      else state.data!.posts!.push(...action.payload.posts!);
      state.data!.hasMore = action.payload.hasMore;
    },
    clearPosts: (state: IPostsState) => {
      state.data = null;
    },
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
