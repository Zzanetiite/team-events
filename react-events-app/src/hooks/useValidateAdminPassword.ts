import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { REACT_APP_ADMIN_CREATE_PAGE_PASSWORD } from '../constants';
import { useValidateAdminPasswordProps } from '../interfaces/hookTypes';

const useValidateAdminPassword = ({
  successMessageText,
}: useValidateAdminPasswordProps) => {
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { loggedIn, setAdminPassword, adminPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (adminPassword && !errorMessage) {
      navigate('/createadmin');
    }
  }, [adminPassword, errorMessage, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (REACT_APP_ADMIN_CREATE_PAGE_PASSWORD === password) {
      setSuccessMessage(successMessageText);
      setErrorMessage(null);
      setAdminPassword(password);
      return;
    } else {
      setErrorMessage('Password wrong.');
    }
  };

  return {
    password,
    setPassword,
    successMessage,
    errorMessage,
    handleSubmit,
  };
};

export default useValidateAdminPassword;
