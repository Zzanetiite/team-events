import * as React from 'react';
import { LocationOn } from '@mui/icons-material';
import { Box, SvgIconProps } from '@mui/material';
import { PlaceTypeIcons, PlaceTypes } from '../../constants';
import { extractPostcode } from '../../utils/address';

interface EventHeaderProps {
  eventTitle: string;
  placeType: PlaceTypes;
  address: string;
}

const iconStyle = {
  marginRight: '4px',
  fontSize: 16,
};

const createStyledIcon =
  (IconComponent: React.ComponentType<SvgIconProps>) =>
  (props: SvgIconProps) => (
    <IconComponent {...props} sx={{ ...iconStyle, ...props.sx }} />
  );

const EventHeader: React.FC<EventHeaderProps> = ({
  eventTitle,
  placeType,
  address,
}) => {
  return (
    <div>
      <Box
        component="h4"
        sx={{
          mt: 0,
          mb: 0,
          fontWeight: 'bold',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {eventTitle}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
          {createStyledIcon(PlaceTypeIcons[placeType])({})}
          <span>{placeType}</span>
        </Box>
        <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
          <LocationOn sx={{ marginRight: '4px', fontSize: 16 }} />
          <span>{extractPostcode(address)}</span>
        </Box>
      </Box>
    </div>
  );
};

export default EventHeader;
