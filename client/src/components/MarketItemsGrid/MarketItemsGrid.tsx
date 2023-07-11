import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { MarketItemModel } from "@models/marketItem";
import styles from "./MarketItemsGrid.module.css";

type MarketItemsGridProps = {
  marketItems: MarketItemModel[];
};

const MarketItemsGrid = ({ marketItems }: MarketItemsGridProps) => {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {marketItems.map((item: MarketItemModel) => (
        <ImageListItem key={item.name} className={styles.market_items_grid}>
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
  );
};

export { MarketItemsGrid };
