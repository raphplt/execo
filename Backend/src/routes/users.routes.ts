import express, { NextFunction, Request, Response } from "express";
import {
	createController,
	getAllController,
	updateController,
	deleteController,
	search,
	login,
	checkEmail,
	changePassword,
	changeUsername,
} from "../controllers/users.controllers";

const router = express.Router();

// Routes

// Route to get all products
router.get("/", getAllController);

// Route to get by Id
router.get("/search", search);

// Route to create a product
router.post("/register", createController);

// Route to delete a product
router.delete("/delete", deleteController);

// Route to login
router.post("/login", login);

// Route to check email
router.post("/checkEmail", checkEmail);

// Route to update a product
router.post("/update", updateController);

// Route to update a product
router.post("/updatepassword", changePassword)

// Route to update a product
router.post("/:id/updateusername", changeUsername)

// Error handling
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as usersRouter };
