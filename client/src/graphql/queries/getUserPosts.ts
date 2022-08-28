import { gql } from "@apollo/client";

export const QUERY_GET_USER_POSTS = gql`
  query GetUserPosts($userId: String!, $limit: Int!, $cursor: String) {
    getUserPosts(userId: $userId, limit: $limit, cursor: $cursor) {
      errors {
        ...ErrorFragment
      }
      posts {
        userObj {
          ...UserFragment
        }
        ...PostFragment
      }
      hasMore
    }
  }
`;
