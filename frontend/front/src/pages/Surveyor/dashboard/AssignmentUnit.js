import { Box, Button, List, Stack } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import {generateGoogleMapsLink} from "../map/mapUtils";
import { AssignmentHome } from "./AssignmentHome";
import OptionMenu from "./OptionMenu";
import {AppleDeviceMaps} from "./AppleDeviceMaps";
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

const sortedMaplocation = (checked) => {
  return[...checked].sort(compareArrayByOrder);
};


const AssignmentUnit = ({ data }) => {
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [checked, setChecked] = useState([]);
  const checkedSet = useMemo(() => new Set(checked), [checked]);
  //device info
    // multiple waypoints for Apple Maps was introduce with IOS16 this will not work if Iphone IOS is below 15
    const userAgent = navigator.userAgent;
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
  const handleShowIncomplete = useCallback(() => {
    setShowOnlyIncomplete((prev) => !prev);
  }, []);

  const handleGoogleMapBtn = ()=>{
      const sortedLocations = checked.map((id) => data.find((d) => d.id === id))
      window.open(generateGoogleMapsLink(sortedLocations),'_blank');
    }
  return (
    <Box>
      <Stack direction="row" spacing={2}>
          {/iPad|iPhone|iPod/.test(userAgent)?
              <AppleDeviceMaps locations={sortedMaplocation(checked.map((id) => data.find((d) => d.id === id)))} checked={checked}></AppleDeviceMaps>
              :<Button variant="contained" onClick={handleGoogleMapBtn} disabled={checked.length===0}>
                  GENERATE ROUTE
              </Button>
          }
        <OptionMenu
          handleSelectAll={handleSelectAll}
          handleDeselectAll={handleDeselectAll}
          handleSelectIncompleted={selectAllIncompleted}
          handleShowIncomplete={handleShowIncomplete}
          showOnlyIncomplete={showOnlyIncomplete}
        />
      </Stack>
      <List
        dense
        sx={{
          width: "100%",
        }}
      >
        {(data || [])
          .filter((home) => !home.completed)
          .map((home) => (
            <AssignmentHome
              key={`assignmentHome-${home.id}`}
              home={home}
              handleToggle={handleToggle}
              checked={checkedSet.has(home.id)}
              selectionCap={checkedSet.size >= 10}
            />
          ))}
        {(data || [])
          .filter((home) => home.completed)
          .map((home) =>
            showOnlyIncomplete && home.completed ? null : (
              <AssignmentHome
                key={`assignmentHome-${home.id}`}
                home={home}
                handleToggle={handleToggle}
                checked={checkedSet.has(home.id)}
                selectionCap={checkedSet.size >= 10}
              />
            )
          )}
      </List>
    </Box>
  );
};

export default AssignmentUnit;
