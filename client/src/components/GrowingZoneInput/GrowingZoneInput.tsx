import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, FormLabel, Stack } from "@mui/material";
import { ZoneData } from "@api/user.api";
import { fetchUserZoneData } from "@api/user.api";
import { TextInputField } from "../formFields/TextInputField";

type GrowingZoneInputProps = {
  onZoneSet: (zone: ZoneData) => void;
  setUserState: (state: string) => void;
};

type ZipInput = {
  zip: string;
};

const GrowingZoneInput = ({
  onZoneSet,
  setUserState,
}: GrowingZoneInputProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting },
  } = useForm<ZipInput>({ defaultValues: { zip: "" } });
  const [submittedData, setSubmittedData] = useState({});

  async function onZoneSubmit(data: { zip: string }) {
    const zip = data.zip;
    setSubmittedData(data);
    setUserState(zip);

    try {
      const zone = await fetchUserZoneData(data.zip);
      onZoneSet(zone);
    } catch (error) {
      console.log(error);
    }
  }

  // Reset the field on submit success.
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ zip: "" });
    }
  }, [formState, submittedData, reset]);

  return (
    <form
      id="growingZoneInput"
      onSubmit={handleSubmit(onZoneSubmit)}
      style={{ width: "400px", margin: "0 auto" }}
    >
      <Stack>
        <FormLabel sx={{ mb: 2 }}>Enter a zip code to find out:</FormLabel>
        <Stack direction="row" spacing={2}>
          <Controller
            name="zip"
            control={control}
            defaultValue={""}
            render={() => (
              <TextInputField
                name="zip"
                label="Zip Code"
                register={register}
                registerOptions={{
                  minLength: {
                    value: 5,
                    message: "Zip must be 5 digits",
                  },
                  required: "A zip code is required",
                }}
                error={errors.zip}
                fullWidth
                sx={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
              />
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="outlined"
            sx={{ height: "56px" }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { GrowingZoneInput };
