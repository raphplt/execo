import { Request } from "express";
import Icategories from "../interfaces/categories.interface";
import Categories from "../models/categories.model";

//Service to create a new category in [Category] table
export const createCategory = async (req: Request) => {
  // Get the data from the request body
  const { category, slug, subCats, image } = req.body;

  const categoryModelInterface = new Categories({
    category,
    slug,
    subCats,
    image,
  });
  return await categoryModelInterface.save();
};

// Service to update a category of [Category] table by id
export const updateCategory = async (req: Request) => {
  // Get the data from the request body
  const { category, slug, subCats, image } = req.body;
  const update = await Categories.updateOne(
    { _id: req.params.id },
    {
      category,
      slug,
      subCats,
      image,
    }
  ).catch(() => false);
  return update;
};

// Service to delete a category of [Category] table by id
export const deleteCategory = async (req: Request) => {
  const findOne = await Categories.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};
