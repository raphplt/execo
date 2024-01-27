import express, { NextFunction, Request, Response } from "express";
import {
  getAllController,
  getById,
  createController,
  updateController,
  deleteController,
} from "../controllers/quiz.controllers";

const router = express.Router();

// Routes

// Route to get all products
router.get("/", getAllController);

// Route to get by Id
router.get("/:id", getById);

// Route to create a product
router.post("/", createController);

// Route to update a product
router.put("/:id", updateController);

// Route to delete a product
router.delete("/:id", deleteController);

// Error handling
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as quizRouter };
