export const PAGES_QUERY = `*[_type == "page" && visible == true] | order(order asc) {
  featuredMedia,
  "slug": slug.current,
  "title": coalesce(title[$locale], title["en"]),
  order,
  metadata {
    ogImage,
    "description": coalesce(description[$locale], description["en"])
  }
}` as const;

export const PRIVACY_PAGE_QUERY = `*[_type == "page" && slug.current == "privacy-policy"][0] {
  "content": coalesce(content[$locale], content["en"]),
  "updatedAt": modified
}` as const;

export const CATEGORIES_QUERY = `*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(coalesce(name[$locale], name["en"]) asc) {
      _id,
      "name": coalesce(name[$locale], name["en"]),
      "slug": slug.current,
      featuredMedia,
      headerMedia,
      "postCount": count(*[_type == "post" && references(^._id)])
  }` as const;

export const POSTS_QUERY = `*[_type == "post"] | order(date desc) {
  _id,
  "title": coalesce(title[$locale], title["en"]),
  slug,
  "publishedAt": date,
  "excerpt": coalesce(excerpt[$locale], excerpt["en"]),
  featuredMedia,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    "name": coalesce(name[$locale], name["en"]),
    "slug": slug.current
  },
  "totalComments": count(*[_type == "comment" && post._ref == ^._id && approved == true])
}` as const;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  "title": coalesce(title[$locale], title["en"]),
  slug,
  "modifiedDate": _updatedAt,
  featuredMedia,
  "categories": categories[]->{
    _id,
    "name": coalesce(name[$locale], name["en"]),
    "slug": slug.current
  },
  "excerpt": coalesce(excerpt[$locale], excerpt["en"]),
  "content": coalesce(content[$locale], content["en"]),
  "whereToEat": coalesce(whereToEat[$locale], whereToEat["en"]),
  "whereToStay": coalesce(whereToStay[$locale], whereToStay["en"]),
  stats,
  statsTitle,
  "googleMapsHowTo": coalesce(googleMapsHowTo[$locale], googleMapsHowTo["en"]),
  "googleMapsHowToTitle": coalesce(googleMapsHowToTitle[$locale], googleMapsHowToTitle["en"]),
  youtubeEmbedUrl,
  "hikingPass": coalesce(hikingPass[$locale], hikingPass["en"]),
  "otherHikes": coalesce(otherHikes[$locale], otherHikes["en"]),
  "otherAttractions": coalesce(otherAttractions[$locale], otherAttractions["en"]),
  capturedMoments[],
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
  },
  metadata
}` as const;

export const POSTS_BY_CATEGORY_QUERY = `*[
  _type == "post" && 
  references(*[_type == "category" && slug.current == $categoryname]._id)
] | order(date desc) {
  _id,
  "title": coalesce(title[$locale], title["en"]),
  slug,
  "publishedAt": date,
  "excerpt": coalesce(excerpt[$locale], excerpt["en"]),
  featuredMedia,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    "name": coalesce(name[$locale], name["en"]),
    "slug": slug.current,
    headerMedia,
    metadata {
      ogImage,
      "description": coalesce(description[$locale], description["en"])
    }
  }
}` as const;

export const ABOUT_PAGE_QUERY = `*[_type == "page" && slug.current == "about"][0] {
  "content": coalesce(content[$locale], content["en"])
}` as const;

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(date desc)[0...3]{
  _id,
  "publishedAt": date,
  "title": coalesce(title[$locale], title["en"]),
  slug,
  "excerpt": coalesce(excerpt[$locale], excerpt["en"]),
  featuredMedia,
  "categories": *[_type == "category" && _id in ^.categories[]._ref]{
    "name": coalesce(name[$locale], name["en"]),
    "slug": slug.current
  },
  "totalComments": count(*[_type == "comment" && post._ref == ^._id && approved == true])
}` as const;

export const LATEST_POSTS_BY_CATEGORIES_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  "relatedPosts": *[_type == "post" && 
    references(^.categories[]._ref) && 
    slug.current != $slug] | order(date desc)[0...3]{
      _id,
      "title": coalesce(title[$locale], title["en"]),
      slug,
      featuredMedia,
      "categories": *[_type == "category" && _id in ^.categories[]._ref]{
        "name": coalesce(name[$locale], name["en"]),
        "slug": slug.current
      }
  }
}` as const;

export const SEARCH_KEYS_QUERY = `*[_type in ["post"] && defined(title)][0] {
  title
}` as const;

export const SEARCH_QUERY = `*[_type in ["post", "category"] && $matchquery] | order(_type desc, _updatedAt desc) [0...$limit]
{
  _id,
  _type,
  "title": coalesce(title[$locale], title["en"]),
  "name": coalesce(name[$locale], name["en"]),
  slug,
  _updatedAt,
  "content": coalesce(content[$locale], content["en"])
}` as const;