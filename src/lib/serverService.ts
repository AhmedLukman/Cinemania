import axios from "axios";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import z from "zod";
import {
  Media,
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

const fetchMediaList = async <T extends MediaType>(
  type: T,
  endpoint:
    | Exclude<TmdbApiMovieEndpointsType, typeof TmdbApiMovieEndpoints.Latest>
    | Exclude<TmdbApiTvEndpointsType, typeof TmdbApiTvEndpoints.Latest>
    | Exclude<
        TmdbApiCelebrityEndpointsType,
        typeof TmdbApiCelebrityEndpoints.Latest
      >,
): Promise<
  T extends typeof Media.Movie
    ? MovieResponseType
    : T extends typeof Media.TV
      ? TvResponseType
      : CelebrityResponseType
> => {
  try {
    const isMovie = type === Media.Movie;
    const isTV = type === Media.TV;
    const response = await apiClient(endpoint);
    const data = isMovie
      ? MovieResponseSchema.parse(response.data)
      : isTV
        ? TvResponseSchema.parse(response.data)
        : CelebrityResponseSchema.parse(response.data);
    return data as T extends typeof Media.Movie
      ? MovieResponseType
      : T extends typeof Media.TV
        ? TvResponseType
        : CelebrityResponseType;
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedMediaList = cache(fetchMediaList);

const fetchMediaDetails = async <T extends MediaType>(
  type: T,
): Promise<
  T extends typeof Media.Movie
    ? MovieDetailsType
    : T extends typeof Media.TV
      ? TvDetailsType
      : CelebrityDetailsType
> => {
  try {
    const isMovie = type === Media.Movie;
    const isTV = type === Media.TV;
    const response = await apiClient(
      isMovie
        ? TmdbApiMovieEndpoints.Latest
        : isTV
          ? TmdbApiTvEndpoints.Latest
          : TmdbApiCelebrityEndpoints.Latest,
    );
    const data = isMovie
      ? MovieDetailsSchema.parse(response.data)
      : isTV
        ? TvDetailsSchema.parse(response.data)
        : CelebrityDetailsSchema.parse(response.data);
    return data as T extends typeof Media.Movie
      ? MovieDetailsType
      : T extends typeof Media.TV
        ? TvDetailsType
        : CelebrityDetailsType;
  } catch (error) {
    displayError(error);
    throw error;
  }
};

export const cachedMediaDetails = cache(fetchMediaDetails);

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
