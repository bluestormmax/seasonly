import { ImageList } from "@mui/material";
import { MarketItemModel } from "@models/marketItem";
import { MarketItemCard } from "../MarketItemCard/MarketItemCard";

type MarketItemsGridProps = {
  marketItems: MarketItemModel[];
  onBasketButtonClick: (newItem: MarketItemModel) => void;
  onRemoveButtonClick: (itemToRemove: MarketItemModel) => void;
};

const MarketItemsGrid = ({
  marketItems,
  onBasketButtonClick,
  onRemoveButtonClick,
}: MarketItemsGridProps) => {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {marketItems.map((item: MarketItemModel) => (
        <MarketItemCard
          key={`grid-${item.name}`}
          item={item}
          onBasketButtonClick={onBasketButtonClick}
          onRemoveButtonClick={onRemoveButtonClick}
        />
      ))}
    </ImageList>
  );
};

export { MarketItemsGrid };
