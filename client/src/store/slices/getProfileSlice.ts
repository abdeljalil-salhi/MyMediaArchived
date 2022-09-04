import { createSlice } from "@reduxjs/toolkit";

import { IGetProfileState } from "../types/getProfileTypes";

const initialState: IGetProfileState = {
  profile: null,
};

const getProfileSlice = createSlice({
  name: "getProfile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { getProfile } = getProfileSlice.actions;

export default getProfileSlice.reducer;
