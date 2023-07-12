import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { UserModel } from "@models/user";
import { ProfileFields } from "@api/user.api";
import * as UserApi from "@api/user.api";
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

  async function onUpdateProfileSubmit(data: ProfileFields) {
    try {
      const user = await UserApi.updateUser(data);
      onUpdateProfileSuccess(user);
    } catch (error) {
      console.log(error);
      alert(error); // TODO: dev only
    }
  }

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>Welcome! Let's save your growing zone</DialogTitle>
      <DialogContent>
        <form id="zipForm" onSubmit={handleSubmit(onUpdateProfileSubmit)}>
          <TextInputField
            name="zip"
            label="Zip Code"
            register={register}
            registerOptions={{ required: "Please enter your 5-digit zip code" }}
            error={errors.zip}
          />
        </form>
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
