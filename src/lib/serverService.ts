import axios from "axios";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import z from "zod";
import {
  TMDB_BASE_URL,
  TmdbApiCelebrityEndpoints,
  TmdbApiGenreEndpoints,
} from "./constants";
import {
  CelebrityDetailsSchema,
  type CelebrityDetailsType,
  type CelebrityListEndpoint,
  CelebrityResponseSchema,
  type CelebrityResponseType,
  CreditsSchema,
  type CreditsType,
  ExternalIdsSchema,
  type ExternalIdsType,
  GenreResponseSchema,
  type MediaType,
  MovieDetailsSchema,
  type MovieDetailsType,
  type MovieListEndpoint,
  MovieResponseSchema,
  type MovieResponseType,
  TvDetailsSchema,
  type TvDetailsType,
  type TvListEndpoint,
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
  endpoint: MovieListEndpoint,
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
  endpoint: TvListEndpoint,
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
  endpoint: CelebrityListEndpoint,
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

const fetchMovieDetails = async (
  endpoint: `/movie/${string}`,
): Promise<MovieDetailsType | null> => {
  try {
    const response = await apiClient(endpoint);
    return MovieDetailsSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    displayError(error);
    throw error;
  }
};

const fetchTvDetails = async (
  endpoint: `/tv/${string}`,
): Promise<TvDetailsType | null> => {
  try {
    const response = await apiClient(endpoint);
    return TvDetailsSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    displayError(error);
    throw error;
  }
};

const fetchCelebrityDetails = async (): Promise<CelebrityDetailsType | null> => {
  try {
    const response = await apiClient(TmdbApiCelebrityEndpoints.Latest);
    return CelebrityDetailsSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    displayError(error);
    throw error;
  }
};

export const cachedMovieDetails = cache(fetchMovieDetails);
export const cachedTvDetails = cache(fetchTvDetails);
export const cachedCelebrityDetails = cache(fetchCelebrityDetails);

const fetchMovieCredits = async (
  endpoint: `/movie/${string}/credits`,
): Promise<CreditsType> => {
  try {
    const response = await apiClient(endpoint);
    return CreditsSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedMovieCredits = cache(fetchMovieCredits);

const fetchMovieLinks = async (
  endpoint: `/movie/${string}/external_ids`,
): Promise<ExternalIdsType> => {
  try {
    const response = await apiClient(endpoint);
    return ExternalIdsSchema.parse(response.data);
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedMovieLinks = cache(fetchMovieLinks);

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
