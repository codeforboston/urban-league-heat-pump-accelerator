import { createTheme, responsiveFontSizes } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

const theme = createTheme({
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
    // body
    body: {
      margin: 0,
      // fontWeight: 400,
      fontSize: "16px",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      "@media (min-width:900px)": {
        fontSize: "18px",
      },
    },

    // h5
    title4: {
      fontFamily: "var(--font-family-1)",
      fontWeight: "600",
      fontSize: "1.5rem",
      display: "block",
      letterSpacing: "-.03em",
      color: "var(--color-text-2)",
      lineHeight: "34px",

      margin: "0 auto",
      borderBottom: "2px solid var(--color-text-6)",
      borderRadius: "2px",
      width: "fit-content",
    },

    navLinks: {
      fontSize: "1rem",
      display: "block",
      fontWeight: 600,
      letterSpacing: "-.03em",
      textAlign: "center",
      color: "var(--color-text-1)",
    },

    navLinksMobile: {
      fontSize: "1.5rem",
      display: "block",
      fontWeight: 600,
      letterSpacing: "-.03em",
      textAlign: "center",
      color: "var(--color-text-1)",
    },

    navLinksMobileDropdown: {
      fontSize: "1.4rem",
      display: "block",
      fontWeight: 600,
      letterSpacing: "-.03em",
      textAlign: "center",
      color: "var(--color-text-1)",
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "var(--bgColor-1) !important",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "var(--color-text-3)",
        },
      },
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
