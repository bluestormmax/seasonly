import { useState } from "react";
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import { ShoppingBasket, RemoveCircle } from "@mui/icons-material";
import { MarketItemModel } from "@/models/marketItem";
import styles from "./MarketItemCard.module.css";
import { set } from "react-hook-form";

type MarketItemCardProps = {
  item: MarketItemModel;
  onBasketButtonClick: (newItem: string) => void;
  onRemoveButtonClick: (itemToRemove: string) => void;
};

const MarketItemCard = ({
  item,
  onBasketButtonClick,
  onRemoveButtonClick,
}: MarketItemCardProps) => {
  const [isInBasket, setIsInBasket] = useState(false);
  const imgUrl = `/${item.name}.jpg`;

  const handleBasketButtonClick = () => {
    onBasketButtonClick(item.name);
    setIsInBasket(true);
  };

  const handleRemoveButtonClick = () => {
    onRemoveButtonClick(item.name);
    setIsInBasket(false);
  };

  const cardButton = () => {
    const button = isInBasket ? (
      <IconButton
        aria-label={`Remove ${item.displayName} from shopping list`}
        onClick={handleRemoveButtonClick}
      >
        <RemoveCircle className={styles.basket_icon} />
      </IconButton>
    ) : (
      <IconButton
        aria-label={`Save ${item.displayName} to new shopping list`}
        onClick={handleBasketButtonClick}
      >
        <ShoppingBasket className={styles.basket_icon} />
      </IconButton>
    );
    return button;
  };

  return (
    <ImageListItem key={item.name} className={styles.market_item_card}>
      {imgUrl ? (
        <img
          src={`${imgUrl}?w=248&fit=crop&auto=format`}
          srcSet={`${imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.name}
          loading="lazy"
        />
      ) : null}
      <ImageListItemBar title={item.displayName} actionIcon={cardButton()} />
    </ImageListItem>
  );
};

export { MarketItemCard };
