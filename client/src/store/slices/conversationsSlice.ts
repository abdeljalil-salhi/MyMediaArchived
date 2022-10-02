import { createSlice } from "@reduxjs/toolkit";

import { conversationsInitialState } from "../initialStates";
import {
  IConversationsState,
  ISetAllConversationsAction,
  ISetCurrentConversationsAction,
} from "../types/conversationsTypes";

const initialState: IConversationsState = conversationsInitialState;

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setAllConversations: (
      state: IConversationsState,
      action: ISetAllConversationsAction
    ) => {
      state.data.allConversations = action.payload;
    },
    setCurrentConversation: (
      state: IConversationsState,
      action: ISetCurrentConversationsAction
    ) => {
      state.data.currentConversation = action.payload;
    },
  },
});

export const { setAllConversations, setCurrentConversation } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
