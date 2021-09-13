import React from "react";
import styled from "styled-components";
import { Drainer } from "./Drainer";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 1fr 10% 1fr 10%;
`;

// const Container = styled(App)`
//   margin: 0
//   background: #DD5E89;  /* fallback for old browsers */
//   background: -webkit-linear-gradient(to top, #F7BB97, #DD5E89);  /* Chrome 10-25, Safari 5.1-6 */
//   background: linear-gradient(to top, #F7BB97, #DD5E89); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
//   height: 100%;
//   z-index: -10;
// `

const BG = styled.div`
  margin: 0;
  height: 100%;
  background: #dd5e89; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #f7bb97,
    #dd5e89
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #f7bb97,
    #dd5e89
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  z-index: -100;
`;

const App = () => (
  <BG>
    <Drainer minutes={25} breakMinutes={5} />
  </BG>
);

export default App;
