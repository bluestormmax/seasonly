import { Typography } from "@mui/material";
import { User as UserModel } from "@models/user";
import { GrowingZoneInput } from "../../components";

type InSeasonPageProps = {
  loggedInUser: UserModel | null;
};

const InSeasonPage = ({ loggedInUser }: InSeasonPageProps) => {
  return (
    <>
      <Typography
        className="heading welcome"
        variant="h3"
        component="h1"
        mb={3}
      >
        What's In Season
      </Typography>
      {loggedInUser && loggedInUser.zone.zone ? (
        <Typography>Your growing zone is: {loggedInUser.zone.zone}</Typography>
      ) : null}
      <GrowingZoneInput onZoneSet={() => {}} />
    </>
  );
};

export { InSeasonPage };
