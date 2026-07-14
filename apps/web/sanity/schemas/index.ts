import type { SchemaTypeDefinition } from "sanity";
import { scaleLandingPage } from "./scaleLandingPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [scaleLandingPage],
};
