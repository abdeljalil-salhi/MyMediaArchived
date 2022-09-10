import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_POST } from "../fragments/PostFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const QUERY_GET_USER_POSTS = gql`
  query GetUserPosts($userId: String!, $limit: Int!, $cursor: String) {
    getUserPosts(userId: $userId, limit: $limit, cursor: $cursor) {
      errors {
        ...ErrorFragment
      }
      posts {
        userObj {
          ...UserFragment
        }
        ...PostFragment
      }
      hasMore
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
  ${FRAGMENT_POST}
`;
