import { Container, Typography } from "@mui/material";
import React, { useMemo } from "react";

import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import { SurveyEditorForm } from "./SurveyEditorForm";
import { useGetSurveyStructureQuery } from "../../../api/apiSlice";
import { useInitBreadcrumbs } from "../../../hooks/breadcrumbHooks";
import { useParams } from "react-router-dom";

const SurveyProfile = () => {
  const { uid: surveyVisitId } = useParams();

  useInitBreadcrumbs([
    { url: "/admin/dashboard", description: "dashboard" },
    { url: "/admin/survey", description: "surveys" },
    {
      url: `/admin/survey/edit/${surveyVisitId}`,
      description: `survey ${surveyVisitId}`,
    },
  ]);

  const {
    data: surveyData,
    error: surveyError,
    isLoading: surveyLoading,
  } = useGetSurveyStructureQuery(surveyVisitId, {
    skip: surveyVisitId === "new",
  });

  const title = useMemo(
    () => (surveyData?.id ? `Survey ${surveyData.id}` : "Loading..."),
    [surveyData]
  );

  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      {surveyLoading ? (
        <Loader />
      ) : surveyError ? (
        <CustomSnackbar message={`Error loading survey ${surveyVisitId}`} />
      ) : (
        <SurveyEditorForm formDefault={surveyData} />
      )}
    </Container>
  );
};

export default SurveyProfile;
