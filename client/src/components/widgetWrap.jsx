import { Box } from "@mui/material";
import { styled } from "@mui/system";

// This component is used to wrap widgets in a container that provides padding and a background color.

const WidgetWrap = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.default,
}));

export default WidgetWrap;