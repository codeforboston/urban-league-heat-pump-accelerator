import React from "react";
import styled from "styled-components";
import TestimonialMessage from "./TestimonialMessage";

function Testimonial() {
  return (
    <div>
      <UpperContainer>
        <h2>Testimonal</h2>

        <p>
          See how heat pumps helped homeowners from your neighborhood save money
          on home heating and cooling costs.
        </p>
      </UpperContainer>

      <LowerContainer>
        <TestimonialMessage />
        <TestimonialMessage />
        <TestimonialMessage />
        <TestimonialMessage />
        <TestimonialMessage />
        <TestimonialMessage />
      </LowerContainer>
    </div>
  );
}

export default Testimonial;

const UpperContainer = styled.div`
  height: 400px;
  background: linear-gradient(to bottom, #279af1, white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;

  h2 {
    font-size: 34px;
    @media (min-width: 1024px) {
      font-size: 64px;
    }
  }
  p {
    text-align: center;
    font-size: 15px;
    max-width: 500px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: gray;
  }
`;

const LowerContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  @media (min-width: 762px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;
