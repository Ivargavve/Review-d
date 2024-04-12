import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import WidgetUser from "scenes/widgets/wUser";
import MyPostWidget from "scenes/widgets/myPostWidget";
import PostsWidget from "scenes/widgets/postsWidget";
import FriendList from "scenes/widgets/friendList";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user); 
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
                    <WidgetUser userId={_id} picturePath={picturePath} />
                    {isNonMobileScreens && (
                 <Box flexBasis="26%">
                    <Box m="2rem 0" />
                    <FriendList userId={_id} />
                 </Box>
                 )}
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : "80%"}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <PostsWidget userId={_id} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "30%" : "60%"}>
                    <MyPostWidget picturePath={picturePath} />
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;