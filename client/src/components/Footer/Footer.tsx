import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => (
  <Box className="footer" component="footer" px={2}>
    <Typography variant="caption" component="span">
      &copy;{new Date().getFullYear()}{" "}
      <Link to="https://bluestormcreative.com" target="blank">
        blue storm creative
      </Link>
    </Typography>
  </Box>
);

export { Footer };
