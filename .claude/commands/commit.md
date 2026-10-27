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
5. Rédige un message de commit en français : une première ligne courte qui dit ce qui a changé pour le site (par exemple « Ajoute la fiche Effet spectateur »), puis, si utile, quelques lignes de détail. Si un message est donné ici, utilise-le comme première ligne : $ARGUMENTS
6. Termine le message par la ligne d'attribution de la session, puis crée le commit.
7. Affiche le résumé du commit (`git log -1 --stat`) et rappelle que `/push` l'envoie sur GitHub.
