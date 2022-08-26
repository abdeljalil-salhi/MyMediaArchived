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

import { PU } from "../../globals";
import { AuthContext } from "../../context/auth.context";
import { isEmpty } from "../../utils/isEmpty";
import { ErrorModal } from "./ErrorModal";

interface NewPostProps {}

export const NewPost: FC<NewPostProps> = () => {
  const [showErrorModal, setShowErrorModal] = useState<Boolean>(false);
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [ytvideo, setYtvideo] = useState("");
  const [file, setFile] = useState("");

  const { user } = useContext(AuthContext);

  const labelNames = {
    upload: "file-upload",
    delete: "file-delete",
    cancel: "post-cancel",
    send: "send-post",
  };

  useEffect(() => {
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

  const handlePost = async () => {};

  const handlePicture = (e: any) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setYtvideo("");
  };

  const cancelPost = () => {
    setText("");
    setPicture("");
    setYtvideo("");
    setFile("");
  };

  return (
    <div className="newPostContainer">
      <div className="newPostProfile">
        <Link
          to={`/u/${user.username}`}
          state={{ user }}
          draggable={false}
        >
          <img
            src={
              user.profile
                ? `${PU}${user.profile}`
                : `${PU}profile/noAvatar.png`
            }
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
        {text || picture || ytvideo.length > 20 ? (
          <div className="newPostCard">
            <div className="newPostCardLeft">
              <img
                src={
                  user.profile
                    ? `${PU}${user.profile}`
                    : `${PU}profile/noAvatar.png`
                }
                alt={user.firstName && user.fullName}
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
                <p>
                  <Twemoji text={text} onlyEmojiClassName="makeEmojisLarge" />
                </p>
                {picture && <img src={picture} alt={`Preview: ${text}`} />}
                {ytvideo && (
                  <iframe
                    src={ytvideo}
                    frameBorder="0"
                    title="Embedded youtube video"
                    height={310}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
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
                  Picture
                </label>
                <input
                  type="file"
                  name="file"
                  id={labelNames.upload}
                  className="hide"
                  onChange={(e) => handlePicture(e)}
                />
              </>
            )}
            {ytvideo && (
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
            {text || picture || ytvideo.length > 20 ? (
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
      {/* {!isEmpty(error.format) && <p className="error">{error.format}</p>}
      {!isEmpty(error.maxSize) && <p className="error">{error.maxSize}</p>} */}
    </div>
  );
};
