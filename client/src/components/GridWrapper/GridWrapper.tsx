import { ReactNode } from "react";
import styles from "./GridWrapper.module.css";
import { Box } from "@mui/material";

type GridWrapperProps = {
  children: ReactNode;
};

const GridWrapper = ({ children }: GridWrapperProps) => {
  return <Box className={`${styles.grid_wrapper}`}>{children}</Box>;
};

export { GridWrapper };
