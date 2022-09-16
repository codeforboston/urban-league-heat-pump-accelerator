import "./App.css";
import Box from "@mui/material/Box";

import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Nav from "./components/nav/Nav";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
