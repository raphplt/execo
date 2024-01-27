import { Request, Response } from "express";
import Category from "../models/categories.model";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/category.service";

// [GET] /category
export async function getAllController(req: Request, res: Response) {
  try {
    const findAll = await Category.find();
    if (!findAll) {
      res.status(404).send("No category found.");
    } else {
      res.send(findAll);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
}

// [GET] /category/:id
export async function createController(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(406);
  } else {
    createCategory(req);
    res.send("Ressource created succesfully.");
  }
}

// [PUT] /category/:id
export async function updateController(req: Request, res: Response) {
  const findOne = await Category.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    updateCategory(req);
    res.send(`Ressource ${req.body.title} updated successfully.`);
  }
}

// [DELETE] /category/:id
export async function deleteController(req: Request, res: Response) {
  const findOne = await Category.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    deleteCategory(req);
    res.send(`Ressource deleted successfully.`);
  }
}

// [GET] /category/search?query=...
export async function search(req: Request, res: Response) {
  const { query } = req.query;

  const results = await Category.find({ cat: query });

  res.json(results);
}
