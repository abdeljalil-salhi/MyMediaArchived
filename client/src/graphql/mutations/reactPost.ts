import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_POST } from "../fragments/PostFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_REACT_POST = gql`
  mutation ReactPost($userId: String!, $postId: String!, $react: Int!) {
    reactPost(userId: $userId, postId: $postId, input: { react: $react }) {
      errors {
        ...ErrorFragment
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
