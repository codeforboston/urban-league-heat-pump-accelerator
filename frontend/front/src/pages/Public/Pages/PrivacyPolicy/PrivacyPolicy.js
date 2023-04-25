import React from "react";
import { Container, Divider, Typography } from "@mui/material";
import pageContent from "./privacyContent.json";
import { sentenceAsLink } from "../../../../util/stringUtils";

function PrivacyPolicy() {
  return (
    <div>
      <Typography
        variant="title1"
        sx={{ background: "var(--bgColor-5)", padding: "1em 0" }}
      >
        Privacy Policy
      </Typography>
      <Container>
        <p>
          Last updated: April 19th, 2023 <br />
          Our{" "}
          <i>
            <u>Privacy Policy</u>
          </i>{" "}
          has been updated.
        </p>
        <Typography variant="h5" sx={{ color: "#D0312D", padding: "1em 0" }}>
          **This privacy policy of the Boston Heat Pump Accelerator (BHPA) will
          help you better understand how we collect, share, and use your
          personal information.**
        </Typography>
        <section style={{ padding: "1em 0" }}>
          <Typography variant="h5" sx={{ textDecoration: "underline" }}>
            Table of Contents
          </Typography>
          <ol>
            {pageContent.map((i) => (
              <li>
                <a href={`#${sentenceAsLink(i.heading)}`}>{i.heading}</a>
              </li>
            ))}
          </ol>
        </section>
        <Divider />
        <section style={{ padding: "1em 0" }}>
          <Typography variant="h5" sx={{ textDecoration: "underline" }}>
            Privacy Summary
          </Typography>
          {pageContent.map((i) => {
            return (
              <div>
                <Typography variant="h6" id={sentenceAsLink(i.heading)}>
                  {i.heading}
                </Typography>
                {/* Using dangerouslySetInnerHTML here to get formatting for links. */}
                <p dangerouslySetInnerHTML={{ __html: i.content }} />
              </div>
            );
          })}
        </section>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
