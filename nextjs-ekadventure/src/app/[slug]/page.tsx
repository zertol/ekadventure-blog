import { PortableText, toPlainText } from "@portabletext/react";
import App from "@/components/App";
import Comments from "@/components/UI/Blog/ArticleDetails/Comments/Comments";
import Sidebar from "@/components/Layout/Sidebar/page";
import SocialIcons from "@/components/UI/Common/SocialIcons/page";
import PostCategories from "@/components/UI/Categories/PostCategory/PostCategories";
import { generateBlockComponents } from "@/components/Data/BlockComponents";
import {
  buildCommentTree,
  groupImagesFromBlocks,
} from "../../utils/data/helpers";
import ImageCarousel from "@/components/UI/Carousel/ImageCarousel";
import {
  fetchAllPosts,
  fetchLatestPostsByCategories,
  fetchPostDetails,
} from "@/api/controllers/posts";
import { CommentsProvider } from "@/store/CommentsContext";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const postResult = await fetchPostDetails({
    slug: slug,
  });
  const post = postResult.Result;

  if (!post) {
    return {};
  }

  const metaData: Metadata = {
    title: post.title,
    description: toPlainText(post?.excerpt || []),
    openGraph: {
      title: post.title,
      description: toPlainText(post?.excerpt || []),
      images: post.metadata ? [post.metadata.ogImage?.url] : [],
    },
  };

  return metaData;
}

