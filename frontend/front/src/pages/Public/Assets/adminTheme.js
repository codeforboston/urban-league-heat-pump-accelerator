import { createTheme, responsiveFontSizes } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

const adminTheme = createTheme({
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
  typography: {
    h3: {
      fontSize: ["2rem", "2rem", "3rem"],
    },
  },
  components: {},
});

export default adminTheme;
