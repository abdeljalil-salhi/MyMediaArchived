import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_UPDATE_TAGS = gql`
  mutation UpdateTags($userId: String!, $tags: [String!]!) {
    updateTags(input: { userId: $userId, tags: $tags }) {
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
