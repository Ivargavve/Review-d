import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { Divider } from "@mui/material";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const gray = theme.palette.neutral.medium;
  return (
    <Box>
      <Box
        width="100%"
        sx={{
          backgroundImage: (theme) =>
            `linear-gradient(to right, ${theme.palette.background.alt} 0%, ${theme.palette.background.default} 100%)`,
        }}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography 
        fontFamily='"Pixelify Sans", sans-serif'
        fontSize="clamp(2rem, 2.2rem, 2.5rem)" 
        color="primary">
          Review --d
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "80%"}
        p="2rem"
        m="2rem auto"
        sx={{
          backgroundImage: (theme) =>
            `linear-gradient(${theme.palette.background.alt} 0%, ${theme.palette.background.default} 100%)`,
        }}
        color={theme.palette.neutral.main}
        textAlign="center"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Review, comment on and share your favorite courses.
        </Typography> 
        
        <Divider />

        <Typography fontWeight="600" variant="h3" sx={{ mb: "1.5rem", mt: "1.5rem" }}>
          Welcome!
        </Typography>
        <Form />
      </Box>
      <Typography
        color={gray}
        m="2rem"
        textAlign="center"
        fontFamily='"Pixelify Sans", sans-serif'
        fontSize="clamp(0.75rem, 0.75rem, 1.25rem)"
        
       >
          Made by Ivar Gavelin
      </Typography>
      
    </Box>
  );
};

export default LoginPage;