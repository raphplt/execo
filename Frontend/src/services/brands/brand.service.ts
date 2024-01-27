import { api } from "../index";

// [GET] /brands
export const fetchBrands = async () => {
  return await api.get(`/brands`).then((response) => response.data);
};
