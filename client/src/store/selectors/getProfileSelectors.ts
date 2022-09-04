import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "../types";

const selectGetProfile = (state: IRootState) => state.getProfile;

export const makeSelectGetProfileData = createSelector(
  selectGetProfile,
  (getProfile) => getProfile.profile
);
