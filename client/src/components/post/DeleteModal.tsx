import { FC, MutableRefObject, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { AuthContext } from "../../context/auth.context";
import { GraphQLAccessToken } from "../../utils/_graphql";
import { useDeletePostMutation } from "../../generated/graphql";
import { isEmpty } from "../../utils/isEmpty";

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
  // The DeleteModal component is used to display a delete confirmation message.
  //
  // Props:
  // open: whether the delete confirmation message is open
  // children: the delete confirmation message
  // onClose: the function to close the delete confirmation message
  // postId: the ID of the post to delete
  //
  // Notes:
  // - The delete confirmation message is displayed when the user clicks the delete button

  const timerRef: MutableRefObject<any> = useRef(null);
  const deleteModalRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const { user } = useContext(AuthContext);

  /*
   * @example
   * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
   *   variables: {
   *      userId: // value for 'userId'
   *      postId: // value for 'postId'
   *   },
   * });
   */
  const [deletePost] = useDeletePostMutation();

  // The delete modal is closed if the user clicks outside the modal
  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        !isEmpty(deleteModalRef.current) &&
        !(deleteModalRef.current as HTMLDivElement).contains(e.target)
      )
        onClose();
    };

    // Add the event listener when the modal is open
    if (onClose as any) {
      timerRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    // Remove the event listener when the modal is closed
    return () => window.removeEventListener("click", pageClickEvent);
  }, [onClose]);

  // Clear the timer when the modal is closed
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Delete the post when the user confirms the delete
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

  // Return null if the modal is not open
  if (!open) return null;

  // Create the portal to display the modal in the DOM
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
