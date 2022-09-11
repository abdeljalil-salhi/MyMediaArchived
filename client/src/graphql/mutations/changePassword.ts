import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $token: String!
    $userId: String!
    $newPassword: String!
  ) {
    changePassword(token: $token, userId: $userId, newPassword: $newPassword) {
      errors {
        ...ErrorFragment
      }
      user {
        ...UserFragment
        followersObj {
          ...UserFragment
        }
        followingObj {
          ...UserFragment
        }
        closeObj {
          ...UserFragment
        }
        likes
        saved
        highlights
        accessToken
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
`;
