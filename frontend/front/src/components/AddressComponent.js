import React from "react";
import { Card, CardContent } from "@mui/material";

/**
 * Component for displaying a home address
 */
export const AddressComponent = ({ home }) => (
  <Card sx={{ margin: "1em" }}>
    <CardContent>
      <address>
        <h3>{"Address:"}</h3>
        <div>{`${home?.street_number} ${home?.street_name} #${home?.unit_number}`}</div>
        <div>{`${home?.city}, ${home?.state} ${home?.zip_code}`}</div>
      </address>
    </CardContent>
  </Card>
);
