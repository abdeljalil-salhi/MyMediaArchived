import FlipMove from "react-flip-move";
import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Backspace,
  Delete,
  PhotoLibraryOutlined,
  Send,
} from "@mui/icons-material";
import { Twemoji } from "react-emoji-render";
import { format } from "timeago.js";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { PU, TRANSPARENT } from "../../globals";
import { AuthContext } from "../../context/auth.context";
import { isEmpty } from "../../utils/isEmpty";
import { ErrorModal } from "./ErrorModal";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  CreatePostVariables,
  CreatePost_createPost,
  CreatePost_createPost_errors,
} from "../../generated/types/CreatePost";
import postsService from "../../store/services/postsService";
import { THomePosts } from "../../store/types/homePostsTypes";
import { setHomePosts } from "../../store/slices/homePostsSlice";
import { setProfilePosts } from "../../store/slices/profilePostsSlice";
import { TProfilePosts } from "../../store/types/profilePostsTypes";
import { TNewPosts } from "../../store/types/newPostsTypes";
import { addNewPost } from "../../store/slices/newPostsSlice";

interface NewPostProps {}

const profileStateSelector = createSelector(makeSelectProfile, (profile) => ({
  profile: profile?.user,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setHomePosts: (posts: THomePosts) => dispatch(setHomePosts(posts)),
  setProfilePosts: (posts: TProfilePosts) => dispatch(setProfilePosts(posts)),
  addNewPost: (post: TNewPosts) => dispatch(addNewPost(post)),
});

export const NewPost: FC<NewPostProps> = () => {
  // the NewPost component is used to create a new post
  //
  // Notes:
  // - The NewPost component is displayed when the user is logged in
  // - The NewPost component shows a preview of the post when the user is typing
  // - The NewPost component is submitted when the user clicks the "Send" button
  // - The NewPost component is reset when the user clicks the "Cancel" button

  const [showErrorModal, setShowErrorModal] = useState<Boolean>(false);
  const [errorModalText, setErrorModalText] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [ytvideo, setYtvideo] = useState("");
  const [file, setFile] = useState(null as any);

  // The states below are used by the createPost() GraphQL mutation
  const [createPostLoading, setCreatePostLoading] = useState<boolean>(false);
  const [createPostError, setCreatePostError] = useState<boolean>(false);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  // The selector to get state informations from the store (Redux)
  const { profile } = useAppSelector(profileStateSelector);

  // The dispatch function to update the posts state in the store (Redux)
  const { addNewPost } = actionDispatch(useAppDispatch());

  /*
   * @example
   * const [createPost, { data, loading, error }] = useCreatePostMutation({
   *   variables: {
   *      user: // value for 'user'
   *      text: // value for 'text'
   *      link: // value for 'link'
   *      ytvideo: // value for 'ytvideo'
   *      location: // value for 'location'
   *      isMedia: // value for 'isMedia'
   *      file: // value for 'file'
   *   },
   * });
   */

  const labelNames = {
    upload: "file-upload",
    delete: "file-delete",
    cancel: "post-cancel",
    send: "send-post",
  };

  // We start looking for the youtube link when the user starts typing
  useEffect(() => {
    // Bootstrap the function to handle the youtube video detection
    const handleYtvideo = () => {
      // Get the text from the textarea and split it into an array
      let findLink = text.split(" ");

      // Loop through the array and check if the link is a youtube link
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.youtube.") ||
          findLink[i].includes("https://youtube.")
        ) {
          // If it is a youtube link, set the state to the link
          let embed = findLink[i].replace("watch?v=", "embed/");
          setYtvideo(embed.split("&")[0]);
          // Remove the link from the textarea
          findLink.splice(i, 1);
          // Set the textarea to the new value without the link
          setText(findLink.join(" "));
          // Reset the states
          setPicture("");
          setVideo("");
          // Remove the uploaded file
          setFile(null);
        }
      }
    };
    // Call the bootstrapped function
    handleYtvideo();
  }, [text]);

  // We handle the post creation when the user clicks the "Send" button
  const handlePost = async () => {
    // If the user has submitted the form, then create a post
    if (
      !isEmpty(text.trim()) ||
      !isEmpty(picture) ||
      !isEmpty(video) ||
      !isEmpty(ytvideo)
    ) {
      // Start the updating process by turning the loading state to true
      setCreatePostLoading(true);
      // Prepare the variables to be sent in the GraphQL mutation
      const variables: CreatePostVariables = {
        user: user._id,
        text,
        link: "",
        ytvideo,
        location: "",
        isMedia: !isEmpty(picture) || !isEmpty(video),
        file,
      };
      try {
        // Send the GraphQL creating post request to the server
        const res: CreatePost_createPost = (await postsService
          .createPost(variables, user.accessToken)
          .catch((_: unknown) =>
            setCreatePostError(true)
          )) as CreatePost_createPost;

        if (!isEmpty(res.post)) {
          // If the request was successful, add the created post to the new posts state in the redux reducer
          addNewPost(res);
        } else if (!isEmpty(res.errors)) {
          setCreatePostError(true);
          setErrorModalText(
            (res.errors as CreatePost_createPost_errors[])[0].message as string
          );
          setShowErrorModal(true);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorModalText(err.message);
          setShowErrorModal(true);
        } else {
          setErrorModalText("Something went wrong");
          setShowErrorModal(true);
        }
      }
      // Reset the states to their initial values
      cancelPost();
      // End the loading process by turning the loading state to false
      setCreatePostLoading(false);
    } else {
      // If the post is empty, show an error modal
      setErrorModalText("You can not publish an empty post.");
      setShowErrorModal(true);
    }
  };

  // We handle the media preview when the user uploads a file
  const handleMedia = (e: any) => {
    if (e.target.files[0].type.includes("image")) {
      // If the uploaded file is an image
      // Create a preview URL of the image and set it to the picture state
      setPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setVideo("");
      setYtvideo("");
    } else if (e.target.files[0].type.includes("video")) {
      // If the uploaded file is a video
      // Create a preview URL of the video and set it to the video state
      setVideo(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setPicture("");
      setYtvideo("");
    } else {
      // If the uploaded file is not an image or video, show an error modal
      setErrorModalText("You can only upload images or videos.");
      setShowErrorModal(true);
    }
  };

  // We handle the reset when the user clicks the "Cancel" button
  const cancelPost = () => {
    // Reset the states
    setText("");
    setPicture("");
    setVideo("");
    setYtvideo("");
    // Remove the uploaded file
    setFile(null);
  };

  return (
    <div className="newPostContainer">
      <div className="newPostProfile">
        <Link to={profile ? `/u/${profile.username}` : ""} draggable={false}>
          <img
            src={
              profile && profile.profile
                ? `${PU}${profile.profile}`
                : TRANSPARENT
            }
            alt={profile && profile.fullName ? profile.fullName : "Your avatar"}
            className="newPostAvatar avatar skeleton"
            draggable={false}
          />
          <span className="newPostOnlineStatus"></span>
        </Link>
      </div>
      <div className="newPostForm">
        <textarea
          placeholder={`Hi ${profile ? profile.firstName : "User"}, any news ?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
        ></textarea>
      </div>
      <FlipMove className="newPostFlipMove">
        {!isEmpty(text) ||
        !isEmpty(picture) ||
        !isEmpty(video) ||
        ytvideo.length > 20 ? (
          <div className="newPostCard">
            <div className="newPostCardLeft">
              <img
                src={
                  profile && profile.profile
                    ? `${PU}${profile.profile}`
                    : TRANSPARENT
                }
                alt={profile ? profile.fullName : "Your avatar"}
                className="avatar skeleton"
                draggable={false}
              />
            </div>
            <div className="newPostCardRight">
              <div className="newPostCardHeader">
                <h2>{profile && profile.fullName}</h2>
                <span>{format(Date.now())}</span>
              </div>
              <div className="newPostCardContent">
                {!isEmpty(text) && (
                  <p>
                    <Twemoji text={text} onlyEmojiClassName="makeEmojisLarge" />
                  </p>
                )}
                {!isEmpty(picture) && (
                  <img
                    src={picture ? picture : TRANSPARENT}
                    alt={`Preview: ${text}`}
                  />
                )}
                {!isEmpty(ytvideo) && (
                  <iframe
                    src={ytvideo}
                    frameBorder="0"
                    title="Embedded youtube video"
                    height={310}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                {!isEmpty(video) && <video src={video} controls></video>}
              </div>
            </div>
          </div>
        ) : null}
        <div className="newPostFooter">
          <div className="newPostFooterIcons">
            {isEmpty(ytvideo) && (
              <>
                <label
                  htmlFor={labelNames.upload}
                  className="newPostFooterIconsPicture"
                >
                  <PhotoLibraryOutlined />
                  Media
                </label>
                <input
                  type="file"
                  name="file"
                  id={labelNames.upload}
                  className="hide"
                  onChange={(e) => handleMedia(e)}
                />
              </>
            )}
            {!isEmpty(ytvideo) && (
              <>
                <label
                  htmlFor={labelNames.delete}
                  className="newPostFooterIconsDelete"
                >
                  <Backspace />
                  Delete Video
                </label>
                <button
                  name={labelNames.delete}
                  id={labelNames.delete}
                  className="hide"
                  onClick={() => setYtvideo("")}
                ></button>
              </>
            )}
            {!isEmpty(text) ||
            !isEmpty(picture) ||
            !isEmpty(video) ||
            ytvideo.length > 20 ? (
              <>
                <label
                  htmlFor={labelNames.cancel}
                  className="newPostFooterIconsCancel"
                >
                  <Delete />
                  Cancel
                </label>
                <button
                  name={labelNames.cancel}
                  id={labelNames.cancel}
                  className="hide"
                  onClick={cancelPost}
                ></button>
              </>
            ) : null}
            <label htmlFor={labelNames.send} className="newPostFooterIconsSend">
              <Send />
              Send
            </label>
            <button
              name={labelNames.send}
              id={labelNames.send}
              className="hide"
              onClick={handlePost}
            ></button>
          </div>
        </div>
      </FlipMove>
      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      >
        {errorModalText}
      </ErrorModal>
      {/* {!isEmpty(error.format) && <p className="error">{error.format}</p>}
      {!isEmpty(error.maxSize) && <p className="error">{error.maxSize}</p>} */}
    </div>
  );
};
