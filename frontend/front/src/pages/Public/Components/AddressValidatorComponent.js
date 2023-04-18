import React, { forwardRef } from "react";
import { Stack, Button, CircularProgress, Box } from "@mui/material";
import { HeatPumpAddressField } from "../../../components/SurveyComponent/HeatPumpAddressField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddressValidatorComponent = forwardRef(
  (
    {
      onValidate,
      isLoading,
      style, // passed through so MUI transitions work
    },
    ref
  ) => {
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm({
      defaultValues: {
        address: { street: "", aptNumber: "", zipCode: "", city: "" },
      },
    });

    return (
      <form
        onSubmit={handleSubmit((data) => onValidate(data))}
        ref={ref}
        style={style}
      >
        <Box mx={{ margin: "1em 0" }}>
          <HeatPumpAddressField
            control={control}
            label={"Enter the address where you're interested in a heat pump:"}
          />
        </Box>
        <Stack direction="row" justifyContent="center" spacing={2}>
          {isLoading && <CircularProgress />}
          <Button variant="contained" type="submit">
            {"Verify"}
          </Button>
          <Button
            variant="outlined"
            type="button"
            color="warning"
            onClick={() => {
              navigate(-1);
            }}
          >
            {"Back"}
          </Button>
        </Stack>
      </form>
    );
  }
);
