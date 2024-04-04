import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import WidgetUser from "scenes/widgets/wUser";
import MyPostWidget from "scenes/widgets/myPostWidget";
import PostsWidget from "scenes/widgets/postsWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user); 
    return ( 
        <Box>
            <Navbar/>
            <Box 
                padding="2rem 2rem"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="3%"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "25%" : "60%"}>
                    <WidgetUser userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : "80%"}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <PostsWidget userId={_id} />
                    {/* <PostWidget
                        postId="1"
                        postUserId="1"
                        name="John Doe"
                        description='This is my first review here on Review --d. I hope you like it! :) I really like the course and I think you will too!'    
                        picturePath={picturePath}
                        userPicturePath="user1.jpg"
                        likes={{ "1": true, "2": true }}
                        comments={[]}
                     /> */}
                </Box>
                <Box flexBasis={isNonMobileScreens ? "30%" : "60%"}>
                    <MyPostWidget picturePath={picturePath} />
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;