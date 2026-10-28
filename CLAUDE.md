# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Le projet

Hack cognitif est un site statique francophone, sans framework, qui informe et sensibilise sur les attaques exploitant nos leviers cognitifs (ingénierie sociale, influence politique, neuropsychologie, psychologie sociale). Il est publié par GitHub Pages depuis la branche `main` de `anna-mamelli/hack-cognitif` : tout le dépôt est servi tel quel. `README.txt` décrit le projet pour la propriétaire et liste ce qui reste à faire avant publication.

## Objectif

> Fournir une carte ouverte des vulnérabilités cognitives exploitées par la guerre cognitive, avec des contre-mesures testables, pour former et renforcer la résilience.

Toute proposition se juge à cette aune, y compris une tâche de design ou de code. L'agent `gardien-objectif` en détaille le sens et le vérifie : le lancer avant de commencer une tâche de contenu ou de design, après chaque nouvelle fiche et avant chaque commit.

## Commandes

Toutes les commandes npm se lancent dans `atelier/` (en PowerShell : `cd atelier; npm run build`).

- `npm install` : une seule fois, installe `puppeteer-core`.
- `npm run build` : refabrique toutes les pages à la racine. Il faut Chrome ou Edge installé (sinon indiquer le chemin dans la variable `CHROME_PATH`). `SITE_URL` remplace `config.siteUrl` de `package.json`.
- Il n'y a ni tests ni linter. La fabrication sert de vérification : elle sort en erreur si `script.js` lève une exception sur une page.
- Aperçu sans fabriquer : ouvrir `atelier/modele.html` dans un navigateur, qui affiche tout le site sur une seule page ; on va à une page par son adresse en `#`, par exemple `modele.html#fiche-autorite`. Aperçu des pages fabriquées : Live Server (port 5501) à la racine.
- `/commit` refabrique puis committe tout ; `/push` envoie sur GitHub, ce qui met à jour le site publié.

## Architecture

**Deux sources, des pages fabriquées.** Les seuls fichiers à modifier sont `script.js` (tous les contenus et tout le fonctionnement) et `atelier/modele.html` (en-tête, menu, pied de page et texte des pages fixes : À propos, Contact, Contribuer, Mentions légales, Chapeaux…). Les `*.html` de la racine, `sitemap.xml` et `robots.txt` sont générés : la fabrication efface tous les `*.html` de la racine avant de les réécrire, donc une modification faite à la main est perdue.

**Un seul script, deux modes.** `modele.html` contient une `<section id="v-…">` par vue. Dans le modèle, `script.js` est un routeur par `#` qui affiche une vue et masque les autres. Sur une page fabriquée, `<body data-page="…">` active le mode `STATIC` : une vue par fichier, et les liens `#vue` deviennent des liens vers les fichiers. Dans les deux sources, les liens internes s'écrivent `href="#route"`. Sur le site publié, les adresses sont sans extension (`fiches`, `fiche-autorite`) ; en aperçu local (`file:` ou localhost), le script remet `.html`.

**La fabrication (`atelier/build.mjs`).** Puppeteer ouvre le modèle, lit `window.HC_ROUTES` (les vues de `VIEWS`, sauf `fiche` et `terrain`, plus les clés de `TERRAINS` et `fiche-<id>` pour chaque fiche), affiche chaque route, copie la vue visible et l'insère dans une copie du modèle avec titre, description, Open Graph, lien canonique et données structurées JSON-LD (un `Article` avec ses références pour chaque fiche). Le titre vient de `data-name` sur la section, sinon du `h1` ; la description vient du premier `.lead`.

**Dates (`atelier/dates.json`).** Chaque route y garde une empreinte de son contenu, sa date de publication et sa date de modification, qui ne change que si l'empreinte change. L'empreinte ignore `[data-maj]` (la date affichée) et `[data-volatile]` : tout contenu tiré au hasard à chaque visite doit porter `data-volatile`, sinon chaque fabrication change la date de la page. Ne pas supprimer ni éditer ce fichier à la main ; il est committé avec les pages.

