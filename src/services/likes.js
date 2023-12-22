import api from "./apiconfig.js";

export const getLikes = async () => {
  try {
    const response = await api.get("/likes/?format=json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLike = async (id) => {
  try {
    const response = await api.get(`/likes/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLike = async (like) => {
  try {
    const response = await api.post("/likes/?format=json", like);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLike = async (id, like) => {
  try {
    const response = await api.put(`/likes/${id}?format=json`, like);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLike = async (id) => {
  try {
    const response = await api.delete(`/likes/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
