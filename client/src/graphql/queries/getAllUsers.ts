import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const QUERY_GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      errors {
        ...ErrorFragment
      }
      users {
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
