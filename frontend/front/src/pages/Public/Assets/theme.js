import { createTheme } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

export const theme = createTheme({
  typography: {
    // h3
    titleHero: {
      color: "var(--color-text-5)",
      fontSize: "3rem",
      display: "block",
      fontWeight: "var(--font-weight-1)",
      textShadow: "12px 12px 12px #000",
      "@media (max-width:600px)": {
        fontSize: "2rem",
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
      marginBottom: "1rem",
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
    },
    // h6
    bodyHero: {
      color: "var(--color-text-6)",
      fontSize: "1.3rem",
      display: "block",
      // letterSpacing: "-.03em",
      padding: "0.75rem 0",
      textAlign: "center",
      fontWeight: "500",
      textShadow: "12px 12px 12px #000",
    },
    navLinks: {
      fontSize: "1rem",
      display: "block",
      fontWeight: "var(--font-weight-1)",
      letterSpacing: "-.03em",
      padding: "0.75rem 0",
      textAlign: "center",
      color: "var(--color-text-2)",
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
            height: "70px",
            fontWeight: "var(--font-weight-1)",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            letterSpacing: "-.03em",
            textShadow: "1px 1px 2px #fff",
            boxShadow: "var(--box-shadow-1)",
            border: "var(--border-card-2)",
            backgroundColor: "var(--bgColor-10)",
            "&:hover": {
              transform: "scale(1.1)",
              color: "var(--color-text-1)",
              background: "var(--bgColor-11)",
            },
          },
        },
        {
          props: { variant: "getpumpMobile" },
          style: {
            fontSize: "1rem",
            color: "var(--color-text-2)",
            height: "60px",
            borderRadius: "1000px",
            fontWeight: "var(--font-weight-1)",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            background: "var(--bgColor-10)",
            letterSpacing: "-.03em",
            textShadow: "1px 1px 2px #fff",
            boxShadow: "var(--box-shadow-1)",
            border: "var(--border-card-2)",
            "&:hover": {
              backgroundColor: "var(--bgColor-11)",
              color: "var(--color-text-11)",
            },
          },
        },
        {
          props: { variant: "getpumpOutlined" },
          style: {
            fontSize: "1rem",
            color: "var(--color-text-2)",
            height: "60px",
            borderRadius: "1000px",
            minWidth: 200,
            fontWeight: "var(--font-weight-1)",
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            boxShadow: "var(--box-shadow-1)",
            letterSpacing: "-.03em",
            // background: "var(--bgColor-10)",
            textShadow: "none",
            "&:hover": {
              transform: "scale(1.1)",
              background: "var(--bgColor-10)",
              color: "var(--color-text-1)",
            },
          },
        },
        {
          props: { variant: "customBtn" },
          style: {
            color: "var(--color-text-6)",
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
      ],
    },
  },
});
