import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { useApi } from '../../hooks/useApi';
import { useTokens } from '../../context/TokenContext';
import { ApiEndpoints } from '../../constants';
import { EventNote } from '@mui/icons-material';

export default function NavBar() {
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

  const handleEventsButton = React.useCallback(() => {
    window.location.href = '/myevents';
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
              onClick={handleEventsButton}
            >
              {loggedIn ? <EventNote /> : null}
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
