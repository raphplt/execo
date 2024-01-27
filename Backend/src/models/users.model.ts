import mongoose from "mongoose";
import Iusers from "../interfaces/users.interface";

interface userModelInterface extends mongoose.Model<UsersDoc> {
  update: any;
  build(attr: Iusers): UsersDoc;
}

// Interface for the document
interface UsersDoc extends mongoose.Document {
	last_name: string;
	first_name: string;
	email: string;
	phone: number;
	password: string;
	role: string;
	age: string;
	gender: string;
	infos: object;
}

// Schema for the document
const userSchema = new mongoose.Schema({
	last_name: {
		type: String,
		required: true,
	},
	first_name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: false,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: false,
	},
	gender: {
		type: String,
		required: false,
	},
	infos: {
		type: Object,
		required: false,
	},
});

// Statics
userSchema.statics.build = (attr: Iusers) => {
  return new User(attr);
};

// Create the model
const User = mongoose.model<UsersDoc, userModelInterface>("users", userSchema);

export default User;
