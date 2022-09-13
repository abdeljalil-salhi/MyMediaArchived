import {
  FC,
  KeyboardEvent as KeyboardEventReact,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  Close,
  FavoriteRounded,
  FireplaceRounded,
  HomeWorkRounded,
  TagRounded,
} from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { GEO, GEO_API, GPS } from "../../globals";
import { isEmpty } from "../../utils/isEmpty";
import { CustomSelect } from "../customs/customSelect/CustomSelect";
import { Backdrop } from "../backdrop/Backdrop";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  UpdateUserVariables,
  UpdateUser_updateUser,
} from "../../generated/types/UpdateUser";
import {
  UpdateTagsVariables,
  UpdateTags_updateTags,
} from "../../generated/types/UpdateTags";
import { AuthContext } from "../../context/auth.context";
import profileService from "../../store/services/profileService";
import { setProfile } from "../../store/slices/profileSlice";
import { TProfile } from "../../store/types/profileTypes";
import { CustomTagEditor } from "../customs/customTagEditor/CustomTagEditor";
import { updateLocalStorage } from "../../utils/localStorage";
import { ILocalStorageGPS } from "../../utils/interfaces/IGPS";

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
  // The EditModal component is responsible of showing the profile updating options on a modal
  //
  // Props:
  // open: whether the modal is open
  // onClose: the function to close the modal
  //
  // Notes:
  // - The modal is displayed when the user clicks the edit button
  // - The modal is closed when the user clicks the close button or the backdrop or presses Esc key
  // - The modal is closed when the user clicks the Confirm button and saves the informations to the profile state

  const [city, setCity] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");
  const [relationship, setRelationship] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [GpsSupported, setGpsSupported] = useState<boolean>(false);
  const [localSuggestion, setLocalSuggestion] = useState({} as any);

  // The states below are used by the updateProfile() GraphQL mutation
  const [updateProfileLoading, setUpdateProfileLoading] =
    useState<boolean>(false);
  const [updateProfileError, setUpdateProfileError] = useState<boolean>(false);
  // The states below are used by the updateProfile() GraphQL mutation
  const [updateTagsLoading, setUpdateTagsLoading] = useState<boolean>(false);
  const [updateTagsError, setUpdateTagsError] = useState<boolean>(false);
  // The states below are used by the handleGPS() function
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<boolean>(false);
  const [gpsErrorText, setGpsErrorText] = useState<string>("");

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

  const handleGPS = () => {
    // Recheck if the browser supports the geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGpsSuccess, onGpsError);
    } else {
      setGpsError(true);
      setGpsErrorText("Your browser does not support the Geolocation API.");
    }
  };

  const onGpsSuccess: PositionCallback = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    // Start the updating process by turning the loading state to true
    setGpsLoading(true);
    try {
      fetch(`${GEO_API}&q=${encodeURIComponent(latitude + "," + longitude)}`)
        .then((res: Response) => res.json())
        .then((result: any) => {
          if (result.status.code === 200) {
            // If the request is successful, get the location data
            const components: any = result.results[0].components;
            const annotations: any = result.results[0].annotations;
            const currency: any = annotations.currency;

            // Format the received data to store it into the local storage
            const formattedLocation: ILocalStorageGPS = {
              components: {
                continent: components.continent,
                country: components.country,
                country_code: components.country_code,
                county: components.county,
                postcode: components.postcode,
                region: components.region,
                city: components.state_district,
              },
              annotations: {
                DMS: annotations.DMS,
                callingCode: annotations.callingcode,
                currency: {
                  iso_code: currency.iso_code,
                  name: currency.name,
                  subunit: currency.subunit,
                  subunit_to_unit: currency.subunit_to_unit,
                  symbol: currency.symbol,
                },
                flag: annotations.flag,
                qibla: annotations.qibla,
                sun: annotations.sun,
              },
            };

            // Store the formatted data in local storage
            updateLocalStorage(GPS, formattedLocation);

            // Place the location data in the localSuggestion state
            setLocalSuggestion(formattedLocation.components);
          } else if (result.status.code <= 500) {
            // If the API is unable to retrieve the data, it will return a 400 or 500 errors
            setGpsError(true);
            setGpsErrorText("Our server is unable to geocode your location.");
          } else {
            // Handle any other unknown error codes
            setGpsError(true);
            setGpsErrorText("Something went wrong. Please try again later.");
          }
        });
    } catch (_: unknown) {
      // Handle any other unknown errors
      setGpsError(true);
      setGpsErrorText("Something went wrong. Please try again later.");
    }
    // End the updating process by turning the loading state to false
    setGpsLoading(false);
  };

  // Handle geolocation errors
  const onGpsError: PositionErrorCallback = (
    error: GeolocationPositionError
  ) => {
    if (error.code === 1) {
      // If the user denied the Geolocation API permission
      setGpsError(true);
      setGpsErrorText("You denied the location permission.");
    } else if (error.code === 2) {
      // If the user's location is not available
      setGpsError(true);
      setGpsErrorText("Your location is not recognized by our server.");
    } else {
      // Handle any other unknown error codes
      setGpsError(true);
      setGpsErrorText("Something went wrong. Please try again later.");
    }
  };

  const handleConfirm = async () => {
    if (profile) {
      // Start the updating process by turning the loading state to true
      setUpdateProfileLoading(true);
      try {
        if (tags !== profile.tags) {
          // Start the updating process by turning the loading state to true
          setUpdateTagsLoading(true);
          try {
            // Prepare the variables to be sent in the GraphQL mutation
            const variables: UpdateTagsVariables = {
              userId: user._id,
              tags,
            };
            // Send the GraphQL updating request to the server
            const res: UpdateTags_updateTags = (await profileService
              .updateTags(variables, user.accessToken)
              .catch((_: unknown) =>
                setUpdateTagsError(true)
              )) as UpdateTags_updateTags;

            if (!isEmpty(res.user)) {
              // If the request was successful, update the user's profile data in the redux reducer
              setProfile(res);
            } else if (!isEmpty(res.errors)) {
              // Handle known errors and show them to the user
              setUpdateProfileError(true);
              // TODO: Show the errors to the user
              //
              // @example
              // setError(res.data.updateTags.errors[0].message as string);
              // setErrorOpened(true);
            }
          } catch (_: unknown) {
            // Handle unknown errors and show them to the user
            setUpdateTagsError(true);
          }
          // End the updating process by turning the loading state to false
          setUpdateTagsLoading(false);
        }
        if (
          city !== profile.city ||
          hometown !== profile.hometown ||
          relationship !== profile.relationship
        ) {
          // Prepare the variables to be sent in the GraphQL mutation
          const variables: UpdateUserVariables = {
            userId: user._id,
            accessToken: user.accessToken,
            city,
            hometown,
            relationship,
          };
          // Send the GraphQL updating request to the server
          const res: UpdateUser_updateUser = (await profileService
            .updateProfile(variables)
            .catch((_: unknown) =>
              setUpdateProfileError(true)
            )) as UpdateUser_updateUser;

          if (!isEmpty(res.user)) {
            // If the request was successful, update the user's profile data in the redux reducer
            setProfile(res);
          } else if (!isEmpty(res.errors)) {
            // Handle known errors and show them to the user
            setUpdateProfileError(true);
            // TODO: Show the errors to the user
            //
            // @example
            // setError(res.data.updateProfile.errors[0].message as string);
            // setErrorOpened(true);
          }
        }
      } catch (_: unknown) {
        // Handle unknown errors and show them to the user
        setUpdateProfileError(true);
      }
      // End the updating process by turning the loading state to false
      setUpdateProfileLoading(false);
      if (!updateProfileError && !updateTagsError)
        // Close the edit modal
        onClose();
    }
  };

  useEffect(() => {
    try {
      if (profile) {
        // Set the profile informations to the edit modal inputs as initial state
        setCity(profile.city);
        setHometown(profile.hometown);
        setRelationship(profile.relationship);
        setTags(profile.tags);
      }
      // Handle suggested city if found in the localStorage
      if (!isEmpty(localStorage.getItem(GEO)))
        setLocalSuggestion(JSON.parse(localStorage.getItem(GEO) as string));
      // Check if the browser supports the geolocation API
      if (navigator.geolocation) setGpsSupported(true);
    } catch (_: unknown) {}
  }, [profile]);

  // Close the modal if the Esc key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Return null if the modal is not open
  if (!open) return null;

  // Create the portal to display the modal in the DOM
  return createPortal(
    <>
      <Backdrop onClick={onClose}>
        <div
          className="editModal"
          onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
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
                onChange={(e: KeyboardEventReact<HTMLInputElement>) =>
                  setCity(e.target.value)
                }
              />
              <span className="editModalBodySuggests">
                <div>
                  Suggestions:{" "}
                  <span
                    className="editModalBodySuggestsName"
                    onClick={handleSuggestion}
                    title="The suggestions are based on your IP address."
                  >
                    {localSuggestion.city}
                  </span>
                </div>
                {GpsSupported && (
                  <div>
                    The suggestions aren't accurate?{" "}
                    <span
                      className="editModalBodySuggestsName"
                      onClick={() => (!gpsLoading ? handleGPS() : null)}
                      title="The suggestions are based on your device's GPS."
                    >
                      Use GPS instead
                    </span>
                  </div>
                )}
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
                onChange={(e: KeyboardEventReact<HTMLInputElement>) =>
                  setHometown(e.target.value)
                }
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
            <div className="editModalBodyElement">
              <span className="editModalBodyHeader">
                <TagRounded />
                Personal hashtags
              </span>
              <CustomTagEditor customState={tags} setCustomState={setTags} />
            </div>
          </div>
          <div className="editModalFooter">
            <button
              disabled={updateProfileLoading || updateTagsLoading}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal") as Element
  );
};
