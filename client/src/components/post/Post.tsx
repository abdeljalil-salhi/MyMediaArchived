import { FC, useContext, useEffect, useRef, useState } from "react";
import {
  Delete,
  Edit,
  EmojiEmotionsOutlined,
  Favorite,
  FavoriteBorder,
  MoreVert,
  PhotoLibraryOutlined,
} from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Twemoji } from "react-emoji-render";

import { PU } from "../../globals";
import { dateParser } from "../../utils/parsers";
import { AuthContext } from "../../context/auth.context";
import { DeleteModal } from "./DeleteModal";
import { isEmpty } from "../../utils/isEmpty";

interface PostProps {
  post: any;
}

export const Post: FC<PostProps> = ({ post }) => {
  const { user } = useContext(AuthContext);

  const [reacted, setReacted] = useState(false as boolean);
  const [showComments, setShowComments] = useState(false as boolean);
  const [showMore, setShowMore] = useState(false as boolean);
  const [showDeleteModal, setShowDeleteModal] = useState(false as boolean);
  const [showEmojies, setShowEmojies] = useState(false as boolean);
  const [isUpdating, setIsUpdating] = useState(false as boolean);
  const [textUpdate, setTextUpdate] = useState(null as any);
  const [text, setText] = useState(null as any);

  const showMoreRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const inputRef = useRef<any>(null as any);
  const showEmojiesRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );
  const postTextUpdateRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );
  const timerShowMoreRefRef: any = useRef(null as any);
  const timerPostTextUpdateRef: any = useRef(null as any);
  const timerShowEmojiesRef: any = useRef(null as any);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const react = () => {
    // TODO: react post
    setReacted(true);
  };

  const unreact = () => {
    // TODO: unreact post
    setReacted(false);
  };

  const handleComment = (e: any) => {
    e.preventDefault();
    if (text) {
      // TODO: comment post
    }
  };

  const handleEmoji = (emoji: any) => {
    setText(text + emoji.native);
    setShowEmojies(false);
    inputRef.current.focus();
  };

  const updateText = () => {
    if (textUpdate) {
      // TODO: update post
    }
    setIsUpdating(false);
    // TODO: refresh posts
  };

  useEffect(() => {
    // TODO: check if liked | DEPENDENCY: post.reactsObj
    if (!isEmpty(post.reacts))
      if (Object.values(post.reacts).includes(user._id as string))
        setReacted(true);
  }, [post.reacts, user._id]);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        showMoreRef.current !== null &&
        !showMoreRef.current.contains(e.target)
      )
        setShowMore(!showMore);
    };

    if (showMore) {
      timerShowMoreRefRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    return () => window.removeEventListener("click", pageClickEvent);
  }, [showMore]);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        postTextUpdateRef.current !== null &&
        !postTextUpdateRef.current.contains(e.target)
      )
        setIsUpdating(!isUpdating);
    };

    if (isUpdating) {
      timerPostTextUpdateRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    return () => window.removeEventListener("click", pageClickEvent);
  }, [isUpdating]);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        showEmojiesRef.current !== null &&
        !showEmojiesRef.current.contains(e.target)
      )
        setShowEmojies(!showEmojies);
    };

    if (showEmojies) {
      timerShowEmojiesRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent),
        100
      );
    }

    return () => window.removeEventListener("click", pageClickEvent);
  }, [showEmojies]);

  useEffect(() => {
    return () => clearTimeout(timerShowMoreRefRef.current);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timerPostTextUpdateRef.current);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timerShowEmojiesRef.current);
  }, []);

  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`/u/${post.userObj.username}`}
              state={{ user: post.userObj }}
              draggable={false}
            >
              <img
                src={
                  post.userObj.profile
                    ? `${PU}${post.userObj.profile}`
                    : `${PU}profile/noAvatar.png`
                }
                title={
                  post.userObj.firstname &&
                  `${post.userObj.firstname} ${post.userObj.lastname}`
                }
                className="postTopLeftProfileImg skeleton"
                alt={post.userObj.username && post.userObj.username}
                draggable={false}
              />
            </Link>
            <Link
              to={`/u/${post.userObj.username}`}
              style={{ textDecoration: "none" }}
              draggable={false}
            >
              <span className="postTopLeftUsername noneStyle">
                {post.userObj.fullName ? (
                  post.userObj.fullName
                ) : (
                  <div className="skeleton skeleton-text"></div>
                )}
              </span>
            </Link>
            <span
              className="postTopLeftDate"
              title={dateParser(post.createdAt)}
            >
              {post.createdAt ? (
                format(post.createdAt)
              ) : (
                <div className="skeleton skeleton-text"></div>
              )}
            </span>
          </div>
          {user._id === post.userObj._id && (
            <div className="postTopRight">
              <MoreVert onClick={toggleShowMore} />
              {showMore && (
                <div className="postToRightShowMore" ref={showMoreRef}>
                  <div
                    className="postToRightShowMoreItem"
                    onClick={() => {
                      toggleShowMore();
                      setIsUpdating(true);
                    }}
                  >
                    <Edit className="postToRightShowMoreItemSvg" />
                    <div>Edit</div>
                  </div>
                  <div
                    className="postToRightShowMoreItem"
                    onClick={() => {
                      toggleShowMore();
                      setShowDeleteModal(true);
                    }}
                  >
                    <Delete className="postToRightShowMoreItemSvg" />
                    <div>Delete</div>
                  </div>
                </div>
              )}
              <DeleteModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                postId={post._id}
              >
                Are you sure you want to delete your post?
              </DeleteModal>
            </div>
          )}
        </div>
        <div className="postCenter">
          {post.text && (
            <>
              {!isUpdating && (
                <span className="postCenterText">
                  <Twemoji
                    text={post.text}
                    onlyEmojiClassName="makeEmojisLarge"
                  />
                </span>
              )}
              {isUpdating && (
                <div className="postCenterTextUpdate" ref={postTextUpdateRef}>
                  <textarea
                    defaultValue={post.text}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  ></textarea>
                  <div className="postCenterTextUpdateButton">
                    <span onClick={() => setIsUpdating(false)}>Cancel</span>
                    <button onClick={updateText}>Update</button>
                  </div>
                </div>
              )}
            </>
          )}
          {post.picture && (
            <img
              className="postCenterImage"
              src={`${PU}${post.picture}`}
              alt={post.text ? post.text : `${post.userObj.firstName}'s post`}
              title={
                `${post.userObj.fullName}` + (post.text ? ": " + post.text : "")
              }
            />
          )}
          {post.ytvideo && (
            <iframe
              className="postCenterImage"
              height={310}
              src={post.ytvideo}
              title={post._id}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {!reacted && (
              <FavoriteBorder
                className="postBottomLeftLikeIcon"
                onClick={react}
              />
            )}
            {reacted && (
              <Favorite className="postBottomLeftLikeIcon" onClick={unreact} />
            )}
            <span className="postBottomLeftLikeCounter">
              {!isEmpty(post.reacts)
                ? Object.keys(post.reacts).length === 1
                  ? `${Object.keys(post.reacts).length} react`
                  : `${Object.keys(post.reacts).length} reacts`
                : "0 reacts"}
            </span>
          </div>
          <div className="postBottomRight">
            <span
              className="postBottomRightCommentsCounter"
              onClick={() => setShowComments(!showComments)}
            >
              {!isEmpty(post.comments)
                ? Object.keys(post.comments).length === 1
                  ? `${Object.keys(post.comments).length} comment`
                  : `${Object.keys(post.comments).length} comments`
                : "0 comments"}
            </span>
          </div>
        </div>
        {showComments && (
          <>
            <hr className="postHr" />
            <form onSubmit={handleComment}>
              <div className="postCommentInputContainer">
                <div className="postCommentInputWrapper">
                  <Link
                    to={`/u/${user.username}`}
                    state={{ user }}
                    draggable={false}
                  >
                    <img
                      className="postCommentInputImage skeleton"
                      src={`${PU}${user.profile}`}
                      alt={user.username && user.username}
                      draggable={false}
                    />
                  </Link>
                  <input
                    placeholder={`${user.firstName}, write a comment...`}
                    className="postCommentInput"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    ref={inputRef}
                    type="text"
                  />
                  <span ref={showEmojiesRef}>
                    <EmojiEmotionsOutlined
                      onClick={() => setShowEmojies(!showEmojies)}
                    />
                    {/* {showEmojies && (
                      <Picker
                        autoFocus={false}
                        color="#fa6e16"
                        emoji="crown"
                        enableFrequentEmojiSort={true}
                        emojiSize={20}
                        set="twitter"
                        theme="dark"
                        sheetSize={64}
                        showPreview={true}
                        showSkinTones={true}
                        emojiTooltip={false}
                        style={{
                          position: "absolute",
                          bottom: "140%",
                          right: "-200%",
                        }}
                        title="Stay positive."
                        onSelect={(emoji: any) => handleEmoji(emoji)}
                      />
                    )} */}
                  </span>
                  <PhotoLibraryOutlined />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
