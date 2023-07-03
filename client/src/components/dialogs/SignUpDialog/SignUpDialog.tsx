import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { User } from "@models/user";
import { SignUpCredentials } from "@api/user.api";
import * as UserApi from "@api/user.api";
import { TextInputField } from "../../formFields/TextInputField";

type SignUpDialogProps = {
  onDismiss: () => void;
  onSignupSuccess: (user: User) => void;
};

const SignUpDialog = ({ onDismiss, onSignupSuccess }: SignUpDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSignupSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UserApi.signUp(credentials);
      onSignupSuccess(newUser);
    } catch (error) {
      console.log(error);
      alert(error); // TODO: dev only
    }
  }

  const handleClose = () => {
    onDismiss();
  };

  return (
    <Dialog open>
      <DialogTitle>Sign Up for Seasonly</DialogTitle>
      <DialogContent>
        <form id="signupForm" onSubmit={handleSubmit(onSignupSubmit)}>
          <Stack my={2}>
            <TextInputField
              name="username"
              label="Username"
              register={register}
              registerOptions={{ required: "Please enter a username" }}
              error={errors.username}
            />
          </Stack>
          <Stack my={2}>
            <TextInputField
              name="email"
              label="Email"
              type="email"
              register={register}
              registerOptions={{ required: "Please enter your email" }}
              error={errors.email}
            />
          </Stack>
          <Stack my={2}>
            <TextInputField
              name="password"
              label="Password"
              type="password"
              register={register}
              registerOptions={{ required: "Please enter a valid password" }}
              error={errors.password}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleClose} title="Cancel signup">
          <Close />
        </IconButton>
        <Button form="signupForm" type="submit" disabled={isSubmitting}>
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { SignUpDialog };
