import React, { useContext } from "react";
import HeaderImage from "../components/HeaderImage/page";
import CategoryArticle from "../components/CategoryArticle/page";
import Image from "next/image";
import Link from "next/link";
import { CategoryContext } from "../store/CategoryContext";
import { useLoader } from "../store/LoaderContext";

const Home: React.FC = () => {
  const { categories, error } = useContext(CategoryContext);
  const { isLoading } = useLoader();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <HeaderImage
        backgroundImage="/images/adventure-header.jpg"
        roundedImage="/images/profile-avatar.jpg"
        text={
          <div>
            <h1 className="font-bold mb-4">Welcome to EkAdventure Blog</h1>
            <p className="mb-2">
              Explore the world with us - one{" "}
              <span className="font-semibold">adventure</span> at a time
            </p>
          </div>
        }
      />
      <section className="mt-c-60 mb-c-120">
        <div className="container-max-w-none container-px-60">
          <div className="mb-5">
            <h2 className="font-bold text-left">
              A little bit about this land
            </h2>
          </div>
          <div className="mb-0 pl-25">
            <p className="text-left text-wrap">
              Hi there! I’m Elie, and welcome to my land filled with adventure
              and things to discover. I created it in hopes to share with you
              the world through my eyes and for us to embark together on every
              journey, to live life to the fullest, and to tell a story about
              the world.
              <br /> Ready for your next adventure ? Let’s go!
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-c-90">
        <div className="mx-auto container-px-60 container-max-w-1280">
          <div className="mb-12 flex-center-col">
            <h2 className="font-bold text-center mb-4 uppercase">
              Choose your adventure
            </h2>
            <span className="block w-24 h-1 bg-black"></span>
          </div>

          <div className="flex-wrap-row gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <CategoryArticle
                  title={category.name}
                  slug={category.slug.current}
                  imageUrl={category.imageUrl || "/images/adventure-header.jpg"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build a Blog Section */}
      <section className="relative h-[400px] flex-center-row mb-c-60">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/adventure-header.jpg"
            alt="Mountain landscape"
            fill
            className="object-cover brightness-75"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-6 italic">
            Want to build a Blog like this?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-[#6C8AB5] text-white px-8 py-3 rounded-md hover:bg-[#5A7494] transition-all duration-300 transform hover:-translate-y-1"
          >
            Start sharing your experience
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
