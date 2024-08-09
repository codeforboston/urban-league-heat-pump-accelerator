import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { ROLE_ADMIN, ROLE_SURVEYOR } from "../../../features/login/loginUtils";
import { useCallback, useState } from "react";
import { useCreateUserMutation } from "../../../api/apiSlice";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [userError, setUserError] = useState(false);

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
  const [
    createUser,
    {
      data: createUserData,
      isLoading: isCreateUserLoading,
      error: createUserError,
      isSuccess: isCreateUserSuccess,
    },
  ] = useCreateUserMutation();

  const handleCancel = useCallback(() => {
    navigate(withAdminPrefix(ADMIN_USER));
  }, [navigate]);

  const handleModalClose = useCallback(
    (action) => {
      if (action === ACTION_BACK) {
        handleCancel();
      } else if (action === ACTION_NEW) {
        reset();
        setModalOpen(false);
      }
    },
    [reset, handleCancel]
  );

  const modal = useCallback(
    (user) => {
      return (
        <Modal open={modalOpen} onClose={() => handleModalClose(ACTION_NEW)}>
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
            <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
              <p>
                Succesfully created user <b>'{user?.email}'</b>
              </p>
            </Stack>
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
      );
    },
    [handleModalClose, modalOpen]
  );

  const onSubmit = useCallback(
    async (data) => {
      setUserError(() => false);
      try {
        const { email, role, ...surveyor } = data;
        const user = await createUser({
          email,
          role,
          surveyor,
        }).unwrap();
        if (user) {
          setModalOpen(true);
        }
      } catch (error) {
        setUserError(() => true);
      }
    },
    [createUser]
  );

  return (
    <Container>
      {!!isCreateUserSuccess && !!createUserData && modal(createUserData)}
      {userError && <CustomSnackbar message="Error creating user account." />}
      <Box sx={{ bgcolor: "primary.main", color: "white" }} p={1} m={1}>
        <Typography variant="h5">Create User Profile</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <HeatPumpTextField
            control={control}
            name="firstname"
            label="First Name"
            required
          />
          <HeatPumpTextField
            control={control}
            name="lastname"
            label="Last Name"
            required
          />
          <HeatPumpTextField
            control={control}
            name="email"
            label="Email"
            type="email"
            required
          />
          {/* Error message in case duplicate email */}
          {createUserError?.data?.email.length > 0 && (
            <Typography color="red" variant="body2">
              Email {createUserError?.data?.email?.join(" ")}
            </Typography>
          )}
          <HeatPumpPhoneField
            control={control}
            name="phone"
            label="Phone Number"
            required
          />
          <HeatPumpTextField
            control={control}
            name="street_address"
            label="Street Address"
            required
          />
          <HeatPumpTextField
            control={control}
            name="city"
            label="City"
            required
          />
          <HeatPumpTextField
            control={control}
            name="state"
            label="State"
            required
          />
          <HeatPumpTextField
            control={control}
            name="zipcode"
            label="ZIP code"
            type="zipcode"
            required
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
            {!!isCreateUserLoading && <Loader />}
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
