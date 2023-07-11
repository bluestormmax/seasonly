import { useForm } from "react-hook-form";
import { Button, FormLabel, Stack } from "@mui/material";
import { ZoneData } from "@api/user.api";
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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZipInput>({});

  async function onZoneSubmit(data: { zip: string }) {
    const zip = data.zip;
    setUserState(zip);

    try {
      const response = await fetch(`https://phzmapi.org/${data.zip}.json`);
      const zone = await response.json();
      onZoneSet(zone);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      id="growingZoneInput"
      onSubmit={handleSubmit(onZoneSubmit)}
      style={{ width: "400px", margin: "0 auto" }}
    >
      <Stack>
        <FormLabel sx={{ mb: 2 }}>Enter a zip code to find out:</FormLabel>
        <Stack direction="row" spacing={2}>
          <TextInputField
            name="zip"
            label="Zip Code"
            register={register}
            registerOptions={{
              required: "A zip code is required!",
            }}
            error={errors.zip}
            fullWidth
            sx={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
          />
          <Button type="submit" disabled={isSubmitting} variant="outlined">
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { GrowingZoneInput };
