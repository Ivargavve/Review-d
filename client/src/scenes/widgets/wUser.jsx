import { ManageAccountsOutlined } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import ImageUser from "components/imageUser";
  import FlexBetween from "components/flexBetween";
  import WidgetWrap from "components/widgetWrap";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const WidgetUser = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
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
          onClick={() => navigate(`/profile/${userId}`)} // navigate to user profile page on click
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
      </WidgetWrap>
    );
  };
  
  export default WidgetUser;