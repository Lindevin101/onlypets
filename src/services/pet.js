import api from "./apiconfig.js";

export const getMyPets = async () => {
  try {
    const response = await api.get("/user/pets/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPet = async (id) => {
  try {
    const response = await api.get(`/pets/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPet = async (pet) => {
  try {
    const response = await api.post("/pets/", pet);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatepets = async (id, pets) => {
  try {
    const response = await api.put(`/pets/${id}?format=json`, pets);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletepets = async (id) => {
  try {
    const response = await api.delete(`/pets/${id}?format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
