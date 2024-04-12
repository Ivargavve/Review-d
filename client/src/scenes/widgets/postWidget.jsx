import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
  import FlexBetween from "components/flexBetween";
  import WidgetWrap from "components/widgetWrap";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  import { useNavigate } from "react-router-dom";
  import Friend from "components/friend";

  const PostWidget = ({
    postId,
    postUserId,
    name,
    course,
    description,
    picturePath,
    userPicturePath,
    likes,
    comments,
    timestamp,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [comment, setComment] = useState("");
    const [copySuccess, setCopySuccess] = useState(false); // State for copying URL to clipboard
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const navigate = useNavigate();

    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
    const copyUrlToClipboard = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
  
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    };
    const handleKeyPress = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await patchComment();
      }
    };
    const patchComment = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment: comment }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setComment(""); // Clear the comment input after adding the comment
    };
  
    return (
      <WidgetWrap mb="2rem">
        <Friend
        friendId={postUserId}
        name={name}
        subtitle={course}
        userPicturePath={userPicturePath}
      />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <Box style={{ display: "flex", justifyContent: "center"}}>
          <img
            width="100%"
            alt="img"
            style={{ marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
          </Box>
        )}
        <Typography margin="0.3rem" fontSize="0.55rem" color={medium}>{timestamp}</Typography>
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
          <IconButton onClick={copyUrlToClipboard}>
          {!copySuccess && <ShareOutlined />}
        </IconButton>
        {copySuccess && <Typography variant="body2">URL Copied!</Typography>} {/* Display URL copied message */}
      </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            <InputBase
            placeholder="write a comment..."
            sx={{
              margin: "0.3rem 1rem 0.3rem 1rem",
              padding: "0.2rem 0.5rem 0.2rem 0.5rem",
              width: "95%",
              backgroundColor: palette.neutral.light,
            }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyPress}
          />
            {comments.map((commentObj, i) => ( 
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: medium, m: "0.5rem 0", pl: "1rem", fontSize: "0.7rem"}}>
                <b>{commentObj.name}:</b> {commentObj.comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrap>
    );
  };
  
  export default PostWidget;