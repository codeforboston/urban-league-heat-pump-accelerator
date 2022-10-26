import { Box, Grid, Typography, Stack, ButtonBase } from "@mui/material";
import React from "react";

{
}
const data = [
  "listview1",
  "listview1",
  "listview1",
  "listview1",
  "listview1",
  "listview1",
  "listview1",
  "listview1",
  "listview1",
  "listview1",
  "listview1",
];

const ListView = () => {
  const itemMap = data.map((item) => {
    return (
      <Grid item xs={12}>
        <ButtonBase sx={{ width: "100%" }}>
          <Box pt={2} borderTop={1} px={2} sx={{ width: "100%" }}>
            <Box textAlign='left'>
              <Typography>12345 John Smith Way</Typography>
              <Typography>John Smith</Typography>

              <Box py={1}>
                <Stack direction='row' spacing={1}>
                  <Typography>Question:</Typography>
                  <Typography sx={{ color: "green" }}>Completed</Typography>
                </Stack>
                <Stack direction='row' spacing={1}>
                  <Typography>Evaluation:</Typography>
                  <Typography sx={{ color: "orange" }}>Incomplete</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </ButtonBase>
      </Grid>
    );
  });

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='left'
      mt={2}
    >
      {itemMap}
    </Grid>
  );
};

export default ListView;
