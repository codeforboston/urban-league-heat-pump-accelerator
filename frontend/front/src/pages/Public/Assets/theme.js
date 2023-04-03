import { createTheme } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

export const theme = createTheme({
  typography: {
    // h3
    titleHero: {
      color: "var(--color-text-4)",
      fontSize: "3rem",
      display: "block",
      fontWeight: "var(--font-weight-1)",
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
      color: "var(--color-text-7)",
      fontSize: "3rem",
      display: "block",
      fontWeight: "var(--font-weight-2)",
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
    title1: {
      display: "block",
      width: "100%",
      fontSize: "2rem",
      letterSpacing: "-.03em",
      background: "var(--bgColor-5)",
      padding: "0.75rem 0",
      textAlign: "center",
      // "@media (max-width:600px)": {
      //   fontSize: "2rem",
      // },
    },
    // h5
    title2: {
      fontSize: "1.5rem",
      display: "block",
      letterSpacing: "-.03em",
      padding: "0.75rem 0",
      textAlign: "center",
      lineHeight: "34px",
    },
    navLinks: {
      fontSize: "1rem",
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
            textShadow: "1px 1px 2px #fff",
            boxShadow: "var(--box-shadow-1)",
            backgroundColor: "var(--bgColor-10)",
            border: "var(--box-shadow-2)",
            "&:hover": {
              border: "var(--box-shadow-3)",
              transform: "scale(1.1)",
              color: "var(--color-text-2)",
              background: "var(--bgColor-11)",
            },
          },
        },
        {
          props: { variant: "getpumpOutlined" },
          style: {
            fontSize: "1rem",
            color: "var(--color-text-1)",
            height: "60px",
            borderRadius: "1000px",
            minWidth: 200,
            fontWeight: "var(--font-weight-1)",
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            boxShadow: "var(--box-shadow-1)",
            letterSpacing: "-.03em",
            textShadow: "none",
            "&:hover": {
              transform: "scale(1.1)",
              background: "var(--bgColor-10)",
              color: "var(--color-text-2)",
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
            backgroundColor: "var(--bgColor-3)",
            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: "var(--bgColor-3)",
              textShadow: "1px 1px 2px #000",
            },
          },
        },
        {
          props: { variant: "blackBtn" },
          style: {
            color: "var(--color-text-1)",
            height: "50px",
            borderRadius: "1000px",
            backgroundColor: "var(--accent-2)",
          },
        },
      ],
    },
  },
});
