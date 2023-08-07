import { createTheme, responsiveFontSizes } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

let adminTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xxs: 330, // Custom breakpoint
      smm: 450, // Custom breakpoint
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

adminTheme = createTheme(adminTheme, {
  typography: {
    h3: {
      [adminTheme.breakpoints.down("sm")]: { fontSize: "2.5rem" },
      [adminTheme.breakpoints.down("smm")]: { fontSize: "2rem" },
    },
  },
});

export default responsiveFontSizes(adminTheme);
