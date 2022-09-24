import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_POST } from "../fragments/PostFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_UPDATE_POST = gql`
  mutation UpdatePost(
    $postId: String!
    $userId: String!
    $text: String
    $link: String
    $ytvideo: String
    $location: String
  ) {
    updatePost(
      userId: $userId
      postId: $postId
      input: {
        text: $text
        link: $link
        ytvideo: $ytvideo
        location: $location
      }
    ) {
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
