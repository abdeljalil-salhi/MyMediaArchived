import {
  FC,
  useContext,
  useEffect,
  useState,
  MouseEvent as MouseEventReact,
} from "react";
import { createPortal } from "react-dom";
import { Dispatch } from "redux";

import { AuthContext } from "../../context/auth.context";
import { Backdrop } from "../backdrop/Backdrop";
import { useAppDispatch } from "../../store/hooks";
import {
  DeletePostVariables,
  DeletePost_deletePost,
} from "../../generated/types/DeletePost";
import postsService from "../../store/services/postsService";
import { isEmpty } from "../../utils/isEmpty";
import { TDeletedPosts } from "../../store/types/postsTypes";
import { addDeletedPost } from "../../store/slices/postsSlice";

interface DeleteModalProps {
  open: Boolean;
  children: any;
  onClose: () => void;
  postId: string;
}

const actionDispatch = (dispatch: Dispatch) => ({
  addDeletedPost: (postId: TDeletedPosts) => dispatch(addDeletedPost(postId)),
});

export const DeleteModal: FC<DeleteModalProps> = ({
  open,
  children,
  onClose,
  postId,
}) => {
  // The DeleteModal component is used to display a delete confirmation message
  //
  // Props:
  // open: whether the delete confirmation message is open
  // children: the delete confirmation message
  // onClose: the function to close the delete confirmation message
  // postId: the ID of the post to delete
  //
  // Notes:
  // - The delete confirmation message is displayed when the user clicks the delete button

  // The states below are used by the deletePost() GraphQL query
  const [deletePostLoading, setDeletePostLoading] = useState<boolean>(false);
  const [deletePostError, setDeletePostError] = useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  // The selector to get state informations from the store (Redux)
  // None

  // The dispatch function to update the posts state in the store (Redux)
  const { addDeletedPost } = actionDispatch(useAppDispatch());

  /*
   * @example
   * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
   *   variables: {
   *      userId: // value for 'userId'
   *      postId: // value for 'postId'
   *   },
   * });
   */

  // Delete the post when the user confirms the delete
  const deletePostFn = async () => {
    // Start the deleting process by turning the loading state to true
    setDeletePostLoading(true);
    // Prepare the variables to be sent in the GraphQL mutation
    const variables: DeletePostVariables = {
      userId: user._id,
      postId,
    };
    try {
      // Send the GraphQL deletePost request to the server
      const res: DeletePost_deletePost = (await postsService
        .deletePost(variables, user.accessToken)
        .catch((_: unknown) =>
          setDeletePostError(true)
        )) as DeletePost_deletePost;

      // If the post was successfully deleted
      if (!isEmpty(res.deleted)) {
        // Delete the post from the store
        addDeletedPost(res);
      } else if (!isEmpty(res.errors)) {
        // If the post was not successfully deleted, display the errors
        setDeletePostError(true);
      }
    } catch (_: unknown) {
      // If an error occurs, turn the error state to true
      setDeletePostError(true);
    }
    // End the deleting process by turning the loading state to false
    setDeletePostLoading(false);
    // Close the delete confirmation message
    onClose();
  };

  // Close the modal if the Esc key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Return null if the modal is not open
  if (!open) return null;

  // Create the portal to display the modal in the DOM
  return createPortal(
    <>
      <Backdrop onClick={onClose}>
        <div
          className="postDeleteModal"
          onClick={(e: MouseEventReact<HTMLDivElement>) => e.stopPropagation()}
        >
          <div className="postDeleteModalWrapper">
            <div className="postDeleteModalHeader">Delete confirmation</div>
            <div className="postDeleteModalBody">{children}</div>
            <div className="postDeleteModalFooter">
              <span onClick={onClose}>Cancel</span>
              <button onClick={deletePostFn} disabled={deletePostLoading}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal") as Element
  );
};
