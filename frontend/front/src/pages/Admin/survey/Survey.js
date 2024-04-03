import { Box } from "@mui/material";

import ContainerTitle from "../component/ContainerTitle";
import React from "react";
import SurveyTable from "./SurveyTable";

const Home = () => {
  return (
    <ContainerTitle name={"SURVEYS"}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>

      <SurveyTable />
    </ContainerTitle>
  );
};

export default Home;
