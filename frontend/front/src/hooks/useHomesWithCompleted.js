import { useMemo } from "react";
import { useGetSurveyVisitsQuery } from "../api/apiSlice";

/**
 * Workaround until https://github.com/codeforboston/urban-league-heat-pump-accelerator/pull/405 is merged
 */

export const setHomesCompleted = (homes, surveyVisits) =>
  (homes || []).map((home) => ({
    ...home,
    completed: !!surveyVisits?.find((sv) => sv.home_id === home.id),
  }));

export const useHomesWithCompleted = (homes) => {
  const { data: surveyVisits } = useGetSurveyVisitsQuery();

  return useMemo(
    () => setHomesCompleted(homes, surveyVisits),
    [homes, surveyVisits]
  );
};

export const useAssignmentsWithCompleted = (assignments) => {
  const { data: surveyVisits } = useGetSurveyVisitsQuery();

  return useMemo(
    () =>
      (assignments || []).map((a) => {
        const newHomes = setHomesCompleted(a.homes, surveyVisits);
        return {
          ...a,
          homes: newHomes,
          completed: a.homes.every((h) => h.completed === true),
        };
      }),
    [assignments, surveyVisits]
  );
};
