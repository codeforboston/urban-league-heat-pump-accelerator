import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";
import Loader from "../../../components/Loader";
import { SurveyError } from "./SurveyError";
import { formatISODate } from "../../../components/DateUtils";
import { useGetSurveysQuery } from "../../../api/apiSlice";
import { ADMIN_SURVEY, withAdminPrefix } from "../../../routing/routes";

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
        questionCount: s.survey_questions?.length,
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
    />
  );
};

export default SurveyTable;
