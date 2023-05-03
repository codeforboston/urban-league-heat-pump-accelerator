import { Box, Button } from "@mui/material";
import {
  useCreateSurveyorMutation,
  useDeleteSurveyorMutation,
  useGetSurveyorQuery,
  useUpdateSurveyorMutation,
} from "../../../api/apiSlice";
import UserItem from "./UserItem";

const UserTab = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetSurveyorQuery();

  const [createSurveyorData] = useCreateSurveyorMutation();
  const [updateSurveyorData] = useUpdateSurveyorMutation();
  const [deleteSurveyorData] = useDeleteSurveyorMutation();

  let content;

  const handleSubmit = (e) => {
    e.preventDefault();
    createSurveyorData({
      firstName: "Zero",
      lastName: "Forst",
      email: "Gimlyoper@t.co",
      phone: "794-209-4012",
      streetNumber: "033",
      streetName: "Elmside",
      city: "Uničov",
      role: "active",
      status: "admin",
    });
  };

  if (isLoading) {
    content = <Box> Is loading</Box>;
  } else if (isSuccess) {
    content = data.map((item) => {
      return (
        <Box key={item.id} border={1}>
          <UserItem data={item} />

          <Button onClick={() => deleteSurveyorData(item)}>delete</Button>
        </Box>
      );
    });
  } else if (isError) {
    content = <Box>{error.error}</Box>;
  }

  return (
    <Box>
      <Box>
        <Button onClick={handleSubmit}>Add New User </Button>
      </Box>
      <Box>{content}</Box>
    </Box>
  );
};

export default UserTab;
