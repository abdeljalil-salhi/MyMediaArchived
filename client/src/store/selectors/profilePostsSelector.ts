import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "../types";

const selectProfilePosts = (state: IRootState) => state.profilePosts;

export const makeSelectProfilePosts = createSelector(
  selectProfilePosts,
  (profilePosts) => profilePosts.data
);
