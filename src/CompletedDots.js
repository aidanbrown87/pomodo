import React from "react";
import styled from "styled-components";

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
`;

const CompletedDots = ({ countCompleted, className }) => (
  <div className={className}>
    {Array(countCompleted)
      .fill(0)
      .map((_, index) => (
        <Dot key={index} />
      ))}
  </div>
);

export default styled(CompletedDots)`
  grid-area: bottom;
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;
