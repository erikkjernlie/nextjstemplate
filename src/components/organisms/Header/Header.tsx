import { useRouter } from "next/dist/client/router";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLeaderboard } from "react-icons/md";
import Button from "src/components/atoms/buttons/Button";
import { Column, Row } from "src/components/atoms/layout";
import Modal from "src/components/atoms/modals/Modal";
import { P, TextBase } from "src/components/atoms/typography";
import { APP_NAME } from "src/constants/app";
import useGroupId from "src/hooks/useGroupId";
import HowToPlayCard from "../HowToPlayCard/HowToPlayCard";
const Header = () => {
  const router = useRouter();

  const onPressPracticeTrivia = () => {
    router.push("/practice");
  };

  const onPressPracticeMath = () => {
    router.push("/practice/math");
  };
  const [modalContent, setModalContent] = React.useState<
    "settings" | "leaderboard" | "question" | "gdpr ❤️" | undefined
  >(undefined);

  const groupId = useGroupId();

  return (
    <Row
      fullWidth
      borderBottom="1px solid #3a3a3c"
      py="6px"
      alignItems="center"
      justifyContent="space-between"
      px="2vw"
    >
      <Row alignItems="center">
        <FiMenu
          size={26}
          color="white"
          style={{
            marginRight: "1vw",
          }}
          onClick={() => setModalContent("gdpr ❤️")}
        />
        <AiOutlineQuestionCircle
          size={24}
          color="white"
          onClick={() => setModalContent("question")}
        />
      </Row>
      <Column>
        <TextBase bold fontSize={30}>
          {groupId ? groupId : APP_NAME}
        </TextBase>
      </Column>
      <Row alignItems="center">
        <MdOutlineLeaderboard
          size={24}
          color="white"
          onClick={() => setModalContent("leaderboard")}
          style={{
            marginRight: "1vw",
          }}
        />

        <IoMdSettings
          size={24}
          color="white"
          onClick={() => setModalContent("settings")}
        />
      </Row>
      <Modal
        isOpen={modalContent !== undefined}
        onClose={() => setModalContent(undefined)}
        title={modalContent}
      >
        {modalContent === "settings" && (
          <>
            <Column mt="20px" mb="20px">
              <TextBase fontSize={12}>
                Feel free to practice. Practice is good. Good is great. You are
                great.
              </TextBase>
            </Column>
            <Column my="10px">
              <Button onClick={onPressPracticeTrivia} style={{}}>
                Practice quiz
              </Button>
            </Column>
            <Column my="10px">
              <Button
                onClick={onPressPracticeMath}
                style={{
                  backgroundColor: "#F09A00",
                }}
              >
                Practice math
              </Button>
            </Column>
          </>
        )}
        {modalContent === "leaderboard" && (
          <Column>
            You can add your score to as many leaderboards as you want. Feel
            free to create leaderboards and share them with your friends.
          </Column>
        )}
        {modalContent === "question" && (
          <Column mt="30px">
            <HowToPlayCard moreExplanation name="" />
          </Column>
        )}
        {modalContent === "gdpr ❤️" && (
          <Column mt="30px" center>
            <P>
              We respect your privacy policy, and are not storing any
              information about.
            </P>
          </Column>
        )}
      </Modal>
    </Row>
  );
};

export default Header;
