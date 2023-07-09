import { useState, useEffect } from "react";
import { createClient } from "pexels";
import { Box, Typography, CircularProgress, Link } from "@mui/material";
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
  const pexelsClient = createClient(
    "3QhQS8c66nweCU5fbJq5qouyYBQaC3vi0URYkWdyYuXHPAPvoGlzYnTH"
  );

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
    if (zone) {
      async function loadInSeasonMarketItems() {
        const seasonalData = { zone: zone?.zone, month: month };
        try {
          setShowItemsLoadingError(false);
          setItemsLoading(true);
          const initialMarketItems =
            await MarketItemsApi.fetchInSeasonMarketItems(seasonalData);

          console.log("INITIAL: ", initialMarketItems);
          const marketItemsWithImageUrls = initialMarketItems.map((item) => {
            if (item.name === "nectarines") {
              try {
                const res = pexelsClient.photos.show({ id: item.image });
                res.then((photo) => {
                  console.log("PHOTO: ", photo);
                  item.imageUrl = photo.src.medium;
                  return item;
                });
              } catch (error) {
                console.log(error);
              }
            }
            return item;
          });
          console.log("IMAGES: ", marketItemsWithImageUrls);
          setMarketItems(marketItemsWithImageUrls);
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
              <Box key={item.name}>
                <h3>{item.displayName}</h3>
                <img src="https://images.pexels.com/photos/17406435/pexels-photo-17406435.jpeg?auto=compress&cs=tinysrgb&h=350" />
              </Box>
            ))}
          </Box>
        ) : null
      ) : (
        <CircularProgress />
      )}
      <Link href="https://www.pexels.com/" target="blank">
        Images provided by Pexels
      </Link>
    </>
  );
};

export { InSeasonPage };
