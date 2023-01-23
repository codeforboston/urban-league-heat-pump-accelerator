import { createTheme } from "@mui/material";

// cardHero Background Color //
//   background: "#98C7D6",
//   background:
//     "linear-gradient(90deg, rgba(152,199,214,1) 50%, rgba(114,190,222,1) 100%)",

export const theme = createTheme({
  palette: {
    bgColor: {
      default: "#E9F7FB",
    },
    footer: {
      bgColor: "#1E1E1E",
    },
    textColors: {
      main: "#041367",
      second: "#fff",
      third: "rgb(252, 56, 56)",
    },
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "getpump" },
          style: {
            color: "#041367",
            height: "60px",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            background: "#efed70",

            boxShadow: "inset 0 0 0 2px hsl(0deg 0% 100% / 30% )",
            "&:hover": {
              boxShadow: "0px 4px 32px rgba(252, 56, 56, 0.4)",
              transform: "scale(1.1)",
              backgroundColor: "rgba(239, 237, 112, 0.7)",
              color: "#041367",
            },
          },
        },
        {
          props: { variant: "getpumpOutlined" },
          style: {
            color: "#fff",
            height: "50px",
            borderRadius: "1000px",
            minWidth: 200,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            boxShadow: "inset 0 0 0 2px hsl(0deg 0% 100% / 30%)",
            "&:hover": {
              boxShadow: "0px 4px 32px rgba(252, 56, 56, 0.4)",
              boxShadow: "inset 0 0 0 2px hsl(0deg 0% 100% )",
              transform: "scale(1.1)",
            },
          },
        },
      ],
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: "hero" },
          style: {},
        },
        {
          props: { variant: "image" },
          style: {},
        },
      ],
    },
  },
});
