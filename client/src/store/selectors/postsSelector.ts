import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "../types";

const selectPosts = (state: IRootState) => state.posts;

export const makeSelectPosts = createSelector(
  selectPosts,
  (posts) => posts.data
);
