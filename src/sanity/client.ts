import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: false,
  perspective: 'published',
})
