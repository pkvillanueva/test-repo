import groq from "groq";

export const postsQuery = groq`
*[_type == "post" && defined(slug.current)]{
  _id, title, slug
}`;

export const postQuery = groq`
*[_type == "post" && slug.current == $slug][0]{ 
  title, mainImage, body
}`;

export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;
