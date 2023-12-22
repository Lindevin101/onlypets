import api from "./apiconfig.js";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts/?format=json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPetPosts = async (id) => {
  try {
    const response = await api.get(`pet/${id}/posts/`);
    console.log(id);
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await api.post("/posts/", post);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await api.put(`/posts/${id}?format=json`, post);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
