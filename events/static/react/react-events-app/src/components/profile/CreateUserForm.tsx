import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useApi } from '../../hooks/useApi';

const CreateUserForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { fetchWithCSRF } = useApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchWithCSRF(`/api/create-admin-user/`, {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
    })
      .then(() => alert('Admin user created successfully'))
      .then(() => setUsername(''))
      .then(() => setPassword(''))
      .then(() => setEmail(''))
      .catch((error: any) =>
        console.error('Error creating admin user:', error)
      );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Create Admin User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column">
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create Admin User
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateUserForm;
