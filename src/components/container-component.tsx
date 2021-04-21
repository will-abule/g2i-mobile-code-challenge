import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { useResponsiveHooks } from "../hooks/shared/responsive-hook";

interface ContainerInterface {
  width: string;
}

export const ContainerComponent: FC = ({ children }) => {
  const { width } = useResponsiveHooks();

  const getWidth = () => {
    if (width < 576) {
      return "100%";
    } else if (width >= 576 && width < 768) {
      return "540px";
    } else if (width >= 768 && width < 992) {
      return "720px";
    } else if (width >= 992 && width < 1200) {
      return "960px";
    } else if (width >= 1200 && width < 1400) {
      return "1140px";
    } else {
      return "1320px";
    }
  };

  return <Container width={getWidth()}>{children}</Container>;
};

const Container = styled.View`
  width: ${(props: ContainerInterface) => props.width};
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
`;
