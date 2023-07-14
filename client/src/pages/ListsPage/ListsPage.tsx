import { Typography } from "@mui/material";
import { useLoggedInUser } from "@/context/userContext";
import { ListsPageLoggedInView } from "./ListsPageLoggedInView";
import { ListsPageLoggedOutView } from "./ListsPageLoggedOutView";

const ListsPage = () => {
  const { loggedInUser } = useLoggedInUser();
  return (
    <>
      <Typography
        className="heading welcome"
        variant="h4"
        component="h2"
        mb={3}
        align="center"
      >
        Saved shopping lists
      </Typography>
      {loggedInUser?.username ? (
        <ListsPageLoggedInView />
      ) : (
        <ListsPageLoggedOutView />
      )}
    </>
  );
};

export { ListsPage };
