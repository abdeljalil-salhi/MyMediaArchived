import { FC, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { AuthContext } from "../../context/auth.context";
import { Backdrop } from "../backdrop/Backdrop";
import { deleteHomePost } from "../../store/slices/homePostsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  DeletePostVariables,
  DeletePost_deletePost,
} from "../../generated/types/DeletePost";
import postsService from "../../store/services/postsService";
import { isEmpty } from "../../utils/isEmpty";
import { deleteNewPost } from "../../store/slices/newPostsSlice";
import { deleteProfilePost } from "../../store/slices/profilePostsSlice";
import { makeSelectHomePosts } from "../../store/selectors/homePostsSelector";
import { IHomePostsState } from "../../store/types/homePostsTypes";
import { makeSelectProfilePosts } from "../../store/selectors/profilePostsSelector";
import { IProfilePostsState } from "../../store/types/profilePostsTypes";
import { GetTimelinePosts_getTimelinePosts_posts } from "../../generated/types/GetTimelinePosts";
import { GetUserPosts_getUserPosts_posts } from "../../generated/types/GetUserPosts";
import { makeSelectNewPosts } from "../../store/selectors/newPostsSelector";
import { INewPostsState } from "../../store/types/newPostsTypes";

interface DeleteModalProps {
  open: Boolean;
  children: any;
  onClose: () => void;
  postId: string;
  reducer: string;
}

const newPostsStateSelector = createSelector(
  makeSelectNewPosts,
  (newPosts: INewPostsState["data"]) => ({
    newPosts: newPosts!.posts!,
  })
);

const homePostsStateSelector = createSelector(
  makeSelectHomePosts,
  (homePosts: IHomePostsState["data"]) => ({
    homePosts: homePosts!.posts!,
  })
);

const profilePostsStateSelector = createSelector(
  makeSelectProfilePosts,
  (profilePosts: IProfilePostsState["data"]) => ({
    profilePosts: profilePosts!.posts!,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  deleteNewPost: (postId: string) => dispatch(deleteNewPost(postId)),
  deleteHomePost: (postId: string) => dispatch(deleteHomePost(postId)),
  deleteProfilePost: (postId: string) => dispatch(deleteProfilePost(postId)),
});

export const DeleteModal: FC<DeleteModalProps> = ({
  open,
  children,
  onClose,
  postId,
  reducer,
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
  const { homePosts } = useAppSelector(homePostsStateSelector);
  const { profilePosts } = useAppSelector(profilePostsStateSelector);
  const { newPosts } = useAppSelector(newPostsStateSelector);

  // The dispatch function to update the posts state in the store (Redux)
  const { deleteNewPost, deleteHomePost, deleteProfilePost } = actionDispatch(
    useAppDispatch()
  );

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
        newPosts.find(
          (post: GetTimelinePosts_getTimelinePosts_posts) => post._id === postId
        ) && deleteNewPost(postId);
        homePosts.find(
          (post: GetTimelinePosts_getTimelinePosts_posts) => post._id === postId
        ) && deleteHomePost(postId);
        profilePosts.find(
          (post: GetUserPosts_getUserPosts_posts) => post._id === postId
        ) && deleteProfilePost(postId);
        console.log(postId, "deleted");
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
          onClick={(e: any) => e.stopPropagation()}
        >
          <div className="postDeleteModalWrapper">
            <div className="postDeleteModalHeader">Delete confirmation</div>
            <div className="postDeleteModalBody">{children}</div>
            <div className="postDeleteModalFooter">
              <span onClick={onClose}>Cancel</span>
              <button onClick={deletePostFn}>Confirm</button>
            </div>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal") as Element
  );
};
