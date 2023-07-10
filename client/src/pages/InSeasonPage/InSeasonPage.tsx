import { useState, useEffect } from "react";
import { createClient } from "pexels";
import {
  Typography,
  CircularProgress,
  Link,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
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
  const client = createClient(
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
  }, []);

  useEffect(() => {
    if (zone) {
      async function loadInSeasonMarketItems() {
        const seasonalData = { zone: zone?.zone, month: month };
        try {
          setShowItemsLoadingError(false);
          setItemsLoading(true);
          const initialMarketItems =
            await MarketItemsApi.fetchInSeasonMarketItems(seasonalData);

          const marketItemsWithImageUrls = ["106148"].map(async (item) => {
            await client.photos.show({ id: item }).then((photo) => {
              console.log(photo);
            });
            return item;
          });

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
          <ImageList variant="masonry" cols={3} gap={8}>
            {marketItems.map((item) => (
              <ImageListItem
                key={item.name}
                sx={{
                  ".MuiImageListItemBar-title": {
                    fontSize: "24px",
                  },
                }}
              >
                <img
                  src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
                <ImageListItemBar title={item.displayName} />
              </ImageListItem>
            ))}
          </ImageList>
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
