import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
}

export const EditModal: FC<EditModalProps> = ({ open, onClose }) => {
  const timerRef: any = useRef(null as any);
  const editModalRef: any = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        editModalRef.current !== null &&
        !editModalRef.current.contains(e.target)
      )
        onClose();
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
    <>edit modal</>,
    document.getElementById("portal") as Element
  );
};
