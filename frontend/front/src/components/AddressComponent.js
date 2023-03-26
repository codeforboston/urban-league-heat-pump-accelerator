import React from "react";
import { Card, CardContent } from "@mui/material";

/**
 * Component for displaying a home address
 */
export const AddressComponent = ({ home }) => (
  <Card>
    <CardContent>
      <address>
        <h3>{"Address:"}</h3>
        <div>{`${home.street} #${home.aptNumber}`}</div>
        <div>{`${home.city}, MA ${home.zipCode}`}</div>
      </address>
    </CardContent>
  </Card>
);
