import type { SchemaTypeDefinition } from "sanity";
import { scaleLandingPage } from "./scaleLandingPage";
import { blogPost } from "./blogPost";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [scaleLandingPage, blogPost],
};
