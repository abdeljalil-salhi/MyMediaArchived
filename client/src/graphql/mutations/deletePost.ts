import { gql } from "@apollo/client";

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
`;
