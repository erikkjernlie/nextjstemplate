import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TriviaAPI from "src/api/trivia";
import QuizTemplate from "src/components/templates/quiz/QuizTemplate";
import { Stats, TriviaQuestion } from "src/models/client/questions";
import { getRightAnswerQuote, getWrongAnswerQuote } from "src/utils/text";

const QuizPage = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [stats, setStats] = useState<Stats>({
    correctAnswerCount: 0,
    questionsCount: 0,
    wrongAnswerCount: 0,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState<boolean>(
    false
  );
  const handleQuestions = (mQuestions: TriviaQuestion[]) => {
    setQuestions(mQuestions);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const handleCorrectAnswer = (question: TriviaQuestion, answer: string) => {
    setStats({
      ...stats,
      correctAnswerCount: stats.correctAnswerCount + 1,
      questionsCount: stats.questionsCount + 1,
    });
    toast(getRightAnswerQuote(), {
      duration: 1000,
      position: "top-center",
    });
  };

  const handleWrongAnswer = (question: TriviaQuestion, answer: string) => {
    setStats({
      ...stats,
      wrongAnswerCount: stats.wrongAnswerCount + 1,
      questionsCount: stats.questionsCount + 1,
    });
    toast(getWrongAnswerQuote(), {
      duration: 1000,
      position: "top-center",
    });
  };

  const onPressAnswer = (question: TriviaQuestion, answer: string) => {
    setHighlightCorrectAnswer(true);
    if (question.correctAnswer === answer)
      handleCorrectAnswer(question, answer);
    else handleWrongAnswer(question, answer);

    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setHighlightCorrectAnswer(false);
    }, 600);
  };

  const onTimeComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  const getQuestions = useCallback(async () => {
    const questionsResult = await TriviaAPI.getTriviaQuestions();
    questionsResult.match(handleQuestions, handleError);
  }, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <QuizTemplate
      questions={questions}
      onPressAnswer={onPressAnswer}
      questionIndex={currentQuestionIndex}
      highlightCorrectAnswer={highlightCorrectAnswer}
      onTimeComplete={onTimeComplete}
      stats={stats}
      isFinished={isFinished}
    />
  );
};

export default QuizPage;
