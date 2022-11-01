import { Box, Button } from "@mui/material";
import {
  useCreateHomeDataMutation,
  useDeleteHomeDataMutation,
  useGetHomeDataQuery,
  useUpdateHomeDataMutation,
} from "../../../api/apiSlice";
import HomeItem from "./HomeItem";

const UserTab = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetHomeDataQuery();

  const [createHomeData] = useCreateHomeDataMutation();
  const [updateHomeData] = useUpdateHomeDataMutation();
  const [deleteHomeData] = useDeleteHomeDataMutation();

  let content;

  const handleSubmit = (e) => {
    e.preventDefault();
    createHomeData({
      address: "New test address",
      zipcode: "34754",
      completed: false,
      surveyor: "Novas Saratu",
      city: "Boston",
    });
  };

  if (isLoading) {
    content = <Box> Is loading</Box>;
  } else if (isSuccess) {
    content = data.map((item) => {
      return (
        <Box key={item.id} border={1}>
          <HomeItem data={item} />

          <Button
            onClick={() =>
              updateHomeData({ ...item, completed: !item.completed })
            }
          >
            Toggle Completed
          </Button>
          <Button onClick={() => deleteHomeData(item)}>delete</Button>
        </Box>
      );
    });
  } else if (isError) {
    content = <Box>{error}</Box>;
  }

  return (
    <Box>
      <Box>
        <Button onClick={handleSubmit}>Add New Home </Button>
      </Box>
      <Box>{content}</Box>
    </Box>
  );
};

export default UserTab;
