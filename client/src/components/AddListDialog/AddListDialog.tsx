import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";

type AddListDialogProps = {
  onClose: () => void;
};

const AddListDialog = ({ onClose }: AddListDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Add New Shopping List</DialogTitle>
      <DialogContent>
        <form id="addListForm">
          <Stack my={2}>
            <TextField id="list-title-input" label="Title" variant="outlined" />
          </Stack>
          <Stack>
            <TextField
              id="list-content-input"
              label="List"
              variant="outlined"
              multiline
              rows={4}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
        <Button form="addListForm" type="submit" onSubmit={handleSubmit}>
          Save List
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddListDialog };
