import axios from "axios";
import { CreateMarkerDto, Marker, UpdateMarkerDto } from "../types/marker";

const API_URL = "http://localhost:3000";

export const markersApi = {
  getAll: async (): Promise<Marker[]> => {
    const response = await axios.get(`${API_URL}/markers`);
    return response.data;
  },

  create: async (data: CreateMarkerDto): Promise<Marker> => {
    const response = await axios.post(`${API_URL}/markers`, data);
    return response.data;
  },

  update: async ({ id, ...data }: UpdateMarkerDto): Promise<Marker> => {
    const response = await axios.put(`${API_URL}/markers/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/markers/${id}`);
  },
};
