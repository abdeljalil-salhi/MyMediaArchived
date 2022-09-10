import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_POST_ARCHIVE } from "../fragments/PostArchiveFragment";

export const MUTATION_DELETE_POST = gql`
  mutation DeletePost($userId: String!, $postId: String!) {
    deletePost(userId: $userId, postId: $postId) {
      errors {
        ...ErrorFragment
      }
      info
      deleted {
        ...PostArchiveFragment
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_POST_ARCHIVE}
`;
