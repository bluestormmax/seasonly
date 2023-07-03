import { useState, useEffect } from "react";
import { Typography, IconButton, CircularProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { ShoppingList as ShoppingListModel } from "@models/shoppingList";
import {
  ShoppingList,
  GridWrapper,
  AddEditListDialog,
  SignUpDialog,
  LoginDialog,
} from "./components";
import * as ShoppingListsApi from "@api/shoppingLists.api";

function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListModel[]>([]);
  const [listsLoading, setListsLoading] = useState(true);
  const [showListsLoadingError, setShowListsLoadingError] = useState(false);
  const [openAddEditListDialog, setOpenAddEditListDialog] = useState(false);
  const [listToEdit, setListToEdit] = useState<ShoppingListModel | null>(null);

  useEffect(() => {
    async function loadShoppingLists() {
      try {
        setShowListsLoadingError(false);
        setListsLoading(true);
        const initialShoppingLists =
          await ShoppingListsApi.fetchShoppingLists();
        setShoppingLists(initialShoppingLists);
      } catch (error) {
        console.error(error);
        setShowListsLoadingError(true);
      } finally {
        setListsLoading(false);
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

  const listsGrid = (
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
  );

  return (
    <div className="app wrapper">
      <Typography className="heading welcome" variant="h1" component="h1">
        lists!
      </Typography>
      {listsLoading ? <CircularProgress /> : null}
      {showListsLoadingError ? (
        <p>Something went wrong while loading lists.</p>
      ) : null}
      {!listsLoading && !showListsLoadingError ? (
        <>
          {shoppingLists.length > 0 ? (
            listsGrid
          ) : (
            <p>No saved shopping lists yet.</p>
          )}
        </>
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
      {false && (
        <SignUpDialog onDismiss={() => {}} onSignupSuccess={() => {}} />
      )}
      {true && <LoginDialog onDismiss={() => {}} onLoginSuccess={() => {}} />}
    </div>
  );
}

export default App;
