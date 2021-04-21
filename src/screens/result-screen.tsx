import React, { FC, useContext } from "react";
import styled from "styled-components/native";
import { ButtonComponent } from "../components/button-component";
import { black, lightgreen, green, white, gray, red } from "../theme/theme";
import { ContainerComponent } from "../components/container-component";
import { QuestionContext } from "../hooks/context/question-context-hooks";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBackHandler } from "@react-native-community/hooks";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

interface Interface {
  color?: string;
  border?: string;
  height?: number;
}

export const ResultScreen: FC = () => {
  const { questionState, changeQuestionState } = useContext(QuestionContext);
  const navigation = useNavigation();

  useBackHandler(() => {
    playAgain();
    return true;
  });

  const playAgain = () => {
    changeQuestionState(
      {
        userName: "",
        answers: [],
        questions: [],
        question: undefined,
        begin: false,
      },
      () => navigation.navigate("Home")
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper>
          <ContainerComponent>
            <Score>
              Your Score:{" "}
              {questionState.answers!.filter((a) => a.correct).length} / 10
            </Score>
            {questionState.answers!.map((data, i) => (
              <Card key={i}>
                {data.correct ? (
                  <Ionicons
                    name="checkmark-circle-sharp"
                    size={40}
                    color={green}
                    style={{
                      alignSelf: "center",
                      width: "20%",
                    }}
                  />
                ) : (
                  <MaterialIcons
                    name="cancel"
                    size={40}
                    color={red}
                    style={{
                      alignSelf: "center",
                      width: "20%",
                    }}
                  />
                )}

                <Content>
                  <Question>{data.question}</Question>
                  <Answer
                    color={data.correct ? green : red}
                    border={data.correct ? lightgreen : red}
                  >
                    {data.userAnswer}
                  </Answer>
                </Content>
              </Card>
            ))}
            <ButtonComponent text="Play Again?" onPress={() => playAgain()} />
          </ContainerComponent>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex: 1;
  padding: 20px;
  background: ${white};
  /* min-height: ${(props: Interface) => `${props.height}px`}; */
`;

const Score = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${black};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

const Card = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  padding: 5px;
  border: 2px solid ${gray};
  border-radius: 20px;
`;

const Content = styled.View`
  display: flex;
  width: 80%;
`;

const Question = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${black};
  text-align: left;
  margin: 10px 0;
`;

const Answer = styled.Text`
  font-size: 14px;
  color: ${(props: Interface) => props.color};
  border: 1px solid ${(props: Interface) => props.border};
  border-radius: 20px;
  text-align: center;
  margin: 10px 5px;
  padding: 5px;
  width: 100px;
`;
