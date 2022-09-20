import { createSlice } from "@reduxjs/toolkit";

import { profileInitialState } from "../initialStates";
import { ISetProfileAction, IProfileState } from "../types/profileTypes";

const initialState: IProfileState = profileInitialState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state: IProfileState, action: ISetProfileAction) => {
      state.data = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
