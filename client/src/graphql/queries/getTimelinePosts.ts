import { gql } from "@apollo/client";

export const QUERY_GET_TIMELINE_POSTS = gql`
  query GetTimelinePosts($userId: String!, $limit: Int!, $cursor: String) {
    getTimelinePosts(userId: $userId, limit: $limit, cursor: $cursor) {
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
