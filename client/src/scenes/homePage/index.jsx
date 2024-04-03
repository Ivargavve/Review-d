import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import WidgetUser from "scenes/widgets/wUser";
import MyPostWidget from "scenes/widgets/myPostWidget";
import PostWidget from "scenes/widgets/postWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user); 
    return ( 
        <Box>
            <Navbar/>
            <Box 
                padding="2rem 2rem"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="10%"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "30%" : "80%"}>
                    <WidgetUser userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "50%" : "80%"}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostWidget
                        postId="1"
                        postUserId="1"
                        name="John Doe"
                        description="This is my first post"
                        picturePath="post1.jpg"
                        userPicturePath="user1.jpg"
                        likes={{ "1": true, "2": true }}
                        comments={[]}
                     />
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;