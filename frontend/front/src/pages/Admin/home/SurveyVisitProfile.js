import { Container, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import {
  useDeleteSurveyVisitMutation,
  useGetHomeQuery,
  useGetSurveyStructureQuery,
  useGetSurveyVisitQuery,
  useUpdateSurveyVisitMutation,
} from "../../../api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

import { AdminSurvey } from "../component/AdminSurvey";
import Loader from "../../../components/Loader";
import { SurveyError } from "../survey/SurveyError";
import { formatISODate } from "../../../components/DateUtils";
import { houseToString } from "../../../components/AddressUtils";
import { withAdminPrefix, ADMIN_SURVEY } from "../../../routing/routes";
import { buildDataFromSurveyAnswers } from "../../../util/surveyUtils";
import { BackButton } from "../../Surveyor/Components/BackButton";

const SurveyProfile = ({ readOnly }) => {
  const navigate = useNavigate();
  const { uid: surveyVisitId } = useParams();

  const { data: surveyVisit, error: surveyVisitError } =
    useGetSurveyVisitQuery(surveyVisitId);

  const { data: houseData, error: houseError } = useGetHomeQuery(
    surveyVisit?.home_id,
    { skip: !surveyVisit }
  );

  const { data: { survey_questions: surveyQuestions } = {} } =
    useGetSurveyStructureQuery(surveyVisit?.survey_response?.survey_id, {
      skip: !surveyVisit,
    });

  const title = useMemo(
    () =>
      surveyVisit && houseData ? `${houseToString(houseData)}` : "Loading...",
    [houseData, surveyVisit]
  );

  const completedTime = useMemo(
    () =>
      surveyVisit && houseData
        ? `Completed at: ${formatISODate(surveyVisit.created_at)}`
        : "Loading...",
    [houseData, surveyVisit]
  );

  const surveyAnswers = useMemo(
    () =>
      surveyVisit?.survey_response
        ? buildDataFromSurveyAnswers(
            surveyVisit?.survey_response?.survey_answers,
            surveyQuestions?.length
          )
        : [],
    [surveyVisit, surveyQuestions]
  );

  const [
    putSurveyVisit,
    { isLoading: isSurveyVisitPutLoading, isError: isSurveyVisitPutError },
  ] = useUpdateSurveyVisitMutation();
  const [
    deleteSurveyVisit,
    { isLoading: isSurveyDeleteLoading, isError: isSurveyVisitDeleteError },
  ] = useDeleteSurveyVisitMutation();

  const onSubmit = useCallback(
    async (responses, surveyId) => {
      return await putSurveyVisit({
        id: surveyVisitId,
        body: {
          responses,
          surveyId,
          homeId: surveyVisit?.homeId,
          // TODO: probably remove this and handle on the back end
          date: new Date().toISOString(),
        },
      });
    },
    [putSurveyVisit, surveyVisit?.homeId, surveyVisitId]
  );

  const onDelete = useCallback(() => {
    deleteSurveyVisit(surveyVisitId);
    navigate(withAdminPrefix(ADMIN_SURVEY));
  }, [deleteSurveyVisit, surveyVisitId, navigate]);

  return (
    <Container>
      {readOnly && (
        <BackButton url="/surveyor/dashboard" description="dashboard" />
      )}
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      <Typography variant="subtitle1" mt={2}>
        {completedTime}
      </Typography>
      {surveyVisit && houseData ? (
        <AdminSurvey
          defaultData={surveyAnswers}
          activeHome={houseData}
          surveyId={surveyVisit.survey_response.survey_id}
          submitSurvey={onSubmit}
          onDelete={onDelete}
          isLoading={isSurveyVisitPutLoading || isSurveyDeleteLoading}
          isErrorSurvey={isSurveyVisitPutError || isSurveyVisitDeleteError}
          readOnly={readOnly}
        />
      ) : surveyVisitError || houseError ? (
        <SurveyError />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default SurveyProfile;
