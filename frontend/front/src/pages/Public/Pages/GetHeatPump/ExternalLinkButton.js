import { Link } from "@mui/material";

function ExternalLinkButton({ text, link, sx }) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: "260px",
        height: "48px",
        backgroundColor: "var(--bgColor-2)",
        color: "var(--color-text-1)",
        borderRadius: "30px",
        alignSelf: "center",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "underline",
        ...sx,
      }}
    >
      {text}
    </Link>
  );
}

export default ExternalLinkButton;
