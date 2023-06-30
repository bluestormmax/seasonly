import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ShoppingList } from "./models/shoppingList";
import "./App.css";

function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

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
        hello!
      </Typography>
      {shoppingLists.map((list) => (
        <div className="shopping-list" key={list["_id"]}>
          {JSON.stringify(list)}
        </div>
      ))}
    </div>
  );
}

export default App;
