import { FC } from "react";

interface BackdropProps {
  children: any;
  onClick: () => void;
}

export const Backdrop: FC<BackdropProps> = ({ children, onClick }) => {
  // The Backdrop is a simple div that covers the entire screen
  // It is used to prevent clicking on the page behind the modal
  // It closes the modal when clicked

  return (
    <div className="modalBackdrop" onClick={onClick}>
      {children}
    </div>
  );
};
