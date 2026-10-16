import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { apiVersion, dataset, projectId } from "../env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = imageUrlBuilder({ projectId, dataset });

export function urlForImage(source: Image) {
  return builder.image(source);
}
