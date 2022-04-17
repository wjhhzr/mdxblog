import React from "react";
import styled from "styled-components";
import { Sandpack } from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
const CodeboxWrapper = styled.div``;

interface IPropsCodebox {
  children: React.ReactNode;
}

function Codebox(props) {
  console.log(props);
  
  return (
    <div style={{marginBottom:40}}>
      <Sandpack {...props} />
    </div>
  );
}

export default Codebox;
