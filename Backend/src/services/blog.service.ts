import { Request } from "express";
import Iblog from "../interfaces/blog.interface";
import Blog from "../models/blog.model";

//Service to create a new brand in [Brand] table
export const createBlog = async (req: Request) => {
	// Get the data from the request body
	const { slug, title, author, cover, date, content, tags } = req.body;

	const brandModeleInterface = new Blog({
		slug,
		title,
		author,
		date,
		cover,
		content,
		tags,
	});
	return await brandModeleInterface.save();
};

// Service to update a brand of [Brand] table by id
export const updateBlog = async (req: Request) => {
	const { slug, title, author, cover, date, content, tags } = req.body;
	// Get the data from the request body
	const update = await Blog.updateOne(
		{ _id: req.params.id },
		{
			slug,
			title,
			author,
			date,
			cover,
			content,
			tags,
		}
	).catch(() => false);
	return update;
};

// Service to delete a brand of [Brand] table by id
export const deleteBlog = async (req: Request) => {
  const findOne = await Blog.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};
