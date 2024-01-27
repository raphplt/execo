import mongoose from "mongoose";
import { Iproducts } from "../interfaces/products.interface";

interface productModelInterface extends mongoose.Model<ProductsDoc> {
  update: any;
  build(attr: Iproducts): ProductsDoc;
}

// Interface for the document
interface ProductsDoc extends mongoose.Document {
	title: string;
	price: string;
	img: string;
	technical_data: Object;
	ecological_data: Object;
	category: string;
	trend_score: Array<number>;
	working: boolean;
}

// Schema for the document
const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	technical_data: {
		type: Object,
		required: true,
	},
	ecological_data: {
		type: Object,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	trend_score: {
		type: Array<number>,
		required: false,
	},
	working: {
		type: Boolean,
		required: true,
	},
});

// Statics
productSchema.statics.build = (attr: Iproducts) => {
  return new Product(attr);
};

// Create the model
const Product = mongoose.model<ProductsDoc, productModelInterface>(
  "products",
  productSchema
);

export default Product;
