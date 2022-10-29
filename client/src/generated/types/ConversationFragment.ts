/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConversationFragment
// ====================================================

export interface ConversationFragment {
  __typename: "Conversation";
  _id: string;
  owner: string;
  members: string[];
  lastMessage: string | null;
  lastSender: string;
  timestamp: number;
  createdAt: any;
  updatedAt: any;
}
