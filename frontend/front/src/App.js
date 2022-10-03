import "./App.css";
import Box from "@mui/material/Box";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Public/contact/Contact";
import ViewMenu from "./pages/viewMenu/ViewMenu";
import About from "./pages/Public/about/About";
import Login from "./pages/Surveyor/login/Login";
import DevContainer from "./pages/Developer/DevContainer";
import PublicContainer from "./pages/Public/PublicContainer";
import SurveyorContainer from "./pages/Surveyor/SurveyorContainer";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route index element={<ViewMenu />} />

          <Route path='surveyor' element={<SurveyorContainer />} />

          <Route path='public/*' element={<PublicContainer />} />

          <Route path='dev/*' element={<DevContainer />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
