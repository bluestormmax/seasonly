import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { User as UserModel } from "@models/user";
import { MarketItem as MarketItemModel } from "@models/marketItem";
import * as MarketItemsApi from "@api/marketItems.api";
import { ZoneData } from "@api/user.api";
import { getStateFromZip } from "@/utils/getStateFromZip";
import { getMonthName } from "@/utils/dateHelpers";
import { GrowingZoneInput } from "../../components";

type InSeasonPageProps = {
  loggedInUser: UserModel | null;
};

const InSeasonPage = ({ loggedInUser }: InSeasonPageProps) => {
  const [usState, setUsState] = useState<string>("");
  const [zone, setZone] = useState<ZoneData>();
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showItemsLoadingError, setShowItemsLoadingError] = useState(false);
  const [marketItems, setMarketItems] = useState<MarketItemModel[]>([]);
  const [month, setMonth] = useState<string>(getMonthName());

  const zoneText = `Your growing zone is: ${zone?.zone} in ${usState}`;

  function setUsStateFromZip(zip: string): void {
    const state = getStateFromZip(zip);

    if (state) {
      setUsState(state);
    }
  }

  useEffect(() => {
    if (loggedInUser) {
      setUsState(loggedInUser.state);
      setZone(loggedInUser.zone);
    }
  });

  useEffect(() => {
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
  }, [zone, month]);

  return (
    <>
      <Typography
        className="heading welcome"
        variant="h3"
        component="h1"
        mb={3}
      >
        What's In Season
      </Typography>
      {zone ? <Typography>{zoneText}</Typography> : null}
      <GrowingZoneInput
        onZoneSet={(zone) => setZone(zone)}
        setUserState={(zip) => {
          setUsStateFromZip(zip);
        }}
      />

      {!itemsLoading ? (
        marketItems ? (
          <Box>
            {marketItems.map((item) => (
              <h3 key={item.name}>{item.displayName}</h3>
            ))}
          </Box>
        ) : null
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export { InSeasonPage };
