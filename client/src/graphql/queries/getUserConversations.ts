import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";
import { FRAGMENT_CONVERSATION } from "../fragments/ConversationFragment";
import { FRAGMENT_MESSAGE } from "../fragments/MessageFragment";

export const QUERY_GET_USER_CONVERSATIONS = gql`
  query GetUserConversations($userId: String!, $limit: Int!, $cursor: String) {
    getUserConversations(userId: $userId, limit: $limit, cursor: $cursor) {
      errors {
        ...ErrorFragment
      }
      conversations {
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
      hasMore
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
  ${FRAGMENT_CONVERSATION}
  ${FRAGMENT_MESSAGE}
`;
