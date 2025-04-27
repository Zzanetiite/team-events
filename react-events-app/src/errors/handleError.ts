import { ErrorMessages } from '../constants';
import { HandleErrorProps } from '../interfaces/types';

export const handleError = ({
  error,
  setErrorMessage,
  setSuccessMessage,
  messageForBadRequest,
  overrideErrorHandlers,
}: HandleErrorProps) => {
  if (overrideErrorHandlers && overrideErrorHandlers[error.status]) {
    overrideErrorHandlers[error.status](setErrorMessage);
  } else {
    switch (error.status) {
      case 400:
        setErrorMessage(ErrorMessages.BAD_REQUEST);
        break;
      case 409:
        if (messageForBadRequest) {
          setErrorMessage(messageForBadRequest);
        } else {
          setErrorMessage(ErrorMessages.BAD_REQUEST);
        }
        break;
      case 401:
        setErrorMessage(ErrorMessages.UNAUTHORIZED);
        break;
      case 403:
        setErrorMessage(ErrorMessages.FORBIDDEN);
        break;
      case 404:
        setErrorMessage(ErrorMessages.NOT_FOUND);
        break;
      case 500:
        setErrorMessage(ErrorMessages.SERVER_ERROR);
        break;
      default:
        setErrorMessage(ErrorMessages.UNKNOWN_ERROR);
        break;
    }
  }
  if (setSuccessMessage) {
    setSuccessMessage(null);
  }
};
