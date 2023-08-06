import React, { useMemo } from "react";
import { Card, CardContent } from "@mui/material";

/**
 * Component for displaying a home address
 */
export const AddressComponent = ({ home }) => {
  const line1 = useMemo(() => {
    if (home) {
      let line = `${home.street_number} ${home.street_name}`;
      if (home.unit_number) {
        line += ` #${home.unit_number}`;
      }
      return line;
    }

    return "";
  }, [home]);

  const line2 = useMemo(() => {
    if (home) {
      return `${home.city}, ${home.state} ${home.zip_code}`;
    }
    return "";
  }, [home]);

  return (
    <Card sx={{ margin: "1em" }}>
      <CardContent>
        <address>
          <h3>{"Address:"}</h3>
          <div>{line1}</div>
          <div>{line2}</div>
        </address>
      </CardContent>
    </Card>
  );
};

export const houseToString = (home) => {
  if (!home) {
    return "";
  }

  const unitString = home.unit_number ? ` #${home.unit_number}` : "";
  return `${home.street_number} ${home.street_name}${unitString}, ${home.city} ${home.state}`;
};