export async function generateStaticParams() {
  const posts = await fetchAllPosts();

  return (
    posts.Result &&
    posts.Result.map((post: any) => ({
      slug: post.slug.current,
    }))
  );
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const [postResult, relatedPostsResult] = await Promise.all([
    fetchPostDetails({
      slug: slug,
    }),
    fetchLatestPostsByCategories({
      slug: slug,
    }),
  ]);

  if (!postResult.Result) {
    return notFound();
  }

  const post = postResult.Result;
  const relatedPosts = relatedPostsResult.Result?.relatedPosts ?? [];

  const statsTitleParts: string[] = post.statsTitle?.title_en?.split("$name");
  const statsTitle: string = post.statsTitle?.title_en;
  const statsName: string = post.statsTitle?.name_en;

  const isStatsDisplayed: boolean = !!(
    post.stats?.length > 0 &&
    statsTitle &&
    statsName &&
    statsTitleParts?.length > 1
  );

  return (
    <App currentPage="post">
      {post && (
        <div className="container px-c-25 xl:px-0 xl:max-w-[1140px] mt-28 mb-c-90 mx-auto">
          <div className="flex flex-col lg:flex-row justify-center gap-4">
            <div className="w-full lg:w-[70%] mb-c-60 lg:mb-0 lg:pr-[5px]">
              <div className="flex-between-row mb-6">
                <div className="gap-1 md:gap-0 flex-start-col md:flex-start-row">
                  <PostCategories categories={post.categories} />
                </div>
                <div className="flex-center-row">
                  <SocialIcons className="text-white" isSidebar />
                </div>
              </div>
              <h1 className="font-semibold mb-0">{post.title}</h1>
              <div className="prose max-w-none mb-5">
                <span className="mr-1 font-semibold text-[11px]">
                  Last Updated:
                </span>
                <span className="text-text-dark/75 text-[11px]">
                  {new Date(post.modifiedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div>
                {post.content && (
                  <PortableText
                    value={groupImagesFromBlocks(post.content)}
                    components={generateBlockComponents(false, false, true)}
                  />
                )}
              </div>
              {isStatsDisplayed && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      className="inline-block w-6 h-6 mr-2"
                      alt="📋"
                      src="https://s.w.org/images/core/emoji/15.0.3/svg/1f4cb.svg"
                    />
                    {statsTitleParts[0]}
                    <span className="italic font-bold text-2xl">
                      {statsName}
                    </span>
                    {statsTitleParts[1]}
                  </h2>
                  <div className="w-full lg:w-[85%] bg-background-blue-accent p-2 pl-5">
                    {post.stats.map((stat, index) => (
                      <div
                        key={"stat-" + index}
                        className="mb-1 flex-start-row font-ps text-white w-full"
                      >
                        <p className="text-[22px]">
                          <strong>{stat.label_en}</strong>:{" "}
                          <em>{stat.value_en}</em>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {post.googleMapsHowTo && post.googleMapsHowToTitle && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      className="inline-block w-6 h-6 mr-2"
                      alt="📍"
                      src="https://s.w.org/images/core/emoji/15.1.0/svg/1f4cd.svg"
                    />
                    {post.googleMapsHowToTitle}
                  </h2>

                  <PortableText
                    value={groupImagesFromBlocks(post.googleMapsHowTo)}
                    components={generateBlockComponents(true, false, true)}
                  />
                </div>
              )}
              {post.youtubeEmbedUrl && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      className="inline-block w-6 h-6 mr-2"
                      alt="🎥"
                      src="https://s.w.org/images/core/emoji/15.0.3/svg/1f3a5.svg"
                    />
                    Detailed Video of the Adventure
                  </h2>

                  <iframe
                    src={post.youtubeEmbedUrl}
                    title="Detailed Video of the Adventure"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[375px] box-shadow-post-detail-image"
                  ></iframe>
                </div>
              )}
              {post.hikingPass && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      src="https://s.w.org/images/core/emoji/16.0.1/svg/1f3ab.svg"
                      alt="🎫"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Hiking Pass
                  </h2>

                  <PortableText
                    value={groupImagesFromBlocks(post.hikingPass)}
                    components={generateBlockComponents(false, true)}
                  />
                </div>
              )}
              {post.whereToStay && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      src="https://s.w.org/images/core/emoji/14.0.0/svg/1f3e0.svg"
                      alt="🏠"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Where to Stay
                  </h2>

                  <PortableText
                    value={groupImagesFromBlocks(post.whereToStay)}
                    components={generateBlockComponents(true)}
                  />
                </div>
              )}
              {post.whereToEat && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      src="https://s.w.org/images/core/emoji/14.0.0/svg/1f96a.svg"
                      alt="🥪"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Where to Eat
                  </h2>

                  <PortableText
                    value={groupImagesFromBlocks(post.whereToEat)}
                    components={generateBlockComponents(true)}
                  />
                </div>
              )}
              {post.otherHikes && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      src="https://s.w.org/images/core/emoji/16.0.1/svg/1f97e.svg"
                      alt="🥾"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Other hikes nearby
                  </h2>

                  <PortableText
                    value={groupImagesFromBlocks(post.otherHikes)}
                    components={generateBlockComponents(true)}
                  />
                </div>
              )}
              {post.otherAttractions && (
                <div className="mt-c-60 w-full lg:w-[85%]">
                  <h2 className="font-bold mb-2">
                    <img
                      src="https://s.w.org/images/core/emoji/16.0.1/svg/1f697.svg"
                      alt="🚗"
                      className="inline-block w-6 h-6 mr-2"
                    />
                    Other attractions nearby
                  </h2>

                  <PortableText
                    value={groupImagesFromBlocks(post.otherAttractions)}
                    components={generateBlockComponents(true)}
                  />
                </div>
              )}
              {post.capturedMoments && post.capturedMoments.length > 0 && (
                <div className="mt-c-60 w-full">
                  <h2 className="font-bold mb-2">
                    <img
                      className="inline-block w-6 h-6 mr-2"
                      alt="📸"
                      src="https://s.w.org/images/core/emoji/14.0.0/svg/1f4f8.svg"
                    />
                    Captured Moments
                  </h2>
                  <ImageCarousel images={post.capturedMoments} />
                </div>
              )}

              <CommentsProvider
                initialComments={buildCommentTree(post.comments)}
                postId={post._id}
              >
                <Comments />
              </CommentsProvider>
            </div>
            <div className="w-full lg:w-[30%] lg:p-c-25 lg:border-l-[1px] border-background-dark/20">
              {post.featuredMedia && (
                <Sidebar
                  sideImage={post.featuredMedia}
                  relatedPosts={relatedPosts}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </App>
  );
}
