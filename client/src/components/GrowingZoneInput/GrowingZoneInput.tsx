import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormLabel, Stack } from "@mui/material";
import { ZoneData } from "@api/user.api";
import { TextInputField } from "../formFields/TextInputField";

type ZipInput = {
  zip: string;
};

const GrowingZoneInput = () => {
  const [, setZone] = useState<ZoneData>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZipInput>({});

  async function onZoneSubmit(data: object) {
    try {
      let response = await fetch(`https://phzmapi.org/${data.zip}.json`);
      let zone = await response.json();
      setZone(zone);
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
          error={errors.zip}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export { GrowingZoneInput };
