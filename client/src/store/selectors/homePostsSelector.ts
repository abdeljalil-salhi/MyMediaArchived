import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "../types";

const selectHomePosts = (state: IRootState) => state.homePosts;

export const makeSelectHomePosts = createSelector(
  selectHomePosts,
  (homePosts) => homePosts.data
);
