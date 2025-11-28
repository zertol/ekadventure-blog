export const PAGES_QUERY = `*[_type == "page" && visible == true] | order(order asc) {
  "imageUrl": featuredMedia.asset->url,
  "slug": slug.current,
  title,
  order
}` as const;

export const CATEGORIES_QUERY = `*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(name asc) {
      _id,
      name,
      slug,
      "imageUrl": featuredMedia.url,
      "postCount": count(*[_type == "post" && references(^._id)])
  }` as const;

export const POSTS_QUERY = `*[_type == "post"] | order(date desc) {
  _id,
  title,
  slug,
  "publishedAt": date,
  excerpt,
  "imageUrl": featuredMedia.url,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    name,
    "slug": slug.current
  }
}` as const;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  "modifiedDate": _updatedAt,
  "imageUrl": featuredMedia.url,
  "categories": categories[]->{
    _id,
    name,
    "slug": slug.current
  },
  excerpt,
  content,
  whereToEat,
  whereToStay,
  stats,
  statsTitle,
  googleMapsHowTo,
  googleMapsHowToTitle,
  youtubeEmbedUrl,
  hikingPass,
  otherHikes,
  otherAttractions,
  capturedMoments[] {
    "imageUrl": url,
    alt
  },
  "comments": *[_type == "comment" && post._ref == ^._id && approved == true] | order(createdAt asc) {
    "id": _id,
    name,
    email,
    comment,
    "createdAt": _createdAt,
    "parentId": parent._ref,
    "postId": post._ref,
    isAuthor,
    approved
  }
}` as const;

export const POSTS_BY_CATEGORY_QUERY = `*[
  _type == "post" && 
  references(*[_type == "category" && slug.current == $categoryname]._id)
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  "publishedAt": date,
  excerpt,
  "imageUrl": featuredMedia.url,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    name,
    "slug": slug.current
  }
}` as const;

export const ABOUT_PAGE_QUERY = `*[_type == "page" && title == "About"][0] {
  content
}` as const;

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(date desc)[0...3]{
  _id,
  "publishedAt": date,
  title,
  slug,
  "imageUrl": featuredMedia.url,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    name,
    "slug": slug.current
  }
}` as const;

export const LATEST_POSTS_BY_CATEGORIES_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  "relatedPosts": *[_type == "post" && 
    references(^.categories[]._ref) && 
    slug.current != $slug] | order(date desc)[0...3]{
      _id,
      title,
      slug,
      "imageUrl": featuredMedia.url,
      "categories": *[_type == "category" && _id in ^.categories[]._ref]{
        name,
        "slug": slug.current
      }
  }
}` as const;