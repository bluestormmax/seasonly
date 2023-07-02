import { ReactNode } from "react";
import { Box } from "@mui/material";
import styles from "./GridWrapper.module.css";

type GridWrapperProps = {
  children: ReactNode;
};

const GridWrapper = ({ children }: GridWrapperProps) => {
  return <Box className={`${styles.grid_wrapper}`}>{children}</Box>;
};

export { GridWrapper };
