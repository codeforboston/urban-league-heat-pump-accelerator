import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

const SurveyorSelect = ({
  surveyorsData,
  apiRef,
  addAssignmentsToSurveyor,
  removeAssignmentsFromSurveyor,
}) => {
  const [selectedSurveyor, setSelectedSurveyor] = useState("");

  const handleChange = (event) => {
    setSelectedSurveyor(event.target.value);
  };

  const handleAddSurveyor = async () => {
    if (!selectedSurveyor) {
      return;
    }
    const selectedAssignments = apiRef.current.getSelectedRows();
    const assignmentIds = [];
    selectedAssignments.forEach((assignment) => {
      const surveyorAssigned = assignment.surveyorData.some(
        (surveyor) => surveyor.id === selectedSurveyor
      );
      // Only adding surveyors to assignments that don't include surveyor
      if (!surveyorAssigned) {
        assignmentIds.push(assignment.id);
      }
    });

    if (assignmentIds.length > 0) {
      await addAssignmentsToSurveyor({
        surveyorId: selectedSurveyor,
        assignmentIds,
      }).unwrap();
    }
  };

  const handleRemoveSurveyor = async () => {
    if (!selectedSurveyor) {
      return;
    }
    const selectedAssignments = apiRef.current.getSelectedRows();
    const assignmentIds = [];
    selectedAssignments.forEach((assignment) => {
      const surveyorAssigned = assignment.surveyorData.some(
        (surveyor) => surveyor.id === selectedSurveyor
      );
      // Only removing surveyors from assignments that include surveyor
      if (surveyorAssigned) {
        assignmentIds.push(assignment.id);
      }
    });

    if (assignmentIds.length > 0) {
      await removeAssignmentsFromSurveyor({
        surveyorId: selectedSurveyor,
        assignmentIds,
      });
    }
  };

  return (
    <Stack direction={["column", null, null, "row"]} spacing={1} py={3} gap={1}>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="surveyor-select-label">Surveyor</InputLabel>
          <Select
            labelId="surveyor-select-label"
            id="surveyor-select"
            value={selectedSurveyor}
            label="Surveyor"
            onChange={handleChange}
          >
            {(surveyorsData || []).map((surveyor) => (
              <MenuItem key={surveyor.id} value={surveyor.id}>
                {`${surveyor.firstname} ${surveyor.lastname}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Stack direction="row" gap={1}>
        <Button size="large" variant="outlined" onClick={handleAddSurveyor}>
          Add
        </Button>
        <Button size="large" variant="outlined" onClick={handleRemoveSurveyor}>
          Remove
        </Button>
      </Stack>
    </Stack>
  );
};

export default SurveyorSelect;
