import Blog from "../models/blog.model";
import { Request, Response } from "express";
import { createBlog, updateBlog, deleteBlog } from "../services/blog.service";

/**
 * Get all blogs
 * @param req - The incoming request
 * @param res - The outgoing response
 */
export async function getAllController(req: Request, res: Response) {
  try {
    const findAll = await Blog.find();
    if (!findAll) {
      res.status(404).send("No product found.");
    } else {
      res.send(findAll);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
}

/**
 * Get a blog by ID
 * @param req - The incoming request
 * @param res - The outgoing response
 */
export async function getById(req: Request, res: Response) {
  let _id = req.params.id;
  if (_id === "undefined") {
    res.status(200).send("No id provided.");
    return;
  }
  const findOne = await Blog.findOne({ _id });
  if (!findOne) {
    res.status(200).send("No product found.");
  } else {
    res.send(findOne);
  }
}

/**
 * Create a new blog
 * @param req - The incoming request
 * @param res - The outgoing response
 */
export async function createController(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(406);
  } else {
    createBlog(req);
    res.send("Ressource created succesfully.");
  }
}

/**
 * Update a blog
 * @param req - The incoming request
 * @param res - The outgoing response
 */
export async function updateController(req: Request, res: Response) {
  const findOne = await Blog.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    updateBlog(req);
    res.send(`Ressource ${req.body.title} updated successfully.`);
  }
}


/**
 * Delete a blog
 * @param req - The incoming request
 * @param res - The outgoing response
 */
export async function deleteController(req: Request, res: Response) {
  const findOne = await Blog.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    deleteBlog(req);
    res.send(`Ressource ${req.body.title} deleted successfully.`);
  }
}
