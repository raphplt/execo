import express, { NextFunction, Request, Response } from "express";
import {
  createController,
  getAllController,
  updateController,
  deleteController,
  search,
  // getById,
} from "../controllers/categories.controllers";

// Instantiation du routeur
const router = express.Router();

// Route to get all products
router.get("/", getAllController);

// Test route to search
router.get("/search", search);

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

export { router as categoriesRouter };
