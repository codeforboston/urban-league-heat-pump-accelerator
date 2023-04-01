import React, { useCallback, useMemo } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetSurveyListQuery } from "../../../redux/apiSlice";
import { SurveyError } from "./SurveyError";
import { AdminSurvey } from "../component/AdminSurvey";

const SurveyProfile = () => {
  const { uid } = useParams();

  const { survey, error, isLoading } = useGetSurveyListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      // make sure ID is a string!
      survey: data?.find((s) => `${s.id}` === uid),
    }),
  });

  const title = useMemo(() => `Survey ${uid}`, [uid]);

  const PageContent = useCallback(() => {
    if (survey) {
      return <AdminSurvey defaultData={survey} />;
    }

    if (error) {
      <SurveyError />;
    }

    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }, [error, survey]);

  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      <PageContent />
    </Container>
  );
};

export default SurveyProfile;
