import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ChevronLeft, WbSunny, FoodBank } from "@mui/icons-material";

type OffCanvasMenuProps = {
  open: boolean;
  onCloseIconClicked: () => void;
};

const OffCanvasMenu = ({ open, onCloseIconClicked }: OffCanvasMenuProps) => {
  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <IconButton
        onClick={onCloseIconClicked}
        sx={{
          width: "32px",
          height: "32px",
          alignSelf: "flex-end",
          marginRight: "10px",
          marginTop: "10px",
          backgroundColor: "#ff57220a",
        }}
        color="secondary"
      >
        <ChevronLeft />
      </IconButton>
      <List>
        {["In Season", "Shopping Lists"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ fontSize: "2rem", paddingRight: "32px" }}>
              <ListItemIcon sx={{ minWidth: "44px" }}>
                {index % 2 === 0 ? (
                  <WbSunny color="secondary" />
                ) : (
                  <FoodBank color="secondary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export { OffCanvasMenu };
