import { Box, Button, List, Stack } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";

import { AssignmentHome } from "./AssignmentHome";
import OptionMenu from "./OptionMenu";
import { generateMapsLink } from "../map/mapUtils";

// does a quick comparison by order
const compareArrayByOrder = (a, b) => {
  if (a.visit_order < b.visit_order) {
    return -1;
  }
  if (a.visit_order > b.visit_order) {
    return 1;
  }
  return 0;
};

const generateGoogleMap = (checked) => {
  const sortedCheck = [...checked].sort(compareArrayByOrder);

  window.open(generateMapsLink(sortedCheck, "_blank"));
};

const AssignmentUnit = ({ data }) => {
  const [checked, setChecked] = useState([]);
  const checkedSet = useMemo(() => new Set(checked), [checked]);

  const handleToggle = useCallback(
    (home) => () => {
      if (checkedSet.has(home.id)) {
        setChecked([...checkedSet].filter((id) => id !== home.id));
      } else {
        setChecked([...checkedSet, home.id]);
      }
    },
    [checkedSet]
  );

  const selectAllIncompleted = useCallback(() => {
    setChecked(
      data
        .filter((home) => !home.completed)
        .map((home) => home.id)
        .slice(0, 10)
    );
  }, [data]);

  const handleSelectAll = useCallback(() => {
    setChecked(data.map((home) => home.id).slice(0, 10));
  }, [data]);

  const handleDeselectAll = useCallback(() => {
    setChecked([]);
  }, []);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => generateGoogleMap(checked)}
          disabled={checked.length === 0}
        >
          GENERATE MAP
        </Button>
        <OptionMenu
          handleSelectAll={handleSelectAll}
          handleDeselectAll={handleDeselectAll}
          handleSelectIncompleted={selectAllIncompleted}
        />
      </Stack>
      <List
        dense
        sx={{
          width: "100%",
        }}
      >
        {(data || []).map((home) => (
          <AssignmentHome
            key={`assignmentHome-${home.id}`}
            home={home}
            handleToggle={handleToggle}
            checked={checkedSet.has(home.id)}
            selectionCap={checkedSet.size >= 10}
          />
        ))}
      </List>
    </Box>
  );
};

export default AssignmentUnit;
