import { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { ShoppingList as ShoppingListModel } from "@models/shoppingList";
import { ShoppingList, GridWrapper, AddEditListDialog } from "./components";
import * as ShoppingListsApi from "./api/shoppingLists.api";

function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListModel[]>([]);
  const [openAddEditListDialog, setOpenAddEditListDialog] = useState(false);
  const [listToEdit, setListToEdit] = useState<ShoppingListModel | null>(null);

  useEffect(() => {
    async function loadShoppingLists() {
      try {
        const initialShoppingLists =
          await ShoppingListsApi.fetchShoppingLists();
        setShoppingLists(initialShoppingLists);
      } catch (error) {
        console.error(error);
        alert(error); // TODO: dev only.
      }
    }
    loadShoppingLists();
  }, []);

  async function deleteList(shoppingList: ShoppingListModel) {
    try {
      await ShoppingListsApi.deleteShoppingList(shoppingList._id);
      setShoppingLists(
        shoppingLists.filter(
          (existingList) => existingList._id !== shoppingList._id
        )
      );
    } catch (error) {
      console.error(error);
      alert(error); // TODO: dev only
    }
  }

  return (
    <div className="app wrapper">
      <Typography className="heading welcome" variant="h1" component="h1">
        lists!
      </Typography>
      {shoppingLists ? (
        <GridWrapper>
          {shoppingLists.map((item) => (
            <ShoppingList
              key={item._id}
              shoppingList={item}
              onDeleteListClicked={deleteList}
              onEditListClicked={setListToEdit}
            />
          ))}
        </GridWrapper>
      ) : null}
      {openAddEditListDialog ? (
        <AddEditListDialog
          onClose={() => setOpenAddEditListDialog(false)}
          onListSave={(newShoppingList) => {
            setShoppingLists([...shoppingLists, newShoppingList]);
            setOpenAddEditListDialog(false);
          }}
        />
      ) : null}
      {listToEdit ? (
        <AddEditListDialog
          listToEdit={listToEdit}
          onClose={() => setListToEdit(null)}
          onListSave={(updatedList) => {
            setShoppingLists(
              shoppingLists.map((existingList) =>
                existingList._id === updatedList._id
                  ? updatedList
                  : existingList
              )
            );
            setListToEdit(null);
          }}
        />
      ) : null}
      <IconButton
        size="small"
        edge="start"
        onClick={() => setOpenAddEditListDialog(true)}
        title="Add Shopping List"
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default App;
