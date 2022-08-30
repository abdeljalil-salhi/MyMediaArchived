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

import { PU, TRANSPARENT } from "../../globals";
import { AuthContext } from "../../context/auth.context";
import { isEmpty } from "../../utils/isEmpty";
import { ErrorModal } from "./ErrorModal";
import { useCreatePostMutation } from "../../generated/graphql";
import { GraphQLAccessToken } from "../../utils/_graphql";

interface NewPostProps {}

export const NewPost: FC<NewPostProps> = () => {
  const [showErrorModal, setShowErrorModal] = useState<Boolean>(false);
  const [errorModalText, setErrorModalText] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [ytvideo, setYtvideo] = useState("");
  const [file, setFile] = useState(null as any);

  const { user } = useContext(AuthContext);

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
  const [createPost] = useCreatePostMutation();

  const labelNames = {
    upload: "file-upload",
    delete: "file-delete",
    cancel: "post-cancel",
    send: "send-post",
  };

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
    handleYtvideo();
  }, [text]);

  const handlePost = async () => {
    if (
      !isEmpty(text.trim()) ||
      !isEmpty(picture) ||
      !isEmpty(video) ||
      !isEmpty(ytvideo)
    ) {
      // If the user has submitted the form, then create a post
      await createPost({
        variables: {
          user: user._id,
          text,
          ytvideo,
          // If the user has uploaded a picture, then set the isMedia to true
          isMedia: !isEmpty(picture),
          file,
        },
        // Pass the access token to the GraphQL context
        context: GraphQLAccessToken(user.accessToken),
      });
      // Refresh the page (temporary solution)
      window.location.reload();
    } else {
      // If the post is empty, show an error modal
      setErrorModalText("You can not publish an empty post.");
      setShowErrorModal(true);
    }
  };

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
        <Link to={`/u/${user.username}`} state={{ user }} draggable={false}>
          <img
            src={user.profile ? `${PU}${user.profile}` : TRANSPARENT}
            alt={user.fullName ? user.fullName : "Your avatar"}
            className="newPostAvatar avatar skeleton"
            draggable={false}
          />
          <span className="newPostOnlineStatus"></span>
        </Link>
      </div>
      <div className="newPostForm">
        <textarea
          placeholder={`Hi ${user.firstName}, any news ?`}
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
                src={user.profile ? `${PU}${user.profile}` : TRANSPARENT}
                alt={user.firstName ? user.fullName : "Your avatar"}
                className="avatar skeleton"
                draggable={false}
              />
            </div>
            <div className="newPostCardRight">
              <div className="newPostCardHeader">
                <h2>{user.firstName && user.fullName}</h2>
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
