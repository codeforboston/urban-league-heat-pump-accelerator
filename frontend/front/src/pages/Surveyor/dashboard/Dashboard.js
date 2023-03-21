import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetSurveyorAssignmentQuery } from "../../../redux/surveyorViewApiSlice";
import ListView from "./ListView";

const Dashboard = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetSurveyorAssignmentQuery();

  let content = "no data";

  if (isLoading) {
    content = <Box> Is loading</Box>;
  } else if (isSuccess) {
    content = <Box>Status: Is successful</Box>;
    console.log("dashboard", data);
    // content = data.map((item) => {
    //   return (
    //     <Box key={item.id} border={1}>
    //       <HomeItem data={item} />
    //       <Button
    //         onClick={() =>
    //           updateHomeData({ ...item, completed: !item.completed })
    //         }
    //       >
    //         Toggle Completed
    //       </Button>
    //       <Button onClick={() => deleteHomeData(item)}>delete</Button>
    //     </Box>
    //   );
    // });
  } else if (isError) {
    content = <Box>{error.error}</Box>;
  }

  return (
    <Box>
      <Box m={3} p={2}>
        <Typography>Json Surveyor call</Typography>
        {content}
      </Box>

      <Box display={"flex"} justifyContent="center">
        <ListView />
      </Box>
    </Box>
  );
};

export default Dashboard;
