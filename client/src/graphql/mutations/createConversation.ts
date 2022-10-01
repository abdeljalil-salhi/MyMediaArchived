import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";
import { FRAGMENT_CONVERSATION } from "../fragments/ConversationFragment";

export const MUTATION_CREATE_CONVERSATION = gql`
  mutation CreateConversation($sender: String!, $receiver: String!) {
    createConversation(input: { sender: $sender, receiver: $receiver }) {
      errors {
        ...ErrorFragment
      }
      conversation {
        ...ConversationFragment
        ownerObj {
          ...UserFragment
        }
        membersObj {
          ...UserFragment
        }
        lastMessageObj {
          ...MessageFragment
        }
        lastSenderObj {
          ...UserFragment
        }
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
  ${FRAGMENT_CONVERSATION}
`;
