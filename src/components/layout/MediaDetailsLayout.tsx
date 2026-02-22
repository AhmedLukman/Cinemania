import { TmdbBackdropSizes, TmdbPosterSizes } from "@/lib/constants";
import Backdrop from "../ui/Backdrop";
import ImageWithBlur from "../ui/ImageWithBlur";

type MediaDetailsLayoutProps = {
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  priority: boolean;
  children: React.ReactNode;
};

const MediaDetailsLayout = ({
  title,
  backdrop_path,
  poster_path,
  priority,
  children,
}: MediaDetailsLayoutProps) => {
  return (
    <div className="min-h-screen relative focus:outline-none">
      {/* Full Screen Image */}
      <ImageWithBlur
        className="object-cover object-center -z-20"
        alt={`${title} backdrop`}
        sizes="100vw"
        priority={priority}
        path={backdrop_path || ""}
        imageSize={TmdbBackdropSizes.ORIGINAL}
        blurImageSize={TmdbBackdropSizes.W300}
      />

      <Backdrop />

      <div className="h-full md:gap-5 lg:flex px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-28 text-white">
        {children}
        {/* Side Image */}
        <aside className="mt-10 hidden lg:block w-4/12 max-w-xl h-[68svh] rounded-xl relative mx-auto">
          <ImageWithBlur
            className=" object-cover object-center"
            path={poster_path || ""}
            alt={`${title} poster`}
            blurImageSize={TmdbPosterSizes.W92}
            imageSize={TmdbPosterSizes.W780}
            priority={priority}
            sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 41.666vw, 0vw"
          />
        </aside>
      </div>
    </div>
  );
};

export default MediaDetailsLayout;
