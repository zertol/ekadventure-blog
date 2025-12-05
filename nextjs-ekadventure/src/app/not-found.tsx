"use client";
import Image from "next/image";
import PrimaryButton from "@/components/UI/Common/PrimaryButton/page";
import { useSearch } from "@/utils/hooks/use-search";
import { useRef } from "react";
import { SearchResuls } from "@/components/UI/Common/SearchResults/page";

export default function NotFound() {
  const { query, setQuery, results, loading } = useSearch();

  const searchRef = useRef<HTMLInputElement>(null);

  const searchSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchRef.current!.value || "");
  };

  return (
    <div className="h-screen flex-center-col overflow-auto">
      <div className="container px-c-25 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
          <div className="relative w-full lg:w-[50%] h-[200px] md:h-[300px] lg:h-auto">
            <Image
              src="/images/hiker_not_found.png"
              alt="Contact"
              fill
              className="inset-0 w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
            <div className="lg:w-[80%]">
              <h1 className="leading-7 md:leading-9 mb-4 text-2xl md:text-[30px]">
                Oops! Seems like you got lost in the wilderness.
              </h1>

              <p className="mb-4 md:mb-6 text-lg md:text-2xl font-ps leading-6 md:leading-7">
                Even the best explorers lose their way sometimes. Don&apos;t
                worry, we&apos;ll help you find your way back to the Experience.
              </p>

              <div className="flex gap-4 mb-6 justify-center">
                <PrimaryButton
                  href="/"
                  text="📍 Trailhead"
                  className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
                />
                <PrimaryButton
                  href="/blog"
                  text="🥾 Adventures"
                  className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
                />
                <PrimaryButton
                  href="/contact"
                  text="📞 Get Help"
                  className="font-ps py-0 font-bold text-[14px] md:text-[18px]"
                />
              </div>

              <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
                <h3 className="md:text-2xl font-semibold mb-2">
                  Still can&apos;t find your trail?
                </h3>
                <p className="text-white font-semibold mb-3 text-sm/5">
                  Try searching below for your next adventure.
                </p>
                <form onSubmit={searchSite} method="POST" className="w-full">
                  <div className="flex flex-row w-full overflow-hidden">
                    <input
                      type="text"
                      name="query"
                      placeholder="Search an adventure..."
                      className="flex-1 w-full px-4 py-2 bg-white text-gray-800 font-primary focus:outline-none"
                      ref={searchRef}
                    />
                    <button
                      type="submit"
                      className="bg-background-blue-accent
                         text-white px-6 py-2 whitespace-nowrap hover:bg-background-dark transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </form>
                {(query || loading) && (
                  <SearchResuls isInContainer={true} query={query} results={results} loading={loading}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
