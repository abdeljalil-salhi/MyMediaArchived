import {
  GetUserConversations,
  GetUserConversations_getUserConversations,
  GetUserConversations_getUserConversations_conversations,
} from "../../generated/types/GetUserConversations";

// Type of the action that will be dispatched to the reducer
export type TConversations = GetUserConversations_getUserConversations;
export type TAllConversations = GetUserConversations_getUserConversations;
export type TCurrentConversation =
  GetUserConversations_getUserConversations_conversations;

// Global component type
export type TConversation =
  GetUserConversations_getUserConversations_conversations;

// Interface of the conversations state in the store
export interface IConversationsState {
  data: {
    allConversations: GetUserConversations["getUserConversations"];
    currentConversation: GetUserConversations_getUserConversations_conversations | null;
  };
}

// Interfaces for the conversations actions
export interface ISetAllConversationsAction {
  type: string;
  payload: TAllConversations;
}
export interface ISetCurrentConversationsAction {
  type: string;
  payload: TCurrentConversation;
}
