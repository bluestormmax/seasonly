import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { ShoppingList as ShoppingListModel } from "@models/shoppingList";
import { formatDate } from "@utils/formatDate";
import styles from "./ShoppingList.module.css";

type ShoppingListProps = {
  shoppingList: ShoppingListModel;
  className?: string;
  onDeleteListClicked: (shoppingList: ShoppingListModel) => void;
};

const ShoppingList = ({
  shoppingList,
  className,
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
      <CardContent>
        <Typography variant="body1" component="p">
          {list}
        </Typography>
      </CardContent>
      <Box className={styles.card_footer}>
        <Typography variant="body2" component="span">
          Last updated at: {date}
        </Typography>
        <Box className="card-actions">
          <IconButton>
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
