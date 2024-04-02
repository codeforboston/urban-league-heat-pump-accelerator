
import React from "react";
import ContainerTitle from "../component/ContainerTitle";
import { Box } from "@mui/material";
import ContainerTitle from "../component/ContainerTitle";
import React from "react";
import SurveyTable from "./SurveyTable";

const Home = () => {
  return (
    <ContainerTitle name={"SURVEYS"}>
      <SurveyTable />
    </ContainerTitle>
  );
};

export default Home;
