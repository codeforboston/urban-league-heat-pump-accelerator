import { Box, Stack, Grid, Typography } from "@mui/material";
import React from "react";

const AccountDetail = (props) => {
  return (
    <Grid item xs={12}>
      <Box display="flex" px={2}>
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="h6">{props.label + ":"}</Typography>
          <Typography variant="body1">{props.value}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
};

export default AccountDetail;
