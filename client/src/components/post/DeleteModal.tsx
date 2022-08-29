import { FC, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { AuthContext } from "../../context/auth.context";
import { GraphQLAccessToken } from "../../utils/_graphql";
import { useDeletePostMutation } from "../../generated/graphql";

interface DeleteModalProps {
  open: Boolean;
  children: any;
  onClose: () => void;
  postId: string;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  open,
  children,
  onClose,
  postId,
}) => {
  const timerRef: any = useRef(null as any);
  const deleteModalRef: any = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );

  const { user } = useContext(AuthContext);

  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        deleteModalRef.current !== null &&
        !deleteModalRef.current.contains(e.target)
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

  const deletePostFn = () => {
    deletePost({
      variables: {
        userId: user._id,
        postId,
      },
      context: GraphQLAccessToken(user.accessToken),
    });
    onClose();
    window.location.reload();
  };

  if (!open) return null;

  return createPortal(
    <>
      <div className="postDeleteModalOverlay"></div>
      <div className="postDeleteModal" ref={deleteModalRef}>
        <div className="postDeleteModalWrapper">
          <div className="postDeleteModalHeader">Delete confirmation</div>
          <div className="postDeleteModalCenter">{children}</div>
          <div className="postDeleteModalFooter">
            <span onClick={onClose}>Cancel</span>
            <button onClick={() => deletePostFn()}>Confirm</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal") as Element
  );
};
