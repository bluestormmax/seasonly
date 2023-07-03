import { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { ShoppingList as ShoppingListModel } from "@models/shoppingList";
import { ShoppingList, GridWrapper, AddListDialog } from "./components";
import * as ShoppingListsApi from "./api/shoppingLists.api";

function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListModel[]>([]);
  const [openAddListDialog, setOpenAddListDialog] = useState(false);

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

  return (
    <div className="app wrapper">
      <Typography className="heading welcome" variant="h1" component="h1">
        lists!
      </Typography>
      {shoppingLists ? (
        <GridWrapper>
          {shoppingLists.map((item) => (
            <ShoppingList key={item._id} shoppingList={item} />
          ))}
        </GridWrapper>
      ) : null}
      {openAddListDialog ? (
        <AddListDialog
          onClose={() => setOpenAddListDialog(false)}
          onListSave={() => {}}
        />
      ) : null}
      <IconButton
        size="small"
        edge="start"
        onClick={() => setOpenAddListDialog(true)}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default App;
