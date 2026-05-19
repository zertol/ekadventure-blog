"use client";
import Image from "next/image";
// @ts-ignore
import "./globals.css";
import { useSearch } from "@/utils/hooks/use-search";
import { useRef, useState } from "react";
import { SearchResults } from "@/components/UI/Common/SearchResults/page";
import HelpButtons from "@/components/UI/Common/HelpButtons/page";
import ModalDialog from "@/components/UI/Common/ModalDialog/page";
import { HikerImage } from "@/components/UI/Common/Hiker/HikerImage";

export default function NotFound() {
  const { query, setQuery, results, loading } = useSearch(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const searchSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
    setQuery(searchRef.current!.value || "");
  };

  const closeSearchResultsModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setQuery("");
    }, 300);
  };

  return (
    <html lang="en">
      <body>
        <div className="h-screen flex-center-col overflow-auto">
          <div className="container px-c-25 lg:px-0">
            <div className="flex flex-col lg:flex-row justify-center gap-4 min-h-[400px]">
              <HikerImage />
              <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left">
                <div className="lg:w-[80%]">
                  <h1 className="leading-7 md:leading-9 mb-2 text-xl md:text-[30px]">
                    Oops! Seems like you got lost in the wilderness.
                  </h1>

                  <p className="mb-4 md:mb-6 text-lg md:text-2xl font-ps leading-6 md:leading-7">
                    Even the best explorers lose their way sometimes. Don&apos;t
                    worry, we&apos;ll help you find your way back to the
                    Experience.
                  </p>

                  <HelpButtons outsideLocale={true} />

                  <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
                    <h2 className="font-semibold mb-2">
                      Still can&apos;t find your trail?
                    </h2>
                    <p className="text-white font-semibold mb-3">
                      Try searching below for your next adventure.
                    </p>
                    <form
                      onSubmit={searchSite}
                      method="POST"
                      className="w-full"
                    >
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
                      <ModalDialog
                        isOpen={isModalOpen}
                        onClose={closeSearchResultsModal}
                        className="p-4 bg-background-green-accent"
                        outsideLocale={true}
                      >
                        {!loading && (
                          <div className="mb-3">
                            <h4 className="text-white">
                              Search results for: {query}
                            </h4>
                          </div>
                        )}
                        <SearchResults
                          isInContainer={true}
                          query={query}
                          results={results}
                          loading={loading}
                          outsideLocale={true}
                        />
                      </ModalDialog>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
