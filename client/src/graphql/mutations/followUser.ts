import { gql } from "@apollo/client";

export const MUTATION_FOLLOW_USER = gql`
  mutation FollowUser($userId: String!, $userIdToFollow: String!) {
    followUser(userId: $userId, userIdToFollow: $userIdToFollow) {
      errors {
        ...ErrorFragment
      }
      following {
        ...UserFragment
      }
      followed {
        ...UserFragment
      }
    }
  }
`;
