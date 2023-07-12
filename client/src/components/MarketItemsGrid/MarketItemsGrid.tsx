import { ImageList } from "@mui/material";
import { MarketItemModel } from "@models/marketItem";
import { MarketItemCard } from "../MarketItemCard/MarketItemCard";

type MarketItemsGridProps = {
  marketItems: MarketItemModel[];
};

const MarketItemsGrid = ({ marketItems }: MarketItemsGridProps) => {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {marketItems.map((item: MarketItemModel) => (
        <MarketItemCard item={item} />
      ))}
    </ImageList>
  );
};

export { MarketItemsGrid };
