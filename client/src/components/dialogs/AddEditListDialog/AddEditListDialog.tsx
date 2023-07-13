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
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ShoppingListModel, ListItemModel } from "@models/shoppingList";
import { ShoppingListInputs } from "@/api/shoppingLists.api";
import * as ShoppingListApi from "@/api/shoppingLists.api";
import { checkIfInList } from "@/utils";
import { TextInputField } from "../../formFields/TextInputField";
import styles from "./AddEditListDialog.module.css";

type AddEditListDialogProps = {
  listToEdit?: ShoppingListModel;
  onClose: () => void;
  onListSave: (shoppingList: ShoppingListModel) => void;
  marketItems: ListItemModel[];
  basketItems?: ListItemModel[];
};

const AddEditListDialog = ({
  listToEdit,
  onClose,
  onListSave,
  marketItems,
  basketItems,
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
  const [selectedItems, setSelectedItems] = useState<ListItemModel[]>([]);
  const [listOptions, setListOptions] = useState<ListItemModel[]>([]);

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

  // Add or remove item from selected items list.
  const handleSelect = (option: ListItemModel): void => {
    const isInList = checkIfInList(selectedItems, option);

    if (isInList === true) {
      const remaining = selectedItems.filter(
        (item: ListItemModel) => item.name !== option.name
      );
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: ListItemModel[]) => [...prevItems, option]);
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Set list options to market items.
  useEffect(() => {
    if (marketItems && marketItems?.length !== 0) {
      setListOptions(marketItems);
    }
  }, [marketItems]);

  // Set list selected items value manually in the form.
  useEffect(() => {
    let existingListItems: ListItemModel[] = [];
    let selectedBasketItems: ListItemModel[] = [];

    if (listToEdit) {
      existingListItems = listToEdit.list;
    }

    if (basketItems) {
      selectedBasketItems = basketItems;
    }
    const allPossibleSelectedItems = [
      ...existingListItems,
      ...selectedBasketItems,
    ];
    setSelectedItems(allPossibleSelectedItems);
    setValue("list", allPossibleSelectedItems);
  }, [listToEdit, basketItems, setValue]);

  // Manually set selected form value when selected items change.
  useEffect(() => {
    setValue("list", selectedItems);
  }, [selectedItems]);

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
              <FormGroup className={styles.form_columns}>
                {listOptions.map((option) => {
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
                                checked={checkIfInList(selectedItems, option)}
                                onChange={() => handleSelect(option)}
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
