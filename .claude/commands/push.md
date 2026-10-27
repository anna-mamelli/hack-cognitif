---
description: Envoie les commits du site sur GitHub (et met donc à jour le site publié sur GitHub Pages)
allowed-tools: Bash(git status:*), Bash(git remote:*), Bash(git branch:*), Bash(git log:*), Bash(git push:*)
---

Envoie les commits locaux du site Hack cognitif sur GitHub.

1. Vérifie qu'un dépôt distant existe : `git remote -v`. S'il n'y en a pas, explique comment en ajouter un (`git remote add origin https://github.com/<compte>/<depot>.git`) et arrête-toi.
2. Vérifie l'état : `git status`. S'il reste des modifications non enregistrées, signale-le et propose de lancer `/commit` d'abord.
3. Montre les commits qui vont partir : `git log --oneline @{u}..` (ou les derniers commits si la branche n'a pas encore de branche distante).
4. Envoie : `git push`, ou `git push -u origin <branche>` la première fois. Ne force jamais l'envoi (`--force`) sans l'accord explicite de la personne.
5. Si l'envoi échoue pour une question d'identification, explique que la fenêtre de connexion GitHub doit s'ouvrir dans le navigateur, ou qu'il faut lancer la commande une fois dans un terminal.
6. Confirme ce qui a été envoyé et rappelle que GitHub Pages met le site à jour en une ou deux minutes.
