import axios from "axios";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import z from "zod";
import {
  TMDB_BASE_URL,
  TmdbApiGenreEndpoints,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
} from "./constants";
import {
  GenreResponseSchema,
  type MediaType,
  MovieDetailsSchema,
  MovieResponseSchema,
  type TmdbApiMovieEndpointsType,
  type TmdbApiTvEndpointsType,
  TvResponseSchema,
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

const fetchMovieList = async (
  endpoint: Exclude<
    TmdbApiMovieEndpointsType,
    typeof TmdbApiMovieEndpoints.Latest
  >,
) => {
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

const fetchTvList = async (
  endpoint: Exclude<TmdbApiTvEndpointsType, typeof TmdbApiTvEndpoints.Latest>,
) => {
  try {
    const response = await apiClient(endpoint);
    const data = TvResponseSchema.parse(response.data);
    return data;
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedTvList = cache(fetchTvList);

const fetchLatestMovie = async () => {
  try {
    const response = await apiClient(TmdbApiMovieEndpoints.Latest);
    const data = MovieDetailsSchema.parse(response.data);
    return data;
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedLatestMovie = cache(fetchLatestMovie);

const fetchGenres = async (type: MediaType) => {
  try {
    const response = await apiClient(TmdbApiGenreEndpoints[type]);
    const data = GenreResponseSchema.parse(response.data);
    return data;
  } catch (error) {
    displayError(error);
  }
};

export const cachedGenres = cache(fetchGenres);

const BufferSchema = z.instanceof(Buffer);

const getBase64 = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = BufferSchema.parse(response.data);
    const { base64 } = await getPlaiceholder(Buffer.from(buffer), { size: 10 });
    return base64;
  } catch (error) {
    displayError(error);
  }
};

export const cachedGetBase64 = cache(getBase64);
