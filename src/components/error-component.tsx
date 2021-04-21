import React, { FC } from "react";
import styled from "styled-components/native";
import { red } from "../theme/theme";

interface ErrorInterface {
  message: string;
}

export const ErrorComponent: FC<ErrorInterface> = ({ message }) => {
  return <Error>{message}</Error>;
};

const Error = styled.Text`
  margin: 10px;
  color: ${red};
  font-size: 14px;
`;
