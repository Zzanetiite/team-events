import { useEffect } from 'react';
import { AutoClearErrorProps } from '../interfaces/hookTypes';

const useAutoClearMessage = ({
  message,
  setMessage,
  timeout = 30_000, // 30 seconds
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
