import { useState } from "react";
import { Typography, Button } from "@mui/material";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="app wrapper">
      <Typography className="heading welcome" variant="h1" component="h1">
        hello!
      </Typography>
      <Button variant="contained" onClick={handleClick}>
        Count: {count}
      </Button>
    </div>
  );
}

export default App;
