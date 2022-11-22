import { Box, Button } from "@mui/material";
import {
  useCreateUserDataMutation,
  useDeleteUserDataMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "../../../api/apiSlice";
import UserItem from "./UserItem";

const UserTab = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUserDataQuery();

  const [createUserData] = useCreateUserDataMutation();
  const [updateUserData] = useUpdateUserDataMutation();
  const [deleteUserData] = useDeleteUserDataMutation();

  let content;

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserData({
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

          <Button onClick={() => deleteUserData(item)}>delete</Button>
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
