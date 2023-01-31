import { createTheme } from "@mui/material";

/* The custom colors palette is located in the Index.css file. */

export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "getpump" },
          style: {
            color: "var(--color-text-1)",
            height: "60px",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            background: "var(--bgColor-8)",

            boxShadow: "(--box-shadow-1)",
            "&:hover": {
              boxShadow: "var(--box-shadow-2)",
              transform: "scale(1.1)",
              backgroundColor: "var(--bgColor-8)",
              color: "var(--color-text-1)",
            },
          },
        },
        {
          props: { variant: "getpumpOutlined" },
          style: {
            color: "var(--color-text-2)",
            height: "50px",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            boxShadow: "var(--box-shadow-1)",
            "&:hover": {
              boxShadow: "var(--box-shadow-hover-1)",
              transform: "scale(1.1)",
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
            },
          },
        },
      ],
    },
  },
});
