import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

const Row = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

Row.displayName = 'Row';

export default Row;
