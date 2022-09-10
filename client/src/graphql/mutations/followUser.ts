import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_FOLLOW_USER = gql`
  mutation FollowUser($userId: String!, $userIdToFollow: String!) {
    followUser(userId: $userId, userIdToFollow: $userIdToFollow) {
      errors {
        ...ErrorFragment
      }
      following {
        ...UserFragment
      }
      followed {
        ...UserFragment
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
`;
