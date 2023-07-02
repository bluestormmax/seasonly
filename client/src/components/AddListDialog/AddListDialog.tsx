import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";

type AddListDialogProps = {
  onClose: () => void;
};

const AddListDialog = ({ onClose }: AddListDialogProps) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Add New Shopping List</DialogTitle>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
        <Button onClick={handleClose}>Save List</Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddListDialog };
