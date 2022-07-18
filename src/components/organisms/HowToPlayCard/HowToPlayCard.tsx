import React from "react";
import Button from "src/components/atoms/buttons/Button";
import { Column, Row } from "src/components/atoms/layout";
import { H4, P } from "src/components/atoms/typography";
import { APP_NAME } from "src/constants/app";
import { HowToPlayCardProps } from "./types";
const HowToPlayCard = ({ onPressPlay }: HowToPlayCardProps) => {
  return (
    <Column fullWidth mt={"10vh"} maxWidth="500px" px="5vw">
      <Column center mb="5vh">
        <H4 textAlign="center" color="#898989">
          HOW TO PLAY
        </H4>
      </Column>
      <Row mb="10px">
        <Column width={"40px"} alignItems="center">
          <P textAlign="center">⏳</P>
        </Column>
        <Column flex={1}>
          <P>Answer as many questions as possible within 60 seconds</P>
        </Column>
      </Row>
      <Row mb="10px">
        <Column width={40} alignItems="center">
          <P textAlign="center">🏆</P>
        </Column>
        <Column flex={1}>
          <P>Compare your highscore with friends and others</P>
        </Column>
      </Row>
      <Row mb="5vh">
        <Column width={40} alignItems="center">
          <P textAlign="center">☀️</P>
        </Column>
        <Column flex={1}>
          <P>
            A new{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {APP_NAME}
            </span>{" "}
            will be available each day!
          </P>
        </Column>
      </Row>
      <Column center>
        <Button
          onClick={onPressPlay}
          style={{
            maxWidth: 200,
          }}
        >
          PLAY
        </Button>
      </Column>
    </Column>
  );
};

export default HowToPlayCard;