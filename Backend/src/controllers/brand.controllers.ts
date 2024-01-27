import Brand from "../models/brand.model";
import { Request, Response } from "express";
import {
  createBrand,
  updateBrand,
  deleteBrand,
} from "../services/brand.service";

// [GET] /brand
export async function getAllController(req: Request, res: Response) {
  try {
    const findAll = await Brand.find();
    if (!findAll) {
      res.status(404).send("No product found.");
    } else {
      res.send(findAll);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
}

// [GET] /brand/:id
export async function getById(req: Request, res: Response) {
  let _id = req.params.id;
  if (_id === "undefined") {
    res.status(404).send("No id provided.");
    return;
  }
  const findOne = await Brand.findOne({ _id });
  if (!findOne) {
    res.status(404).send("No product found.");
  } else {
    res.send(findOne);
  }
}
// [POST] /brand
export async function createController(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(406);
  } else {
    createBrand(req);
    res.send("Ressource created succesfully.");
  }
}

// [PUT] /brand/:id
export async function updateController(req: Request, res: Response) {
  const findOne = await Brand.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    updateBrand(req);
    res.send(`Ressource ${req.body.title} updated successfully.`);
  }
}

// [DELETE] /brand/:id
export async function deleteController(req: Request, res: Response) {
  const findOne = await Brand.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    deleteBrand(req);
    res.send(`Ressource ${req.body.title} deleted successfully.`);
  }
}
