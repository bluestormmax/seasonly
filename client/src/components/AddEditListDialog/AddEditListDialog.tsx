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
import { ShoppingList } from "@models/shoppingList";
import { useForm } from "react-hook-form";
import { ShoppingListInput } from "@/api/shoppingLists.api";
import * as ShoppingListApi from "@/api/shoppingLists.api";

type AddEditListDialogProps = {
  onClose: () => void;
  onListSave: (shoppingList: ShoppingList) => void;
};

const AddEditListDialog = ({ onClose, onListSave }: AddEditListDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShoppingListInput>();

  const handleClose = () => {
    onClose();
  };

  async function onListSubmit(input: ShoppingListInput) {
    try {
      const listResponse = await ShoppingListApi.createShoppingList(input);
      onListSave(listResponse);
    } catch (error) {
      console.error(error);
      alert(error); // TODO: dev only.
    }
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Add New Shopping List</DialogTitle>
      <DialogContent>
        <form id="addListForm" onSubmit={handleSubmit(onListSubmit)}>
          <Stack my={2}>
            <TextField
              id="list-title-input"
              label="Title"
              variant="outlined"
              {...register("title", { required: "A list title is required!" })}
              helperText={errors.title?.message}
              error={!!errors.title}
            />
          </Stack>
          <Stack>
            <TextField
              id="list-content-input"
              label="List"
              variant="outlined"
              multiline
              rows={4}
              {...register("list", { required: "List items are required!" })}
              helperText={errors.list?.message}
              error={!!errors.list}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
        <Button form="addListForm" type="submit" disabled={isSubmitting}>
          Save List
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddEditListDialog };
