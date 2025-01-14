import React from 'react';
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import WidgetUser from "scenes/widgets/wUser";
import PostsWidget from "scenes/widgets/postsWidget";
import { useMediaQuery } from "@mui/material";
import DiscoverPeople from "scenes/widgets/discoverPeople";

const ProfilePage = () => {
    const { _id } = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const friendId = useSelector((state) => state.friendId);
    const friendImagePath = useSelector((state) => state.friendImagePath);

    return (
        <Box>
            <Navbar />
            <Box 
                padding="2rem 2rem"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="3%"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "25%" : "60%"}>
                    <WidgetUser userId={_id} picturePath={friendImagePath} />
                    {isNonMobileScreens && (
                 <Box flexBasis="26%">
                    <Box m="2rem 0" />
                 </Box>
                 )}
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : "80%"}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <PostsWidget userId={friendId} isProfile={true} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : "80%"}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <DiscoverPeople />
                </Box>
            </Box>
        </Box>
    );
}

export default ProfilePage;