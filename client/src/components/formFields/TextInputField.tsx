import { RegisterOptions, UseFormRegister, FieldError } from "react-hook-form";
import { TextField } from "@mui/material";

type TextInputFieldProps = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any; // This allows us to pass any other props to this component.
};

const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps) => {
  return (
    <TextField
      id={`${name}-input`}
      label={label}
      variant="outlined"
      {...register(name, registerOptions)}
      helperText={error?.message}
      error={!!error}
      {...props}
    />
  );
};

export { TextInputField };
