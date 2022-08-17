import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

const Container = styled.div`
  width: 32px;
  height: 32px;
  font-size: 20px;
  padding: 4px 0;
  color: #dcdcdc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface IDrawdingTool extends ButtonHTMLAttributes<HTMLDivElement> {
  Icons: IconType;
  isActive?: Boolean;
}
function DrawingTool({ Icons, onClick, isActive }: IDrawdingTool) {
  return (
    <Container
      onClick={onClick}
      style={{ backgroundColor: isActive ? "#202020" : "#404040" }}
    >
      <Icons />
    </Container>
  );
}

export default DrawingTool;
