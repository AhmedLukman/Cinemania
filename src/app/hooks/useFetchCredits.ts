import { MoviesUrl, TVShowsUrl } from "@/lib/constants";
import { fetchMedia } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const useFetchCredits = (id: number): TMediaCreditsResponse | null => {
  const [credit, setCredit] = useState<TMediaCreditsResponse | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCredits = async () => {
      if (!id) return;
      if (pathname === `/movie/${id}`) {
        const movies = (await fetchMedia(
          MoviesUrl.Origin + id + "/credits?language=en-US"
        )) as TMediaCreditsResponse;
        setCredit(movies);
      } else if (pathname === `/tv/${id}`) {
        const tv = (await fetchMedia(
          TVShowsUrl.Origin + id + "/credits?language=en-US"
        )) as TMediaCreditsResponse;
        setCredit(tv);
      }
    };

    fetchCredits();
  }, [id, pathname]);

  return credit;
};

export default useFetchCredits;
