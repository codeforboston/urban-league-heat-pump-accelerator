
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import {
  useGetHomesQuery,
  useGetSurveyVisitsQuery,
  useGetSurveyorsQuery,
} from "../../../api/apiSlice";
import { formatISODate } from "../../../components/DateUtils";
import Loader from "../../../components/Loader";

import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";

import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";
import { ADMIN_SURVEY, withAdminPrefix } from "../../../routing/routes";
import { SurveyError } from "./SurveyError";

const COLUMNS = [
  { field: "id", headerName: "Survey ID", flex: 0.5 },
  {
    field: "home_address",
    headerName: "Address",
    flex: 1.5,
  },
  { field: "city", headerName: "City", flex: 1 },
  { field: "surveyor", headerName: "Surveyor", flex: 1 },
  { field: "created", headerName: "Created", flex: 2 },
  { field: "lastUpdated", headerName: "Last Updated", flex: 3 },
];

const SurveyTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_SURVEY), description: "surveys" }],
    true
  );

  const {
    data: surveyVisitsData,
    error: surveyVisitsError,
    isLoading: surveyVisitsLoading,
  } = useGetSurveyVisitsQuery();

  const {
    data: surveyorList,
    error: surveyorListError,
    isLoading: surveyorListIsLoading,
  } = useGetSurveyorsQuery();

  const {
    data: homeList,
    error: homeListError,
    isLoading: homeListIsLoading,
  } = useGetHomesQuery();

  const addressFormatter = (homeData) => {
    if (!homeData.unit_number || homeData.unit_number === "") {
      return `${homeData.street_number} ${homeData.street_name}`;
    } else {
      return `${homeData.street_number} ${homeData.street_name} Unit ${homeData.unit_number}`;
    }
  };

  const tableData = useMemo(
    () =>
      surveyVisitsData?.map((survey) => {
        const surveyorData = surveyorList?.find(
          (surveyor) => surveyor.id === survey.surveyor_id
        );
        const surveyorName = `${surveyorData.firstname} ${surveyorData.lastname}`;
        const homeData = homeList?.find((home) => home.id === survey.home_id);
        return {
          id: survey.id,
          home_address: addressFormatter(homeData),
          city: homeData.city,
          surveyor: surveyorName,
          created: formatISODate(survey.created_at),
          lastUpdated: formatISODate(survey.updated_at),
        };
      }) || [],
    [surveyVisitsData, surveyorList, homeList]
  );

  const onRowClick = (row) => {
    goToBreadcrumb("surveyVisit", row.row);
  };

  if (surveyVisitsLoading || surveyorListIsLoading || homeListIsLoading) {
    return <Loader />;
  }

  if (surveyVisitsError || surveyorListError || homeListError) {
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
