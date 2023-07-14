/* eslint-disable no-inner-declarations */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { ShoppingBasket } from "@mui/icons-material";
import { MarketItemModel } from "@models/marketItem";
import { ListItemModel } from "@models/shoppingList";
import { useLoggedInUser } from "@/context/userContext";
import * as MarketItemsApi from "@api/marketItems.api";
import { ZoneData } from "@api/user.api";
import { getStateFromZip, getMonthName, checkIfInList } from "@/utils";
import {
  AddEditListDialog,
  GrowingZoneInput,
  MarketItemsGrid,
} from "../../components";

const InSeasonPage = () => {
  const { loggedInUser } = useLoggedInUser();
  const [usState, setUsState] = useState<string>(loggedInUser?.state || "");
<<<<<<< HEAD
<<<<<<< HEAD
  const [zone, setZone] = useState<ZoneData | resetZone>(
    loggedInUser?.zone || {}
  );
=======
  const [zone, setZone] = useState<ZoneData>(loggedInUser?.zone || {});
>>>>>>> parent of 6f8def4 (Update ts warnings)
=======
  const [zone, setZone] = useState<ZoneData | {}>(loggedInUser?.zone || {});
>>>>>>> parent of 9056d0a (Set reset zone type to clear ts warnings)
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showItemsLoadingError, setShowItemsLoadingError] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [marketItems, setMarketItems] = useState<MarketItemModel[]>([]);
  const [shoppingBasketItems, setShoppingBasketItems] = useState<
    ListItemModel[]
  >([]);
  const [viewShoppingBasket, setViewShoppingBasket] = useState(false);
  const [month] = useState<string>(getMonthName());

  function setUsStateFromZip(zip: string): void {
    const usState = getStateFromZip(zip);
    if (usState) {
      setUsState(usState);
    }
  }

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  function addMarketItemToList(newItem: MarketItemModel): void {
    const newItemFormatted = {
      name: newItem.name,
      displayName: newItem.displayName,
    };
    const isInList = checkIfInList(shoppingBasketItems, newItemFormatted);

    // Item is not in the list, add it.
    if (isInList === false) {
      const otherItems = shoppingBasketItems.filter((item) => {
        return item.name !== newItemFormatted.name;
      });
      const combinedBasketItems: ListItemModel[] = [
        ...otherItems,
        newItemFormatted,
      ];
      setShoppingBasketItems(combinedBasketItems);
    }
  }

  // Item is in the list, remove it.
  function removeMarketItemFromList(itemToRemove: MarketItemModel): void {
    const remainingItems = shoppingBasketItems.filter(
      (item: ListItemModel) => item.name !== itemToRemove.name
    );
    setShoppingBasketItems(remainingItems);
  }

  // Set logged in user data if available.
  useEffect(() => {
    if (loggedInUser?.username !== "" && loggedInUser?.zone.zone !== "") {
      setZone(loggedInUser?.zone);
      setUsState(loggedInUser?.state);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (zone?.zone) {
      async function loadInSeasonMarketItems() {
        const seasonalData = { zone: zone?.zone, month: month };
        try {
          setShowItemsLoadingError(false);
          setItemsLoading(true);
          const initialMarketItems =
            await MarketItemsApi.fetchInSeasonMarketItems(seasonalData);

          setMarketItems(initialMarketItems);
        } catch (error) {
          console.error(error);
          setShowItemsLoadingError(true);
        } finally {
          setItemsLoading(false);
        }
      }
      loadInSeasonMarketItems();
    }
  }, [zone, month]);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          className="heading welcome"
          variant="h3"
          component="h1"
          mb={3}
        >
          What's In Season?
        </Typography>
        <GrowingZoneInput
          onZoneSet={(zone) => setZone(zone)}
          setUserState={(zip) => {
            setUsStateFromZip(zip);
          }}
        />
        {zone.zone !== "" ? (
          <Typography component="p" variant="body1" sx={{ p: "32px 0" }}>
            <strong>
              <em>{`${
                !itemsLoading ? `Showing` : `Fetching`
              } the harvest data for:`}</em>{" "}
              {`Hardiness zone ${zone?.zone} in 
            ${usState}`}
            </strong>
          </Typography>
        ) : null}
      </Box>
      {showItemsLoadingError ? (
        <Alert severity="error">
          Something went wrong while loading items.
        </Alert>
      ) : null}
      {!itemsLoading && !showItemsLoadingError ? (
        marketItems.length !== 0 ? (
          <>
            <Box
              className="grid-header"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" component="h5" pb={"6px"}>
                {`${month}'s ${marketItems.length} most popular fruits and vegetables:`}{" "}
              </Typography>
              {shoppingBasketItems.length !== 0 ? (
                <Button
                  endIcon={<ShoppingBasket />}
                  onClick={() => setViewShoppingBasket(true)}
                  variant="contained"
                >
                  View Shopping List
                </Button>
              ) : null}
            </Box>
            <MarketItemsGrid
              marketItems={marketItems}
              onBasketButtonClick={(item) => addMarketItemToList(item)}
              onRemoveButtonClick={(item) => removeMarketItemFromList(item)}
              onSnackBarLinkClick={() => setViewShoppingBasket(true)}
              onViewListButtonClick={() => setViewShoppingBasket(true)}
            />
            <Box textAlign="center">
              <Link to="https://www.pexels.com/" target="blank">
                Images provided by Pexels
              </Link>
            </Box>
            <Snackbar
              open={snackBarOpen}
              autoHideDuration={5000}
              onClose={handleSnackBarClose}
            >
              <Alert
                onClose={handleSnackBarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                New shopping list saved.{" "}
                <Link to="shopping-lists">View your saved lists</Link>
              </Alert>
            </Snackbar>
          </>
        ) : null
      ) : (
        <CircularProgress />
      )}
      {viewShoppingBasket ? (
        <AddEditListDialog
          onClose={() => setViewShoppingBasket(false)}
          onListSave={() => {
            setSnackBarOpen(true);
            setShoppingBasketItems([]);
            setViewShoppingBasket(false);
          }}
          basketItems={shoppingBasketItems}
          marketItems={marketItems}
        />
      ) : null}
    </>
  );
};

export { InSeasonPage };
