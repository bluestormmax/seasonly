import { useState, useEffect } from "react";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  FormLabel,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  FormHelperText,
} from "@mui/material";
import {
  ShoppingList as ShoppingListModel,
  ListItem as ListItemModel,
} from "@models/shoppingList";
import { useForm, Controller } from "react-hook-form";
import { ShoppingListInputs } from "@/api/shoppingLists.api";
import * as ShoppingListApi from "@/api/shoppingLists.api";
import { TextInputField } from "../../formFields/TextInputField";

type AddEditListDialogProps = {
  listToEdit?: ShoppingListModel;
  onClose: () => void;
  onListSave: (shoppingList: ShoppingListModel) => void;
};

type ListOption = {
  name: string;
  displayName: string;
};

const AddEditListDialog = ({
  listToEdit,
  onClose,
  onListSave,
}: AddEditListDialogProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShoppingListInputs>({
    defaultValues: {
      title: listToEdit?.title || "",
      list: listToEdit?.list || [],
    },
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  async function onListSubmit(input: ShoppingListInputs) {
    try {
      let listResponse: ShoppingListModel;
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

  const options = [
    { name: "apples", displayName: "Apples" },
    { name: "pears", displayName: "Pears" },
    { name: "garlic", displayName: "Garlic" },
  ];

  const handleSelect = (value: string): void => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value]);
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const selectedMarketItems: ListItemModel[] = [];
    selectedItems.forEach((item) => {
      const itemObj = { name: item, displayName: item };
      selectedMarketItems.push(itemObj);
    });
    setValue("list", selectedMarketItems);
  }, [selectedItems, setValue]);

  console.log("ERRORS: ", errors);

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
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
            <FormControl
              size={"small"}
              variant={"outlined"}
              required
              error={Boolean(errors.list)}
            >
              <FormLabel component="legend">In-Season Market Items:</FormLabel>
              <FormGroup>
                {options.map((option: ListOption) => {
                  return (
                    <FormControlLabel
                      control={
                        <Controller
                          name={"list"}
                          rules={{
                            required:
                              "You must select some items to save this list",
                          }}
                          render={() => {
                            return (
                              <Checkbox
                                key={option.name}
                                checked={selectedItems.includes(option.name)}
                                onChange={() => handleSelect(option.name)}
                              />
                            );
                          }}
                          control={control}
                        />
                      }
                      label={option.displayName}
                      key={option.name}
                    />
                  );
                })}
              </FormGroup>
              {errors.list && errors.list.message ? (
                <FormHelperText>{errors.list.message}</FormHelperText>
              ) : null}
            </FormControl>
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
