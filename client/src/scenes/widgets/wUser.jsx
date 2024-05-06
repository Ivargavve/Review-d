import { ManageAccountsOutlined } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import ImageUser from "components/imageUser";
  import FlexBetween from "components/flexBetween";
  import WidgetWrap from "components/widgetWrap";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import FriendList from "scenes/widgets/friendList";
  import { setViews } from "state";
  
  const WidgetUser = ({ userId, picturePath }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const friendId = userId;
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
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
  
    useEffect(() => {
      getUser();
    });
  
    if (!user) {
      return null;
    }
  
    let {
      firstName,
      lastName,
      viewedProfile,
      impressions,
      friends,
    } = user;
  
    return (
      <WidgetWrap
        position="sticky"
        top={118}
        zIndex={100}
      >
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => {
            navigate(`/profile/${userId}`);
            patchProfileViews();
          }}
          >
          <FlexBetween gap="1rem">
            <ImageUser image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Profile views</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
        <FriendList userId={userId} />
      </WidgetWrap>
    );
  };
  
  export default WidgetUser;