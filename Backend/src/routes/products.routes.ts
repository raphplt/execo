import express, { NextFunction, Request, Response } from "express";
import {
	createController,
	getAllController,
	updateController,
	deleteController,
	search,
	getById,
	getProductsByCategory,
	score,
	trend,
} from "../controllers/products.controllers";

const router = express.Router();

// Route to get all products
router.get("/", getAllController);

// Route to search
router.get("/search", search);

// Route to get by Id
router.get("/:id", getById);

// Route to create a product
router.post("/", createController);

// Route to update a product
router.put("/:id", updateController);

// Route to delete a product
router.delete("/:id", deleteController);

// Route to get product by category
router.get("/category/:category", getProductsByCategory);

// Route to calculate score
router.post("/score/:id", score);

// Route to update trend score
router.put("/trend/:id", trend);

// Error handling
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as productsRouter };
