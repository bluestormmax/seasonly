import { ImageList } from "@mui/material";
import { MarketItemModel } from "@models/marketItem";
import { MarketItemCard } from "../MarketItemCard/MarketItemCard";

type MarketItemsGridProps = {
  marketItems: MarketItemModel[];
  onBasketButtonClick: (newItem: MarketItemModel) => void;
  onRemoveButtonClick: (itemToRemove: MarketItemModel) => void;
  onViewListButtonClick: () => void;
  onSnackBarLinkClick: () => void;
};

const MarketItemsGrid = ({
  marketItems,
  onBasketButtonClick,
  onRemoveButtonClick,
  onSnackBarLinkClick,
  onViewListButtonClick,
}: MarketItemsGridProps) => {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {marketItems.map((item: MarketItemModel) => (
        <MarketItemCard
          key={`grid-${item.name}`}
          item={item}
          onBasketButtonClick={onBasketButtonClick}
          onRemoveButtonClick={onRemoveButtonClick}
          onSnackBarLinkClick={onSnackBarLinkClick}
          onViewListButtonClick={onViewListButtonClick}
        />
      ))}
    </ImageList>
  );
};

export { MarketItemsGrid };
