import { User as UserModel } from "@models/user";
import { ListsPageLoggedInView } from "./ListsPageLoggedInView";
import { ListsPageLoggedOutView } from "./ListsPageLoggedOutView";

type ListsPageProps = {
  loggedInUser: UserModel | null;
};

const ListsPage = ({ loggedInUser }: ListsPageProps) => {
  return (
    <>{loggedInUser ? <ListsPageLoggedInView /> : <ListsPageLoggedOutView />}</>
  );
};

export { ListsPage };
