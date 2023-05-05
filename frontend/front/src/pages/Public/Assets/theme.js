import { createTheme, responsiveFontSizes } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xxs: 330, // Custom breakpoint
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    // h3
    titleHero: {
      fontFamily: "var(--font-family-1)",
      color: "var(--color-text-6)",
      fontSize: "3rem",
      display: "block",
      fontWeight: "var(--font-weight-3)",
      lineHeight: "60px",
      letterSpacing: ".02rem",

      "@media (min-width:1400px)": {
        fontSize: "3.8rem",
        lineHeight: "80px",
      },
      "@media (max-width:600px)": {
        fontSize: "2rem",
        lineHeight: "50px",
        letterSpacing: "0",
      },
    },
    // h3
    titleHeroBold: {
      fontFamily: "var(--font-family-1)",
      color: "var(--color-text-7)",
      fontSize: "3rem",
      display: "block",
      fontWeight: "var(--font-weight-3)",
      textShadow: "1px 1px 1px var(--color-text-5)",
      lineHeight: "60px",
      letterSpacing: ".09rem",
      "@media (min-width:1400px)": {
        fontSize: "3.8rem",
        lineHeight: "80px",
      },
      "@media (max-width:600px)": {
        fontSize: "2rem",
        lineHeight: "50px",
        letterSpacing: "0rem",
        fontWeight: "var(--font-weight-1)",
      },
    },
    // h6
    bodyHero: {
      color: "var(--color-text-1)",
      fontSize: "1.6rem",
      display: "block",
      textAlign: "center",
      fontWeight: "500",
      textShadow: "1px 1px 1px #000",
      lineHeight: "45px",
      "@media (min-width:1400px)": {
        fontSize: "1.8rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.3rem",
      },
    },
    // h4

    // h5
    title2: {
      fontFamily: "var(--font-family-1)",
      fontWeight: "600",
      fontSize: "1.5rem",
      display: "block",
      letterSpacing: "-.03em",
      color: "var(--color-text-2)",
      lineHeight: "34px",
    },
    // h5
    title3: {
      fontFamily: "var(--font-family-1)",
      fontWeight: "600",
      fontSize: "1.5rem",
      display: "block",
      letterSpacing: "-.03em",
      color: "var(--color-text-2)",
      lineHeight: "34px",
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

      // transition: "border-bottom-color 0.3s ease-in-out",
      // "&:hover": {
      //   borderBottomColor: "#f00",
      // },
    },
    navLinks: {
      fontSize: "1.1rem",
      display: "block",
      fontWeight: "var(--font-weight-1)",
      letterSpacing: "-.03em",
      textAlign: "center",
      color: "var(--color-text-1)",
    },
  },
  components: {
    // MuiButton: {
    //   variants: [
    //     {
    //       props: { variant: "whiteButton" },
    //       style: {
    //         color: "var(--color-text-2)",
    //         height: "50px",
    //         borderRadius: "1000px",
    //         background: "var(--bgColor-3)",
    //         width: "200px",
    //         "&:hover": {
    //           backgroundColor: "var(--bgColor-3)",
    //         },
    //       },
    //     },
    //   ],
    // },
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
