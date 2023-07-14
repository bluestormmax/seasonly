import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { ShoppingListModel } from "@models/shoppingList";
import { formatDate } from "@/utils";
import styles from "./ShoppingList.module.css";

type ShoppingListProps = {
  shoppingList: ShoppingListModel;
  className?: string;
  onEditListClicked: (shoppingList: ShoppingListModel) => void;
  onDeleteListClicked: (shoppingList: ShoppingListModel) => void;
};

const ShoppingList = ({
  shoppingList,
  className,
  onEditListClicked,
  onDeleteListClicked,
}: ShoppingListProps) => {
  const { title, list, createdAt, updatedAt } = shoppingList;
  const timeStamp: string = updatedAt ? updatedAt : createdAt;
  const date: string = formatDate(timeStamp);
  const classNames: string = `${styles.shopping_list} ${
    className ? className : ""
  }`;

  return (
    <Card className={classNames}>
      <CardHeader title={title} />
      <CardContent className={styles.card_content}>
        {list ? (
          <ul>
            {list.map((item) => (
              <li key={item.name}>{item.displayName}</li>
            ))}
          </ul>
        ) : null}
      </CardContent>
      <Box className={styles.card_footer}>
        <Typography variant="body2" component="div" className="timestamp">
          Last updated at: <br />
          {date}
        </Typography>
        <Box className="card-actions">
          <IconButton
            onClick={(event) => {
              onEditListClicked(shoppingList);
              event.stopPropagation();
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={(event) => {
              onDeleteListClicked(shoppingList);
              event.stopPropagation();
            }}
            title="Delete shopping list"
          >
            <DeleteOutline />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export { ShoppingList };
