import { useFieldArray, useForm } from "react-hook-form";

import { HeatPumpTextField } from "../../../components/SurveyComponent/HeatPumpTextField";
import React from "react";
import { Stack } from "@mui/material";
import { SurveyQuestionField } from "../../../components/SurveyQuestionField";

export const SurveyEditorForm = ({ formDefault, onSubmit }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: formDefault,
  });
  const { fields: surveyQuestions } = useFieldArray({
    control,
    name: "survey_questions",
  });

  // const [isEditing, setIsEditing] = useState(false);

  // const isDisabled = useMemo(
  //   () => isEditable && !isEditing,
  //   [isEditing, isEditable]
  // );

  const isDisabled = true;

  return (
    <form
      onSubmit={handleSubmit((surveyStructure) => {
        onSubmit(surveyStructure);
      })}
    >
      <Stack spacing={1} mt={4} mb={2}>
        <HeatPumpTextField
          key="title"
          control={control}
          name="title"
          label="Title"
          readOnly={isDisabled}
        />
        {surveyQuestions.map((field, index) => (
          <SurveyQuestionField
            field={field}
            index={index}
            control={control}
            readOnly={isDisabled}
          />
        ))}
      </Stack>
    </form>
  );
};
