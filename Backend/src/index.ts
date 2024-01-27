import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { productsRouter } from "./routes/products.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { usersRouter } from "./routes/users.routes";
import { quizRouter } from "./routes/quiz.routes";
import { brandRouter } from "./routes/brands.routes";
import { blogRouter } from "./routes/blog.routes";
const cookieSession = require("cookie-session");
const cors = require("cors");
import dotenv from "dotenv";

// Configuration de dotenv
dotenv.config();

const MONDODB_URL = process.env.MONGO_URL || "";

// Création de l'application express
export const app = express();

// Utilisation de body-parser
app.use(json());

// Utilisation de CORS
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);

// Utilisation de cookie-session
app.use(
	cookieSession({
		name: "session",
		secret: "secret",
	})
);

// [Routes]

// Route produits
app.use("/products", productsRouter);

// Route categories
app.use("/categories", categoriesRouter);

// Route users
app.use("/users", usersRouter);

// Route quiz
app.use("/quiz", quizRouter);

// Route brands
app.use("/brands", brandRouter);

// Connexion à la base de données
app.use("/blog", blogRouter);

// Connexion à la base de données
mongoose.connect(MONDODB_URL).then(
	() => {
		console.log("Connexion à la base de données réussie !");
	},
	(err) => {
		console.log(`Erreur lors de la connexion ${err}`);
	}
);

// Post de la base de données
const port: number = 3001;

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});