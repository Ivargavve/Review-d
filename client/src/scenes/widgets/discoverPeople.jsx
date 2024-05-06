import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setViews, setFriendId, setFriendImagePath } from "state";
import FlexBetween from "components/flexBetween";
import ImageUser from "components/imageUser";
import { useNavigate } from "react-router-dom";
import WidgetWrap from "components/widgetWrap";

const DiscoverPeople = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const friendId = useSelector((state) => state.friendId);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      dispatch(setUsers(data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [friendId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickFriend = (friendId, userPicturePath) => {
    dispatch(setFriendId(friendId));
    dispatch(setFriendImagePath(userPicturePath));
    navigate(`/profile/${friendId}`);
    navigate(0);
    patchProfileViews();
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

  return (
    <WidgetWrap 
        position="sticky"
        top={118}
        zIndex={100}
    >
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Other Students
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {users.map((user) => (
          <FlexBetween key={user._id}>
            <FlexBetween gap="1rem">
              <ImageUser image={user.picturePath} size="55px" />
              <Box onClick={() => handleClickFriend(user._id, user.picturePath)}>
                <Typography
                  color={palette.neutral.main}
                  variant="h5"
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography color={palette.neutral.medium} fontSize="0.75rem">
                    {user.email}
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
        ))}
      </Box>
    </WidgetWrap>
  );
};

export default DiscoverPeople;
