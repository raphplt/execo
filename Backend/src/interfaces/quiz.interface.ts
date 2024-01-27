export default interface Iquiz {
  save: any;
  title: string;
  category: string;
  answers: Array<Ianswers>;
  answersType: string;
  type: string;
}

// Answers interface
interface Ianswers {
  name: string;
  slug: string;
  score: number;
}
