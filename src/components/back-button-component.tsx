import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { black, white } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";

interface BackButtonComponentPropsInterface {
  goBack: Function;
}

interface BackButtonComponentInterface {
  color: string;
  backgroundColor: string;
  borderColor: string;
}

export const BackButtonComponent: FC<BackButtonComponentPropsInterface> = ({
  goBack,
}) => {
  const [state, setActualState] = useState<BackButtonComponentInterface>({
    color: black,
    backgroundColor: white,
    borderColor: black,
  });

  const setState = (newState: BackButtonComponentInterface) => {
    setActualState((currentState) => ({ ...currentState, ...newState }));
  };

  return (
    <Button
      onPress={() => goBack()}
      onShowUnderlay={() =>
        setState({
          color: white,
          backgroundColor: black,
          borderColor: black,
        })
      }
      onHideUnderlay={() =>
        setState({
          color: black,
          backgroundColor: white,
          borderColor: black,
        })
      }
      {...{
        color: state.color,
        backgroundColor: state.backgroundColor,
        borderColor: state.borderColor,
      }}
    >
      <Ionicons
        name="chevron-back"
        size={24}
        color={state.color}
        style={{
          padding: 5,
        }}
      />
    </Button>
  );
};

const Button = styled.TouchableHighlight`
  border: 2px solid
    ${(props: BackButtonComponentInterface) => props.borderColor};
  background: ${(props: BackButtonComponentInterface) => props.backgroundColor};
  border-radius: 20px;
  height: 40px;
  width: 40px;
  margin: 10px 0;
  position: absolute;
  top: 25px;
  left: 10px;
`;
