import { createTheme } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

export const theme = createTheme({
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
      // textShadow: "1px 1px 1px var(--color-text-5)",
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
      fontSize: "1.3rem",
      display: "block",
      textAlign: "center",
      fontWeight: "500",
      textShadow: "1px 1px 1px #000",
      lineHeight: "45px",
      "@media (min-width:1400px)": {
        fontSize: "1.8rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.2rem",
      },
    },
    // h4
    title1: {
      color: "var(--color-text-2)",
      fontFamily: "var(--font-family-1)",
      display: "block",
      width: "100%",
      fontSize: "2rem",
      letterSpacing: "-.03em",
      textAlign: "center",
      fontWeight: "700",
      // "@media (max-width:600px)": {
      //   fontSize: "2rem",
      // },
    },
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
    MuiButton: {
      variants: [
        {
          props: { variant: "getpump" },
          style: {
            fontSize: "1rem",
            color: "var(--color-text-2)",
            height: "50px",
            fontWeight: "var(--font-weight-1)",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            letterSpacing: "-.03em",
            background: "var(--bgColor-1)",
            "&:hover": {
              background: "var(--bgColor-1)",
            },
          },
        },
        {
          props: { variant: "customBtn" },
          style: {
            color: "var(--color-text-1)",
            height: "50px",
            borderRadius: "1000px",
            minWidth: 200,
            backgroundColor: "var(--bgColor-2)",
            "&:hover": {
              backgroundColor: "var(--bgColor-2)",
              textShadow: "1px 1px 2px #000",
            },
          },
        },
        {
          props: { variant: "whiteBtn" },
          style: {
            color: "var(--color-text-2)",
            height: "50px",
            borderRadius: "1000px",
            background: "var(--bgColor-4)",
            width: "200px",
            "&:hover": {
              backgroundColor: "var(--bgColor-4)",
            },
          },
        },
      ],
    },
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
