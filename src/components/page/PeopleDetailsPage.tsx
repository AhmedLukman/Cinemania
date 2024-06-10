import React from "react";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Link,
  ScrollShadow,
  cn,
} from "@nextui-org/react";
import {
  TMovie,
  TPersonDetails,
  TPersonMediaCredits,
  TTVShow,
} from "@/lib/types";
import { getAge, getGender, getImageUrl } from "@/lib/utils";
import MediaCard from "../ui/MediaCard";

const PeopleDetailsPage = ({
  personDetails,
  personMovieCredits: {
    id: movieCreditsId,
    cast: moviesCast,
    crew: moviesCrew,
  },
  personTVShowCredits: {
    id: tvCreditsId,
    cast: tvShowsCast,
    crew: tvShowsCrew,
  },
}: {
  personDetails: TPersonDetails;
  personMovieCredits: TPersonMediaCredits<TMovie>;
  personTVShowCredits: TPersonMediaCredits<TTVShow>;
}) => {
  const {
    name,
    also_known_as,
    biography,
    birthday,
    deathday,
    gender,
    homepage,
    place_of_birth,
    popularity,
    profile_path,
  } = personDetails;
  return (
    <div className="flex flex-col md:flex-row gap-7 md:gap-10 md:mx-10 mt-20 mx-5 ">
      <div className="flex justify-center basis-1/3  ">
        <Card
          shadow="sm"
          className=" w-96 md:sticky md:top-16 self-start bg-white"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              alt={""}
              className=" w-96 h-96 md:h-[65vh] object-cover"
              src={getImageUrl(profile_path)}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <h1 className="text-xl font-bold">{name}</h1>
            <div className="space-x-3 flex items-center">
              <FontAwesomeIcon
                size="lg"
                className="hover:cursor-pointer hover:text-neutral-500"
                icon={faXTwitter}
              />
              <FontAwesomeIcon
                size="lg"
                className="hover:cursor-pointer hover:text-neutral-500"
                icon={faInstagram}
              />
              <FontAwesomeIcon
                size="lg"
                className="hover:cursor-pointer hover:text-neutral-500"
                icon={faFacebook}
              />
              {homepage && (
                <Link
                  className="text-black/60 ml-2"
                  title="Visit homepage"
                  isExternal
                  href={homepage}
                  showAnchorIcon
                />
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className=" basis-2/3 bg-white/10 p-5 rounded-lg text-white ">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 font-serif">
          Personal Info
        </h2>
        <p>
          Age: <span className="text-gray-300">{getAge(birthday)}</span>
        </p>
        <p className="my-2">
          <span>Birthday: </span>
          <time className="text-gray-300" dateTime={birthday}>
            {birthday}
          </time>
        </p>
        {deathday && (
          <p className="my-2">
            <span>Deathday: </span>
            <time className="text-gray-300" dateTime={birthday}>
              {deathday}
            </time>
          </p>
        )}
        <p className="my-2">
          Also known as:{" "}
          <span className="text-gray-300">{also_known_as.join(", ")}</span>
        </p>
        <p className="my-2">
          Gender: <span className="text-gray-300">{getGender(gender)}</span>
        </p>
        <p className="my-2">
          Place of birth:{" "}
          <span className="text-gray-300">{place_of_birth}</span>
        </p>
        <p>
          Popularity: <span className="text-gray-300">{popularity}</span>
        </p>
        <Divider className="mt-5 bg-neutral-600" />
        <h2 className="text-2xl md:text-3xl font-bold my-5 font-serif">
          Biography
        </h2>
        {biography.split("\n").map((paragraph, index) => (
          <p key={index} className="text-gray-300 whitespace-normal mb-4">
            {paragraph}
          </p>
        ))}

        {(moviesCast.length > 0 || moviesCrew.length > 0) && (
          <>
            <Divider className="mt-5 bg-neutral-600" />
            <h2 className="text-2xl md:text-3xl font-bold my-5 font-serif">
              Movie credits
            </h2>
          </>
        )}

        {moviesCast.length > 0 && (
          <>
            <h3 className="text-xl md:text-2xl font-serif mb-5">Cast</h3>
            <ScrollShadow
              hideScrollBar
              className=" grid grid-cols-2 xl:grid-cols-3 gap-5 h-[30rem]"
            >
              {moviesCast.map((movieCast) => (
                <MediaCard
                  key={movieCast.id}
                  media={movieCast}
                  path={`/movie/${movieCast.id}`}
                />
              ))}
            </ScrollShadow>
          </>
        )}

        {moviesCrew.length > 0 && (
          <>
            <h3 className="text-xl md:text-2xl font-serif my-5">Crew</h3>
            <ScrollShadow
              hideScrollBar
              className=" grid grid-cols-2 xl:grid-cols-3 gap-5 h-[30rem]"
            >
              {moviesCrew.map((movieCrew) => (
                <MediaCard
                  key={movieCrew.id}
                  media={movieCrew}
                  path={`/movie/${movieCrew.id}`}
                />
              ))}
            </ScrollShadow>
          </>
        )}

        {(tvShowsCast.length > 0 || tvShowsCrew.length > 0) && (
          <>
            <Divider className="mt-5 bg-neutral-600" />
            <h2 className="text-2xl md:text-3xl font-bold my-5 font-serif">
              TV Show credits
            </h2>
          </>
        )}

        {tvShowsCast.length > 0 && (
          <>
            <h3 className="text-xl md:text-2xl font-serif my-5">Cast</h3>
            <ScrollShadow
              hideScrollBar
              className=" grid grid-cols-2 xl:grid-cols-3 gap-5 h-[30rem]"
            >
              {tvShowsCast.map((tvShowCast) => (
                <MediaCard
                  key={tvShowCast.id}
                  media={tvShowCast}
                  path={`/movie/${tvShowCast.id}`}
                />
              ))}
            </ScrollShadow>
          </>
        )}

        {tvShowsCrew.length > 0 && (
          <>
            <h3 className="text-xl md:text-2xl font-serif my-5">Crew</h3>
            <ScrollShadow
              hideScrollBar
              className=" grid grid-cols-2 xl:grid-cols-3 gap-5 h-[30rem]"
            >
              {tvShowsCrew.map((tvShowCrew) => (
                <MediaCard
                  key={tvShowCrew.id}
                  media={tvShowCrew}
                  path={`/movie/${tvShowCrew.id}`}
                />
              ))}
            </ScrollShadow>
          </>
        )}
      </div>
    </div>
  );
};

export default PeopleDetailsPage;