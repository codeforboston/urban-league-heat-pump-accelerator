import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
function TestimonialMessage({ title, p, name }) {
  return (
    <Container>
      <h3>Pull Quote About Benefits</h3>
      <p>
        Integer feugiat scelerisque varius morbi enim nunc faucibus a
        pellentesque. Euismod in pellentesque massa placerat duis ultricies. Ut
        porttitor leo a diam sollicitudin tempor id eu nisl
      </p>
      <ProfileContainer>
        <Avatar />
        <span>Jessica</span>
      </ProfileContainer>
    </Container>
  );
}

export default TestimonialMessage;

const Container = styled.div`
  max-width: 358px;

  padding: 10px;
  margin: 20px;
  border-radius: 5px;
  transition: all 250ms linear;
  cursor: pointer;
  :hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  background-color: rgba(0, 0, 0, 0.03);
  h3 {
    color: black;
  }
  p {
    color: gray;
    font-size: 16px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-weight: 500;
  }
`;
