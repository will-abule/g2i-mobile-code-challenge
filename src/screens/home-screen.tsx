import React, { FC, useContext, useState } from "react";
import styled from "styled-components/native";
import { ButtonComponent } from "../components/button-component";
import { black, gray, white } from "../theme/theme";
import { ContainerComponent } from "../components/container-component";
import { useResponsiveHooks } from "../hooks/shared/responsive-hook";
import { DeviceInterface } from "../interfaces/shared-interface";
import { useNavigation } from "@react-navigation/core";
import { QuestionContext } from "../hooks/context/question-context-hooks";
import { ErrorComponent } from "../components/error-component";
import { LabelComponent } from "../components/label-component";

interface HomeComponentInterface {
  name?: string;
  error?: boolean;
}

export const HomeScreen: FC = () => {
  const { changeQuestionState } = useContext(QuestionContext);
  const { device } = useResponsiveHooks();
  const navigation = useNavigation();
  const [state, setActualState] = useState<HomeComponentInterface>({
    name: "",
    error: false,
  });

  const setState = (newState: HomeComponentInterface) => {
    setActualState((currentState) => ({ ...currentState, ...newState }));
  };

  const submit = () => {
    if (state.name && state.name.replace(/ /g, "").length > 4) {
      setState({ error: false });
      changeQuestionState({ userName: state.name.toLowerCase() }, () =>
        navigation.navigate("Questions")
      );
    } else setState({ error: true });
  };

  return (
    <Wrapper>
      <ContainerComponent>
        <H1 device={device}>Welcome To G2i Game</H1>

        <LabelComponent text="What's Your Name" />
        <Input
          value={state.name}
          placeholder="type.."
          onChangeText={(e) => setState({ name: e, error: false })}
        />
        {state.error ? (
          <ErrorComponent message="Your name doesn't look right it must at least 4 character" />
        ) : (
          <></>
        )}
        <ButtonComponent text="Get Started" onPress={() => submit()} />
      </ContainerComponent>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 20px;
  background: ${white};
`;

const H1 = styled.Text`
  font-size: 40px;
  font-weight: bold;
  width: ${(props: DeviceInterface) =>
    props.device.includes("tab") ? "100%" : "200px"};
  color: ${black};
`;

const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  border: 2px solid ${gray};
  margin: 10px 0;
  padding: 0 10px;
`;
