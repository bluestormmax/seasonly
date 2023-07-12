import { useState, useEffect } from "react";
import { Typography, CircularProgress, Link, Box, Button } from "@mui/material";
import { MarketItemModel } from "@models/marketItem";
import { useLoggedInUser } from "@/context/userContext";
import * as MarketItemsApi from "@api/marketItems.api";
import * as ShoppingListApi from "@api/shoppingLists.api";
import { ZoneData } from "@api/user.api";
import { ShoppingListInputs } from "@api/shoppingLists.api";
import { getStateFromZip } from "@/utils/getStateFromZip";
import { getMonthName } from "@/utils/dateHelpers";
import {
  AddEditListDialog,
  GrowingZoneInput,
  MarketItemsGrid,
} from "../../components";
import { ShoppingBasket } from "@mui/icons-material";

const InSeasonPage = () => {
  const { loggedInUser, defaultUser } = useLoggedInUser();
  const [usState, setUsState] = useState<string>(loggedInUser?.state || "");
  const [zone, setZone] = useState<ZoneData>(loggedInUser?.zone || {});
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showItemsLoadingError, setShowItemsLoadingError] = useState(false);
  const [marketItems, setMarketItems] = useState<MarketItemModel[]>([]);
  const [shoppingBasketItems, setShoppingBasketItems] = useState<string[]>([]);
  const [viewShoppingBasket, setViewShoppingBasket] = useState(false);
  const [month, setMonth] = useState<string>(getMonthName());

  function setUsStateFromZip(zip: string): void {
    const usState = getStateFromZip(zip);
    if (usState) {
      setUsState(usState);
    }
  }

  function addMarketItemToList(newItem: string) {
    setShoppingBasketItems([...shoppingBasketItems, ...newItem]);
  }

  function removeMarketItemFromList(itemToRemove: string) {
    const isPresent = shoppingBasketItems.indexOf(itemToRemove);

    if (isPresent !== -1) {
      const remaining = shoppingBasketItems.filter(
        (item: string) => item !== itemToRemove
      );
      setShoppingBasketItems(remaining);
    }
  }

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
          What's In Season
        </Typography>
        <GrowingZoneInput
          onZoneSet={(zone) => setZone(zone)}
          setUserState={(zip) => {
            setUsStateFromZip(zip);
          }}
        />
        {zone ? (
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

      {!itemsLoading ? (
        marketItems.length !== 0 ? (
          <>
            <Box
              className="grid-header"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" component="h5">
                {`${month}'s ${marketItems.length} most popular fruits and vegetables:`}{" "}
              </Typography>
              {shoppingBasketItems.length !== 0 ? (
                <Button
                  variant="text"
                  endIcon={<ShoppingBasket />}
                  onClick={() => setViewShoppingBasket(true)}
                >
                  View Shopping List
                </Button>
              ) : null}
            </Box>
            <MarketItemsGrid
              marketItems={marketItems}
              onBasketButtonClick={(item) => addMarketItemToList(item)}
              onRemoveButtonClick={(item) => removeMarketItemFromList(item)}
            />
            <Box textAlign="center">
              <Link href="https://www.pexels.com/" target="blank">
                Images provided by Pexels
              </Link>
            </Box>
          </>
        ) : null
      ) : (
        <CircularProgress />
      )}
      {viewShoppingBasket ? (
        <AddEditListDialog
          onClose={() => setViewShoppingBasket(false)}
          onListSave={() => {
            console.log("new list saved");
            setViewShoppingBasket(false);
          }}
          basketItems={shoppingBasketItems}
        />
      ) : null}
    </>
  );
};

export { InSeasonPage };
