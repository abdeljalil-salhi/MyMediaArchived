import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
  const timerRef: any = useRef(null as any);
  const deleteModalRef: any = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        deleteModalRef.current !== null &&
        !deleteModalRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    if (onClose as any) {
      timerRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    return () => window.removeEventListener("click", pageClickEvent);
  }, [onClose]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  if (!open) return null;

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
