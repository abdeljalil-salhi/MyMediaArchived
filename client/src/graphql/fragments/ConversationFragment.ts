import { gql } from "@apollo/client";

export const FRAGMENT_CONVERSATION = gql`
  fragment ConversationFragment on Conversation {
    _id
    owner
    members
    lastMessage
    lastSender
    timestamp
    createdAt
    updatedAt
  }
`;
