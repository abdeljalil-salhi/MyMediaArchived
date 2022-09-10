import { FC } from "react";
import { createPortal } from "react-dom";

import { Backdrop } from "../backdrop/Backdrop";

interface ErrorModalProps {
  open: Boolean;
  children: any;
  onClose: () => void;
}

export const ErrorModal: FC<ErrorModalProps> = ({
  open,
  children,
  onClose,
}) => {
  // the ErrorModal component is used to display an error message
  //
  // Props:
  // open: whether the error message is open
  // children: the error message
  // onClose: the function to close the error message
  //
  // Notes:
  // - The error message is displayed when the query has an error
  // - The error message is not displayed if the query is loading
  // - The error message is not displayed if the query is loaded successfully

  // Return null if the modal is not open
  if (!open) return null;

  // Create the portal to display the modal in the DOM
  return createPortal(
    <>
      <Backdrop onClick={onClose}>
        <div className="errorModal" onClick={(e: any) => e.stopPropagation()}>
          <div className="errorModalWrapper">
            <div className="errorModalHeader">Huh ?!</div>
            <div className="errorModalBody">{children}</div>
            <div className="errorModalFooter">
              <button onClick={onClose}>OK</button>
            </div>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal") as Element
  );
};
