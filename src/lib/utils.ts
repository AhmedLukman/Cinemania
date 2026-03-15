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

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const formatDate = (date: string) => {
  if (!date) return { day: "-", suffix: "", month: "", year: "" };
  const d = new Date(date);
  const day = d.getUTCDate();
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = d.getUTCFullYear();

  // Ordinal suffix logic
  const j = day % 10;
  const k = day % 100;
  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  if (j === 2 && k !== 12) suffix = "nd";
  if (j === 3 && k !== 13) suffix = "rd";

  return { day, suffix, month, year };
};
