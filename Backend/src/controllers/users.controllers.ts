import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/users.model";
import {
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../services/user.service";
import Product from "../models/products.model";

// [POST] /user/login
export async function login(req: Request, res: Response) {

  try {
    const user = await loginUser(req);
    if (!user) {
      res.status(404).send("No user found.");
    } else {
      res.send(user);
    }
  }
  catch (error) {

    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la connexion",
    });

  }
}

// [GET] /user
export async function getAllController(req: Request, res: Response) {
	try {
		const findAll = await User.find();
		if (!findAll) {
			res.status(404).send("No product found.");
		} else {
			res.send(findAll);
		}
	} catch (error) {
		return res.status(404).send(error);
	}
}

// [POST] /user
export async function createController(req: Request, res: Response) {
	console.log("req.body", req.body);
	try {
		if (!req.body) {
			res.sendStatus(406);
		} else {
			const user = createUser(req);
			if (!user) {
				res.status(404).send("No user found.");
			} else {
				res.send(user);
			}
		}
	} catch (error) {
		console.error("Erreur lors de la création d'un utilisateur :", error);
		res.status(500).json({
			message: "Une erreur est survenue lors de la création d'un utilisateur",
		});
	}
}

// [PUT] /user/:id
export async function updateController(req: Request, res: Response) {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.sendStatus(406);
	} else {
		if (req.body.oldpassword === undefined) {
			updateUser(req);
			res.send(`Ressource ${req.body.title} updated successfully.`);
			return;
		}
		const isOldPasswordValid = await bcrypt.compare(
			req.body.oldpassword,
			user.password
		);
		if (!isOldPasswordValid) {
			res.sendStatus(406);
			return;
		}
		const hashedNewPassword = await bcrypt.hash(req.body.newpassword, 10);
		req.body.newpassword = hashedNewPassword;
		updateUser(req);
		res.send(`Ressource ${req.body.title} updated successfully.`);
	}
}

// [DELETE] /user/:id
export async function deleteController(req: Request, res: Response) {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.sendStatus(406);
	} else {
		deleteUser(req);
		res.send(`Ressource deleted successfully.`);
	}
}

// [GET] /user/search?query=...
export async function search(req: Request, res: Response) {
	const { query } = req.query;

	const results = await User.find({
		$or: [{ title: query }, { type: query }],
	});

	res.json(results);
}

// Function to check if the email is already used
export const checkEmail = async (req: Request, res: Response) => {
	const email = req.body.email;
	const result = await User.findOne({ email }).catch(() => false);
	res.send(result ? true : false);
};

// Function to update the password of the user
export const changePassword = async (req: Request, res: Response) => {
	try {
		const { currentPassword, newPassword } = req.body;
		const user: any = await User.findById(req.body.id);

		// Check if user exist
		if (!user) {
			return res.status(404).json({ message: "Utilisateur introuvable" });
		}
		// Check if the new password is the same as the old one
		if (currentPassword != user.password) {
			// a decommenter si le mdp pas crypter
			// return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
		} else {
			// console.log(currentPassword);
			// console.log(user.password);
		}

		// Check if the current password is valid
		const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Mot de passe actuel incorrect" });
		}

		// Hash and save the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		await user.save();

		res.status(200).json({ message: "Mot de passe changé avec succès" });
	} catch (error) {
		console.error("Erreur lors du changement de mot de passe :", error);
		res.status(500).json({
			message: "Une erreur est survenue lors du changement de mot de passe",
		});
	}
};

// Function to update the username of the user
export const changeUsername = async (req: Request, res: Response) => {
	try {
		const { newUsername } = req.body;
		const user: any = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: "Utilisateur introuvable" });
		}

		user.username = newUsername;
		await user.save();

		res.status(200).json({ message: "Nom d'utilisateur changé avec succès" });
	} catch (error) {
		console.error("Erreur lors du changement de nom d'utilisateur :", error);
		res.status(500).json({
			message: "Une erreur est survenue lors du changement de nom d'utilisateur",
		});
	}
};
