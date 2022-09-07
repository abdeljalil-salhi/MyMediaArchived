import { createSlice } from "@reduxjs/toolkit";

import { IProfileAction, IProfileState } from "../types/profileTypes";

const initialState: IProfileState = null;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state: IProfileState, action: IProfileAction) => {
      state = action.payload;
    },
  },
});

export const { getProfile } = profileSlice.actions;

export default profileSlice.reducer;
