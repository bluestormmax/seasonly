import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { UserModel } from "@models/user";
import { ProfileFields, fetchUserZoneData } from "@api/user.api";
import * as UserApi from "@api/user.api";
import { useLoggedInUser } from "@/context/userContext";
import { getStateFromZip } from "@/utils/getStateFromZip";
import { TextInputField } from "../../formFields/TextInputField";

type UpdateProfileDialogProps = {
  onUpdateProfileSuccess: (user: UserModel) => void;
};

const UpdateProfileDialog = ({
  onUpdateProfileSuccess,
}: UpdateProfileDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFields>();
  const { loggedInUser } = useLoggedInUser();

  async function onUpdateProfileSubmit(data: ProfileFields) {
    if (!loggedInUser || !data.zip) {
      // TODO: handle this better
      console.log("No user or zip code found");
      return;
    }
    const userId = loggedInUser._id;
    const state = getStateFromZip(data.zip);
    const zone = await fetchUserZoneData(data.zip);
    console.log("zone", zone);
    const profileFields: ProfileFields = {
      zip: data.zip,
      zone: { ...zone },
      state: state,
    };
    try {
      const user = await UserApi.updateUser(profileFields, userId);
      onUpdateProfileSuccess(user);
    } catch (error) {
      console.log(error);
      alert(error); // TODO: dev only
    }
  }

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle align="center">
        Welcome! Let's save your growing zone
      </DialogTitle>
      <DialogContent>
        <form id="zipForm" onSubmit={handleSubmit(onUpdateProfileSubmit)}>
          <TextInputField
            name="zip"
            label="Zip Code"
            register={register}
            registerOptions={{ required: "Please enter your 5-digit zip code" }}
            error={errors.zip}
            fullWidth
            sx={{ marginTop: "20px" }}
          />
        </form>
        <Typography variant="body1" component="p" py={2} align="center">
          This helps us find in-season produce in your location.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button form="zipForm" type="submit" disabled={isSubmitting}>
          Save zone
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { UpdateProfileDialog };
