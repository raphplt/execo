import Iusers from "../interfaces/users.interface";
import User from "../models/users.model";
import { Request } from "express";
import bcrypt from "bcrypt";

//Service to create a new User
export const createUser = async (req: Request) => {
	// Get the data from the request body
	let {
		last_name,
		first_name,
		email,
		phone,
		password,
		role,
		age,
		gender,
		infos,
	} = req.body.data;

	if (password) {
		password = await bcrypt.hash(password, 10);
	}
	const userModelInterface = new User({
		last_name,
		first_name,
		email,
		phone,
		password,
		role,
		age,
		gender,
		infos,
	});
	return await userModelInterface.save();
};

// Service pour mettre à jour un user de la table [User] par id
export const updateUser = async (req: Request) => {
	// Get the data from the request body
	const {
		last_name,
		first_name,
		email,
		phone,
		password,
		role,
		age,
		gender,
		infos,
	} = req.body;
	// const email = newemail;
	// const password = newpassword;
	const update = await User.updateOne(
		{ _id: req.body.id },
		{
			last_name,
			first_name,
			email,
			phone,
			password,
			role,
			age,
			gender,
			infos,
		}
	).catch(() => false);
	return update;
};

// Service to delete a User of [User] table by id
export const deleteUser = async (req: Request) => {
	const findOne = await User.findOneAndDelete(req.body.email).catch(() => false);
	return findOne;
};

// Service for login
export const loginUser = async (req: Request) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return false;
		}

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (isPasswordValid) {
			return user;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Erreur lors de la connexion :", error);
		return false;
	}
};

// Service for register
export const registerUser = async (req: Request) => {
  // Get the data from the request body
  const { username, email, password, role, trendProducts } = req.body;
  const userModelInterface = new User({
    username,
    email,
    password,
    role,
    trendProducts,
  });
  return await userModelInterface.save();
};
