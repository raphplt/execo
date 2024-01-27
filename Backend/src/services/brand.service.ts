import { Request } from "express";
import Ibrand from "../interfaces/brand.interface";
import Brand from "../models/brand.model";

//Service to create a new brand in [Brand] table
export const createBrand = async (req: Request) => {
  // Get the data from the request body
  const { brand, brand_slug, category } = req.body;

  const brandModeleInterface = new Brand({
    brand,
    brand_slug,
    category,
  });
  return await brandModeleInterface.save();
};

// Service to update a brand of [Brand] table by id
export const updateBrand = async (req: Request) => {
  // Get the data from the request body
  const { brand, brand_slug, category } = req.body;
  const update = await Brand.updateOne(
    { _id: req.params.id },
    {
      brand,
      brand_slug,
      category,
    }
  ).catch(() => false);
  return update;
};

// Service to delete a brand of [Brand] table by id
export const deleteBrand = async (req: Request) => {
  const findOne = await Brand.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};
