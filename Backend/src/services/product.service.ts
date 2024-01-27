import { Iproducts } from "../interfaces/products.interface";
import Products from "../models/products.model";
import { Request } from "express";

//Service to create a new product
export const createProduct = async (req: Request) => {
  // Get the data from the request body
  const {
    title,
    price,
    img,
    technical_data,
    ecological_data,
    category,
    trend_score,
    working,
  } = req.body;

  const productModelInterface: any = new Products({
    title,
    price,
    img,
    technical_data,
    ecological_data,
    category,
    trend_score,
    working,
  });
  return await productModelInterface.save();
};

// Service pour mettre à jour un produit de la table [Product] par id
export const updateProduct = async (req: Request) => {
  // Get the data from the request body
  const {
    title,
    price,
    img,
    technical_data,
    ecological_data,
    category,
    trend_score,
    working,
  } = req.body;

  const update = await Products.updateOne(
    { _id: req.params.id },
    {
      title,
      price,
      img,
      technical_data,
      ecological_data,
      category,
      trend_score,
      working,
    }
  ).catch(() => false);
  return update;
};

// Service to delete a product of [Product] table by id
export const deleteProduct = async (req: Request) => {
  const findOne = await Products.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};

// Service to calculate the ecological score of a product
export const calculateScore = (product: any) => {

  let totalScore = 0;
		let divider = 0;

		const setRepairability = (product: any) => {
			if (product.ecological_data.indice_de_reparabilite === undefined) {
				return 0;
			}
			divider++;
			return product.ecological_data.indice_de_reparabilite;
		};

		const setReconditioned = (product: any) => {
			if (product.ecological_data.reconditionne === undefined) {
				return 0;
			}
			divider++;
			return product.ecological_data.reconditionne ? 10 : 0;
		};

		if (product.category == "Téléphonie") {
			totalScore += setRepairability(product);
			totalScore += setReconditioned(product);
		}

		return (totalScore / divider).toFixed(1);

}

// Function tu add a product to the trend
export const updateTrendScore = async (product: any, userID: number, score: number) => {

  const hasUSerAlreadyVoted = product.trend_score.find(
    (id: number) => id === userID
  );

  if (hasUSerAlreadyVoted) {
    return false;
  }

  const result = await Products.updateOne(
    { _id: product._id },
    { $push: { trend_score: userID } }
  ).catch(() => false);
  return result;
}
