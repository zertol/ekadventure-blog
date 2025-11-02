import { PortableText } from "@portabletext/react";
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

  const post = postResult.Result;
  const relatedPosts = relatedPostsResult.Result?.relatedPosts ?? [];

  return (
    <App currentPage="post">
      {post && (
        <div className="container px-c-25 xl:px-0 xl:max-w-[1140px] mt-28 mb-c-90 mx-auto">
          <div className="flex flex-col lg:flex-row justify-center gap-4">
            <div className="w-full lg:w-[70%] mb-c-60 lg:mb-0">
              <div className="flex-between-row mb-6">
                <div className="gap-1 md:gap-0 flex-start-col md:flex-start-row">
                  <PostCategories categories={post.categories} />
                </div>
                <div className="flex-center-row">
                  <SocialIcons />
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
                    components={generateBlockComponents()}
                  />
                )}
              </div>
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
                    components={generateBlockComponents(true)}
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
                <Comments/>
              </CommentsProvider>
            </div>
            <div className="w-full lg:w-[30%] lg:p-c-25 lg:border-l-[1px] border-background-dark/20">
              {post.imageUrl && (
                <Sidebar
                  sideImage={post.imageUrl}
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
