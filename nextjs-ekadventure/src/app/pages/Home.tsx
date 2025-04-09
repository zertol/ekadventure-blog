import React, { useContext, useEffect } from "react";
import HeaderImage from "../components/HeaderImage/page";
import CategoryArticle from "../components/CategoryArticle/page";
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "../store/CategoryContext";
import { useLoading } from "../store/LoadingContext";
import { usePages } from "../store/PagesContext";
const Home: React.FC = () => {
  const { categories, error } = useCategories();
  const { registerComponent, markReady } = usePages();

  useEffect(() => {
    registerComponent();
    markReady();
  }, [registerComponent, markReady]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="home-page">
      <HeaderImage
        roundedImage="/images/profile-avatar.webp"
        text={
          <div>
            <h2 className="font-bold italic">
              Where Every Day Is An{" "}
              <span className="font-ps text-[28px]">Adventure</span>
            </h2>
          </div>
        }
      />
      <section className="mt-c-60 mb-c-120">
        <div className="container-max-w-none container-px-25 md:container-px-60">
          <div className="mb-5">
            <h2 className="font-bold text-left font-ps">
              A little bit about this land
            </h2>
          </div>
          <div className="mb-0 pl-c-25">
            <p className="text-left text-wrap font-ps text-[20px]">
              Hi there! I'm Elie, and welcome to my land filled with adventure
              and things to discover. I created it in hopes to share with you
              the world through my eyes and for us to embark together on every
              journey, to live life to the fullest, and to tell a story about
              the world.
              <br /> Ready for your next adventure ? Let's go!
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-c-90">
        <div className="mx-auto container-px-25 md:container-px-60 container-max-w-1280">
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
          <h1 className="text-[30px] md:text-[40px] font-bold mb-6 italic">
            Want to build a Blog like this?
          </h1>
          <Link
            href="/contact"
            className="inline-block bg-background-blue-accent text-white 
            px-[24px] py-[12px] text-[16px] rounded-md hover:bg-background-green-accent transition-all 
            duration-300"
          >
            Start sharing your experience
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
