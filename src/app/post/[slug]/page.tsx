// ./nextjs-app/app/[slug]/page.tsx

import { SanityDocument } from "@sanity/client";
import { draftMode } from "next/headers";
import { postPathsQuery, postQuery } from "@/sanity/queries";
import { sanityFetch, token } from "@/sanity/fetch";
import { client } from "@/sanity/client";
import PreviewProvider from "@/components/PreviewProvider";
import PreviewPost from "../_component/PreviewPost";
import Post from "../_component/Post";

// Prepare Next.js to know which routes already exist
// export async function generateStaticParams() {
//   // Important, use the plain Sanity Client here
//   const posts = await client.fetch(postPathsQuery);
//   console.log(posts)
//   return posts;
// }

export default async function Page({ params }: { params: any }) {
  const post = await sanityFetch<SanityDocument>({ query: postQuery, params });
  const isDraftMode = draftMode().isEnabled;
  console.log(post, isDraftMode, params)

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPost post={post} />
      </PreviewProvider>
    );
  }

  return <Post post={post} />;
}