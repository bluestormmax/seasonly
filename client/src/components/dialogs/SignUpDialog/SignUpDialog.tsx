import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  IconButton,
  Alert,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { UserModel } from "@models/user";
import { SignUpCredentials } from "@api/user.api";
import * as UserApi from "@api/user.api";
import { TextInputField } from "../../formFields/TextInputField";
import { useState } from "react";
import { ConflictError } from "@/components/errors/httpErrors";

type SignUpDialogProps = {
  onDismiss: () => void;
  onSignupSuccess: (user: UserModel) => void;
};

const SignUpDialog = ({ onDismiss, onSignupSuccess }: SignUpDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();
  const [errorText, setErrorText] = useState<string | null>(null);

  async function onSignupSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UserApi.signUp(credentials);
      onSignupSuccess(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      }
      console.log(error);
    }
  }

  const handleClose = () => {
    onDismiss();
  };

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>Sign Up for Seasonly</DialogTitle>
      <DialogContent>
        {errorText ? (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errorText}
          </Alert>
        ) : null}
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
        <Button
          form="signupForm"
          type="submit"
          disabled={isSubmitting}
          variant="contained"
        >
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { SignUpDialog };
