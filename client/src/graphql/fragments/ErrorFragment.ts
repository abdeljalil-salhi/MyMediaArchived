import { gql } from "@apollo/client";

export const FRAGMENT_ERROR_RESPONSE = gql`
  fragment ErrorFragment on ErrorResponse {
    field
    message
  }
`;
