import axios from "axios";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import z from "zod";
import {
  type Media,
  TMDB_BASE_URL,
  TmdbApiCelebrityEndpoints,
  TmdbApiGenreEndpoints,
  TmdbApiMovieEndpoints,
  TmdbApiTvEndpoints,
} from "./constants";
import {
  CelebrityDetailsSchema,
  type CelebrityDetailsType,
  CelebrityResponseSchema,
  type CelebrityResponseType,
  GenreResponseSchema,
  type MediaType,
  MovieDetailsSchema,
  type MovieDetailsType,
  MovieResponseSchema,
  type MovieResponseType,
  type TmdbApiCelebrityEndpointsType,
  type TmdbApiMovieEndpointsType,
  type TmdbApiTvEndpointsType,
  TvDetailsSchema,
  type TvDetailsType,
  TvResponseSchema,
  type TvResponseType,
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
): Promise<MovieResponseType> => {
  try {
    const response = await apiClient(endpoint);
    return MovieResponseSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

const fetchTvList = async (
  endpoint: Exclude<TmdbApiTvEndpointsType, typeof TmdbApiTvEndpoints.Latest>,
): Promise<TvResponseType> => {
  try {
    const response = await apiClient(endpoint);
    return TvResponseSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

const fetchCelebrityList = async (
  endpoint: Exclude<
    TmdbApiCelebrityEndpointsType,
    typeof TmdbApiCelebrityEndpoints.Latest
  >,
): Promise<CelebrityResponseType> => {
  try {
    const response = await apiClient(endpoint);
    return CelebrityResponseSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedMovieList = cache(fetchMovieList);
export const cachedTvList = cache(fetchTvList);
export const cachedCelebrityList = cache(fetchCelebrityList);

// TODO: Make this flexible to accept any endpoint, not just latest
const fetchMovieDetails = async (): Promise<MovieDetailsType> => {
  try {
    const response = await apiClient(TmdbApiMovieEndpoints.Latest);
    return MovieDetailsSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

const fetchTvDetails = async (): Promise<TvDetailsType> => {
  try {
    const response = await apiClient(TmdbApiTvEndpoints.Latest);
    return TvDetailsSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

const fetchCelebrityDetails = async (): Promise<CelebrityDetailsType> => {
  try {
    const response = await apiClient(TmdbApiCelebrityEndpoints.Latest);
    return CelebrityDetailsSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedMovieDetails = cache(fetchMovieDetails);
export const cachedTvDetails = cache(fetchTvDetails);
export const cachedCelebrityDetails = cache(fetchCelebrityDetails);

const fetchGenres = async (
  type: Exclude<MediaType, typeof Media.Celebrity>,
) => {
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
