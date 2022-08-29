import { FC } from "react";

interface BackdropProps {
  children: any;
  onClick: () => void;
}

export const Backdrop: FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <div className="modalBackdrop" onClick={onClick}>
      {children}
    </div>
  );
};
