import { Box, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ContainerTitle from "../component/ContainerTitle";
import HomeTable from "./HomeTable";

const Home = () => {
  return (
    <ContainerTitle name="HOMES">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box m={2}>
          <Button
            variant="contained"
            component={Link}
            startIcon={<AddIcon />}
            to="createHome"
          >
            Create New Home
          </Button>
        </Box>
      </Box>

      <HomeTable />
    </ContainerTitle>
  );
};

export default Home;
