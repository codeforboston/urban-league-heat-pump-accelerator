import React from "react";
import { Container, Divider, Typography, Box, Link } from "@mui/material";
import pageContent from "./privacyContent.json";
import { sentenceAsLink } from "../../../../util/stringUtils";
import Heading1BlueBgGround from "../../Components/Typography/Heading1BlueBgGround";
import Heading3 from "../../Components/Typography/Heading3";

function PrivacyPolicy() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 560px)",
      }}
    >
      <Heading1BlueBgGround text="Privacy Policy" />

      <Container>
        <Typography>
          Last updated: April 19th, 2023 <br />
          Our{" "}
          <i>
            <u style={{ color: "var(--color-text-2)" }}>Privacy Policy</u>
          </i>{" "}
          has been updated.
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "var(--color-text-10)", padding: "1em 0" }}
        >
          **This privacy policy of the Boston Heat Pump Accelerator (BHPA) will
          help you better understand how we collect, share, and use your
          personal information.**
        </Typography>
        <section style={{ padding: "1em 0" }}>
          <Heading3 text="Table of Contents" textDecoration="underline" />
          <ol>
            {pageContent.map((c, i) => (
              <li key={`privacyHeading${i}`} style={{ marginBottom: "0.5em" }}>
                <Link
                  variant="body"
                  sx={{ color: "var(--color-text-2)" }}
                  href={`#${sentenceAsLink(c.heading)}`}
                >
                  {c.heading}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <Divider />
        <section style={{ padding: "1em 0" }}>
          <Box mb={2}>
            <Heading3 text="Privacy Summary" textDecoration="underline" />
          </Box>
          {pageContent.map((c, i) => {
            return (
              <div key={`privacy${i}`}>
                <Typography
                  variant="h6"
                  id={sentenceAsLink(c.heading)}
                  sx={{ color: "var(--color-text-2)" }}
                >
                  {c.heading}
                </Typography>
                {/* Using dangerouslySetInnerHTML here to get formatting for links. */}
                <p dangerouslySetInnerHTML={{ __html: c.content }} />
              </div>
            );
          })}
        </section>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy;
