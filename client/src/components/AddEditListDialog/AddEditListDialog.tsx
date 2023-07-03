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
import { TextInputField } from "../FormFields/TextInputField";

type AddEditListDialogProps = {
  listToEdit?: ShoppingList;
  onClose: () => void;
  onListSave: (shoppingList: ShoppingList) => void;
};

const AddEditListDialog = ({
  listToEdit,
  onClose,
  onListSave,
}: AddEditListDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShoppingListInput>({
    defaultValues: {
      title: listToEdit?.title || "",
      list: listToEdit?.list || "",
    },
  });

  const handleClose = () => {
    onClose();
  };

  async function onListSubmit(input: ShoppingListInput) {
    try {
      let listResponse: ShoppingList;
      if (listToEdit) {
        listResponse = await ShoppingListApi.updateShoppingList(
          listToEdit._id,
          input
        );
      } else {
        listResponse = await ShoppingListApi.createShoppingList(input);
      }

      onListSave(listResponse);
    } catch (error) {
      console.error(error);
      alert(error); // TODO: dev only.
    }
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>
        {listToEdit ? "Edit Shopping List" : "Add New Shopping List"}
      </DialogTitle>
      <DialogContent>
        <form id="addEditListForm" onSubmit={handleSubmit(onListSubmit)}>
          <Stack my={2}>
            <TextInputField
              name="title"
              label="Title"
              register={register}
              registerOptions={{
                required: "A list title is required!",
              }}
              error={errors.title}
            />
          </Stack>
          <Stack>
            <TextInputField
              name="list"
              label="List"
              multiline
              rows={4}
              register={register}
              registerOptions={{ required: "List items are required!" }}
              error={errors.list}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <IconButton
          onClick={handleClose}
          title={listToEdit ? `Cancel editing list` : `Cancel saving list`}
        >
          <Close />
        </IconButton>
        <Button form="addEditListForm" type="submit" disabled={isSubmitting}>
          {listToEdit ? "Update list" : "Save List"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddEditListDialog };
