import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import {
  ROLE_ADMIN,
  ROLE_SURVEYOR,
  generatePassword,
} from "../../../features/login/loginUtils";
import React, { useCallback, useState } from "react";
import {
  useCreateSurveyorMutation,
  useCreateUserMutation,
} from "../../../api/apiSlice";

import CustomSnackbar from "../../../components/CustomSnackbar";
import { HeatPumpDropdown } from "../../../components/SurveyComponent/HeatPumpDropdown";
import { HeatPumpPhoneField } from "../../../components/SurveyComponent/HeatPumpPhoneField";
import { HeatPumpTextField } from "../../../components/SurveyComponent/HeatPumpTextField";
import Loader from "../../../components/Loader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { withAdminPrefix, ADMIN_USER } from "../../../routing/routes";

const ACTION_BACK = "BACK";
const ACTION_NEW = "NEW";

const CreateNewUser = () => {
  const navigate = useNavigate();

  const [modalData, setModalData] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      street_address: "",
      city: "",
      state: "",
      zipcode: "",
      role: ROLE_SURVEYOR,
    },
  });

  const [createUser] = useCreateUserMutation();
  const [createSurveyor] = useCreateSurveyorMutation();

  const handleCancel = useCallback(() => {
    navigate(withAdminPrefix(ADMIN_USER));
  }, [navigate]);

  const onSubmit = useCallback(
    async (data) => {
      setIsUserLoading(true);

      const password = generatePassword();

      try {
        const user = await createUser({
          email: data.email,
          password,
        }).unwrap();

        // TODO: not 100% on whether all this data is necessary
        const surveyorPayload = {
          ...data,
          status: "active",
          geocode: "unknown",
          user_id: user.id,
        };

        await createSurveyor(surveyorPayload).unwrap();

        setModalData({ ...user, password });
      } catch (e) {
        setUserError(e);
      } finally {
        setIsUserLoading(false);
      }
    },
    [createUser, createSurveyor]
  );

  const handleModalClose = useCallback(
    (action) => {
      if (action === ACTION_BACK) {
        handleCancel();
      } else if (action === ACTION_NEW) {
        reset();
        setModalData(null);
      }
    },
    [reset, handleCancel]
  );

  const modal = useCallback(
    () => (
      <Modal
        open={modalData !== null}
        onClose={() => handleModalClose(ACTION_NEW)}
      >
        <Box
          // style stolen from mui modal example
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <p>
            Succesfully created user <b>'{modalData?.email}'</b> with password{" "}
            <b>'{modalData?.password}'</b>
          </p>
          <p>{"Write down this password to give to the surveyor!"}</p>
          <Stack direction="row" justifyContent="right" spacing={2}>
            <Button onClick={() => handleModalClose(ACTION_BACK)}>
              Dashboard
            </Button>
            <Button
              variant="contained"
              onClick={() => handleModalClose(ACTION_NEW)}
            >
              Create Another
            </Button>
          </Stack>
        </Box>
      </Modal>
    ),
    [handleModalClose, modalData]
  );

  return (
    <Container>
      {modal()}
      {
        <CustomSnackbar
          open={userError}
          message="Error creating user account."
          onClose={() => setUserError(null)}
        />
      }
      <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1} m={1}>
        <Typography variant="h5">Create User Profile</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <HeatPumpTextField
            control={control}
            name="firstname"
            label="First Name"
          />
          <HeatPumpTextField
            control={control}
            name="lastname"
            label="Last Name"
          />
          <HeatPumpTextField
            control={control}
            name="email"
            label="Email"
            type="email"
          />
          <HeatPumpPhoneField
            control={control}
            name="phone"
            label="Phone Number"
          />
          <HeatPumpTextField
            control={control}
            name="street_address"
            label="Street Address"
          />
          <HeatPumpTextField control={control} name="city" label="City" />
          <HeatPumpTextField control={control} name="state" label="State" />
          <HeatPumpTextField
            control={control}
            name="zipcode"
            label="ZIP code"
            type="zipcode"
          />
          <HeatPumpDropdown
            control={control}
            name="role"
            label="Role"
            required
            options={[
              { value: ROLE_ADMIN, label: "Admin" },
              { value: ROLE_SURVEYOR, label: "Surveyor" },
            ]}
          />
          <Stack direction="row" justifyContent="right" spacing={2}>
            {isUserLoading && <Loader />}
            <Button variant="outlined" sx={{ ml: 2 }} type="submit">
              Create
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={handleCancel}
              color="error"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default CreateNewUser;
