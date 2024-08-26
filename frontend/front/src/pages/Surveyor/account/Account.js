import React from "react";
import { useSelector } from "react-redux";
import { BackButton } from "../Components/BackButton";
import { useGetSurveyorQuery } from "../../../api/apiSlice";
import { selectCurrentUser } from "../../../features/login/loginSlice";
import Loader from "../../../components/Loader";
import CustomSnackbar from "../../../components/CustomSnackbar";
import EditAccount from "../Components/EditAccount";

const Account = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {
    data: surveyorData,
    isLoading: isSurveyorDataLoading,
    isError: isSurveyorError,
  } = useGetSurveyorQuery(currentUser.id);

  return (
    <>
      <BackButton url="/surveyor/dashboard" description="dashboard" />
      {isSurveyorDataLoading ? (
        <Loader />
      ) : !surveyorData || isSurveyorError ? (
        <CustomSnackbar
          message="Error fetching surveyor data."
          severity="error"
        />
      ) : (
        <EditAccount surveyorData={surveyorData} />
      )}
    </>
  );
};

export default Account;
