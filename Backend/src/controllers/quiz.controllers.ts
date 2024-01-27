import Quiz from "../models/quiz.model";
import { Request, Response } from "express";
import { createQuiz, updateQuiz, deleteQuiz } from "../services/quiz.service";

// [GET] /quiz
export async function getAllController(req: Request, res: Response) {
  try {
    const findAll = await Quiz.find();
    if (!findAll) {
      res.status(404).send("No product found.");
    } else {
      res.send(findAll);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
}

// [GET] /quiz/:id
export async function getById(req: Request, res: Response) {
  let _id = req.params.id;
  if (_id === "undefined") {
    res.status(200).send("No id provided.");
    return;
  }
  const findOne = await Quiz.findOne({ _id });
  if (!findOne) {
    res.status(200).send("No product found.");
  } else {
    res.send(findOne);
  }
}

// [POST] /quiz
export async function createController(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(406);
  } else {
    createQuiz(req);
    res.send("Ressource created succesfully.");
  }
}

// [PUT] /quiz/:id
export async function updateController(req: Request, res: Response) {
  const findOne = await Quiz.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    updateQuiz(req);
    res.send(`Ressource ${req.body.title} updated successfully.`);
  }
}

// [DELETE] /quiz/:id
export async function deleteController(req: Request, res: Response) {
  const findOne = await Quiz.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    deleteQuiz(req);
    res.send(`Ressource ${req.body.title} deleted successfully.`);
  }
}
