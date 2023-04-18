import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetSurveyVisitsQuery,
  useGetHomesDataQuery,
  useGetSurveyListQuery,
} from "../../../redux/apiSlice";
import { SurveyError } from "./SurveyError";
import { houseToString } from "../../../components/AddressUtils";
import { formatISODate } from "../../../components/DateUtils";

const COLUMNS = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "surveyName", headerName: "Survey", flex: 3 },
  { field: "homeName", headerName: "Address", flex: 5 },
  { field: "date", headerName: "Survey Date", flex: 3 },
];

const createTableData = (surveyVisitData, surveyStructureData, houseData) => {
  return surveyVisitData.map((d) => ({
    id: d.id,
    surveyName: surveyStructureData.find((s) => `${s.id}` === `${d.surveyId}`)
      ?.title,
    homeName: houseToString(houseData.find((h) => `${h.id}` === `${d.homeId}`)),
    date: formatISODate(d.date),
  }));
};

const SurveyTable = () => {
  const navigate = useNavigate();

  const {
    data: surveyVisitData,
    error: surveyVisitError,
    isLoading: isSurveyVisitLoading,
  } = useGetSurveyVisitsQuery();
  const {
    data: houseData,
    error: houseError,
    isLoading: isHouseDataLoading,
  } = useGetHomesDataQuery();
  const {
    data: surveyStructureData,
    error: surveyStructureError,
    isLoading: isSurveyStructureLoading,
  } = useGetSurveyListQuery();

  const tableData = useMemo(
    () =>
      surveyVisitData && surveyStructureData && houseData
        ? createTableData(surveyVisitData, surveyStructureData, houseData)
        : [],
    [houseData, surveyStructureData, surveyVisitData]
  );

  const onRowClick = (row) => {
    navigate(`${row.id}`);
  };

  if (isSurveyVisitLoading || isHouseDataLoading || isSurveyStructureLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (surveyVisitError || houseError || surveyStructureError) {
    return <SurveyError />;
  }

  return (
    <DataGrid
      rows={tableData}
      columns={COLUMNS}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableSelectionOnClick
      autoHeight
      onRowClick={onRowClick}
    />
  );
};

export default SurveyTable;
