import { api } from "../index";

// [GET] /categories
export const fetchCategories = async () => {
  return await api.get(`/categories`).then((response) => response.data);
};
