import {
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { createSelector } from "@reduxjs/toolkit";

import { PU, TRANSPARENT } from "../../globals";
import { dateParser } from "../../utils/parsers";
import { AuthContext } from "../../context/auth.context";
import { DeleteModal } from "./DeleteModal";
import { isEmpty } from "../../utils/isEmpty";
import { makeSelectProfile } from "../../store/selectors/profileSelector";
import { useAppSelector } from "../../store/hooks";

interface PostProps {
  post: any;
}

const stateSelector = createSelector(makeSelectProfile, (profile) => ({
  profile: profile?.user,
}));

export const Post: FC<PostProps> = ({ post }) => {
  // The Post component is used to display a post.
  //
  // Props:
  // post: the post to display

  const [reacted, setReacted] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEmojies, setShowEmojies] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [textUpdate, setTextUpdate] = useState<string>("");
  const [text, setText] = useState<string>("");

  const showMoreRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const inputRef: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);
  const showEmojiesRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const postTextUpdateRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );
  const timerShowMoreRefRef: MutableRefObject<any> = useRef(null);
  const timerPostTextUpdateRef: MutableRefObject<any> = useRef(null);
  const timerShowEmojiesRef: MutableRefObject<any> = useRef(null);

  const { user } = useContext(AuthContext);

  const { profile } = useAppSelector(stateSelector);

  // Toggle display of the show more button
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // React to the post by the current user
  const react = () => {
    // TODO: react post
    setReacted(true);
  };

  // Unreact to the post by the current user
  const unreact = () => {
    // TODO: unreact post
    setReacted(false);
  };

  // Handle the comment to the post by the current user
  const handleComment = (e: any) => {
    e.preventDefault();
    if (text) {
      // TODO: comment post
    }
  };

  // Handle if the user chooses an emoji
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEmoji = (emoji: any) => {
    setText(text + emoji.native);
    setShowEmojies(false);
    (inputRef.current as HTMLInputElement).focus();
  };

  // Handle if the user updates the text of the post
  const updateText = () => {
    if (textUpdate) {
      // TODO: update post
    }
    setIsUpdating(false);
    // TODO: refresh posts
  };

  // Handle if the user already reacted to the post
  useEffect(() => {
    // TODO: check if liked | DEPENDENCY: post.reactsObj
    if (!isEmpty(post.reacts))
      if (Object.values(post.reacts).includes(user._id)) setReacted(true);
  }, [post.reacts, user._id]);

  useEffect(() => {
    // showMore:
    //  - The show more element is closed if the user clicks outside the area
    // isUpdating:
    //  - The update textarea is closed if the user clicks outside the area
    // showEmojies:
    //  - The emojies element is closed if the user clicks outside the area
    const pageClickEvent__showMore = (e: any) => {
      if (
        !isEmpty(showMoreRef.current) &&
        !(showMoreRef.current as HTMLDivElement).contains(e.target)
      )
        setShowMore(!showMore);
    };
    const pageClickEvent__isUpdating = (e: any) => {
      if (
        !isEmpty(postTextUpdateRef.current) &&
        !postTextUpdateRef.current.contains(e.target)
      )
        setIsUpdating(!isUpdating);
    };
    const pageClickEvent__showEmojies = (e: any) => {
      if (
        !isEmpty(showEmojiesRef.current) &&
        !(showEmojiesRef.current as HTMLDivElement).contains(e.target)
      )
        setShowEmojies(!showEmojies);
    };

    // Add the event listener when the element is open
    if (showMore)
      timerShowMoreRefRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent__showMore),
        100
      );
    if (isUpdating)
      timerPostTextUpdateRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent__isUpdating),
        100
      );
    if (showEmojies)
      timerShowEmojiesRef.current = setTimeout(
        () => window.addEventListener("click", pageClickEvent__showEmojies),
        100
      );

    // Remove the event listener when the element is closed
    const cleanup = () => {
      window.removeEventListener("click", pageClickEvent__showMore);
      window.removeEventListener("click", pageClickEvent__isUpdating);
      window.removeEventListener("click", pageClickEvent__showEmojies);
      clearTimeout(timerShowMoreRefRef.current);
      clearTimeout(timerPostTextUpdateRef.current);
      clearTimeout(timerShowEmojiesRef.current);
    };

    return () => cleanup();
  }, [showMore, isUpdating, showEmojies]);

  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={post.userObj ? `/u/${post.userObj.username}` : ""}
              draggable={false}
            >
              <img
                src={
                  post.userObj.profile
                    ? `${PU}${post.userObj.profile}`
                    : TRANSPARENT
                }
                title={post.userObj.fullName}
                className="postTopLeftProfileImg skeleton"
                alt={`${post.userObj.username}'s profile`}
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
              title={`${post.userObj.fullName}${post.text && `: ${post.text}`}`}
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
          {post.video && (
            <video
              className="postCenterVideo"
              src={`${PU}${post.video}`}
              title={`${post.userObj.fullName}${post.text && `: ${post.text}`}`}
              controls
            ></video>
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
                    to={profile ? `/u/${profile.username}` : ""}
                    draggable={false}
                  >
                    <img
                      className="postCommentInputImage skeleton"
                      src={
                        profile && profile.profile
                          ? `${PU}${profile.profile}`
                          : TRANSPARENT
                      }
                      alt={profile ? `${profile.firstName}'s profile` : ""}
                      draggable={false}
                    />
                  </Link>
                  <input
                    placeholder={`${
                      profile ? profile.firstName : "Hi"
                    }, write a comment...`}
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
