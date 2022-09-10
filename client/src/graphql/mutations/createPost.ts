import { gql } from "@apollo/client";

import { FRAGMENT_ERROR_RESPONSE } from "../fragments/ErrorFragment";
import { FRAGMENT_USER } from "../fragments/UserFragment";

export const MUTATION_CREATE_POST = gql`
  mutation CreatePost(
    $user: String!
    $text: String
    $link: String
    $ytvideo: String
    $location: String
    $isMedia: Boolean!
    $file: Upload
  ) {
    createPost(
      input: {
        user: $user
        text: $text
        link: $link
        ytvideo: $ytvideo
        location: $location
      }
      isMedia: $isMedia
      file: $file
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
  ${FRAGMENT_USER}
`;
