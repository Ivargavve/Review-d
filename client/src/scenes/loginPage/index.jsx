import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="88%"
        backgroundColor={theme.palette.background.default}
        p="1rem 6%"
        textAlign="center"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Review --d
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "80%"}
        p="2rem"
        m="2rem auto"
        backgroundColor={theme.palette.background.default}
        color={theme.palette.neutral.main}
        textAlign="center"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Review, comment on and share your favorite courses. <br /><strong>Welcome to Review --d!</strong>
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;