import "./App.css";
import Box from "@mui/material/Box";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewMenu from "./pages/viewMenu/ViewMenu";
import DevContainer from "./pages/Developer/DevContainer";
import PublicContainer from "./pages/Public/PublicContainer";
import PublicContainerOld from "./pages/PublicOld/PublicContainerOld";

import SurveyorContainer from "./pages/Surveyor/SurveyorContainer";
import AdminContainer from "./pages/Admin/AdminContainer";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route index element={<ViewMenu />} />

          <Route path='surveyor/*' element={<SurveyorContainer />} />

          <Route path='public/*' element={<PublicContainer />} />
          
          <Route path='publicOld/*' element={<PublicContainerOld />} />

          <Route path='dev/*' element={<DevContainer />} />

          <Route path='admin/*' element={<AdminContainer />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
