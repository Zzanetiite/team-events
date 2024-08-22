import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { useApi } from '../../hooks/useApi';
import { useTokens } from '../../context/TokenContext';
import { ApiEndpoints } from '../../constants';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { fetchWithTokens } = useApi();
  const { setUserToken, setLoggedIn, loggedIn } = useTokens();
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    const fetchUsername = async () => {
      try {
        const data = await fetchWithTokens(ApiEndpoints.GET_USERNAME);
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (loggedIn) {
      fetchUsername();
    } else {
      setUsername('');
    }
  }, [fetchWithTokens, loggedIn]);

  const handleLogout = React.useCallback(async () => {
    try {
      const response = await fetchWithTokens(ApiEndpoints.LOGOUT, {
        method: 'POST',
      });
      if (response) {
        setUserToken(null);
        setLoggedIn(false);
        window.location.href = '/login';
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setUserToken(null);
      setLoggedIn(false);
    }
  }, [fetchWithTokens, setUserToken, setLoggedIn]);

  const handleLogin = React.useCallback(() => {
    window.location.href = '/login';
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Team Events
            </Typography>
          </a>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search events…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {username}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="events-list"
              color="inherit"
              onClick={() => console.log('Events button clicked')}
            >
              {loggedIn ? <EventRepeatIcon /> : null}
            </IconButton>
            <IconButton
              size="large"
              aria-label={loggedIn ? 'logout' : 'login'}
              color="inherit"
              onClick={loggedIn ? handleLogout : handleLogin}
            >
              {loggedIn ? <Logout /> : <Login />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
