import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./../sanity/client";
import Link from "next/link";
import App from "../components/App";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

async function getPost(slug: string) {
  return await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return (
      <App currentPage="post">
        <div className="max-w-3xl mx-auto p-4">
          <Link href="/blog" className="hover:underline mb-6 inline-block">
            ← Back to posts
          </Link>
          <h1 className="text-4xl font-bold mb-8">Post not found</h1>
        </div>
      </App>
    );
  }

  const postImageUrl = post.imageCenterLeft
    ? urlFor(post.imageCenterLeft)?.width(550).height(310).url()
    : null;

  return (
    <App currentPage="post">
      <div className="max-w-3xl mx-auto p-4">
        <Link href="/blog" className="hover:underline mb-6 inline-block">
          ← Back to posts
        </Link>
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl mb-8"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose max-w-none">
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      </div>
    </App>
  );
}