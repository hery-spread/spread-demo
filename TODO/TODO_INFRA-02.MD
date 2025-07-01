# PLAN D'ACTION PRESCRIPTIF : INFRA-02

**User Story :** En tant que développeur, je dois créer la structure de layout principale de l'application (barre latérale, en-tête, zone de contenu) pour avoir un cadre visuel cohérent sur toutes les pages.

**Objectif :** Mettre en place la structure de layout principal avec sidebar, header et content area.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant Sidebar

Créer `src/components/layout/Sidebar.tsx` :

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Mes Listes", href: "/lists", icon: "📋" },
  { name: "Mon Compte", href: "/account", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-600">Spread</h1>
      </div>
      <nav className="mt-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              pathname === item.href
                ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

### Étape 2 : Créer le composant Header

Créer `src/components/layout/Header.tsx` :

```tsx
export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Recherches:</span> ∞
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Profils:</span> 73/500
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Users:</span> 0/10
          </div>
          <div className="text-sm font-medium text-purple-600">Plan Élite</div>
        </div>
      </div>
    </header>
  );
}
```

### Étape 3 : Créer le layout principal

Créer `src/components/layout/MainLayout.tsx` :

```tsx
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```

### Étape 4 : Mettre à jour le layout root

Modifier `src/app/layout.tsx` pour intégrer le MainLayout :

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spread - Influence Marketing Platform",
  description:
    "Découvrez et analysez des influenceurs sur Instagram, YouTube et TikTok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
```

### Étape 5 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant Sidebar créé
- [ ] Étape 2 : Composant Header créé
- [ ] Étape 3 : MainLayout créé
- [ ] Étape 4 : Layout root mis à jour
- [ ] Étape 5 : Lint et build passent sans erreur
