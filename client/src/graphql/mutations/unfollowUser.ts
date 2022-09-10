import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: String!, $userIdToUnfollow: String!) {
    unfollowUser(userId: $userId, userIdToUnfollow: $userIdToUnfollow) {
      errors {
        ...ErrorFragment
      }
      unfollowing {
        ...UserFragment
      }
      unfollowed {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
`;
