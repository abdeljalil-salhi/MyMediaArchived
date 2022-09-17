import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "../types";

const selectNewPosts = (state: IRootState) => state.newPosts;

export const makeSelectNewPosts = createSelector(
  selectNewPosts,
  (newPosts) => newPosts.data
);
