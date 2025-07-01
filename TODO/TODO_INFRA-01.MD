# PLAN D'ACTION PRESCRIPTIF : INFRA-01

**User Story :** En tant que développeur, je dois configurer un nouveau projet Next.js avec TypeScript, Tailwind CSS, ESLint et Prettier pour établir la base technique du mock.

**Objectif :** Initialiser un projet Next.js complet avec tous les outils de développement nécessaires.

---

## Plan d'Action Prescriptif

### Étape 1 : Initialiser le projet Next.js

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app-router --src-dir --import-alias "@/*" --use-npm
```

### Étape 2 : Installer Prettier et ses dépendances

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### Étape 3 : Créer le fichier de configuration Prettier

Créer `.prettierrc` :

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Étape 4 : Créer le fichier .prettierignore

Créer `.prettierignore` :

```
node_modules
.next
out
dist
build
```

### Étape 5 : Mettre à jour package.json avec les scripts

Ajouter dans la section "scripts" :

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

### Étape 6 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Projet Next.js initialisé
- [ ] Étape 2 : Prettier installé
- [ ] Étape 3 : Configuration Prettier créée
- [ ] Étape 4 : .prettierignore créé
- [ ] Étape 5 : Scripts ajoutés au package.json
- [ ] Étape 6 : Lint et build passent sans erreur
