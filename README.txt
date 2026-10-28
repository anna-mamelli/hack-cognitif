HACK COGNITIF - site statique

Objectif du site
- Informer et sensibiliser, pour reconnaître les attaques qui exploitent nos leviers cognitifs et mieux s'en prémunir.

Organisation du dossier
- À la racine : le site tel qu'il est publié.
  - index.html et les autres pages .html (une par rubrique, par terrain et par fiche) : pages FABRIQUÉES, à ne pas modifier à la main (elles sont effacées et recréées à chaque fabrication).
  - script.js : contenus (fiches, cours, glossaire, références, tableau DIMA, colonnes « plus sensibles / moins exposées ») et fonctionnement du site. C'est ici que l'on modifie les contenus.
  - style.css, tokens.css, base.css : apparence (couleurs clair et sombre, polices, mise en page).
  - images/ : l'illustration du bandeau de l'accueil, en trois tailles (le navigateur choisit selon l'écran). Vérifier que sa licence autorise l'usage sur le site.
- atelier/ : ce qui sert à fabriquer le site, à ne pas publier.
  - modele.html : le modèle de toutes les pages. C'est ici que l'on modifie le menu, le pied de page et les textes des pages fixes (À propos, Contact, Mentions légales, Chapeaux...). En l'ouvrant dans un navigateur, on voit tout le site sur une seule page, pratique pour vérifier une modification avant de fabriquer.
  - build.mjs, package.json, node_modules/ : le fabricant de pages.
- .hallmark/ : sauvegarde d'avant la refonte et captures d'écran ; à ne pas publier.

Modifier le site
1. Modifier script.js (contenus) ou atelier/modele.html (menu, pied de page, pages fixes).
2. Refabriquer les pages : dans le dossier atelier, lancer « npm run build ».
   (La toute première fois seulement : installer Node.js, puis lancer « npm install » dans le dossier atelier.)
3. Vérifier avec Live Server, ou en ouvrant index.html dans un navigateur.

Contributions et contact (formulaire Framaforms)
- Une fois le formulaire créé, coller son adresse dans script.js, tout en haut : var CONTRIB_FORM = "https://framaforms.org/..."; puis relancer « npm run build » dans le dossier atelier. Tous les boutons « Proposer une contribution », « Proposer de rédiger cette notion », « Écrire via le formulaire » et le lien du Labo pointent alors vers le formulaire. Tant que l'adresse est vide, ils mènent à la page Contribuer, qui annonce le formulaire.
- Créditer une personne sur une fiche (avec son accord) : dans script.js, ajouter à la fiche concernée relu: ["Prénom Nom"] pour une relecture, ou contrib: ["Prénom Nom"] pour une contribution. Les noms s'affichent en bas de la fiche, dans l'encadré « Contribuer à cette fiche ».

Publier
- Déposer à la racine de l'hébergement statique (Netlify, GitHub Pages, OVH...) : tous les fichiers .html de la racine, favicon.svg, script.js, style.css, tokens.css, base.css et le dossier images/ (et sitemap.xml et robots.txt s'ils existent). Ne pas publier atelier/, .hallmark/, .vscode/ ni README.txt. Avec GitHub Pages, le dépôt entier est publié : c'est sans danger, ces fichiers ne contiennent rien de personnel.
- Quand l'adresse du site est connue, l'écrire une fois pour toutes dans atelier/package.json, à la ligne "siteUrl" (par exemple "siteUrl": "https://hack-cognitif.github.io"), puis relancer « npm run build ». Chaque fabrication ajoute alors sitemap.xml, robots.txt, les liens canoniques, l'image de partage et les données structurées lues par Google (nom du site, fil d'Ariane, article avec dates et références sur chaque fiche).
- Les adresses des pages n'ont pas d'extension (…/fiches, …/fiche-autorite) : GitHub Pages sert fiches.html à l'adresse …/fiches, et les anciennes adresses en .html marchent toujours. En aperçu local (index.html ouvert depuis le disque, ou Live Server), les liens gardent .html pour fonctionner sans serveur. Un autre hébergeur doit savoir servir page.html à l'adresse page (Netlify le fait ; Apache demande une règle).
- atelier/dates.json garde la date de première publication et de dernière modification de chaque page : la date ne change que si le contenu de la page change. La date de mise à jour s'affiche en haut de chaque fiche. Ne pas supprimer ce fichier.
- Après la mise en ligne : vérifier une fiche avec le test des résultats enrichis de Google (search.google.com/test/rich-results), puis déclarer le site et son sitemap dans la Search Console.
- Les polices viennent de Google Fonts (connexion requise ; sinon polices système de repli). Pour un site conforme RGPD, héberger les polices soi-même.

A faire avant publication
- Site édité à titre non professionnel : l'éditrice reste anonyme pour le public, mais doit communiquer son identité (nom, prénom, adresse, téléphone) à l'hébergeur, et les Mentions légales doivent indiquer le nom et l'adresse de cet hébergeur (atelier/modele.html, section Hébergeur, encore à compléter). Régime prévu par la LCEN (article 1-1, II, depuis la renumérotation de 2024, à vérifier sur Légifrance). Si le site sert un jour à promouvoir une activité rémunérée, il deviendrait professionnel et les mentions complètes seraient obligatoires.
- Formulaire Framaforms branché (script.js, CONTRIB_FORM) : en vérifier les champs et les réglages de conservation des réponses.
- Faire relire par un clinicien les associations cliniques et les colonnes « plus sensibles / moins exposées », et valider les rapprochements avec DIMA.
- Contrôler les références marquées "à contrôler" (page Références).
- Relire les phrases « Pour qui » des trois pages de terrain (script.js, TERRAIN_FOR), les thèmes de la page Cours (script.js, CTHEMES et CTHEME_OF) et les fiches de psychologie sociale (script.js, bloc « Psychologie sociale »).

Licence et sources
- DIMA (M82-project) est sous licence Apache 2.0 (vérifié sur le dépôt : https://github.com/M82-project/DIMA, fichier LICENSE, pas de fichier NOTICE). Ce site en reprend 24 identifiants et leurs intitulés en français, parfois abrégés.
- Conditions respectées : DIMA est cité avec un lien, la licence est nommée avec un lien vers son texte (pages Ressources et Mentions légales), les abréviations sont signalées, et le site précise que ses rapprochements n'engagent pas le projet DIMA (la licence n'autorise pas à se prévaloir du nom DIMA ou M82).
