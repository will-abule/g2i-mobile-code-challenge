import React, { FC } from "react";
import styled from "styled-components/native";
import { green } from "../theme/theme";

interface LabelComponentInterface {
  text: string;
}

export const LabelComponent: FC<LabelComponentInterface> = ({ text }) => (
  <Label>{text}</Label>
);

const Label = styled.Text`
  font-size: 14px;
  color: ${green};
  text-transform: uppercase;
  margin-top: 10px;
`;
