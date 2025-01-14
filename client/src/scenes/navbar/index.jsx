import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setSearchInput } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/flexBetween.jsx";
<style>

</style>

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [inputValue, setInputValue] = useState(''); // Local state for input value
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // setup theme colors
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleSearchInputChange = (e) => {
    setInputValue(e.target.value); // Update local state for input value
  };

  const handleSearch = () => {
    console.log('Enter key pressed: ' + inputValue);
    dispatch(setSearchInput({ searchInput: inputValue })); // Dispatch action to update global state
    setInputValue(''); // Clear the local input value state
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleIconClick = () => {
    handleSearch();
  };

  return (
    <Box 
      position="sticky"
      top={0}
      zIndex={1000}
    >
    <FlexBetween 
      padding="1rem 6%" 
      sx={{
        backgroundImage: (theme) =>
          `linear-gradient(to right, ${theme.palette.background.default} 0%, ${theme.palette.background.alt} 100%)`,
      }}
      >
      <FlexBetween gap="3rem">
        <Typography 
          fontFamily='"Pixelify Sans", sans-serif'
          fontSize="clamp(2rem, 2.2rem, 2.5rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Review --d
        </Typography>
        {isNonMobileScreens && (
          <Box
            backgroundColor={neutralLight}
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase 
              placeholder="TNM111..."
              value={inputValue}
              onChange={handleSearchInputChange} // Update local input value
              onKeyDown={handleKeyPress} // Call function when Enter key is pressed
            />
            <IconButton onClick={handleIconClick}>
            <img src="/orange.png" alt="img" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
            </IconButton>
          </Box>
        )
        }
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => 
                  dispatch(setLogout())
                  }>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
    </Box>
  );
};

export default Navbar;