import { api } from "../index";

// [GET] /products
export const fetchProducts = async () => {
  return await api.get(`/products`).then((response) => response.data);
};

// [GET] /products/:id
export const fetchProduct = async (id: any) => {
  return await api.get(`/products/${id}`).then((response) => response.data);
};

// [GET] /products/search?query=${search}
export const searchProduct = async (search: any) => {
  return await api
    .get(`/products/search?query=${search}`)
    .then((response) => response.data);
};

// [GET] /products/searchWithFilters?query=${search}
export const searchProductWithFilters = async (name: any, filters: any) => {
  const categorys = JSON.stringify(filters.categorys) || "";
  const brands = JSON.stringify(filters.brands) || "";

  return await api
    .get(
      `/products/searchWithFilters?search=${name}&categorys=${categorys}&brands=${brands}`
    )
    .then((response) => response.data);
};


// [GET] /products/category/${category}
export const getProductsByCategory = async (category: any) => {
  return await api
    .get(`/products/category/${category}`)
    .then((response) => response.data);
};
  
export const getScore = async (id: any) => {
	console.log(id);
	return await api
		.post(`/products/score/${id}`)
		.then((response) => response.data);
};

export const setTrend = async (productID: any, userID: any, score: any) => {
	return await api
		.put(`/products/trend/${productID}`, {})
		.then((response) => response.data);
};