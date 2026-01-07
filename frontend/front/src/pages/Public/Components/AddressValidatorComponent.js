import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Button, Box } from "@mui/material";
import { HeatPumpAddressField } from "../../../components/SurveyComponent/HeatPumpAddressField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

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

    const { t } = useTranslation();

    const { handleSubmit, control } = useForm({
      defaultValues: {
        address: {
          street_number: "",
          street_name: "",
          unit_number: "",
          city: "",
          state: "MA",
          zip_code: "",
        },
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
            label={t("public.survey.text4")}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          mt={5}
          mb={5}
        >
          {isLoading && <Loader />}
          <Button variant="contained" type="submit">
            {t("public.survey.continue-button")}
          </Button>
          <Button
            variant="outlined"
            type="button"
            color="warning"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("public.survey.back-button")}
          </Button>
        </Stack>
      </form>
    );
  }
);
