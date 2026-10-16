import { defineCliConfig } from "sanity/cli";

/**
 * La CLI ne charge pas `.env.local` sur toutes ses commandes, et le module
 * `sanity/env` lève quand la variable manque — ce qui est le bon comportement
 * pour l'app, mais casse la CLI. On duplique donc les identifiants ici, avec
 * une valeur par défaut : ce sont des identifiants publics (`NEXT_PUBLIC_`),
 * pas des secrets.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "axtybt3v",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
});
