---
description: Refabrique les pages du site puis enregistre toutes les modifications dans un commit Git
argument-hint: "[message du commit, facultatif]"
allowed-tools: Bash(npm run build:*), Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git log:*)
---

Enregistre l'état actuel du site Hack cognitif dans un commit Git.

1. Refabrique les pages pour qu'elles reflètent les dernières modifications : lance `npm run build` dans le dossier `atelier`. Si la fabrication échoue, arrête-toi et montre l'erreur.
2. Regarde ce qui a changé : `git status` puis `git diff --stat`.
3. S'il n'y a rien à enregistrer, dis-le et arrête-toi.
4. Ajoute toutes les modifications avec `git add -A` (le fichier `.gitignore` exclut déjà `atelier/node_modules/`, `.hallmark/` et `.vscode/`).
5. Rédige un message de commit au format Conventional Commits : `type(portée): description`, avec le type en anglais et la description en français, courte, à l'infinitif ou au présent (par exemple `feat(fiches): ajoute la fiche Effet spectateur`). La portée est facultative : fiches, cours, labo, glossaire, lexique, accueil, design, seo, mentions, atelier…
   - `feat` : nouveau contenu ou nouvelle fonction pour le lecteur (fiche, page, outil du Labo, filtre)
   - `fix` : correction d'une erreur (référence fausse, lien cassé, bug d'affichage, faute)
   - `docs` : documentation du projet (README, commandes, agents), pas le contenu du site
   - `style` : mise en forme du code sans effet visible (indentation, ordre) ; un changement de design visible est un `feat` ou un `fix`
   - `refactor` : réorganisation du code sans changement visible
   - `perf` : site plus rapide ou plus léger (images, scripts)
   - `test` : scripts de vérification
   - `build` : fabrication des pages (atelier/build.mjs, package.json)
   - `ci` : automatisations GitHub
   - `chore` : entretien sans effet sur le site (.gitignore, dépendances, fichiers générés seuls)
   - `revert` : annule un commit précédent
   Ajoute `!` après le type (`feat!:`) si le changement casse quelque chose d'existant, par exemple des adresses de pages. Si les changements relèvent de plusieurs types, prends le principal et détaille le reste dans le corps du message. Si un message est donné ici, utilise-le comme première ligne, en ajoutant le type s'il manque : $ARGUMENTS
6. Termine le message par la ligne d'attribution de la session, puis crée le commit.
7. Affiche le résumé du commit (`git log -1 --stat`) et rappelle que `/push` l'envoie sur GitHub.
