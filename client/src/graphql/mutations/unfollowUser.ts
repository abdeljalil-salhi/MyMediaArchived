import { gql } from "@apollo/client";

export const MUTATION_UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: String!, $userIdToUnfollow: String!) {
    unfollowUser(userId: $userId, userIdToUnfollow: $userIdToUnfollow) {
      errors {
        ...ErrorFragment
      }
      unfollowing {
        ...UserFragment
      }
      unfollowed {
        ...UserFragment
      }
    }
  }
`;
