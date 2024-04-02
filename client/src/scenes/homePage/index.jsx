import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import WidgetUser from "scenes/widgets/wUser";

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

                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;