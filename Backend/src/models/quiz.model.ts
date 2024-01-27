import mongoose from "mongoose";
import Iquiz from "../interfaces/quiz.interface";

interface quizModelInterface extends mongoose.Model<QuizDoc> {
  update: any;
  build(attr: Iquiz): QuizDoc;
}

// Interface for the document
interface QuizDoc extends mongoose.Document {
  title: string;
  category: string;
  answers: Array<string>;
  answersType: string;
  score: number;
}

// Schema for the document
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  answers: {
    type: Array<String>,
    required: false,
  },
  answersType: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: false,
  },
});

// Statics
quizSchema.statics.build = (attr: Iquiz) => {
  return new Quiz(attr);
};

// Create the model
const Quiz = mongoose.model<QuizDoc, quizModelInterface>("quiz", quizSchema);

export default Quiz;
