import React, { FC, useState } from "react";
import styled from "styled-components/native";
import {
  ButtonPropsInterface,
  ButtonInterface,
} from "../interfaces/button-interface";
import { black, white } from "../theme/theme";
import { DeviceInterface } from "../interfaces/shared-interface";
import { useResponsiveHooks } from "../hooks/shared/responsive-hook";

interface CombinedInterface extends ButtonInterface, DeviceInterface {}

export const ButtonComponent: FC<ButtonPropsInterface> = (props) => {
  const { device } = useResponsiveHooks();
  const [state, setActualState] = useState({
    textColor: props.default ? props.default.textColor : black,
    backgroundColor: props.default ? props.default.backgroundColor : white,
    borderColor: props.default ? props.default.borderColor : black,
    default: props.default
      ? props.default
      : {
          textColor: black,
          backgroundColor: white,
          borderColor: black,
        },
    active: props.active
      ? props.active
      : {
          textColor: white,
          backgroundColor: black,
          borderColor: black,
        },
  });

  const setState = (newState: ButtonInterface) => {
    setActualState((currentState) => ({ ...currentState, ...newState }));
  };

  return (
    <Button
      onPress={() => props.onPress()}
      width={props.width}
      onShowUnderlay={() =>
        setState({
          textColor: state.active.textColor,
          backgroundColor: state.active.backgroundColor,
          borderColor: state.active.borderColor,
        })
      }
      onHideUnderlay={() =>
        setState({
          textColor: state.default.textColor,
          backgroundColor: state.default.backgroundColor,
          borderColor: state.default.borderColor,
        })
      }
      {...{
        textColor: state.textColor,
        backgroundColor: state.backgroundColor,
        borderColor: state.borderColor,
        device,
      }}
    >
      <ButtonText
        {...{
          textColor: state.textColor,
          backgroundColor: state.backgroundColor,
          borderColor: state.borderColor,
        }}
      >
        {props.text}
      </ButtonText>
    </Button>
  );
};
const Button = styled.TouchableHighlight`
  border: 2px solid ${(props: CombinedInterface) => props.borderColor};
  background: ${(props: ButtonInterface) => props.backgroundColor};
  border-radius: 20px;
  height: 40px;
  width: ${(props: CombinedInterface) =>
    !props.width
      ? props.device.includes("tab")
        ? "200px"
        : "100%"
      : props.width};
  margin: 10px 5px;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  text-align: center;
  padding: 10px;
  color: ${(props: ButtonInterface) => props.textColor};
`;
