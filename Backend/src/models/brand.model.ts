import mongoose from "mongoose";
import Ibrand from "../interfaces/brand.interface";

interface brandModelInterface extends mongoose.Model<BrandsDoc> {
  update: any;
  build(attr: Ibrand): BrandsDoc;
}

// Interface for the document
interface BrandsDoc extends mongoose.Document {
  brand: string;
  brand_slug: string;
  category: Array<string>;
}

// Schema for the document
const brandSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  brand_slug: {
    type: String,
    required: true,
  },
  category: {
    type: Array<string>,
    required: true,
  },
});

// Statics
brandSchema.statics.build = (attr: Ibrand) => {
  return new Brand(attr);
};

// Create the model
const Brand = mongoose.model<Ibrand, brandModelInterface>("brand", brandSchema);

export default Brand;
