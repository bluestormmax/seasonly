import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ShoppingList as ShoppingListModel } from "./models/shoppingList";
import ShoppingList from "./components/ShoppingList";
import "./App.css";

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
      {shoppingLists.map((item) => (
        <ShoppingList key={item._id} shoppingList={item} />
      ))}
    </div>
  );
}

export default App;
