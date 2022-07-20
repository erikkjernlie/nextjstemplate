import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import QuizTemplate from "src/components/templates/quiz/QuizTemplate";
import { DUMMY_QUESTION } from "src/models/client/questions/constants";
import { Stats, TriviaQuestion } from "src/models/client/questions/types";
import { HomePageProps } from "./types";

const HomePage = ({ questions, loading }: HomePageProps) => {
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [lastQuestionAnsweredTime, setLastQuestionAnsweredTime] = useState(
    new Date().getTime()
  );

  const [stats, setStats] = useState<Stats>({
    correctAnswerCount: 0,
    questionsCount: 0,
    wrongAnswerCount: 0,
  });

  const [points, setPoints] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const router = useRouter();

  const handleCorrectAnswer = (question: TriviaQuestion, answer: string) => {
    setStats({
      ...stats,
      correctAnswerCount: stats.correctAnswerCount + 1,
      questionsCount: stats.questionsCount + 1,
    });

    // This part is for Kahoot scoring
    const questionTime = 10;
    const responseTime =
      new Date().getTime() / 1000 - lastQuestionAnsweredTime / 1000;
    const maxPoints = 1000;

    const mPoints = Math.floor(
      (1 - (responseTime * 0.5) / questionTime) * maxPoints
    );

    setPoints(mPoints + points);
  };

  const handleWrongAnswer = (question: TriviaQuestion, answer: string) => {
    setStats({
      ...stats,
      wrongAnswerCount: stats.wrongAnswerCount + 1,
      questionsCount: stats.questionsCount + 1,
    });
  };

  const onPressAnswer = (question: TriviaQuestion, answer: string) => {
    if (question.correctAnswer === answer)
      handleCorrectAnswer(question, answer);
    else handleWrongAnswer(question, answer);

    setTimeout(() => {
      setLastQuestionAnsweredTime(new Date().getTime());
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 600);
  };

  const onTimeComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  const question =
    currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : undefined;

  const onPressPlay = () => {
    setIsStarted(true);
  };

  const onPressPracticeTrivia = () => {
    router.push("/practice");
  };

  const onPressPracticeMath = () => {
    router.push("/practice/math");
  };

  return (
    <QuizTemplate
      question={question}
      onPressAnswer={onPressAnswer}
      onTimeComplete={onTimeComplete}
      onPressPlay={onPressPlay}
      stats={stats}
      isFinished={isFinished}
      isStarted={isStarted}
      points={points}
      loading={loading}
      onPressPracticeTrivia={onPressPracticeTrivia}
      onPressPracticeMath={onPressPracticeMath}
    />
  );
};

export default HomePage;