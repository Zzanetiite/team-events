import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { ConfirmActionProps } from '../../interfaces/types';

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  confirmOpen,
  setConfirmOpen,
  handleDelete,
  title = 'Are you sure?',
  description = 'Do you really want to perform this action? This cannot be undone.',
}) => {
  return (
    <div>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirmOpen(false);
              handleDelete();
            }}
            color="warning"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmAction;
