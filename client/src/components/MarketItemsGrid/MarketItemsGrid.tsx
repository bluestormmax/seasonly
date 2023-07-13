import { ImageList, useMediaQuery } from "@mui/material";
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
  const matches = useMediaQuery("(min-width:720px)");

  return (
    <ImageList variant="masonry" cols={matches ? 3 : 2} gap={8}>
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
