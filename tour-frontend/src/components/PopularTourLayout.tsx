import { type ReactNode, type FC } from 'react';
import { Link } from 'react-router-dom';

interface PopularTourLayoutProps {
  children?: ReactNode;
}

const PopularTourLayout: FC<PopularTourLayoutProps> = ({ children }) => {
  return (
    <section className="w-full font-sans">
      <div className="relative w-full h-[300px] md:h-[400px] min-h-[200px]">
        <img
          src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress"
          alt="Scenic view of Nepal's mountainous landscape"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-white text-center space-y-3">
          <h1 className="text-5xl md:text-6xl font-serif font-bold">
            Popular Tours in Nepal
          </h1>
          <nav aria-label="Breadcrumb" className="text-base md:text-lg flex gap-2">
            <Link
              to="/"
              className="hover:text-yellow-300 font-semibold"
              aria-label="Go to Home page"
            >
              Home
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span className="font-semibold" aria-current="page">
              Popular Tours
            </span>
          </nav>
          <p className="text-base md:text-lg text-white/90 max-w-2xl px-4">
            Discover the most sought-after adventures in Nepal, from thrilling treks
            to the Himalayas to cultural journeys through ancient cities. Our popular
            tours offer unforgettable experiences, blending natural beauty, rich heritage,
            and adrenaline-pumping activities.
          </p>
        </div>
      </div>
      {children}
    </section>
  );
};

export default PopularTourLayout;