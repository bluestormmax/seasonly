import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ChevronLeft, WbSunny, FoodBank } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styles from "./OffCanvasMenu.module.css";

type OffCanvasMenuProps = {
  open: boolean;
  onCloseIconClicked: () => void;
  onLinkClicked: () => void;
};

const OffCanvasMenu = ({
  open,
  onCloseIconClicked,
  onLinkClicked,
}: OffCanvasMenuProps) => {
  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <IconButton
        className={styles.close_icon}
        onClick={onCloseIconClicked}
        sx={{}}
        color="secondary"
      >
        <ChevronLeft />
      </IconButton>
      <List className={styles.menu} role="navigation">
        {["In Season", "Shopping Lists"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link
              to={index % 2 === 0 ? "/" : "shopping-lists"}
              onClick={onLinkClicked}
            >
              {index % 2 === 0 ? <WbSunny /> : <FoodBank />}
              <ListItemText primary={text} />{" "}
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export { OffCanvasMenu };
