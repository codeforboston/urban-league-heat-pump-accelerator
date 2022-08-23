import "./App.css";
import Box from "@mui/material/Box";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

function App() {
  return (
    <Container>
      <Box p={1} m={1}>
        <Typography variant='h3'>Material UI Enabled</Typography>
      </Box>
      <Box p={1} m={1}>
        <Typography variant='h3'>ReduxToolKit Enabled</Typography>
      </Box>
      <Box p={1} m={1}>
        <Typography variant='h3'>React-Router Enabled</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Home />
      </Box>
      <Box>
        <About />
      </Box>
    </Container>
  );
}

export default App;
