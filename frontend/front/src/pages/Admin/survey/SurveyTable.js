import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { useGetSurveysQuery } from "../../../api/apiSlice";
import { formatISODate } from "../../../components/DateUtils";
import Loader from "../../../components/Loader";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";
import { ADMIN_SURVEY, withAdminPrefix } from "../../../routing/routes";
import { SurveyError } from "./SurveyError";

const COLUMNS = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Title", flex: 3 },
  { field: "questionCount", headerName: "Questions", flex: 2 },
  { field: "lastUpdated", headerName: "Last Updated", flex: 3 },
];

const SurveyTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_SURVEY), description: "surveys" }],
    true
  );

  const {
    data: surveyData,
    error: surveyError,
    isLoading: isSurveysLoading,
  } = useGetSurveysQuery();

  const tableData = useMemo(
    () =>
      surveyData?.map((s) => ({
        ...s,
        questionCount: s.survey_questions.length,
        lastUpdated: formatISODate(s.updated_at),
      })) || [],
    [surveyData]
  );

  const onRowClick = (row) => {
    goToBreadcrumb("surveyEdit", row);
  };

  if (isSurveysLoading) {
    return <Loader />;
  }

  if (surveyError) {
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
      disableColumnFilter
      disableDensitySelector
      disableColumnsMenu
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
    />
  );
};

export default SurveyTable;
