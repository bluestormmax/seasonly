import { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Link,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
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
  }, [loggedInUser]);

  useEffect(() => {
    if (zone) {
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
              {`${month}'s most popular fruits and vegetables:`}{" "}
            </Typography>
            <ImageList variant="masonry" cols={3} gap={8}>
              {marketItems.map((item) => (
                <ImageListItem
                  key={item.name}
                  sx={{
                    bgcolor: "#000",
                    minHeight: "200px",
                    ".MuiImageListItemBar-title": {
                      fontSize: "24px",
                    },
                  }}
                >
                  {item.imageUrl ? (
                    <img
                      src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.name}
                      loading="lazy"
                    />
                  ) : null}
                  <ImageListItemBar title={item.displayName} />
                </ImageListItem>
              ))}
            </ImageList>
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
