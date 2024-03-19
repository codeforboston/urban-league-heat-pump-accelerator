import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useGetHomeQuery,
  useGetSurveyStructureQuery,
  useGetSurveyVisitQuery,
} from "../../../api/apiSlice";
import { Container, Typography } from "@mui/material";
import { houseToString } from "../../../components/AddressUtils";
import { formatISODate } from "../../../components/DateUtils";
import { buildDataFromSurveyAnswers } from "../../../util/surveyUtils";
import { SurveyError } from "../../../components/SurveyComponent/SurveyStructureError";
import Loader from "../../../components/Loader";
import SurveyorSurveyReadOnly from "../Components/SurveyorSurveyReadOnly";

const SurveyVisit = () => {
  const { id: surveyVisitId } = useParams();

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
      surveyVisit && houseData
        ? `${houseToString(houseData)} ${formatISODate(surveyVisit.date)}`
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

  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      {surveyVisit && houseData ? (
        <SurveyorSurveyReadOnly
          defaultData={surveyAnswers}
          activeHome={houseData}
          surveyId={surveyVisit.survey_response.survey_id}
        />
      ) : surveyVisitError || houseError ? (
        <SurveyError />
      ) : (
        <Loader />
      )}{" "}
    </Container>
  );
};

export default SurveyVisit;