**Organisation de `script.js`.** Tout est dans une seule IIFE, sans module ni dépendance. La première moitié contient les données, la seconde le rendu de chaque vue (à partir de `/* ---------- Tables (DIMA, lexique) ---------- */`). Les données sont réparties en plusieurs blocs thématiques qui ajoutent chacun aux mêmes tables (`FICHES.push`, `MAP.push`, `R.cle = …`, `FREFS.id = …`, `SENS[…]`, `GLOSS.push`) : chercher toutes les occurrences d'une table, pas seulement sa déclaration. Les principales :

- `FICHES` : `id`, `ax` (terrains `ent`, `pou`, `inf`, `tra`), `tag`, `title`, `teaser`, `socle`, `cas`, `blue` (`Signaux`, `Contre-mesures`), `red` (`Hypothèse testée`, `Indicateur`, `Cadre`), `pistes`, `note`, et facultativement `relu` et `contrib` (personnes créditées avec leur accord). Le `tag` range la fiche dans une famille par `FAM_OF` ; un tag inconnu tombe dans « Autres fiches ».
- `R` : références `[citation, lien ou null, statut]`, statut `1` vérifiée, `0` à contrôler. `FREFS` relie chaque fiche à ses clés.
- `TE` et `MAP` : techniques DIMA et rapprochements avec les fiches. `SENS` et `PSY` : colonnes « plus sensibles / ce qui protège » et notes cliniques. `RESIL` : mesures de protection et de résilience par famille de troubles (page Ressources), reliées aux fiches par les noms de `PSY`.
- `COURS` : notions de la page Cours, statut `fiche`, `integre` ou `todo` ; `CTHEMES` et `CTHEME_OF` les rangent par thème.
- `GLOSS` et `GCAT_OF` : glossaire et catégories. `CONTRIB_FORM` : adresse du formulaire Framaforms.

La page Carte (`renderCarte` et `carteCSV`) se construit entièrement à partir de ces tables : famille par `FAM_OF`, phase DIMA par le quatrième caractère des identifiants `TE` de la fiche dans `MAP`, contre-mesures et test par les entrées `blue` et `red`. Une fiche sans entrée `Indicateur` y laisse une case vide. Le niveau de preuve de chaque contre-mesure vient de `CMLV` (juste après `FREFS`) : une fiche absente de cette table est affichée « plausible ».

Ajouter une page fixe demande trois choses : une section `v-<route>` dans `modele.html`, la route dans `VIEWS` (`script.js`) et, si besoin, un lien dans `#nav`.

**CSS.** `style.css` importe `tokens.css` (couleurs, espacements, polices ; thème clair, thème sombre par `data-theme` et par `prefers-color-scheme`) et `base.css`. Les commentaires « Hallmark » en tête de `style.css` consignent les choix de design voulus par la propriétaire : les lire avant de toucher à l'apparence.

## Contenus

- Le site applique une charte de « chapeau blanc » : aucune recette de manipulation, personne n'est visé, symétrie politique, aucune stigmatisation, prudence clinique. Elle est détaillée dans `.claude/agents/relecteur-charte.md` et sur les pages Contribuer et Chapeaux.
- Ne jamais inventer une référence, un chiffre ou un cas public. Une nouvelle référence entre avec le statut `0` ; elle ne passe à `1` qu'après l'agent `verificateur-sources`.
- Pour une nouvelle fiche, enchaîner les agents du projet : `redacteur-fiche` (rédaction au format du site), puis `verificateur-sources`, puis `redacteur-clarte` (lisibilité pour un lecteur humain), puis `relecteur-charte`, puis `gardien-objectif`. `redacteur-clarte` sert aussi seul, pour reprendre un passage dense ou une page entière.
- Typographie : apostrophes droites (`'`) partout, jamais courbes, et pas de tiret cadratin.
- DIMA (M82-project) est repris sous licence Apache 2.0 : garder la citation et le lien, et ne jamais laisser entendre que le projet DIMA approuve les rapprochements du site.

## Git

- Messages au format Conventional Commits, type en anglais, description en français (`feat(fiches): ajoute la fiche Effet spectateur`). La liste des types et des portées est dans `.claude/commands/commit.md`.
- Toujours refabriquer avant de committer, pour que les pages générées et `dates.json` suivent les sources.
- Fins de ligne LF imposées par `.gitattributes`. `atelier/node_modules/`, `.hallmark/` (sauvegarde d'avant la refonte) et `.vscode/` sont ignorés.
