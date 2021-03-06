import { Stats, TriviaQuestion } from "src/models/client/questions/types";

export type HomePageProps = {
  questions: TriviaQuestion[];
  loading: boolean;
  localStorageStats?: Stats;
};
