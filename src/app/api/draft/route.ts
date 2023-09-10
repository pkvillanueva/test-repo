import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { isValidSecret } from "sanity-plugin-iframe-pane/is-valid-secret";

import { previewSecretId, readToken } from "@/sanity/env";
import { client } from "@/sanity/client";

export async function GET(request: Request) {
  if (!readToken) {
    return new Response("Misconfigured server", { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!secret) {
    return new Response("Invalid secret", { status: 401 });
  }

  const authClient = client.withConfig({
    useCdn: false,
    token: readToken,
  });

  // This is the most common way to check for auth, but we encourage you to use your existing auth
  // infra to protect your token and securely transmit it to the client
  const validSecret = await isValidSecret(authClient, previewSecretId, secret);
  if (!validSecret) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (slug) {
    draftMode().enable();
    redirect(`/post/${slug}`);
  }

  return new Response("Slug query parameter is required", { status: 404 });
}
