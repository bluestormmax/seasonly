import { useForm } from "react-hook-form";
import { Button, FormLabel, Stack } from "@mui/material";
import { ProfileFields } from "@/api/user.api";
import { User } from "@models/user";
import { TextInputField } from "../formFields/TextInputField";

type GrowingZoneInputProps = {
  loggedInUser: User | null;
};

const GrowingZoneInput = ({ loggedInUser }: GrowingZoneInputProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFields>({
    defaultValues: {
      state: loggedInUser?.state || "",
      zone: loggedInUser?.zone || "",
    },
  });

  async function onZoneSubmit(data: object) {
    try {
      let response = await fetch(`https://phzmapi.org/${data.zip}.json`);
      let zone = await response.json();
      console.log("ZONE: ", zone);
      return zone;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form id="growingZoneInput" onSubmit={handleSubmit(onZoneSubmit)}>
      <Stack>
        <FormLabel>Enter your zip code to find your growing zone:</FormLabel>
        <TextInputField
          name="zip"
          label="Zip Code"
          register={register}
          registerOptions={{
            required: "A zip code is required!",
          }}
          error={errors.zone}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export { GrowingZoneInput };
