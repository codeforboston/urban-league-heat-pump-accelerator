import React from "react";
import ContainerTitle from "../component/ContainerTitle";
import SurveyTable from "./SurveyTable";

const Home = () => {
  return (
    <ContainerTitle name={"SURVEYS"}>
      <SurveyTable />
    </ContainerTitle>
  );
};

export default Home;
