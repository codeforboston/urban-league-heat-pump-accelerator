import { Link, Typography } from "@mui/material";

function Step1Section() {
  return (
    <Typography
      variant="body1"
      sx={{
        paddingLeft: "25px",
        color: "#0A0B0B",
        lineHeight: { xs: "25px", lg: "40px" },
      }}
    >
      a. Square footage <br />
      b. How many floors <br />
      c. Current HVAC system
      <br />
      d. Current utility bills/usage
      <br />
      e. Estimate Your savings{" "}
      <span>
        <Link
          underline="none"
          href="https://www.cenhud.com/en/my-energy/save-energy-money/energy-calculators/fuel-switching-calculator/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "inherit", textDecoration: "underline" }}
        >
          {"with this link calculator"}
        </Link>
      </span>
    </Typography>
  );
}

export default Step1Section;
