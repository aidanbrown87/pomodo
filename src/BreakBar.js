import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  width: 100%;
  // background-color: blue;
  background: #134e5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: ${(props) => props.height}%;
  position: absolute;
  bottom: 0;
  z-index: -1;
  transition: height 1s linear;
`;

const BreakBar = ({ seconds, totalSeconds, isActive }) => (
  <Bar height={isActive ? ((seconds + 1) / totalSeconds) * 100 : 0} />
);

export default BreakBar;
