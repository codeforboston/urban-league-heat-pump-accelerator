import React from "react";
import { AssignmentsMap } from "../component/AssignmentsMap";
import AssignTable from "./AssignTable";
import ContainerTitle from "../component/ContainerTitle";

const Assignment = () => (
  <ContainerTitle name={"Assignments"}>
    <AssignmentsMap />
    <AssignTable />
  </ContainerTitle>
);

export default Assignment;
