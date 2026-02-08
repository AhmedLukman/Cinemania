import { TMDB_IMAGE_BASE_URL } from "./constants";
import type { TmdbImageSizes } from "./validators";

export const getImageUrl = (path: string, size: TmdbImageSizes) =>
  `${TMDB_IMAGE_BASE_URL}${size}${path}`;

export const isURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
