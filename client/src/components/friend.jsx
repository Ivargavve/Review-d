import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setViews, setFriendId, setFriendImagePath } from "state";
import FlexBetween from "./flexBetween";
import ImageUser from "./imageUser";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isSelf = friendId === loggedInUserId
  const icon = !isSelf && (
    isFriend ? <PersonRemoveOutlined sx={{ color: primaryDark }} /> : <PersonAddOutlined sx={{ color: primaryDark }} />
  );

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  const patchProfileViews = async () => {
    const response = await fetch(`http://localhost:3001/users/${friendId}/view`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setViews({ viewedProfile: data }));
  };

  const handleClickFriend = () => {
    dispatch(setFriendId(friendId));
    dispatch(setFriendImagePath(userPicturePath));
    navigate(`/profile/${friendId}`);
    navigate(0);
    patchProfileViews();
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <ImageUser image={userPicturePath} size="55px" />
        <Box onClick={handleClickFriend}>
          <Typography
            color={main}
            variant="h5"
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
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {icon && (
      <IconButton
        onClick={() => patchFriend()}
        sx={{ 
          background: `radial-gradient(circle, ${primaryLight} 0%, rgba(0, 0, 0, 0) 80%)`, // Circular gradient fading out to transparent
          p: "0.5rem" }}
      >
        {icon}
      </IconButton>
    )}
    </FlexBetween>
  );
};

export default Friend;