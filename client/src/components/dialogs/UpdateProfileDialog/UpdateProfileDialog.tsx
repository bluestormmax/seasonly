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
import { ProfileFields } from "@api/user.api";
import * as UserApi from "@api/user.api";
import { useLoggedInUser } from "@/context/userContext";
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
    if (!loggedInUser) return; // TODO: dev only (should never happen)
    const userId = loggedInUser._id;
    const userData = {
      zip: data.zip,
    };
    try {
      const user = await UserApi.updateUser(userData, userId);
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
