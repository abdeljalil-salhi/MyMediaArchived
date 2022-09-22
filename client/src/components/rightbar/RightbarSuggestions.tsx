import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PU, TRANSPARENT } from "../../globals";
import { useGetSuggestionsQuery } from "../../generated/graphql";
import { AuthContext } from "../../context/auth.context";
import { FollowHandler } from "../followHandler/FollowHandler";

interface RightbarSuggestionsProps {
  profile: any;
}

export const RightbarSuggestions: FC<RightbarSuggestionsProps> = ({
  profile,
}) => {
  // the RightbarSuggestions component is used to display the suggestions for the rightbar
  //
  // Notes:
  // - The suggestions are displayed as users that the current logged in user does not follow

  const [suggestions, setSuggestions] = useState<any>([]);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  /*
   * @example
   * const { data, loading, error } = useGetSuggestionsQuery({
   *   variables: {
   *   },
   * });
   */
  const { data, loading, error } = useGetSuggestionsQuery();

  useEffect(() => {
    // Put in the suggestions state only the users that are not followed
    let filteredSuggestions: any[] = [];
    if (data && data.getSuggestions && data.getSuggestions.users && profile)
      data.getSuggestions.users.forEach((s: any) => {
        if (
          !profile.followingObj!.some(
            (f: any) => f._id === s._id && f.username === s.username
          ) &&
          s._id !== user._id
        )
          if (filteredSuggestions.length < 3) filteredSuggestions.push(s);
      });
    setSuggestions(filteredSuggestions);
  }, [data, profile, user]);

  // If there is no suggestions, hide the component
  if (!loading && !suggestions) return null;

  return (
    <div className="c-rightbar__suggestions">
      <h4 className="c-rightbar__suggestions-title">Suggestions</h4>
      <div className="c-rightbar__suggestions-body">
        {loading ? (
          <div className="skeleton skeleton-text"></div>
        ) : error ? (
          <div className="c-rightbar__suggestions-error">{error.message}</div>
        ) : (
          suggestions.map((u: any, index: number) => (
            <div className="c-rightbar__suggestions-element" key={index}>
              <Link to={u ? `/u/${u.username}` : ""} draggable={false}>
                <div className="c-rightbar__suggestions-element-profile">
                  <img
                    src={u.profile ? `${PU}${u.profile}` : TRANSPARENT}
                    alt={u.username && u.username}
                    className="c-rightbar__suggestions-element-image avatar skeleton"
                  />
                  <span className="c-rightbar__suggestions-element-name noneStyle">
                    {u.fullName ? (
                      u.fullName
                    ) : (
                      <div className="skeleton skeleton-text"></div>
                    )}
                  </span>
                </div>
              </Link>
              <FollowHandler idToFollow={u._id} type={"rightbarSuggestions"} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
