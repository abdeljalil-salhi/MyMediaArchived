import { FC, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Close,
  FavoriteRounded,
  FireplaceRounded,
  HomeWorkRounded,
} from "@mui/icons-material";

import { GEO } from "../../globals";
import { isEmpty } from "../../utils/isEmpty";
import { AuthContext } from "../../context/auth.context";
import { CustomSelect } from "../customs/customSelect/CustomSelect";
import { Backdrop } from "../backdrop/Backdrop";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
}

export const EditModal: FC<EditModalProps> = ({ open, onClose }) => {
  const [city, setCity] = useState("");
  const [hometown, setHometown] = useState("");
  const [relationship, setRelationship] = useState(0);
  const [localSuggestion, setLocalSuggestion] = useState({} as any);

  const { user } = useContext(AuthContext);

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
    setCity(localSuggestion.city);
  };

  const handleConfirm = () => {
    onClose();
  };

  useEffect(() => {
    try {
      setCity(user.city);
      setHometown(user.hometown);
      setRelationship(user.relationship);

      if (!isEmpty(localStorage.getItem(GEO)))
        setLocalSuggestion(JSON.parse(localStorage.getItem(GEO) as string));
    } catch (e: any) {}
  }, [user]);

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
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal") as Element
  );
};
