import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div class="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-6 h-screen" id="home">
      <div
        aria-hidden="true"
        class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div>
        <div class="relative pt-36 ml-auto">
          <div class="lg:w-2/3 text-center mx-auto">
            <h1 class="text-gray-900 dark:text-white font-bold text-4xl md:text-6xl xl:text-6xl">
              Experience the future of rental{" "}
              <span class="text-primary dark:text-white">home search</span>
            </h1>
            <p class="mt-8 text-gray-700 dark:text-gray-300">
              Looking for a rental home has never been more fun or easy.
              Explore a virtual world of rental options, filter your search with ease,
              and find your dream home in no time with the WorldHomes.
            </p>
            <div class="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                href="#"
                class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <Link href="/metaverse">
                  <span class="relative text-base font-semibold text-white">
                    Explore Metaverse
                  </span>
                </Link>
              </a>
              {/* <a
                href="#"
                class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span class="relative text-base font-semibold text-primary dark:text-white">
                  Learn more
                </span>
              </a> */}
            </div>
            {/* <div class="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
              <div class="text-left">
                <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                  The lowest price
                </h6>
                <p class="mt-2 text-gray-500">Some text here</p>
              </div>
              <div class="text-left">
                <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                  The fastest on the market
                </h6>
                <p class="mt-2 text-gray-500">Some text here</p>
              </div>
              <div class="text-left">
                <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                  The most loved
                </h6>
                <p class="mt-2 text-gray-500">Some text here</p>
              </div>
            </div> */}
          </div>
          <div class="mt-60 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
            <div></div>
            <div></div>
            <div class="p-4 duration-200 hover:grayscale-0 flex">
              <Image src="/assets/images/company/polygon-matic-logo.png" class="h-10 w-12 mx-auto" loading="lazy" alt="client logo" width="100" height="100" />
              <div className="text-2xl pt-1">polygon</div>
            </div>
            <div class="p-4 duration-200 hover:grayscale-0 flex">
              <Image src="/assets/images/company/the-graph-grt-logo.png" class="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="100" height="100" />
              <div className="text-2xl pt-2">The Graph</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
