import React from "react";
import { Container, Divider, Typography, Box } from "@mui/material";
import pageContent from "./privacyContent.json";
import { sentenceAsLink } from "../../../../util/stringUtils";
import TitleContainer from "../../Components/PublicPageTitle";

function PrivacyPolicy() {
  return (
    <Box>
      <TitleContainer pageTitle="Privacy Policy" />
      <Container>
        <p>
          Last updated: April 19th, 2023 <br />
          Our{" "}
          <i>
            <u>Privacy Policy</u>
          </i>{" "}
          has been updated.
        </p>
        <Typography
          variant="h5"
          sx={{
            color: "#D0312D",
            padding: "1em 0",
            fontFamily: "var(--font-family-2)",
            fontWeight: "regular",
          }}
        >
          **This privacy policy of the Boston Heat Pump Accelerator (BHPA) will
          help you better understand how we collect, share, and use your
          personal information.**
        </Typography>
        <section style={{ padding: "1em 0" }}>
          <Typography
            variant="h5"
            sx={{
              textDecoration: "underline",
              fontFamily: "var(--font-family-2)",
              fontWeight: "regular",
              color: "var(--textColor-3)",
            }}
          >
            Table of Contents
          </Typography>
          <ol>
            {pageContent.map((c, i) => (
              <li key={`privacyHeading${i}`} style={{ marginBottom: "0.5em" }}>
                <a href={`#${sentenceAsLink(c.heading)}`}>{c.heading}</a>
              </li>
            ))}
          </ol>
        </section>
        <Divider />
        <section style={{ padding: "1em 0" }}>
          <Typography
            variant="h5"
            sx={{
              textDecoration: "underline",
              fontFamily: "var(--font-family-2)",
              fontWeight: "regular",
              color: "var(--textColor-3)",
            }}
          >
            Privacy Summary
          </Typography>
          {pageContent.map((c, i) => {
            return (
              <div key={`privacy${i}`}>
                <Typography variant="h6" id={sentenceAsLink(c.heading)}>
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
