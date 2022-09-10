import { FC, useContext } from "react";
import { createPortal } from "react-dom";

import { AuthContext } from "../../context/auth.context";
import { GraphQLAccessToken } from "../../utils/_graphql";
import { useDeletePostMutation } from "../../generated/graphql";
import { Backdrop } from "../backdrop/Backdrop";

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
      <Backdrop onClick={onClose}>
        <div
          className="postDeleteModal"
          onClick={(e: any) => e.stopPropagation()}
        >
          <div className="postDeleteModalWrapper">
            <div className="postDeleteModalHeader">Delete confirmation</div>
            <div className="postDeleteModalBody">{children}</div>
            <div className="postDeleteModalFooter">
              <span onClick={onClose}>Cancel</span>
              <button onClick={() => deletePostFn()}>Confirm</button>
            </div>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal") as Element
  );
};
