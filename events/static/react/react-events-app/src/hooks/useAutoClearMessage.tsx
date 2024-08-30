import { useEffect } from 'react';
import { AutoClearErrorProps } from '../interfaces/hookTypes';

const useAutoClearMessage = ({
  message,
  setMessage,
  timeout = 4000,
}: AutoClearErrorProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage, timeout]);
};

export default useAutoClearMessage;
