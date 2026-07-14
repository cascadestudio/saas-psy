/**
 * Le Studio gère son propre rendu plein écran : on court-circuite le layout
 * marketing/app plutôt que de laisser le thème et les polices du site déteindre
 * sur l'interface d'édition.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
