import { gql } from "@apollo/client";

import { FRAGMENT_USER } from "../fragments/UserFragment";
import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";

export const QUERY_GET_FRIENDS = gql`
  query GetFriends($userId: String!) {
    getFriends(userId: $userId) {
      errors {
        ...ErrorFragment
      }
      user {
        _id
        username
        followingObj {
          ...UserFragment
        }
        closeObj {
          ...UserFragment
        }
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
`;
