import { Request, Response } from "express";
import Products from "../models/products.model";
import {
	calculateScore,
	createProduct,
	deleteProduct,
	updateProduct,
	updateTrendScore,
} from "../services/product.service";

// [GET] /product
export async function getAllController(req: Request, res: Response) {
	try {
		const findAll = await Products.find();
		if (!findAll) {
			res.status(404).send("No product found.");
		} else {
			res.send(findAll);
		}
	} catch (error) {
		return res.status(404).send(error);
	}
}

// [GET] /product/:id
export async function getById(req: Request, res: Response) {
	let _id = req.params.id;
	if (_id === "undefined") {
		res.status(200).send("No id provided.");
		return;
	}
	const findOne = await Products.findOne({ _id });
	if (!findOne) {
		res.status(200).send("No product found.");
	} else {
		res.send(findOne);
	}
}

// [POST] /product
export async function createController(req: Request, res: Response) {
	if (!req.body) {
		res.sendStatus(406);
	} else {
		createProduct(req);
		res.send("Ressource created succesfully.");
	}
}

// [PUT] /product/:id
export async function updateController(req: Request, res: Response) {
	const findOne = await Products.find({ where: { id: req.params._id } });
	if (!findOne) {
		res.sendStatus(406);
	} else {
		updateProduct(req);
		res.send(`Ressource ${req.body.title} updated successfully.`);
	}
}

// [DELETE] /product/:id
export async function deleteController(req: Request, res: Response) {
	const findOne = await Products.find({ where: { id: req.params._id } });
	if (!findOne) {
		res.sendStatus(406);
	} else {
		deleteProduct(req);
		res.send(`Ressource deleted successfully.`);
	}
}

// [GET] /product/search?query=...
export async function search(req: Request, res: Response) {
	const { query }: any = req.query;

	const regex = new RegExp(query, "i");
	const results = await Products.find({
		$or: [{ title: { $regex: regex } }, { category: { $regex: regex } }],
	});

	res.json(results);
}

// [GET] /product/search?query=...
export async function getProductsByCategory(req: Request, res: Response) {
	const { category }: any = req.query;

	const results = await Products.find({
		type: category,
	});
	res.json(results);
}

// [POST] /product/score
export async function score(req: Request, res: Response) {
	try {
		let _id = req.params.id;
		if (_id === "undefined") {
			res.status(404).send("No id provided.");
			return;
		}
		const product = await Products.findOne({ _id });

		const result = calculateScore(product);

		res.json(result);
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
}

// [POST] /product/trend

export async function trend(req: Request, res: Response) {
	try {
		let _id = req.params.id;
		if (_id === "undefined") {
			res.status(404).send("No id provided.");
			return;
		}
		const product = await Products.findOne({ _id });

		if (!product) {
			res.status(404).send("No product found.");
			return;
		}

		const result = updateTrendScore(product, req.body.userID, req.body.productID);

		res.json(result);
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
}