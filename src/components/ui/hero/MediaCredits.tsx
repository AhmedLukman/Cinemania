'use client'

import useFetchCredits from '@/app/hooks/useFetchCredits';
import React from 'react'

const MediaCredits = (
  props: TMovie | TTVShow | TMovieDetailsResponse | TTVShowDetailsResponse
) => {
  const credits = useFetchCredits(props.id);

  const director = credits?.crew?.find((person) => person.job === "Director");

  return (
    <div className="mt-5 hover:bg-white/10 transition-all duration-300  space-y-2 p-6 rounded-lg bg-gradient-to-b from-white/20 via-white/10 to-white/20">
      <p>
        <span className="text-[#cecece] text-sm mr-3">Directed by:</span>
        {director?.name || "-"}
      </p>
      <p>
        <span className="text-[#cecece] text-sm mr-3">
          Production companies:
        </span>
        {"production_companies" in props &&
          props.production_companies.map((company) => company.name + ". ")}
      </p>
      <p>
        <span className="text-[#cecece] text-sm mr-3">
          Production Countries:
        </span>
        {"production_countries" in props &&
          props.production_countries.map((country) => country.name + ". ")}
      </p>
      <p>
        <span className="text-[#cecece] text-sm mr-3">Budget:</span>
        {("budget" in props && props.budget !== 0 && props.budget.toLocaleString()) || "-"}
      </p>
      <p>
        <span className="text-[#cecece] text-sm mr-3">Revenue:</span>
        {("revenue" in props && props.revenue !== 0 && props.revenue.toLocaleString()) || "-"}
      </p>
      <p>
        <span className="text-[#cecece] text-sm mr-3">Spoken languages:</span>
        {"spoken_languages" in props &&
          props.spoken_languages.map((lang) => lang.english_name + ". ")}
      </p>
      
        {"tagline" in props && props.tagline && <p className="italic text-sm text-[#cecece] pt-5 text-center">~ {props.tagline}</p>}
    </div>
  );
};

export default MediaCredits