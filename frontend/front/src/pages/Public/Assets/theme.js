import { createTheme } from "@mui/material";

const defaultTheme = createTheme();

export const theme = createTheme({
  palette: {
    footer: {
      main: "#1E1E1E",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "dashed" },
          style: {
            textTransform: "none",
            border: `2px dashed ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "hero" },
          style: {
            backgroundColor: "purple",
            // defaultTheme.palette.mode === "dark" ? "#1A2027" : "#fff",
            ...defaultTheme.typography.body2,
            padding: defaultTheme.spacing(2),
            textAlign: "center",
            height: "500px",
            color: defaultTheme.palette.text.secondary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        {
          props: { variant: "image" },
          style: {
            backgroundColor: "yellow",
            // defaultTheme.palette.mode === "dark" ? "#1A2027" : "#fff",
            ...defaultTheme.typography.body2,
            padding: defaultTheme.spacing(2),
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            height: "500px",
            color: defaultTheme.palette.text.secondary,
          },
        },
      ],
    },
  },
});
