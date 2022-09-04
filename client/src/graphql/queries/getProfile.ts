import { gql } from "@apollo/client";

import { FRAGMENT_USER } from "../fragments/UserFragment";
import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";

export const QUERY_GET_PROFILE = gql`
  query GetProfile($username: String!) {
    getProfile(username: $username) {
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
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_USER}
`;
