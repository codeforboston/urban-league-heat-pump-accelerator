import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import House from "./houseTab/House";
import { Tabs } from "@mui/material";
import User from "./userTab/User";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            aria-label='lab API tabs example'
          >
            <Tab
              sx={{ width: "100%", typography: "h4", mt: 2 }}
              label='HOUSE'
              value='1'
            />
            <Tab
              sx={{ width: "100%", typography: "h4", mt: 2 }}
              label='USER'
              value='2'
            />
          </Tabs>
        </Box>
        <TabPanel value='1'>
          <House />
        </TabPanel>
        <TabPanel value='2'>
          <User />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
