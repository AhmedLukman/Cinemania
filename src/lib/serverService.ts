import axios from "axios";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import z from "zod";
import {
  TMDB_BASE_URL,
  TmdbApiGenreEndpoints,
  type TmdbApiMovieEndpoints,
} from "./constants";
import {
  MovieResponseSchema,
  type MovieResponseType,
  type TmdbApiMovieEndpointsType,
} from "./validators";

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_AUTH}`,
  },
});

const displayError = (error: unknown) => {
  if (process.env.NODE_ENV === "production") return;
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
    });
  } else if (error instanceof z.ZodError) {
    console.error("Zod validation error:", error.issues);
  } else {
    console.error("Unexpected error:", error);
  }
};

export const fetchMovieList = async (
  endpoint: Exclude<
    TmdbApiMovieEndpointsType,
    typeof TmdbApiMovieEndpoints.Latest
  >,
): Promise<MovieResponseType> => {
  try {
    const response = await apiClient(endpoint);
    const data = MovieResponseSchema.parse(response.data);
    return data;
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedMovieList = cache(fetchMovieList);

type GenreResponse = {
  genres: { id: number; name: string }[];
};

const fetchMovieGenres = async () => {
  try {
    const response = await apiClient(TmdbApiGenreEndpoints.MovieGenres);
    return response.data as GenreResponse;
  } catch (error) {
    displayError(error);
  }
};

export const cachedFetchMovieGenres = cache(fetchMovieGenres);

const fetchTvGenres = async () => {
  try {
    const response = await apiClient(TmdbApiGenreEndpoints.TvGenres);
    return response.data as GenreResponse;
  } catch (error) {
    displayError(error);
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
    displayError(error);
  }
};

export const cachedGetBase64 = cache(getBase64);
