import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center overflow-visible">
      {/* SVG Web Background - fixed, full width, hero height */}
      <svg
        className="fixed top-20 left-0 w-screen h-[70vh] pointer-events-none z-0"
        width="100vw"
        height="70vh"
        viewBox="0 0 1920 600"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Vertical lines */}
        {Array.from({ length: 33 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 70}
            y1={0}
            x2={i * 50}
            y2={700}
            stroke="#818cf8"
            strokeWidth="1"
            opacity="0.18"
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 70}
            x2={1920}
            y2={i * 70}
            stroke="#818cf8"
            strokeWidth="1"
            opacity="0.18"
          />
        ))}
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-4">
          Discover, Curate, and Share
          <br />
          <span className="relative inline-block mt-2">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              MyReadingLists
            </span>
            <span className="block h-2 w-full absolute left-0 bottom-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-30 rounded-lg" style={{ zIndex: -1 }}></span>
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-muted-foreground max-w-2xl">
          Explore curated book lists from readers around the world. <br className="hidden sm:inline" />
          Create your own, follow your taste.
        </p>
        <Link
          href="/novel-lists/all"
          className="mt-8 inline-block rounded-lg bg-primary-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition"
        >
          See Popular Lists
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
