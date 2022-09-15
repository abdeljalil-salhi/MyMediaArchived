import { createSlice } from "@reduxjs/toolkit";

import { profileInitialState } from "../initialStates";
import { IProfileAction, IProfileState } from "../types/profileTypes";

const initialState: IProfileState = profileInitialState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state: IProfileState, action: IProfileAction) => {
      state.data = action.payload;
    },
    clearProfile: (state: IProfileState) => {
      state.data = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
