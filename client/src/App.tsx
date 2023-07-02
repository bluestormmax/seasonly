import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ShoppingList as ShoppingListModel } from "./models/shoppingList";
import { ShoppingList, GridWrapper } from "./components";

function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListModel[]>([]);

  useEffect(() => {
    async function loadShoppingLists() {
      try {
        const response = await fetch("/api/shoppingLists", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const initialShoppingLists = await response.json();
        setShoppingLists(initialShoppingLists);
      } catch (error) {
        console.error(error);
        alert(error); // TODO: dev only.
      }
    }
    loadShoppingLists();
  }, []);

  return (
    <div className="app wrapper">
      <Typography className="heading welcome" variant="h1" component="h1">
        lists!
      </Typography>
      {shoppingLists ? (
        <GridWrapper>
          {shoppingLists.map((item) => (
            <ShoppingList key={item._id} shoppingList={item} />
          ))}
        </GridWrapper>
      ) : null}
    </div>
  );
}

export default App;
