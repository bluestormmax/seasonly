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

type AddListDialogProps = {
  onClose: () => void;
  onListSave: (shoppingList: ShoppingList) => void;
};

const AddListDialog = ({ onClose, onListSave }: AddListDialogProps) => {
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
              {...register("title", { required: "Required" })}
            />
          </Stack>
          <Stack>
            <TextField
              id="list-content-input"
              label="List"
              variant="outlined"
              multiline
              rows={4}
              {...register("list", { required: "Required" })}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
        <Button form="addListForm" type="submit">
          Save List
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddListDialog };
