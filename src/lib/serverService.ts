import axios from "axios";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import {
  TMDB_BASE_URL,
  TmdbApiGenreEndpoints,
  type TmdbApiMovieEndpointsType,
} from "./constants";

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

type GenreResponse = {
  genres: { id: number; name: string }[];
};

const fetchMovieGenres = async () => {
  try {
    const response = await apiClient(TmdbApiGenreEndpoints.MovieGenres);
    return response.data as GenreResponse;
  } catch (error) {
    displayAxiosError(error);
  }
};

export const cachedFetchMovieGenres = cache(fetchMovieGenres);

const fetchTvGenres = async () => {
  try {
    const response = await apiClient(TmdbApiGenreEndpoints.TvGenres);
    return response.data as GenreResponse;
  } catch (error) {
    displayAxiosError(error);
  }
};

export const cachedFetchTvGenres = cache(fetchTvGenres);

const getBase64 = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = response.data as ArrayBuffer;
    const { base64 } = await getPlaiceholder(Buffer.from(buffer), { size: 10 });
    return base64;
  } catch (error) {
    displayAxiosError(error);
  }
};

export const cachedGetBase64 = cache(getBase64);
