import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ShoppingList as ShoppingListModel } from "@models/shoppingList";
import { formatDate } from "@utils/formatDate";
import styles from "./ShoppingList.module.css";

type ShoppingListProps = {
  shoppingList: ShoppingListModel;
  className?: string;
};

const ShoppingList = ({ shoppingList, className }: ShoppingListProps) => {
  const { title, list, createdAt, updatedAt } = shoppingList;
  const timeStamp: string = updatedAt ? updatedAt : createdAt;
  const date: string = formatDate(timeStamp);
  const classNames: string = `${styles.shopping_list} ${
    className ? className : ""
  }`;

  return (
    <Card className={classNames}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body1" component="p">
          {list}
        </Typography>
      </CardContent>
      {date !== "Invalid Date" ? (
        <Box
          className="card-footer"
          p={2}
          sx={{ borderTop: "1px solid #d2d2d2" }}
        >
          <Typography variant="body2" component="span">
            Last updated at: {date}
          </Typography>
        </Box>
      ) : null}
    </Card>
  );
};

export { ShoppingList };
