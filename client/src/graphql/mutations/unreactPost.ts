import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_POST } from "../fragments/PostFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_UNREACT_POST = gql`
  mutation UnreactPost($userId: String!, $postId: String!, $reactId: String!) {
    unreactPost(userId: $userId, postId: $postId, reactId: $reactId) {
      errors {
        field
        message
      }
      post {
        userObj {
          ...UserFragment
        }
        ...PostFragment
      }
    }
  }
  ${FRAGMENT_ERROR_RESPONSE}
  ${FRAGMENT_POST}
  ${FRAGMENT_USER}
`;
