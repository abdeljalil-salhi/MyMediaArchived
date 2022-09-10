import { FC, MutableRefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { isEmpty } from "../../utils/isEmpty";

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

  const timerRef: MutableRefObject<any> = useRef(null);
  const deleteModalRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  // The error modal is closed if the user clicks outside the modal
  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        !isEmpty(deleteModalRef.current) &&
        !(deleteModalRef.current as HTMLDivElement).contains(e.target)
      )
        onClose();
    };

    // Add the event listener when the modal is open
    if (onClose as any)
      timerRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );

    // Remove the event listener when the modal is closed
    return () => window.removeEventListener("click", pageClickEvent);
  }, [onClose]);

  // Clear the timer when the modal is closed
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Return null if the modal is not open
  if (!open) return null;

  // Create the portal to display the modal in the DOM
  return createPortal(
    <>
      <div className="errorModalOverlay"></div>
      <div className="errorModal" ref={deleteModalRef}>
        <div className="errorModalWrapper">
          <div className="errorModalHeader">Huh ?!</div>
          <div className="errorModalBody">{children}</div>
          <div className="errorModalFooter">
            <button onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal") as Element
  );
};
