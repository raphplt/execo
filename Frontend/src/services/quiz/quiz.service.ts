import { api } from "../index";

// [GET] /quiz
export const fetchQuiz = async () => {
  return await api.get(`/quiz`).then((response) => response.data);
};

// [GET] /quiz/:id
export const fetchQuizById = async (id: any) => {
  return await api.get(`/quiz/${id}`).then((response) => response.data);
};
