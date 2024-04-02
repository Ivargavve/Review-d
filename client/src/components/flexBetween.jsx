import { Box } from '@mui/material';
import { styled } from '@mui/system';

// This component is used to wrap content of a box in some standard css properties

const FlexBetween = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export default FlexBetween;