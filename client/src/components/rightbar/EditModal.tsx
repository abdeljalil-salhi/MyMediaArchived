import { FC, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Close,
  FavoriteRounded,
  FireplaceRounded,
  HomeWorkRounded,
} from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { GEO } from "../../globals";
import { isEmpty } from "../../utils/isEmpty";
import { CustomSelect } from "../customs/customSelect/CustomSelect";
import { Backdrop } from "../backdrop/Backdrop";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  UpdateUserVariables,
  UpdateUser_updateUser,
} from "../../generated/types/UpdateUser";
import { AuthContext } from "../../context/auth.context";
import profileService from "../../store/services/profileService";
import { setProfile } from "../../store/slices/profileSlice";
import { TProfile } from "../../store/types/profileTypes";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
}

const stateSelector = createSelector(makeSelectProfile, (profile) => ({
  profile: profile?.user,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: TProfile) => dispatch(setProfile(profile)),
});

export const EditModal: FC<EditModalProps> = ({ open, onClose }) => {
  const [city, setCity] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");
  const [relationship, setRelationship] = useState<number>(0);
  const [localSuggestion, setLocalSuggestion] = useState({} as any);

  // The states below are used by the updateProfile() GraphQL mutation
  const [updateProfileLoading, setUpdateProfileLoading] =
    useState<boolean>(false);
  const [updateProfileError, setUpdateProfileError] = useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  // The selector to get state informations from the store (Redux)
  const { profile } = useAppSelector(stateSelector);

  // The dispatch function to update the profile state in the store (Redux)
  const { setProfile } = actionDispatch(useAppDispatch());

  // The relationship options to display in the custom select
  const customSelectOptions: string[] = [
    "Prefer not to say",
    "Single",
    "In a relationship",
    "Engaged",
    "Married",
    "In an open relationship",
    "Separated",
    "Divorced",
    "Widowed",
    "It's complicated",
  ];

  const handleSuggestion = () => {
    // Handle the suggested city and place it in the input
    setCity(localSuggestion.city);
  };

  const handleConfirm = async () => {
    if (profile) {
      // Start the updating process by turning the loading state to true
      setUpdateProfileLoading(true);
      // Prepare the variables to be sent in the GraphQL mutation
      const variables: UpdateUserVariables = {
        userId: user._id,
        accessToken: user.accessToken,
        city,
        hometown,
        relationship,
      };
      try {
        // Send the GraphQL updating request to the server
        const res: UpdateUser_updateUser = (await profileService
          .updateProfile(variables)
          .catch((_: unknown) =>
            setUpdateProfileError(true)
          )) as UpdateUser_updateUser;

        if (!isEmpty(res.user)) {
          // If the request was successful, update the user's profile data in the redux reducer
          setProfile(res);
          // Close the edit modal
          onClose();
        } else if (!isEmpty(res.errors)) {
          // Handle known errors and show them to the user
          setUpdateProfileError(true);
          // TODO: Show the errors to the user
          //
          // @example
          // setError(res.data.login.errors[0].message as string);
          // setErrorOpened(true);
        }
      } catch (_: unknown) {
        // Handle unknown errors and show them to the user
        setUpdateProfileError(true);
      }
      // End the updating process by turning the loading state to false
      setUpdateProfileLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (profile) {
        // Set the profile informations to the edit modal inputs as initial state
        setCity(profile.city);
        setHometown(profile.hometown);
        setRelationship(profile.relationship);
      }
      // Handle suggested city if found in the localStorage
      if (!isEmpty(localStorage.getItem(GEO)))
        setLocalSuggestion(JSON.parse(localStorage.getItem(GEO) as string));
    } catch (_: unknown) {}
  }, [profile]);

  if (!open) return null;

  return createPortal(
    <>
      <Backdrop onClick={onClose}>
        <div className="editModal" onClick={(e: any) => e.stopPropagation()}>
          <div className="editModalHeader">
            <div></div>
            <h2>Edit Informations</h2>
            <span onClick={onClose}>
              <Close />
            </span>
          </div>
          <div className="editModalBody">
            <div className="editModalBodyElement">
              <span className="editModalBodyHeader">
                <HomeWorkRounded />
                City
              </span>
              <input
                className="editModalBodyInput"
                type="text"
                placeholder="Where are you living?"
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
              />
              <span className="editModalBodySuggests">
                Suggestions:{" "}
                <span
                  className="editModalBodySuggestsName"
                  onClick={handleSuggestion}
                >
                  {localSuggestion.city}
                </span>
              </span>
            </div>
            <div className="editModalBodyElement">
              <span className="editModalBodyHeader">
                <FireplaceRounded />
                Hometown
              </span>
              <input
                className="editModalBodyInput"
                type="text"
                placeholder="Where are you from?"
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
              />
            </div>
            <div className="editModalBodyElement editModalBodyRelationship">
              <span className="editModalBodyHeader editModalBodyHeaderRelationship">
                <FavoriteRounded />
                Relationship
              </span>
              <CustomSelect
                optionsList={customSelectOptions}
                customState={relationship}
                setCustomState={setRelationship}
              />
            </div>
          </div>
          <div className="editModalFooter">
            <button disabled={updateProfileLoading} onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal") as Element
  );
};
