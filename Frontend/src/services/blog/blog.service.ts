import { api } from "../index";

/**
 * Fetches all blog articles.
 * @returns A promise that resolves to the data of the blog articles.
 */
export const fetchBlog = async () => {
  return await api.get(`/blog`).then((response) => response.data);
};

/**
 * Fetches a blog article by ID.
 * @param id The ID of the blog article.
 * @returns A promise that resolves to the data of the blog article.
 */
export const fetchArticle = async (id: any) => {
  return await api.get(`/blog/${id}`).then((response) => response.data);
};

/**
 * Updates a blog article.
 * @param id The ID of the blog article.
 * @param data The new data for the blog article.
 * @returns A promise that resolves to the data of the updated blog article.
 */
export const updateArticle = async (id: any, data: any) => {
  return await api.put(`/blog/${id}`, data).then((response) => response.data);
};

/**
 * Deletes a blog article.
 * @param id The ID of the blog article.
 * @returns A promise that resolves to the data of the deleted blog article.
 */
export const deleteArticle = async (id: any) => {
  return await api.delete(`/blog/${id}`).then((response) => response.data);
};
