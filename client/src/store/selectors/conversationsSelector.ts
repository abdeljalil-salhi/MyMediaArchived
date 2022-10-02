import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "../types";

const selectConversations = (state: IRootState) => state.conversations;

export const makeSelectConversations = createSelector(
  selectConversations,
  (conversations) => conversations.data
);
