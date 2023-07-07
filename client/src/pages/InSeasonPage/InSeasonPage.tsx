import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { User as UserModel } from "@models/user";
import { MarketItem as MarketItemModel } from "@models/marketItem";
import * as MarketItemsApi from "@api/marketItems.api";
import { ZoneData } from "@api/user.api";
import { getStateFromZip } from "@/utils/getStateFromZip";
import { GrowingZoneInput } from "../../components";

type InSeasonPageProps = {
  loggedInUser: UserModel | null;
};

const InSeasonPage = ({ loggedInUser }: InSeasonPageProps) => {
  const [usState, setUsState] = useState<string>("");
  const [zone, setZone] = useState<ZoneData | null>(null);
  const [marketItems, setMarketItems] = useState<MarketItemModel[]>([]);

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
    async function loadMarketItems() {
      try {
        // setShowListsLoadingError(false);
        // setListsLoading(true);
        const initialMarketItems = await MarketItemsApi.fetchAllMarketItems();
        setMarketItems(initialMarketItems);
      } catch (error) {
        console.error(error);
        // setShowListsLoadingError(true);
      } finally {
        // setListsLoading(false);
      }
    }
    loadMarketItems();
  }, []);

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
      {marketItems ? (
        <Box>
          {marketItems.map((item) => (
            <h3 key={item.name}>{item.displayName}</h3>
          ))}
        </Box>
      ) : null}
    </>
  );
};

export { InSeasonPage };
