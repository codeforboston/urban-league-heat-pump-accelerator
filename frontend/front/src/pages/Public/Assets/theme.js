import { createTheme } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

export const theme = createTheme({
  typography: {
    // h3
    titleHero: {
      fontSize: "3rem",
      display: "block",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    // h4
    title1: {
      display: "block",
      width: "100%",
      fontSize: "2rem",
      display: "block",
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
    navLinks: {
      fontSize: "1rem",
      display: "block",
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
            color: "var(--color-text-1)",
            height: "60px",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            background: "var(--bgColor-5)",
            letterSpacing: "-.03em",
            textShadow: "1px 1px 2px #fff",
            boxShadow: "var(--box-shadow-1)",
            border: "var(--border-card-2)",
            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: "var(--bgColor-8)",
            },
          },
        },
        {
          props: { variant: "getpumpOutlined" },
          style: {
            fontSize: "1rem",
            color: "var(--color-text-2)",
            height: "50px",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            boxShadow: "var(--box-shadow-1)",
            letterSpacing: "-.03em",
            "&:hover": {
              transform: "scale(1.1)",
              textShadow: "1px 1px 2px #000",
            },
          },
        },
        {
          props: { variant: "customBtn" },
          style: {
            color: "var(--color-text-2)",
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
