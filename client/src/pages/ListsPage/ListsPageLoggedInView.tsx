import { useState, useEffect } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { ListItemModel, ShoppingListModel } from "@models/shoppingList";
import { MarketItemModel } from "@models/marketItem";
import * as ShoppingListsApi from "@api/shoppingLists.api";
import * as MarketItemsApi from "@api/marketItems.api";
import { getMonthName } from "@utils/dateHelpers";
import { useLoggedInUser } from "@/context/userContext";
import { ShoppingList, GridWrapper, AddEditListDialog } from "../../components";

const ListsPageLoggedInView = () => {
  const { loggedInUser } = useLoggedInUser();
  const [inSeasonOptions, setInSeasonOptions] = useState<ListItemModel[]>([]);
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

  useEffect(() => {
    async function loadInSeasonMarketItems() {
      const seasonalData = {
        zone: loggedInUser?.zone?.zone,
        month: getMonthName(),
      };
      try {
        const inSeasonItems: MarketItemModel[] =
          await MarketItemsApi.fetchInSeasonMarketItems(seasonalData);
        const inSeasonOptions: ListItemModel[] = inSeasonItems.map((item) => {
          return { name: item.name, displayName: item.displayName };
        });
        setInSeasonOptions(inSeasonOptions);
      } catch (error) {
        console.log(error);
      }
    }
    loadInSeasonMarketItems();
  }, [loggedInUser?.zone?.zone]);

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
    <>
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
          marketItems={inSeasonOptions}
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
          marketItems={inSeasonOptions}
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
    </>
  );
};

export { ListsPageLoggedInView };
