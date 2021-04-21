import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { ButtonComponent } from "../components/button-component";
import { black, white } from "../theme/theme";
import { ContainerComponent } from "../components/container-component";
import { useResponsiveHooks } from "../hooks/shared/responsive-hook";
import { DeviceInterface } from "../interfaces/shared-interface";
import { useNavigation } from "@react-navigation/core";
import { QuestionContext } from "../hooks/context/question-context-hooks";
import { ActivityIndicator, Alert } from "react-native";
import { QuestionInterface } from "../interfaces/question-interface";
import { LabelComponent } from "../components/label-component";
import { BackButtonComponent } from "../components/back-button-component";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

interface QuestionComponentInterface {
  loading?: boolean;
}

export const QuestionScreen: FC = () => {
  const { questionState, changeQuestionState } = useContext(QuestionContext);
  const { device } = useResponsiveHooks();
  const navigation = useNavigation();
  const [state, setActualState] = useState<QuestionComponentInterface>({
    loading: false,
  });

  const setState = (newState: QuestionComponentInterface) => {
    setActualState((currentState) => ({ ...currentState, ...newState }));
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = () => {
    if (
      questionState.answers!.length === 0 &&
      questionState.questions!.length === 0
    ) {
      setState({ loading: true });
      fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      )
        .then((response) => {
          return response.json();
        })
        .then((questions) => {
          const data: QuestionInterface[] = questions.results;

          changeQuestionState(
            {
              questions: data.map((d) => {
                return { ...{ userAnswer: "", correct: "" }, ...d };
              }),
              question: { ...{ userAnswer: "", correct: "" }, ...data[0] },
            },
            () =>
              setState({
                loading: false,
              })
          );
        })
        .catch(() => {
          Alert.prompt("Error", "Unable to load questions", () =>
            navigation.navigate("Home")
          );
        });
    }
  };

  const answer = (type: string) => {
    setState({ loading: true });
    setTimeout(() => {
      if (questionState.questions && questionState.answers) {
        const currentQuestion = questionState.question;
        changeQuestionState(
          {
            answers: [
              ...questionState.answers,
              ...[
                {
                  ...questionState.questions[0],
                  ...{
                    correct:
                      currentQuestion?.correct_answer.toLowerCase() === type,
                    userAnswer: type,
                  },
                },
              ],
            ],
          },
          () => setState({ loading: false })
        );
      }
    }, 100);
  };

  return (
    <Wrapper>
      {state.loading ? (
        <ActivityIndicator size="large" color={black} />
      ) : (
        <>
          <BackButtonComponent goBack={() => navigation.navigate("Home")} />
          <ContainerComponent>
            {!questionState.begin ? (
              <>
                <H1 device="tablet">Hola,</H1>
                <H1 device="tablet">{questionState?.userName}! &</H1>
                <H2>Welcome to Trivia Challenge!</H2>
                <P>You'll be precented with 10 True or False questions.</P>
                <LabelComponent text="can you score 100%?" />
                <ButtonComponent
                  text="Begin"
                  onPress={() => changeQuestionState({ begin: true })}
                />
              </>
            ) : (
              <Div>
                {questionState.answers!.length + 1 <= 10 ? (
                  <>
                    <AntDesign
                      name="questioncircleo"
                      size={100}
                      color="black"
                    />
                    <LabelComponent
                      text={`${questionState.question?.category}`}
                    />
                    <H3>{questionState.question?.question}</H3>
                    <P>{questionState.answers!.length + 1} of 10</P>
                  </>
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={100}
                      color="black"
                    />
                    <LabelComponent text="Done 🎉" />
                    <H3>Great! Ready to see your result?</H3>
                    <P>{questionState.answers!.length} of 10</P>
                  </>
                )}

                <Section>
                  {questionState.answers &&
                  questionState.answers?.length + 1 <= 10 ? (
                    <>
                      <ButtonComponent
                        text="False"
                        onPress={() => answer("false")}
                        width={device.includes("tab") ? "200px" : "150px"}
                      />
                      <ButtonComponent
                        width={device.includes("tab") ? "200px" : "150px"}
                        text="True"
                        onPress={() => answer("true")}
                        default={{
                          textColor: white,
                          backgroundColor: black,
                          borderColor: black,
                        }}
                        active={{
                          textColor: white,
                          backgroundColor: black,
                          borderColor: black,
                        }}
                      />
                    </>
                  ) : (
                    <ButtonComponent
                      text="Yes!"
                      onPress={() => navigation.navigate("Result")}
                    />
                  )}
                </Section>
              </Div>
            )}
          </ContainerComponent>
        </>
      )}
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
  text-transform: capitalize;
`;

const H2 = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${black};
  text-transform: capitalize;
  letter-spacing: 1px;
`;

const H3 = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${black};
  text-align: center;
  margin: 10px 0;
`;

const P = styled.Text`
  font-size: 14px;
  color: ${black};
  margin-top: 20px;
`;

const Div = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Section = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding: 5px;
`;
