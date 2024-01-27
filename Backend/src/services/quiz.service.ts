import Iquiz from "../interfaces/quiz.interface";
import Quiz from "../models/quiz.model";
import { Request } from "express";

//Service to create a new quiz
export const createQuiz = async (req: Request) => {
  // Get the data from the request body
  const { title, category, answers, answersType, type } = req.body;

  const quizModelInterface: any = new Quiz({
    title,
    category,
    answers,
    answersType,
    type,
  });
  return await quizModelInterface.save();
};

// Service pour mettre à jour un produit de la table [Quiz] par id
export const updateQuiz = async (req: Request) => {
  // Get the data from the request body
  const { title, category, answers, answersType, type } = req.body;
  const update = await Quiz.updateOne(
    { _id: req.params.id },
    {
      title,
      category,
      answers,
      answersType,
      type,
    }
  ).catch(() => false);
  return update;
};

// Service to delete a quiz of [Quiz] table by id
export const deleteQuiz = async (req: Request) => {
  const findOne = await Quiz.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};
