import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_LOGIN = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
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
