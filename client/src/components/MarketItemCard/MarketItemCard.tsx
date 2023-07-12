import { ImageListItem, ImageListItemBar } from "@mui/material";
import { MarketItemModel } from "@/models/marketItem";
import styles from "./MarketItemCard.module.css";

type MarketItemCardProps = {
  item: MarketItemModel;
};

const MarketItemCard = ({ item }: MarketItemCardProps) => {
  return (
    <ImageListItem key={item.name} className={styles.market_item_card}>
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
  );
};

export { MarketItemCard };
