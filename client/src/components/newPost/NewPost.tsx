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
  const [showErrorFormatModal, setShowErrorFormatModal] =
    useState<Boolean>(false);
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [ytvideo, setYtvideo] = useState("");
  const [file, setFile] = useState(null as any);

  const { user } = useContext(AuthContext);

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
      let findLink = text.split(" ");

      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.youtube.") ||
          findLink[i].includes("https://youtube.")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setYtvideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setText(findLink.join(" "));
          setPicture("");
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
      await createPost({
        variables: {
          user: user._id,
          text,
          ytvideo,
          isMedia: !isEmpty(picture),
          file,
        },
        context: GraphQLAccessToken(user.accessToken),
      });
      window.location.reload();
    } else {
      setShowErrorModal(true);
    }
  };

  const handleMedia = (e: any) => {
    console.log(e.target.files[0]);
    if (e.target.files[0].type.includes("image")) {
      // If the uploaded file is an image
      setPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setYtvideo("");
    } else if (e.target.files[0].type.includes("video")) {
      // If the uploaded file is a video
      setVideo(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setYtvideo("");
    } else {
      // If the uploaded file is not an image or video
      setShowErrorFormatModal(true);
    }
  };

  const cancelPost = () => {
    setText("");
    setPicture("");
    setVideo("");
    setYtvideo("");
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
        You can not publish an empty post.
      </ErrorModal>
      <ErrorModal
        open={showErrorFormatModal}
        onClose={() => setShowErrorFormatModal(false)}
      >
        The format of the uploaded file is not supported.
      </ErrorModal>
      {/* {!isEmpty(error.format) && <p className="error">{error.format}</p>}
      {!isEmpty(error.maxSize) && <p className="error">{error.maxSize}</p>} */}
    </div>
  );
};
