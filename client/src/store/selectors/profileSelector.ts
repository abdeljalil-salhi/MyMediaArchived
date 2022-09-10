import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "../types";

const selectProfile = (state: IRootState) => state.profile;

export const makeSelectProfile = createSelector(
  selectProfile,
  (profile) => profile.data
);
