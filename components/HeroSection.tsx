import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative top-[-180px] flex flex-col items-center justify-center min-h-screen text-center overflow-visible">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl  leading-tight mb-4">
          Discover, Curate, and Share At
          <br />
          <span className="relative inline-block mt-2">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              MyReadingList
            </span>
            <span className="block h-2 w-full absolute left-0 bottom-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-30 rounded-lg" style={{ zIndex: -1 }}></span>
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-muted-foreground max-w-5xl">
          Explore curated book lists from readers around the world. <br className="hidden sm:inline" />
          Create your own, follow your taste.
        </p>
        <Link
          href="/book-lists/all"
          className="mt-8 inline-block rounded-lg bg-primary-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition"
        >
          See Popular Lists
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;