import { Container, Typography } from "@mui/material";
import React, { useMemo } from "react";

import { useParams } from "react-router-dom";
import {
  useGetSurveyStructureQuery,
  useGetSurveyVisitQuery,
} from "../../../api/apiSlice";
import CustomSnackbar from "../../../components/CustomSnackbar";
import Loader from "../../../components/Loader";
import { useInitBreadcrumbs } from "../../../hooks/breadcrumbHooks";
import {
  ADMIN_SURVEY,
  adminSurveyEdit,
  withAdminPrefix,
} from "../../../routing/routes";
import { SurveyEditorForm } from "./SurveyEditorForm";

const SurveyProfile = () => {
  const { uid: surveyVisitId } = useParams();

  useInitBreadcrumbs([
    { url: withAdminPrefix(ADMIN_SURVEY), description: "surveys" },
    {
      url: withAdminPrefix(adminSurveyEdit(surveyVisitId)),
      description: `survey ${surveyVisitId}`,
    },
  ]);
  const {
    data: surveyData,
    error: surveyError,
    isLoading: surveyLoading,
  } = useGetSurveyVisitQuery(surveyVisitId);
  const {
    data: surveyQuestions,
    error: surveyQuetionsError,
    isLoading: surveyQuestionsLoading,
  } = useGetSurveyStructureQuery("01");
  const title = useMemo(
    () => (surveyData?.id ? `Survey ID: ${surveyData.id}` : "Loading..."),
    [surveyData]
  );
  console.log(surveyQuestions);
  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      {surveyLoading || surveyQuestionsLoading ? (
        <Loader />
      ) : surveyError || surveyQuetionsError ? (
        <CustomSnackbar message={`Error loading survey ${surveyVisitId}`} />
      ) : (
        <SurveyEditorForm
          surveyData={surveyData}
          surveyQuestions={surveyQuestions.survey_questions}
        />
      )}
    </Container>
  );
};

export default SurveyProfile;
