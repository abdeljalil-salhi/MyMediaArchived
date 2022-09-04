import { client } from "../..";
import {
  GetProfile,
  GetProfileVariables,
} from "../../generated/types/GetProfile";
import { QUERY_GET_PROFILE } from "../../graphql/queries/getProfile";
import { isEmpty } from "../../utils/isEmpty";

class getProfileService {
  async getProfile(
    username: GetProfileVariables["username"]
  ): Promise<GetProfile["getProfile"]> {
    try {
      const res = await client.query({
        query: QUERY_GET_PROFILE,
        variables: { username },
      });

      if (isEmpty(res) || isEmpty(res.data)) throw new Error("No data");

      return res.data.getProfile;
    } catch (err: unknown) {
      throw new Error("Error in getProfileService.getProfile: " + err);
    }
  }
}

export default new getProfileService();
