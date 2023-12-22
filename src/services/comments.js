import api from "./apiconfig.js";

export const getComments = async () => {
  try {
    const response = await api.get("/comments/?format=json");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComment = async (id) => {
  try {
    const response = await api.get(`/comments/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createComment = async (comment) => {
  try {
    const response = await api.post("/comments/?format=json", comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/comments/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
