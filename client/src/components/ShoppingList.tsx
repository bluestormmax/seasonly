import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { ShoppingList as ShoppingListModel } from "../models/shoppingList";

type ShoppingListProps = {
  shoppingList: ShoppingListModel;
  className?: string;
};

const ShoppingList = ({ shoppingList, className }: ShoppingListProps) => {
  const { title, list, createdAt, updatedAt } = shoppingList;
  const timeStamp = updatedAt ? updatedAt : createdAt;
  const date = new Date(timeStamp).toLocaleString();
  return (
    <Card className={`shopping-list ${className}`}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body1" component="p">
          {list}
        </Typography>
      </CardContent>
      <CardActionArea>
        {date !== "Invalid Date" ? (
          <Typography variant="body2" component="span">
            Last updated at: {date}
          </Typography>
        ) : null}
      </CardActionArea>
    </Card>
  );
};

export default ShoppingList;
