import mongoose from "mongoose";
import Iblog from "../interfaces/brand.interface";

interface blogModelInterface extends mongoose.Model<BlogDoc> {
  update: any;
  build(attr: Iblog): BlogDoc;
}

// Interface for the document
interface BlogDoc extends mongoose.Document {
	slug: string;
	title: string;
	author: string;
	cover: string;
	date: Date;
	content: string;
	tags: Array<string>;
}

// Schema for the document
const blogSchema = new mongoose.Schema({
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	cover: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	tags: {
		type: Array,
		required: true,
	},
});

// Statics
blogSchema.statics.build = (attr: Iblog) => {
  return new Blog(attr);
};

// Create the model
const Blog = mongoose.model<Iblog, blogModelInterface>("blog", blogSchema);

export default Blog;
