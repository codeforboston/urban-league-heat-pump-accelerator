import React, { forwardRef, useState, useEffect } from "react";
import { Stack, Button, Box } from "@mui/material";
import { HeatPumpAddressField } from "../../../components/SurveyComponent/HeatPumpAddressField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useTranslation } from "react-i18next";

export const AddressValidatorComponent = forwardRef(
  (
    {
      onValidate,
      isLoading,
      validationStatus,
      style, // passed through so MUI transitions work
    },
    ref
  ) => {
    const navigate = useNavigate();
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    // Disable buttons when request is sent, re-enable when canonicalization resolves or errors.
    useEffect(() => {
      if (isLoading) {
        setButtonsDisabled(true);
        return;
      }
      if (validationStatus === undefined) {
        setButtonsDisabled(false);
      }
      if (validationStatus === "unrecognized") {
        setButtonsDisabled(false);
      }
      if (validationStatus === "validationError") {
        setButtonsDisabled(false);
      }
    }, [isLoading, validationStatus]);

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
        onSubmit={handleSubmit((data) => {
          setButtonsDisabled(true);
          onValidate(data);
        })}
        ref={ref}
        style={style}
      >
        <Box mx={{ margin: "1em 0" }}>
          <HeatPumpAddressField
            control={control}
            label={t("public.address.enter-address")}
          />
        </Box>
        <Stack direction="row" justifyContent="center" spacing={2} mb={5}>
          {isLoading && <Loader />}
          <Button variant="contained" type="submit" disabled={buttonsDisabled}>
            {t("public.address.verify")}
          </Button>
          <Button
            variant="outlined"
            type="button"
            color="warning"
            onClick={() => {
              navigate(-1);
            }}
            disabled={buttonsDisabled}
          >
            {t("public.address.back")}
          </Button>
        </Stack>
      </form>
    );
  }
);
