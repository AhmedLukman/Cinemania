import { GENRES, MOVIES_OPTIONS } from "./constants";

// PLACEHOLDER LOADER
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

export const getGenreNameById = (genreId: number) => {
  const genre = GENRES.find((genre) => genre.id === genreId);
  return genre ? genre.name : "Unknown"; // If genre is found, return its name, otherwise return "Unknown"
};

export const fetchMovies = async (url: string) => {
  const res = await fetch(url, MOVIES_OPTIONS);
  if (!res.ok) console.error("Something went wrong");
  const result: TMediaResponse<TMovie> | TMediaResponse<TTVShow> =
    await res.json();
  if (!result) console.error('No results');

  return result;
};
