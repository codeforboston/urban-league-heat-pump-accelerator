import "./App.css";
import Box from "@mui/material/Box";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Public/contact/Contact";
import ViewMenu from "./pages/viewMenu/ViewMenu";
import Home from "./pages/Public/home/Home";
import About from "./pages/Public/about/About";
import Login from "./pages/Surveyor/login/Login";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route index element={<ViewMenu />} />

          <Route path='surveyor' element={<Login />}>
            <Route path='dashboard' />
            <Route path='houseProfile' />
          </Route>
          <Route path='public' element={<Home />}>
            {/* <Nav /> */}
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
