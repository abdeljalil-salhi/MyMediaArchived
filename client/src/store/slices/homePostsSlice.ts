import { createSlice } from "@reduxjs/toolkit";

import { homePostsInitialState } from "../initialStates";
import { IHomePostsAction, IHomePostsState } from "../types/homePostsTypes";

const initialState: IHomePostsState = homePostsInitialState;

const homePostsSlice = createSlice({
  name: "homePosts",
  initialState,
  reducers: {
    setHomePosts: (state: IHomePostsState, action: IHomePostsAction) => {
      state.data = action.payload;
    },
  },
});

export const { setHomePosts } = homePostsSlice.actions;

export default homePostsSlice.reducer;
