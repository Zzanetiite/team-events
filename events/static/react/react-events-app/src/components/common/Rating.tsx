// https://mui.com/material-ui/react-rating/
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { VolumeMute, VolumeUp } from '@mui/icons-material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#33a1b0',
  },
  '& .MuiRating-iconHover': {
    color: '#cdf0f4',
  },
});

interface RatingProps {
  placeRating: number;
  loudnessRating: number;
}

const Ratings: React.FC<RatingProps> = ({ placeRating, loudnessRating }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-left',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        padding: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Rating
          name="place-rating"
          defaultValue={placeRating}
          max={5}
          size="small"
        />
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', marginTop: '2px', ml: 1 }}
        >
          {placeRating}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StyledRating
          name="loudness-rating"
          defaultValue={loudnessRating}
          icon={<VolumeUp fontSize="inherit" />}
          emptyIcon={<VolumeMute fontSize="inherit" />}
          size="small"
        />
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', marginTop: '2px', ml: 1 }}
        >
          {loudnessRating}
        </Typography>
      </Box>
    </Box>
  );
};

export default Ratings;
