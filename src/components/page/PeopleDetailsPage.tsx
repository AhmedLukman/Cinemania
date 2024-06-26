import React from "react";
import {
  TPersonLink,
  TMovie,
  TPersonDetails,
  TPersonMediaCredits,
  TTVShow,
  TPersonImageResponse,
} from "@/lib/types";
import ProfileCard from "../ui/profile/ProfileCard";
import ProfileDetails from "../ui/profile/ProfileDetails";

const PeopleDetailsPage = ({
  personDetails,
  personMovieCredits: { cast: moviesCast, crew: moviesCrew },
  personTVShowCredits: { cast: tvShowsCast, crew: tvShowsCrew },
  personLink,
  imageResponse,
}: {
  personDetails: TPersonDetails;
  personMovieCredits: TPersonMediaCredits<TMovie>;
  personTVShowCredits: TPersonMediaCredits<TTVShow>;
  personLink: TPersonLink;
  imageResponse: TPersonImageResponse;
}) => {
  const { name, homepage, profile_path } = personDetails;
  return (
    <div className="flex flex-col md:flex-row gap-7 md:gap-10 md:mx-10 mt-20 mx-5 ">
      <aside className="flex justify-center basis-1/3">
        <ProfileCard
          className="md:sticky md:top-16 self-start"
          links={personLink}
          homepage={homepage}
          name={name}
          profilePath={profile_path}
          imageResponse={imageResponse}
        />
      </aside>
      <ProfileDetails
        moviesCast={moviesCast}
        moviesCrew={moviesCrew}
        personDetails={personDetails}
        tvShowsCast={tvShowsCast}
        tvShowsCrew={tvShowsCrew}
      />
    </div>
  );
};

export default PeopleDetailsPage;
