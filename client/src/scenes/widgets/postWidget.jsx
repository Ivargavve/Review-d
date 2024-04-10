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
  import ImageUser from "components/imageUser";
  import { useNavigate } from "react-router-dom";

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
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${postUserId}`)} // navigate to user profile page on click
        >
          <FlexBetween gap="1rem">
            <ImageUser image={userPicturePath} />
            <Box>
              <Typography
                variant="h6"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
              <Typography fontSize="0.55rem" color={medium}>{timestamp}</Typography>
            </Box>
          </FlexBetween>
          <Typography 
            color={main}
            fontSize="0.65rem"
            >
              {course}
            </Typography>
        </FlexBetween>
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
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
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