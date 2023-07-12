import { useState, useEffect } from "react";
import { Typography, CircularProgress, Link, Box } from "@mui/material";
import { MarketItemModel } from "@models/marketItem";
import * as MarketItemsApi from "@api/marketItems.api";
import * as ShoppingListApi from "@api/shoppingLists.api";
import { ZoneData } from "@api/user.api";
import { getStateFromZip } from "@/utils/getStateFromZip";
import { getMonthName } from "@/utils/dateHelpers";
import { GrowingZoneInput, MarketItemsGrid } from "../../components";

const InSeasonPage = () => {
  const [usState, setUsState] = useState<string>("");
  const [zone, setZone] = useState<ZoneData>();
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showItemsLoadingError, setShowItemsLoadingError] = useState(false);
  const [marketItems, setMarketItems] = useState<MarketItemModel[]>([]);
  const [shoppingListItems, setShoppingListItems] = useState<string[]>([]);
  const [month, setMonth] = useState<string>(getMonthName());

  function setUsStateFromZip(zip: string): void {
    const usState = getStateFromZip(zip);
    if (usState) {
      setUsState(usState);
    }
  }

  function addMarketItemToList(newItem: string) {
    setShoppingListItems([...shoppingListItems, ...newItem]);
  }

  function removeMarketItemFromList(itemToRemove: string) {
    const isPresent = shoppingListItems.indexOf(itemToRemove);

    if (isPresent !== -1) {
      const remaining = shoppingListItems.filter(
        (item: string) => item !== itemToRemove
      );
      setShoppingListItems(remaining);
    }
  }

  async function saveShoppingListFromMarketItems() {
    const newShoppingListInputs = {
      title: "Shopping List from Market Items",
      list: [...shoppingListItems],
    };
    try {
      // send list items
    } catch (error) {
      console.log(error);
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
            <Typography variant="h5" component="h5">
              {`${month}'s ${marketItems.length} most popular fruits and vegetables:`}{" "}
            </Typography>
            <MarketItemsGrid marketItems={marketItems} />
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
    </>
  );
};

export { InSeasonPage };
