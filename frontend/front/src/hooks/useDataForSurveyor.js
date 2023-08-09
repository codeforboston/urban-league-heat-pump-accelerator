import { selectCurrentUser } from "../features/login/loginSlice";
import { useGetAssignmentsForSurveyorQuery } from "../api/apiSlice";
import { useSelector } from "react-redux";

export const useAssignmentsForCurrentUser = () => {
  const activeUser = useSelector(selectCurrentUser);
  return useGetAssignmentsForSurveyorQuery(activeUser.id, {
    skip: !activeUser,
  });
};
