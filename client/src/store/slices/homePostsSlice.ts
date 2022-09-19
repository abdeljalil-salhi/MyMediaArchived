import { createSlice } from "@reduxjs/toolkit";

import { homePostsInitialState } from "../initialStates";
import {
  ISetHomePostsAction,
  IHomePostsState,
  IDeleteHomePostAction,
} from "../types/homePostsTypes";

const initialState: IHomePostsState = homePostsInitialState;

const homePostsSlice = createSlice({
  name: "homePosts",
  initialState,
  reducers: {
    setHomePosts: (state: IHomePostsState, action: ISetHomePostsAction) => {
      state.data = action.payload;
    },
    deleteHomePost: (state: IHomePostsState, action: IDeleteHomePostAction) => {
      state.data.posts = state.data.posts!.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});

export const { setHomePosts, deleteHomePost } = homePostsSlice.actions;

export default homePostsSlice.reducer;
