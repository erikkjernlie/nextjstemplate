import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TriviaAPI from "src/api/trivia";
import HomePage from "src/components/pages/home";
import { Stats, TriviaQuestion } from "src/models/client/questions/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";

export interface DailyQuiz {
  questions: TriviaQuestion[];
  createdAt: number;
}

export async function getServerSideProps() {
  // Here we could fetch the documents
  return {
    props: {}, // will be passed to the page component as props
  };
}

const Home: NextPage = () => {
  const [todaysQuestions, setTodaysQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [localStorageStats, setLocalStorageStats] = useState<Stats | undefined>(
    undefined
  );
  const fetchTodaysQuestion = async () => {
    try {
      const hasStartedTodaysQuiz = localStorage.getItem(
        `quiz-results-${getTodaysDate()}`
      );
      console.log("hasStartedTodaysQuiz", !!hasStartedTodaysQuiz);
      if (!!hasStartedTodaysQuiz) {
        setLocalStorageStats(JSON.parse(hasStartedTodaysQuiz) as Stats);
        return;
      }
      const doc = await _firebaseService.getDocument<DailyQuiz>(
        `dailyQuiz/${getTodaysDate()}`
      );
      if (doc) {
        console.log("we have doc");
        setTodaysQuestions(doc.questions);

        return doc;
      } else {
        console.log("getting questions");
        let questions: TriviaQuestion[] = [];
        while (questions.length < 25) {
          const questionsResult = await TriviaAPI.getTriviaQuestions();
          const newQuestions = questionsResult._unsafeUnwrap();
          const filteredNewQuestions = newQuestions.filter(
            (q) =>
              q.question.length < 80 &&
              q.allAnswers.filter((answer) => answer.length < 45).length ===
                q.allAnswers.length
          );
          questions = questions.concat(filteredNewQuestions);
        }
        _firebaseService.set<DailyQuiz>(`dailyQuiz/${getTodaysDate()}`, {
          questions: questions,
          createdAt: new Date().getTime(),
        });
        setTodaysQuestions(questions);
        return questions;
      }
    } catch (error) {
      toast.error("Error retrieving questions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysQuestion();
  }, []);

  return (
    <HomePage
      loading={loading}
      questions={todaysQuestions}
      localStorageStats={localStorageStats}
    />
  );
};

export default Home;
