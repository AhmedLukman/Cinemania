import { TMDB_IMAGE_BASE_URL } from "./constants";
import type { CreditsType, TmdbImageSizes } from "./validators";

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

export const getDirector = (credits: CreditsType) =>
  credits?.crew?.find((person) => person.job === "Director");
