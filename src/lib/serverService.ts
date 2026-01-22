import axios from "axios";
import { cache } from "react";
import { TMDB_BASE_URL, type TmdbApiMovieEndpointsType } from "./constants";

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_AUTH}`,
  },
});

const displayAxiosError = (error: unknown) => {
  if (process.env.NODE_ENV === "production") return;
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
    });
  } else {
    console.error("Unexpected error:", error);
  }
};

export const fetchMedia = async (endpoint: TmdbApiMovieEndpointsType) => {
  try {
    const response = await apiClient(endpoint);
    return response.data;
  } catch (error) {
    displayAxiosError(error);
    throw error;
  }
};

export const cachedFetchMedia = cache(fetchMedia);
