(function () {
  var AX = { ent: "Organisations", pou: "Dirigeants ciblés", inf: "Dirigeants qui influencent", tra: "Transversal" };

  var LEVERS = [
    { k: "Autorité",
      e: "Un message qui semble venir d'un dirigeant demande un virement ou un accès, et de ne pas en parler.",
      p: "Un appel ou un courrier qui semble venir d'un ministre, d'un conseiller ou d'un homologue étranger pour obtenir une information ou une décision.",
      d: "Vérifier par un second canal, en rappelant un numéro déjà connu et jamais celui fourni dans la demande." },
    { k: "Urgence",
      e: "« Le paiement doit partir avant 17 h. » Le délai court remplace la vérification.",
      p: "Un calendrier de crise ou un événement imminent sert de prétexte pour court-circuiter les procédures de validation.",
      d: "Règle de base : plus la demande est pressée, plus elle est vérifiée. Donner à chacun le droit de dire non." },
    { k: "Familiarité",
      e: "Un message reprend des noms, des projets et un jargon réels, collectés dans des sources ouvertes.",
      p: "Le ton et les références de l'entourage d'un responsable se déduisent de ses interventions publiques et de son réseau.",
      d: "Réduire ce qui est publié sur l'organisation et ne jamais juger l'authenticité d'un message à son ton." },
    { k: "Réciprocité",
      e: "Un petit service ou un renseignement utile précède une demande plus importante.",
      p: "Une invitation, un geste ou une information donnée en amont prépare une demande d'accès ou de position.",
      d: "Politique de cadeaux et d'invitations, et traçabilité des contacts et des demandes." },
    { k: "Preuve sociale",
      e: "« Tout le monde dans le service l'a déjà fait. » Le groupe sert d'argument.",
      p: "Faux consensus et comptes coordonnés font croire qu'une position ou un sujet est largement partagé.",
      d: "Ne pas déduire la validité du nombre. Vérifier la source et l'indépendance des relais." }
  ];

  var LEVER_C = {
    "Autorité": "Mise en avant de la fonction, d'experts ou de « ceux qui savent » pour clore une discussion avant l'examen des arguments.",
    "Urgence": "Le « moment décisif » ou la crise invoqués pour accélérer une décision et réduire le temps de débat.",
    "Familiarité": "Récit personnel, ton informel et présence quotidienne qui créent une proximité perçue (relation parasociale).",
    "Réciprocité": "« Je vous ai écoutés » : un geste ou une promesse ciblée qui appelle un soutien en retour.",
    "Preuve sociale": "Sondages cités, foules en meeting, mots-dièse et « majorité silencieuse » pour signaler que tout le monde adhère."
  };
  var FICHES = [
    { id: "autorite", ax: ["ent", "pou"], tag: "Levier", title: "Autorité usurpée",
      teaser: "Quand le titre de l'émetteur remplace la vérification.",
      socle: ["Nous accordons spontanément du crédit à une figure d'autorité perçue : titre, hiérarchie, ton assuré. Ce raccourci économise de l'effort, et c'est précisément ce qu'une usurpation exploite.",
              "Terrain organisations : un faux dirigeant demande un paiement, un accès ou une information. Terrain pouvoir : un faux ministre, conseiller ou homologue étranger contacte un cabinet ou un élu."],
      cas: ["Fraude au président : famille d'escroqueries documentée de longue date par les autorités et les assureurs.", "Canulars téléphoniques visant des responsables politiques (voir la fiche « Pretexting et canulars »)."],
      blue: [["Signaux", "demande hors procédure ; confidentialité exigée ; contournement d'un circuit habituel ; changement de coordonnées ou de canal."],
             ["Contre-mesures", "rappel sur un numéro connu ; double validation des opérations sensibles ; annuaire d'authentification interne ; droit explicite de refuser et de signaler."]],
      red: [["Hypothèse testée", "les équipes appliquent-elles la procédure de vérification face à une demande qui semble venir d'en haut ?"],
            ["Indicateur", "part des demandes fictives « venues d'en haut » vérifiées par rappel sur un numéro connu avant toute exécution, et délai médian de signalement, comparés entre des équipes tirées au sort qui appliquent déjà la double validation et d'autres qui ne l'appliquent pas encore."],
            ["Cadre", "message fictif, organisation consentante, direction informée, indicateurs agrégés (taux de signalement, délai), débriefing sans désigner d'individus."]],
      pistes: ["Mesurer l'écart entre la procédure écrite et le comportement réel sous pression.", "Comparer la vigilance envers les demandes venant du haut et du côté."],
      note: "Niveau de preuve : levier bien documenté en psychologie sociale. Références à ajouter avant publication." },

    { id: "urgence", ax: ["ent", "pou"], tag: "Levier", title: "Urgence et pression temporelle",
      teaser: "Le délai court remplace la réflexion.",
      socle: ["Sous pression de temps, le cerveau privilégie les décisions rapides et les règles simples ; la vérification coûte du temps et passe en dernier. L'urgence fabriquée sert donc d'amplificateur à d'autres leviers.",
              "Terrain organisations : échéance de paiement, accès à rétablir. Terrain pouvoir : crise, agenda serré, communiqué à valider dans l'heure."],
      cas: ["Ce levier accompagne la plupart des cas publics d'hameçonnage ciblé et de fraude au président."],
      blue: [["Signaux", "échéance très courte sans justification ; menace de conséquences ; refus d'un délai de vérification."],
             ["Contre-mesures", "règle « plus c'est urgent, plus on vérifie » ; durée minimale pour les opérations sensibles ; escalade possible sans reproche."]],
      red: [["Hypothèse testée", "une demande urgente déclenche-t-elle encore le contrôle prévu ?"],
            ["Indicateur", "part des demandes fictives urgentes qui passent par le contrôle prévu, comparée à celle des mêmes demandes sans échéance, avec et sans la règle « plus c'est urgent, plus on vérifie », et délai médian avant vérification."],
            ["Cadre", "exercice annoncé à la direction, contenu fictif, mesure du délai de vérification, pas de sanction individuelle."]],
      pistes: ["Seuil de pression à partir duquel les équipes abandonnent une procédure.", "Effet de la fatigue et de la charge de crise sur ce seuil."],
      note: "Ce levier se combine presque toujours avec l'autorité : les fiches se lisent ensemble." },

    { id: "usurpation", ax: ["ent", "pou"], tag: "Technique", title: "Usurpation de voix et d'image",
      teaser: "Quand « j'ai vu » et « j'ai entendu » ne prouvent plus rien.",
      socle: ["Voix et visage sont traités vite et reçus comme preuves d'identité. Les contenus synthétiques rendent possible l'imitation d'un proche, d'un dirigeant ou d'un responsable à partir de quelques échantillons publics.",
              "Niveau de preuve : mécanismes perceptifs robustes ; effet réel des contenus synthétiques sur les croyances encore débattu."],
      cas: ["Visioconférence frauduleuse contre un employé d'Arup à Hong Kong (2024), avec de faux dirigeants, largement relayée par la presse.", "Faux appel imitant la voix du président américain Joe Biden avant la primaire du New Hampshire (janvier 2024)."],
      blue: [["Signaux", "demande inhabituelle sur un canal inhabituel ; refus de rappeler ou de changer de canal ; latence ou artefacts audio et vidéo."],
             ["Contre-mesures", "mot de passe convenu pour les opérations sensibles ; rappel sur numéro connu ; outils de provenance des contenus ; procédure de vérification avant toute diffusion d'un enregistrement sensible."]],
      red: [["Hypothèse testée", "une équipe formée détecte-t-elle et escalade-t-elle un contenu trompeur introduit dans son flux ?"],
            ["Indicateur", "part des équipes qui escaladent le contenu fictif avant de le diffuser ou d'agir, et délai entre son arrivée dans le flux et l'escalade."],
            ["Cadre", "contenus fictifs, marqués comme tels en interne, jamais d'imitation d'une personne réelle, supports détruits après l'exercice."]],
      pistes: ["« Dividende du menteur » : l'exposition aux contenus synthétiques réduit-elle la confiance dans les contenus authentiques ?", "Cécité attentionnelle d'une cellule de veille sous charge de crise."],
      note: "Les cas cités s'appuient sur la presse généraliste (CNN, Associated Press)." },

    { id: "hamecon-cible", ax: ["ent", "pou"], tag: "Technique", title: "Hameçonnage ciblé de responsables",
      teaser: "Un message sur mesure, adressé à la bonne personne.",
      socle: ["Le hameçonnage ciblé personnalise le message à partir d'informations publiques sur la cible et son entourage. Les dirigeants, cabinets et équipes de campagne sont des cibles à forte valeur et à forte charge de travail.",
              "Il combine souvent autorité, urgence et familiarité."],
      cas: ["Messagerie de John Podesta, président de la campagne d'Hillary Clinton, compromise en mars 2016 par un courriel imitant une alerte de sécurité Google, puis publiée par WikiLeaks à partir d'octobre 2016 ; opération attribuée au renseignement militaire russe (GRU) par la justice américaine en 2018.",
            "« MacronLeaks » (2017) : le 5 mai 2017, deux jours avant le second tour, des courriels et documents de l'équipe d'En Marche !, mêlés à des faux, sont diffusés en ligne. Non attribuée publiquement par l'ANSSI en 2017, l'opération a été citée en 2020 dans une inculpation américaine d'officiers du GRU (unité 74455), notamment pour ingérence dans l'élection française ; en 2025, la France a attribué au GRU (mode opératoire APT28) la « tentative de déstabilisation du processus électoral français en 2017 ». Deux attributions qui convergent vers le GRU, sans désigner la même unité.",
            "Campagne de Donald Trump (2024) : accès à des communications internes, attribué à l'Iran par le FBI, l'ODNI et la CISA dans une déclaration conjointe du 19 août 2024, qui évoque aussi des tentatives d'ingénierie sociale visant les deux grandes campagnes présidentielles."],
      blue: [["Signaux", "alerte de sécurité inattendue ; lien de connexion sur un domaine proche du réel ; demande de réinitialiser un mot de passe."],
             ["Contre-mesures", "authentification forte résistante à l'hameçonnage (clés physiques) ; avertissements automatiques sur les messages externes ou suspects ; signalement en un clic, sans reproche ; cloisonnement des comptes ; une formation des cabinets et équipes de campagne seulement en complément, et dont l'effet est mesuré."]],
      red: [["Hypothèse testée", "les équipes signalent-elles un message ciblé fictif, et à quel moment ?"],
            ["Indicateur", "taux de signalement du message fictif et délai médian du premier signalement, comparés entre des équipes tirées au sort, avec et sans bouton de signalement en un clic."],
            ["Cadre", "organisation consentante, message fictif, indicateurs agrégés, aucune récolte d'identifiants réels."]],
      pistes: ["Comparer la vulnérabilité de profils très sollicités et de profils peu exposés.", "Mesurer l'effet d'une clé physique sur le taux de compromission en exercice."],
      note: "L'attribution des opérations reste une question distincte de la technique." },

    { id: "pretexting", ax: ["pou", "ent"], tag: "Technique", title: "Pretexting et canulars",
      teaser: "Se faire passer pour un interlocuteur plausible.",
      socle: ["Le pretexting consiste à construire un prétexte crédible (un homologue, un collègue d'un autre service, un prestataire) pour obtenir de l'information ou une réaction. Le point d'entrée est souvent l'accueil, un secrétariat ou un standard, moins protégés que la personne visée.",
              "Contre des responsables, l'objectif peut aussi être de provoquer une réaction publique embarrassante."],
      cas: ["Le duo russe Vovan et Lexus, que Proofpoint suit sous le nom TA499, a piégé par téléphone ou en visioconférence des responsables politiques et des personnalités, en se faisant passer pour des interlocuteurs de confiance, puis a publié les enregistrements."],
      blue: [["Signaux", "interlocuteur inconnu mais très bien informé ; pression pour un échange rapide ; refus de passer par les canaux officiels."],
             ["Contre-mesures", "protocole d'authentification des appels officiels ; formation des standards et secrétariats ; consigne de ne rien confirmer sans vérification."]],
      red: [["Hypothèse testée", "un appel fictif d'un faux homologue passe-t-il les barrières d'accueil et de secrétariat ?"],
            ["Indicateur", "part des appels fictifs pour lesquels l'accueil applique le protocole d'authentification avant de transmettre ou de confirmer une information."],
            ["Cadre", "structure consentante, scénario générique sans personnalité réelle, retour collectif et non nominatif."]],
      pistes: ["Cartographier les points d'entrée d'une organisation selon leur niveau de protection.", "Étudier l'effet du protocole d'authentification sur la fluidité du travail."],
      note: "Cas public à sourcer précisément avant publication." },

    { id: "cadrage-agenda", ax: ["inf"], tag: "Communication politique", title: "Cadrage et agenda",
      teaser: "Choisir l'angle et les sujets plutôt que mentir.",
      socle: ["Le cadrage consiste à choisir les mots et l'angle qui orientent l'interprétation d'un même fait. La mise à l'agenda (McCombs et Shaw, 1972) montre que les sujets les plus mis en avant deviennent ceux que le public juge importants.",
              "Ces techniques sont ordinaires dans la communication de tous les camps. Elles posent problème quand elles sont opaques, répétées à grande échelle ou combinées à de fausses informations."],
      cas: ["Une même mesure désignée tantôt comme « réforme », tantôt comme « régression » : le choix du mot oriente la lecture avant tout argument.", "La « fenêtre d'Overton » décrit l'étendue des idées jugées acceptables à un moment donné, que le vocabulaire et l'agenda peuvent déplacer."],
      blue: [["Signaux", "mêmes formules reprises dans plusieurs prises de parole ; renommage d'une mesure ; sujets mis en avant juste avant ou après un autre sujet sensible."],
             ["Contre-mesures", "comparer plusieurs formulations du même fait ; lire la source primaire ; repérer les éléments de langage ; éducation aux médias."]],
      red: [["Hypothèse testée", "des lecteurs formés repèrent-ils que deux textes décrivent le même fait avec des cadrages différents ?"],
            ["Indicateur", "part des lecteurs qui reconnaissent le même fait sous les deux cadrages, et écart entre leurs jugements sur les deux versions, comparés entre un groupe qui a suivi une séance de comparaison de formulations et un groupe tiré au sort qui ne l'a pas encore suivie."],
            ["Cadre", "textes fictifs sur un sujet neutre, participants informés, comparaison des interprétations, aucune personnalité réelle."]],
      pistes: ["Mesurer l'effet du cadrage sur l'interprétation avant et après une formation courte.", "Cartographier les éléments de langage d'un débat public à partir de sources ouvertes."],
      note: "Lecture symétrique : ces techniques sont employées par tous les camps. Références à sourcer (McCombs et Shaw 1972, Entman 1993)." },

    { id: "inondation", ax: ["inf"], tag: "Communication politique", title: "Inondation informationnelle",
      teaser: "Saturer la capacité de vérification plutôt que convaincre.",
      socle: ["Le modèle du « tuyau d'incendie de mensonges » (Paul et Matthews, RAND, 2016) décrit une communication à très fort volume, multicanale, rapide et sans souci de cohérence. Le but n'est pas de convaincre sur un point, mais de saturer la capacité de vérification et de tri.",
              "Mécanismes : illusion de fréquence, fatigue informationnelle, impossibilité de tout vérifier. Le public finit par douter de tout, ou par s'en remettre à ce qui lui est familier."],
      cas: ["L'étude RAND de 2016 décrit ce modèle à partir de la propagande russe ; l'expression anglaise « flood the zone » est devenue courante dans le débat public pour désigner des stratégies voisines dans d'autres contextes."],
      blue: [["Signaux", "volume très supérieur à la capacité de vérification ; messages contradictoires diffusés par plusieurs relais ; sujet qui change avant la fin d'une vérification."],
             ["Contre-mesures", "prioriser les affirmations à fort impact plutôt que tout vérifier ; fiches de vérification courtes ; limiter l'exposition aux flux bruts ; communication institutionnelle régulière et prévisible."]],
      red: [["Hypothèse testée", "une cellule de vérification maintient-elle sa priorisation quand le volume augmente ?"],
            ["Indicateur", "part des affirmations à fort impact traitées en premier, et délai moyen de traitement, à chaque palier de volume du flux fictif."],
            ["Cadre", "flux fictif à volume croissant, participants informés, mesure du délai et de la qualité du tri."]],
      pistes: ["Seuil de saturation d'une équipe de vérification.", "Effet de la saturation sur la confiance générale dans l'information (« tout se vaut »)."],
      note: "Lecture symétrique. Le modèle RAND porte sur un contexte précis : son extension à d'autres acteurs doit être étayée cas par cas." },

    { id: "parasocial", ax: ["inf"], tag: "Communication politique", title: "Proximité et relation parasociale",
      teaser: "Quand le sentiment de connaître quelqu'un remplace l'examen de ses positions.",
      socle: ["La relation parasociale (Horton et Wohl, 1956) désigne l'illusion d'une relation directe avec une figure médiatique. Les responsables politiques qui multiplient les formats informels, le récit personnel et la présence quotidienne en ligne créent une proximité perçue.",
              "Mécanismes : effet de simple exposition, familiarité, confiance accordée à une figure « qu'on connaît ». La proximité peut remplacer l'évaluation des positions."],
      cas: ["Formats informels en direct, stories et vidéos spontanées utilisés par des responsables de tous bords pour paraître accessibles."],
      blue: [["Signaux", "récit à la première personne ; ton familier ; appel à l'identification plus qu'à l'argument."],
             ["Contre-mesures", "séparer ce qu'on ressent de ce qui est proposé ; évaluer les positions et les actes plutôt que le ton ; diversifier les sources."]],
      red: [["Hypothèse testée", "un public formé distingue-t-il l'adhésion à une personne de l'adhésion à ses propositions ?"],
            ["Indicateur", "écart entre les jugements portés sur le même programme fictif selon qu'il est présenté de façon formelle ou informelle, comparé entre un groupe formé et un groupe tiré au sort qui ne l'est pas encore."],
            ["Cadre", "personnage fictif, présentations comparées (formelle et informelle) d'un même programme fictif, participants informés."]],
      pistes: ["Mesurer l'effet de la familiarité sur la perception de la compétence.", "Comparer l'impact des formats informels selon les tranches d'âge."],
      note: "Lecture symétrique : la proximité construite est employée dans tous les camps. Références à sourcer (Horton et Wohl 1956)." },

    { id: "adversaire", ax: ["inf"], tag: "Communication politique", title: "Désignation d'un adversaire",
      teaser: "Réduire un problème complexe à un coupable.",
      socle: ["Désigner un adversaire ou un coupable (« nous contre eux ») simplifie un problème complexe et mobilise. Le procédé s'appuie sur la théorie de l'identité sociale (Tajfel et Turner), le biais de la somme nulle et le biais de confirmation.",
              "Il peut être employé pour mobiliser contre une institution, un groupe ou un pays, avec des effets de polarisation durables."],
      cas: ["Attribution de difficultés économiques ou sociales à un groupe, une institution ou un pays : un schéma de rhétorique politique largement étudié, tous camps confondus."],
      blue: [["Signaux", "problème complexe réduit à un seul responsable ; vocabulaire de menace ; absence d'alternatives ou de nuances."],
             ["Contre-mesures", "reformuler le problème en chaîne de causes ; vérifier les chiffres cités ; s'exposer volontairement à des arguments contraires ; débat structuré."]],
      red: [["Hypothèse testée", "un groupe formé repère-t-il la réduction à un coupable dans un discours fictif ?"],
            ["Indicateur", "part des participants qui repèrent la réduction à un coupable dans le discours fictif et proposent d'autres causes, comparée entre un groupe qui a suivi un débat structuré et un groupe tiré au sort qui ne l'a pas encore suivi."],
            ["Cadre", "discours fictif sur un sujet inventé, aucun groupe réel visé, débriefing."]],
      pistes: ["Mesurer l'effet d'une reformulation en chaîne de causes sur la polarisation perçue.", "Lien entre intolérance à l'incertitude et adhésion aux explications à coupable unique."],
      note: "Lecture symétrique. Les exemples doivent rester génériques ou sourcés de façon précise, sans viser de groupe réel." },

    { id: "saillance", ax: ["tra"], tag: "Mécanisme", title: "Détournement de la saillance",
      teaser: "Quand on déplace le projecteur plutôt que de mentir.",
      socle: ["Le cerveau trie en permanence ce qui mérite l'attention : nouveauté, contraste, émotion, menace. Ce tri est en partie automatique. Ce qui est saillant paraît important, puis vrai, puis représentatif.",
              "On ne cherche pas à faire croire un mensonge, on déplace le projecteur : certains sujets deviennent sur-visibles, d'autres disparaissent."],
      cas: [],
      blue: [["Indicateurs", "pic d'attention disproportionné sur un sujet mineur ; cadrage émotionnel homogène sur des sources a priori indépendantes ; décalage entre visibilité et poids réel."],
             ["Contre-mesures", "se demander « pourquoi est-ce que je vois ça maintenant ? » ; diversifier les sources ; suivre l'écart entre visibilité et réalité."]],
      red: [["Hypothèse testée", "une cellule de veille repère-t-elle un décalage entre visibilité et réalité ?"],
            ["Indicateur", "part des cellules qui signalent l'écart entre visibilité et réalité dans les données synthétiques, et délai avant ce signalement."],
            ["Cadre", "scénario fictif, données synthétiques, participants informés, débriefing."]],
      pistes: ["Mesurer l'écart entre saillance perçue et poids réel d'un sujet chez des analystes.", "Effet de la fatigue d'alerte sur le seuil de ce qui est jugé saillant."],
      note: "Niveau de preuve : robuste pour le biais de négativité et la disponibilité." },

    { id: "delegation", ax: ["tra"], tag: "Prospective", title: "Capture de la délégation décisionnelle",
      teaser: "Influencer le processus de choix plutôt que les opinions.",
      socle: ["Quand une personne confie ses petits choix quotidiens à un assistant IA, elle délègue une partie de ses fonctions exécutives. Qui influence l'assistant influence la personne, sans la convaincre de rien : il suffit d'orienter l'option par défaut.",
              "Vulnérabilités : économie d'effort, biais d'automatisation, atrophie possible par non-usage (hypothèse à tester)."],
      cas: [],
      blue: [["Signaux", "convergence inhabituelle des choix d'une population ; recommandations qui dérivent dans une même direction sur des sujets sensibles."],
             ["Contre-mesures", "l'assistant affiche ses sources et une alternative ; audits par questions pièges ; décisions manuelles sur les sujets importants ; traçabilité pour les assistants de décideurs publics."]],
      red: [["Hypothèse testée", "une organisation détecte-t-elle une dérive progressive des recommandations d'un assistant ?"],
            ["Indicateur", "nombre de recommandations dérivées de l'assistant fictif acceptées avant la première alerte, et part des audits par questions pièges qui repèrent la dérive."],
            ["Cadre", "assistant fictif en environnement d'exercice, aucune donnée réelle, débriefing."]],
      pistes: ["Protocole d'étude : la délégation prolongée altère-t-elle le contrôle exécutif ?", "Indicateur d'autonomie décisionnelle."],
      note: "Hypothèse prospective, à valider par la recherche." },

    { id: "psychophysique", ax: ["tra"], tag: "Mesure", title: "Psychophysique et analyse des signaux",
      teaser: "Mesurer ce qu'une équipe de veille détecte vraiment.",
      socle: ["Seuils de détection, loi de Weber, adaptation sensorielle et théorie de la détection du signal : la sensibilité (d') est distincte du critère de décision. Quatre issues : détection correcte, manqué, fausse alarme, rejet correct.",
              "C'est le cadre quantitatif de toute veille, y compris pour mesurer l'efficacité d'une sensibilisation au phishing."],
      cas: [],
      blue: [["Mesures", "calcul de d' et du critère sur des cas connus ; courbes ROC des outils de détection ; écart relatif minimal perçu par un analyste."],
             ["Contre-mesures", "seuil ajusté au coût de l'erreur ; rotation des analystes ; indicateurs indépendants combinés."]],
      red: [["Hypothèse testée", "une dérive lente restant sous le seuil habituel d'une équipe est-elle repérée, et à quel moment ?"],
            ["Indicateur", "moment de détection de la dérive synthétique et taux de fausses alertes, avec un seuil fixe puis avec un seuil ajusté au coût de l'erreur."],
            ["Cadre", "données synthétiques en environnement d'exercice, équipe informée, débriefing, suppression des jeux de données."]],
      pistes: ["Seuil de Weber des campagnes d'influence.", "Effet de l'urgence sur le critère de décision d'une équipe."],
      note: "Niveau de preuve : très robuste. Cadre de mesure de la défense, pas de contournement de la détection." }
  ];

  var GLOSS = [
    ["Social engineering (ingénierie sociale)", "Ensemble des techniques qui exploitent des ressorts humains (confiance, autorité, urgence) pour obtenir un accès, une information ou une action."],
    ["Hameçonnage (phishing)", "Message trompeur, souvent un e-mail, qui imite une source de confiance pour obtenir des identifiants ou déclencher une action."],
    ["Hameçonnage ciblé (spear phishing)", "Hameçonnage personnalisé à partir d'informations sur la cible et son entourage."],
    ["Vishing", "Hameçonnage par téléphone ou message vocal."],
    ["Pretexting", "Construction d'un prétexte crédible pour obtenir de l'information ou une action."],
    ["Fraude au président", "Escroquerie où un faux dirigeant demande un virement ou une information sensible à un employé."],
    ["Deepfake", "Contenu audio ou vidéo généré ou modifié par IA pour imiter une personne."],
    ["OSINT", "Renseignement d'origine sources ouvertes : exploitation d'informations publiques."],
    ["Influence", "Ensemble des actions visant à modifier les perceptions ou les comportements d'un public, par des moyens licites ou non."],
    ["Opérations militaires d'influence (OMI)", "Activités des armées françaises pour influencer des publics dans le cadre d'une opération, encadrées par la doctrine et le droit."],
    ["PsyOps", "Opérations psychologiques militaires (terme anglo-saxon, OTAN et États-Unis)."],
    ["Lutte informatique d'influence (L2I)", "Volet cyber du dispositif français consacré aux actions d'influence dans l'espace numérique."],
    ["Lutte informatique offensive (LIO) / défensive (LID)", "Actions cyber visant respectivement à attaquer des systèmes adverses ou à protéger les siens."],
    ["Lutte informationnelle", "Détecter, caractériser et contrer les opérations qui visent l'information et les perceptions."],
    ["Désinformation / mésinformation", "Diffusion volontaire d'informations fausses ou trompeuses / diffusion d'informations erronées sans intention de nuire."],
    ["Ingérence numérique étrangère", "Opération menée depuis l'étranger sur l'espace informationnel national, au cœur de la mission de Viginum."],
    ["Guerre cognitive", "Action visant la façon dont une population perçoit, décide et agit, dans la durée et pas seulement en opération."],
    ["Résilience informationnelle", "Capacité d'une société à absorber, détecter et corriger les tentatives de manipulation."],
    ["Cadrage (framing)", "Choix des mots et de l'angle qui orientent l'interprétation d'un même fait."],
    ["Mise à l'agenda (agenda-setting)", "Effet par lequel les sujets les plus mis en avant deviennent ceux que le public juge importants."],
    ["Fenêtre d'Overton", "Éventail des idées jugées acceptables dans le débat public à un moment donné."],
    ["Relation parasociale", "Illusion d'une relation directe avec une figure médiatique."],
    ["Inondation informationnelle", "Diffusion à très fort volume, multicanale et peu cohérente, qui sature la capacité de vérification."],
    ["Microciblage", "Adaptation d'un message à de petits segments de public à partir de données personnelles."],
    ["Astroturfing", "Simulation d'un mouvement spontané de citoyens pour masquer l'origine d'une campagne."],
    ["Blue team / red team", "Équipe de défense / équipe qui simule l'adversaire dans un cadre d'exercice encadré pour mesurer la défense."]
  ];

  var TE = {
    TE0111: "Heuristique de disponibilité", TE0131: "Effet de bizarrerie", TE0132: "Biais de négativité", TE0141: "Effet von Restorff",
    TE0152: "Loi de Weber-Fechner", TE0231: "Biais d'homogénéité", TE0251: "Effet de faux consensus", TE0312: "Biais de confusion de source",
    TE0332: "Effet de simple exposition", TE0414: "FOMO", TE0422: "Biais d'autorité", TE0423: "Preuve sociale artificielle",
    TE0424: "Biais de rareté", TE0425: "Pied dans la porte", TE0426: "Biais de réciprocité", TE0432: "Biais du statu quo",
    TE0142: "Biais d'ancrage", TE0143: "Effet de contraste", TE0433: "Saturation informationnelle", TE0121: "Illusion de la fréquence",
    TE0241: "Biais de la somme nulle", TE0222: "Biais de confirmation"
  };
  var MAP = [
    { label: "Levier : Autorité", fiche: "autorite", te: ["TE0422"], note: "Correspondance directe." },
    { label: "Levier : Urgence", fiche: "urgence", te: ["TE0424", "TE0414"], note: "Rapprochement partiel : DIMA ne décrit pas l'urgence comme telle. Rareté et peur de rater l'occasion s'en approchent." },
    { label: "Levier : Familiarité", fiche: null, te: ["TE0231", "TE0332"], note: "Homogénéité perçue et exposition répétée au même interlocuteur ou au même vocabulaire." },
    { label: "Levier : Réciprocité", fiche: null, te: ["TE0426", "TE0425"], note: "Un service rendu prépare une demande plus importante." },
    { label: "Levier : Preuve sociale", fiche: null, te: ["TE0423", "TE0251"], note: "Côté pouvoir, comptes coordonnés ; côté organisations, « tout le monde le fait »." },
    { label: "Usurpation de voix et d'image", fiche: "usurpation", te: ["TE0422", "TE0312"], note: "L'usurpation exploite l'autorité apparente et la confusion sur la source réelle." },
    { label: "Hameçonnage ciblé de responsables", fiche: "hamecon-cible", te: ["TE0422", "TE0424", "TE0231"], note: "Combine autorité, pression et familiarité." },
    { label: "Pretexting et canulars", fiche: "pretexting", te: ["TE0422", "TE0426", "TE0425"], note: "Prétexte crédible, puis demande qui monte en intensité." },
    { label: "Cadrage et agenda", fiche: "cadrage-agenda", te: ["TE0142", "TE0143", "TE0111"], note: "Choix de l'angle et des sujets mis en avant." },
    { label: "Inondation informationnelle", fiche: "inondation", te: ["TE0433", "TE0121"], note: "Volume et répétition qui saturent la capacité de tri." },
    { label: "Proximité et relation parasociale", fiche: "parasocial", te: ["TE0332", "TE0231", "TE0422"], note: "Familiarité construite par l'exposition répétée et la personnalisation." },
    { label: "Désignation d'un adversaire", fiche: "adversaire", te: ["TE0241", "TE0222", "TE0251"], note: "Cadre nous contre eux et confirmation des croyances existantes." },
    { label: "Détournement de la saillance", fiche: "saillance", te: ["TE0111", "TE0131", "TE0132", "TE0141"], note: "Phase Detect de DIMA : ce qui attire l'attention." },
    { label: "Capture de la délégation décisionnelle", fiche: "delegation", te: ["TE0432"], note: "Le biais d'automatisation n'apparaît pas comme technique dédiée : lacune possible à signaler au projet." },
    { label: "Psychophysique et analyse des signaux", fiche: "psychophysique", te: ["TE0152"], note: "Seuils de perception des différences." }
  ];
  var LV = { "documenté": "lv-d", "plausible": "lv-p", "hypothèse": "lv-h" };
  var PSY_NOTE = "À lire pour se prémunir : repérer les situations où l'on est plus exposé, et y renforcer ses défenses. Tendances de groupe, jamais un jugement sur une personne : un diagnostic ne dit pas qu'une personne est manipulable. Usage légitime : adapter les formations et les procédures, protéger.";
  var PSY = {
    "Levier : Autorité": [
      ["Trouble de la personnalité dépendante", "hypothèse", "Besoin d'être guidé, difficulté à décider sans avis d'autrui."],
      ["Troubles neurocognitifs", "documenté", "Le déclin cognitif accroît le risque de fraude financière, quel que soit le levier."]],
    "Levier : Urgence": [
      ["TDAH", "plausible", "Impulsivité, difficulté à différer une réponse."],
      ["Épisode maniaque ou hypomaniaque (trouble bipolaire)", "plausible", "Décisions rapides, prise de risque financière."],
      ["Trouble anxieux généralisé", "plausible", "L'échéance amplifie l'anxiété et réduit la vérification."],
      ["Jeu pathologique et addictions comportementales", "hypothèse", "Sensibilité à la rareté et au gain immédiat."]],
    "Levier : Familiarité": [
      ["Troubles neurocognitifs", "documenté", "La sensation de familiarité peut subsister quand le rappel précis s'efface."],
      ["Isolement social marqué (facteur de risque, pas un trouble)", "plausible", "Le besoin de lien peut abaisser la méfiance envers un interlocuteur qui paraît proche."]],
    "Levier : Réciprocité": [
      ["Trouble de la personnalité dépendante", "hypothèse", "Difficulté à refuser, besoin de maintenir le lien."],
      ["Trouble d'anxiété sociale", "plausible", "Peur du conflit et du refus."]],
    "Levier : Preuve sociale": [
      ["Trouble d'anxiété sociale", "plausible", "Forte sensibilité au regard d'autrui et à l'appartenance."],
      ["Dépression", "hypothèse", "Recours accru à des repères externes quand la confiance en son jugement baisse."]],
    "Usurpation de voix et d'image": [
      ["Prosopagnosie", "hypothèse", "Difficulté à reconnaître les visages, donc moins de repères d'identité. Les contenus synthétiques sont difficiles à détecter pour tout le monde."],
      ["Troubles neurocognitifs", "documenté", "Risque accru de fraude financière chez les personnes âgées touchées."]],
    "Hameçonnage ciblé de responsables": [
      ["TDAH", "plausible", "Distractibilité, clic impulsif."],
      ["Troubles neurocognitifs", "documenté", "Risque accru de fraude financière."],
      ["Épuisement professionnel (état de surcharge, pas un trouble)", "plausible", "Baisse de vigilance sous surcharge chronique."]],
    "Pretexting et canulars": [
      ["Trouble d'anxiété sociale", "hypothèse", "Difficulté à interrompre ou contredire un interlocuteur qui paraît légitime."],
      ["Trouble de la personnalité dépendante", "hypothèse", "Tendance à répondre aux demandes pour préserver la relation."]],
    "Cadrage et agenda": [
      ["Troubles anxieux", "plausible", "Sensibilité accrue aux cadrages centrés sur la menace."]],
    "Inondation informationnelle": [
      ["TDAH", "plausible", "Difficulté à trier un flux dense et rapide."],
      ["Troubles anxieux", "plausible", "Hypervigilance et épuisement face à un flux continu."],
      ["Épuisement informationnel (état de surcharge, pas un trouble)", "plausible", "Baisse de la capacité de tri et de vérification."]],
    "Proximité et relation parasociale": [
      ["Isolement social marqué (facteur de risque, pas un trouble)", "plausible", "Le besoin de lien renforce l'attachement à une figure médiatique."],
      ["Troubles psychotiques (idées de référence)", "documenté", "Impression que des messages médiatiques s'adressent personnellement à soi."]],
    "Désignation d'un adversaire": [
      ["Traits de personnalité paranoïaque", "plausible", "Tendance à attribuer des intentions hostiles à autrui."],
      ["Troubles anxieux", "hypothèse", "Recherche d'un responsable pour réduire l'incertitude."]],
    "Détournement de la saillance": [
      ["Schizophrénie et spectre psychotique", "documenté", "Hypothèse de la saillance aberrante (Kapur, 2003) : des stimuli neutres prennent une importance excessive."],
      ["Trouble de stress post-traumatique", "documenté", "Biais attentionnel vers la menace."],
      ["Troubles anxieux", "documenté", "Biais attentionnel vers la menace."],
      ["TDAH", "plausible", "Attention captée par la nouveauté."]],
    "Capture de la délégation décisionnelle": [
      ["Syndrome dysexécutif (lésions frontales, TDAH)", "plausible", "Planification et inhibition altérées, recours accru à des aides externes."],
      ["Dépression (apathie, perte d'initiative)", "plausible", "Moindre investissement dans la décision."],
      ["Troubles neurocognitifs", "plausible", "Dépendance accrue à des aides à la décision."]],
    "Psychophysique et analyse des signaux": [
      ["Schizophrénie", "documenté", "Altérations de la perception et du filtrage sensoriel."],
      ["Trouble du spectre de l'autisme", "plausible", "Particularités du traitement sensoriel."]]
  };
  /* Qui est plus sensible à un levier, qui l'est moins (données SENS, plus bas) */
  /* hit: the name chosen in a filter of the Ressources table, highlighted in the cell */
  function sensItem(label, x, hit) {
    if (x.note) return '<li class="none">' + x.note + '</li>';
    if (typeof x === "string") x = (PSY[label] || []).filter(function (p) { return p[0] === x; })[0];
    if (!x) return "";
    return '<li' + (hit && canonOf(x[0]) === hit ? ' class="hit"' : '') + '><b>' + x[0] + '</b> <span class="lv ' + LV[x[1]] + '">' + x[1] + '</span><br><span class="pdesc">' + x[2] + '</span></li>';
  }
  function sensListHTML(label, side, hit) {
    var s = SENS[label];
    if (!s || !s[side]) return "";
    return '<ul class="psy">' + s[side].map(function (x) { return sensItem(label, x, hit); }).join("") + '</ul>';
  }
  function psyBlock(m) {
    var s = SENS[m.label];
    if (!s) return "";
    var out = '<h2 style="margin-top:28px">Qui est plus sensible, ce qui protège</h2><div class="sens">' +
      '<div class="sens-plus"><h3>Plus sensibles</h3>' + sensListHTML(m.label, "plus") + '</div>' +
      '<div class="sens-moins"><h3>Ce qui protège</h3>' + sensListHTML(m.label, "moins") + '</div></div>';
    var il = (PSY[m.label] || []).filter(function (p) { return (s.illus || []).indexOf(p[0]) !== -1; });
    if (il.length) out += '<h3 class="sens-illus">Ce que la clinique éclaire</h3><ul class="psy">' + il.map(function (p) { return sensItem(m.label, p); }).join("") + '</ul>';
    return out + '<p class="note" style="margin-top:8px;border-top:0;padding-top:0">' + PSY_NOTE + '</p>';
  }
  /* DIMA technique cards: the code's second digit gives the phase (TE0422 → 4, Act) */
  var DIMA_PHASE = { "1": "Détecter (Detect)", "2": "Informer (Inform)", "3": "Mémoriser (Memorise)", "4": "Agir (Act)" };
  function chipsHTML(ids) {
    return '<div class="chips">' + ids.map(function (t) {
      var n = MAP.filter(function (m) { return m.te.indexOf(t) !== -1; }).length;
      var tip = "Phase " + (DIMA_PHASE[t.charAt(3)] || "DIMA") + ". Rapprochée de " + n + (n > 1 ? " leviers ou fiches." : " levier ou fiche.");
      return '<span class="chip" tabindex="0" data-te="' + t + '" data-tip="' + tip + '" aria-label="' + t + ', ' + TE[t] + '. ' + tip + '">' + t + ' <i>' + TE[t] + '</i></span>';
    }).join("") + '</div>';
  }
  /* Pointing at a card lights up the same technique elsewhere in its table or section */
  function relate(e, on) {
    var c = e.target.closest && e.target.closest(".chip[data-te]");
    if (!c) return;
    var scope = c.closest("table, section, .detail") || document;
    Array.prototype.forEach.call(scope.querySelectorAll('.chip[data-te="' + c.getAttribute("data-te") + '"]'), function (x) { x.classList.toggle("rel", on && x !== c); });
  }
  document.addEventListener("mouseover", function (e) { relate(e, true); });
  document.addEventListener("mouseout", function (e) { relate(e, false); });
  document.addEventListener("focusin", function (e) { relate(e, true); });
  document.addEventListener("focusout", function (e) { relate(e, false); });
  function dimaHTML(f) {
    var m = MAP.filter(function (x) { return x.fiche === f.id; })[0];
    if (!m) return "";
    return '<div class="dima-sec"><h2>Techniques DIMA associées</h2>' + chipsHTML(m.te) + '<p class="note" style="margin-top:12px;border-top:0;padding-top:0">' + m.note + ' Rapprochement proposé, à valider. <a href="#ressources">Voir le tableau complet</a>.</p>' + psyBlock(m) + '</div>';
  }
  /* Lexique IT : [terme, sens en informatique, équivalent cognitif, exemple, limite de la métaphore, catégorie] */
  var LEXCATS = [["attaque", "Attaques et vulnérabilités"], ["defense", "Défense"], ["analyse", "Détection, test et analyse"]];
  var LEX = [
    ["Vulnérabilité (faille)", "Faiblesse d'un logiciel, d'un matériel ou d'une configuration qu'un attaquant peut exploiter pour compromettre un système.", "Biais ou limite de traitement exploitable.", "Le biais d'autorité face à un faux dirigeant.", "Un biais est aussi une heuristique utile : on ne le supprime pas.", "attaque"],
    ["Surface d'attaque", "Ensemble des points par lesquels un système peut être attaqué : services exposés, comptes, interfaces, logiciels installés.", "Ensemble des points exposés d'une personne ou d'un collectif : attention, confiance, décisions, informations publiques.", "L'organigramme et les projets publiés en ligne.", "Elle varie selon la fatigue, la charge et le contexte.", "attaque"],
    ["Exploit", "Programme ou technique qui tire parti d'une vulnérabilité pour obtenir un effet non prévu : exécuter du code, élever ses droits, lire des données.", "Technique qui tire parti d'une faille.", "Fausse urgence combinée à une fausse autorité.", "L'effet est probabiliste, jamais garanti.", "attaque"],
    ["Vecteur", "Voie d'entrée utilisée par une attaque : pièce jointe, lien, clé USB, service exposé sur Internet.", "Canal par lequel arrive la tentative.", "E-mail, appel, réseau social, assistant IA.", "", "attaque"],
    ["Charge utile (payload)", "Partie d'un code malveillant qui réalise l'action recherchée une fois l'accès obtenu : chiffrement, vol de données, porte dérobée.", "Contenu qui produit l'effet recherché.", "Une demande de virement, un narratif, une image.", "", "attaque"],
    ["Patch", "Correctif publié par un éditeur pour supprimer une vulnérabilité ou un défaut.", "Correction ciblée d'une vulnérabilité : environnement, procédure, outil ou entraînement.", "Règle de rappel sur un numéro connu.", "Pas de mise à jour du cerveau : l'entraînement s'érode.", "defense"],
    ["Durcissement (hardening)", "Réduction de la surface d'attaque d'un système : désactiver les services inutiles, fermer les accès superflus, appliquer des configurations sûres.", "Réduction de la surface d'attaque.", "Limiter ce que l'organisation publie sur ses équipes.", "Trop durcir peut nuire à la transparence et à la confiance.", "defense"],
    ["Défense en profondeur", "Superposition de protections indépendantes, de sorte que la défaillance de l'une ne suffise pas à compromettre le système.", "Plusieurs barrières indépendantes.", "Vérification hors canal, double validation, signalement.", "Chaque barrière ajoute de la friction au travail.", "defense"],
    ["Authentification multifacteur", "Vérification d'identité qui combine au moins deux facteurs de nature différente : ce que l'on sait, ce que l'on possède, ce que l'on est.", "Vérifier une information par plusieurs sources ou canaux indépendants.", "Confirmer une demande par un second canal.", "", "defense"],
    ["Moindre privilège", "Principe qui n'accorde à chaque utilisateur, programme ou service que les droits strictement nécessaires à sa tâche.", "Ne déléguer que ce qui est nécessaire, à une personne comme à un assistant.", "Un assistant qui propose sans pouvoir valider.", "", "defense"],
    ["Indicateur de compromission (IOC)", "Trace technique qui signale une compromission possible : adresse IP, nom de domaine, empreinte de fichier, comportement anormal.", "Signal observable d'une tentative de manipulation.", "Demande de secret, changement de canal, urgence injustifiée.", "Un indicateur isolé ne prouve rien.", "analyse"],
    ["Pentest / red team", "Test d'intrusion autorisé (pentest) ou simulation complète d'un adversaire (red team), menés dans un périmètre convenu pour éprouver les défenses.", "Simulation encadrée pour tester la défense.", "Message fictif dans une organisation consentante.", "Exige consentement, cadre éthique et débriefing.", "analyse"],
    ["Bac à sable (sandbox)", "Environnement isolé où l'on exécute un programme ou un fichier suspect sans risque pour le reste du système, afin d'observer son comportement.", "Délai et espace de vérification avant d'agir ou de relayer.", "Attendre avant de partager une image sensible.", "", "defense"],
    ["Journalisation (logs)", "Enregistrement horodaté des événements d'un système (connexions, actions, erreurs), qui permet de détecter une attaque et de reconstituer ce qui s'est passé.", "Traçabilité des échanges et décisions sensibles.", "Carnet des demandes de paiement exceptionnelles.", "À encadrer pour respecter la vie privée.", "analyse"],
    ["Zero-day", "Vulnérabilité inconnue de l'éditeur, ou pas encore corrigée, au moment où elle est exploitée.", "Technique exploitant un mécanisme pas encore documenté ni défendu.", "Nouveaux usages de l'IA conversationnelle.", "Difficile à établir avant coup.", "attaque"],
    ["Déni de service (DoS)", "Attaque qui rend un service indisponible en le saturant de requêtes ; on parle de DDoS quand elle vient de nombreuses machines à la fois.", "Saturation informationnelle : noyer l'attention.", "Flot de contenus qui épuise la capacité de tri (voir DIMA TE0433).", "", "attaque"],
    ["Mouvement latéral", "Progression d'un attaquant d'une machine compromise vers d'autres systèmes du même réseau.", "Propagation d'une demande ou d'un narratif vers l'entourage.", "Un contact compromis relaie le message.", "", "attaque"],
    ["Chaîne d'approvisionnement", "Attaque qui compromet un fournisseur, un logiciel ou une mise à jour de confiance pour atteindre ses clients.", "Sources intermédiaires de confiance dont la compromission contamine l'aval.", "Un média, un prestataire ou un assistant relais.", "", "attaque"],
    ["Score de gravité (CVSS)", "Note de 0 à 10 qui évalue la gravité d'une vulnérabilité selon des critères normalisés : exploitabilité, impact, portée (Common Vulnerability Scoring System).", "Évaluer une faille par sa probabilité d'exploitation, son impact et la facilité de la corriger.", "À construire pour les failles cognitives.", "Exercice de priorisation, pas une mesure objective.", "analyse"],
    ["Rétro-ingénierie", "Analyse d'un programme ou d'un logiciel malveillant pour comprendre son fonctionnement sans disposer de son code source.", "Analyser une campagne pour reconstituer son fonctionnement.", "Étudier un cas public d'hameçonnage ciblé.", "", "analyse"]
  ];
  /* ---------- Fiches issues de la neuropsychologie cognitive ---------- */
  var NP = "Neuropsychologie cognitive";
  var RC = "Exercice fictif, participants informés et consentants, indicateurs agrégés, débriefing, aucun individu désigné, aucun résultat publié pour un groupe de moins de 10 personnes.";
  FICHES.push(
    { id: "visages", ax: ["tra", "ent"], tag: NP, title: "Reconnaissance des visages et familiarité",
      teaser: "Reconnaître un visage n'est pas vérifier une identité.",
      socle: ["La voie visuelle ventrale sert à identifier ce que l'on voit, dont les visages. La reconnaissance d'un visage familier est rapide et largement automatique, alors que l'appariement de visages peu familiers est étonnamment fragile.",
              "Les syndromes cliniques montrent que familiarité et identification sont dissociables : dans la prosopagnosie on ne reconnaît plus les visages familiers, dans le syndrome de Capgras on les reconnaît mais on les juge « faux ». Pour la défense, retenir ceci : le sentiment de familiarité est un signal, pas une preuve."],
      cas: ["Cas publics de visioconférences avec de faux dirigeants (voir la fiche Usurpation de voix et d'image).", "Références à vérifier avant publication : Bruce et Young (1986), modèle de reconnaissance des visages ; Ellis et Young (1990) sur le syndrome de Capgras."],
      blue: [["Signaux", "visage ou voix « bien connus » associés à une demande inhabituelle ; image de mauvaise qualité justifiée par la connexion ; refus d'un geste de vérification simple."],
             ["Contre-mesures", "vérifier l'identité par un canal indépendant plutôt que par la ressemblance ; mot de passe convenu pour les demandes sensibles ; former à la fragilité de l'appariement de visages peu connus ; prévoir des vérifications qui ne reposent pas sur la vue, pour les personnes aveugles ou malvoyantes comme pour tous."]],
      red: [["Hypothèse testée", "les équipes déclenchent-elles une vérification indépendante quand l'interlocuteur paraît familier mais la demande est inhabituelle ?"],
            ["Indicateur", "part des demandes inhabituelles d'un interlocuteur fictif familier qui déclenchent une vérification par un canal indépendant, comparée à celle des mêmes demandes venant d'un inconnu, avec et sans mot de passe convenu pour les demandes sensibles."],
            ["Cadre", RC]],
      pistes: ["Écart entre confiance déclarée et exactitude dans l'appariement de visages.", "Effet de la familiarité sur le seuil de déclenchement d'une vérification."],
      note: "Niveau de preuve : bon pour la fragilité de l'appariement de visages peu familiers. Fiche liée aux cours Cognition visuelle et Neuropsychologie de l'adulte." },

    { id: "memoire-travail", ax: ["tra", "ent"], tag: NP, title: "Mémoire de travail et charge cognitive",
      teaser: "Une tête pleine vérifie moins.",
      socle: ["Le modèle de Baddeley et Hitch décrit un administrateur central qui coordonne des systèmes de stockage temporaire (boucle phonologique, calepin visuo-spatial, tampon épisodique). Ces capacités sont limitées.",
              "Quand la charge augmente (multitâche, bruit, échéance), les ressources disponibles pour les opérations de contrôle, dont la vérification, diminuent. Ce n'est pas un défaut moral : c'est une contrainte de conception."],
      cas: ["Références à vérifier avant publication : Baddeley et Hitch (1974) ; Baddeley (2000) pour le tampon épisodique ; Sweller (1988) pour la charge cognitive."],
      blue: [["Signaux", "erreurs de procédure qui augmentent aux pics d'activité ; messages sensibles traités en parallèle d'autres tâches ; listes de vérification abandonnées sous pression."],
             ["Contre-mesures", "alléger la charge au moment de la décision sensible ; listes de contrôle courtes ; interdire de traiter un virement en multitâche ; externaliser la mémoire (aide visible plutôt que souvenir)."]],
      red: [["Hypothèse testée", "le taux de vérification baisse-t-il quand la même demande arrive pendant une période chargée ?"],
            ["Indicateur", "taux de vérification de la même demande fictive en période calme et en période chargée, avec et sans liste de contrôle."],
            ["Cadre", RC]],
      pistes: ["Comparer taux de vérification en période calme et chargée, à échelle d'équipe.", "Coût en temps d'une procédure de vérification, pour la rendre supportable."],
      note: "Niveau de preuve : robuste pour la limitation de capacité. Fiche liée au cours Modèles de la mémoire." },

    { id: "memoire-sources", ax: ["inf", "tra"], tag: NP, title: "Mémoire de source et faux souvenirs",
      teaser: "On retient le contenu, on oublie d'où il vient.",
      socle: ["La mémoire conserve souvent un contenu en perdant sa source : on se souvient d'une information sans savoir si elle vient d'un proche, d'un média ou d'une rumeur. La répétition rend une affirmation plus familière donc plus crédible (effet de vérité illusoire).",
              "La mémoire est reconstructive : des informations suggérées après coup peuvent s'intégrer au souvenir d'un événement. Défendre revient à rendre la source explicite et traçable."],
      cas: ["Références à vérifier avant publication : Johnson, Hashtroudi et Lindsay (1993) sur la surveillance de la source ; Hasher, Goldstein et Toppino (1977) sur la vérité illusoire ; Loftus et Palmer (1974) sur l'information trompeuse."],
      blue: [["Signaux", "affirmation « connue de tous » dont personne ne retrouve l'origine ; mêmes formules reprises par des sources a priori indépendantes ; réponses de témoins qui se rapprochent après discussion."],
             ["Contre-mesures", "noter la source au moment de la réception ; démentir en posant d'abord le fait vrai plutôt qu'en répétant l'affirmation fausse ; recueillir les témoignages séparément."]],
      red: [["Hypothèse testée", "une cellule de veille retrouve-t-elle l'origine d'une affirmation fictive répétée dans plusieurs canaux ?"],
            ["Indicateur", "part des cellules qui remontent à l'origine de l'affirmation fictive, et délai pour y parvenir, avec et sans la consigne de noter la source à la réception."],
            ["Cadre", RC]],
      pistes: ["Délai au bout duquel les analystes ne savent plus d'où vient une information.", "Efficacité de formats de démenti selon l'ordre fait vrai puis fait faux."],
      note: "Niveau de preuve : robuste pour l'oubli de source et la vérité illusoire. Fiche liée au cours Modèles de la mémoire." },

    { id: "attention-selective", ax: ["tra"], tag: NP, title: "Attention sélective, divisée et cécité attentionnelle",
      teaser: "On ne voit pas ce qu'on ne cherche pas.",
      socle: ["L'attention est un filtre. Quand elle est occupée par une tâche, un événement inattendu et pourtant visible peut passer inaperçu (cécité attentionnelle). Diviser l'attention entre deux tâches coûte en performance.",
              "Posner distingue des réseaux d'alerte, d'orientation et de contrôle exécutif. Pour la veille : ce que l'équipe cherche détermine ce qu'elle trouve."],
      cas: ["Références à vérifier avant publication : Simons et Chabris (1999), expérience du gorille invisible ; Posner et Petersen (1990), réseaux attentionnels."],
      blue: [["Signaux", "angles morts récurrents d'une veille centrée sur des indicateurs précis ; incidents découverts par hasard ; surveillance concentrée sur un seul type de signal."],
             ["Contre-mesures", "rotation des tâches et des regards ; indicateurs larges en plus des indicateurs ciblés ; temps de revue sans objectif préalable ; relecture par quelqu'un d'extérieur."]],
      red: [["Hypothèse testée", "un élément inattendu, introduit dans des données synthétiques pendant une tâche de veille, est-il repéré, et par quelle proportion de l'équipe ?"],
            ["Indicateur", "proportion de l'équipe qui repère l'élément inattendu, avec et sans temps de revue sans objectif préalable."],
            ["Cadre", RC]],
      pistes: ["Proportion d'analystes qui remarquent un élément inattendu selon la charge de la tâche principale.", "Effet de la rotation des tâches sur la détection."],
      note: "Niveau de preuve : robuste pour la cécité attentionnelle en laboratoire. Fiche liée aux fiches Saillance et Inondation informationnelle." },

    { id: "controle-executif", ax: ["tra"], tag: NP, title: "Contrôle exécutif : habitude contre supervision",
      teaser: "Quand le pilote automatique décide à la place du pilote.",
      socle: ["Le modèle de Norman et Shallice oppose un déclenchement automatique de schémas d'action habituels (contention scheduling) à un système attentionnel superviseur qui intervient pour les situations nouvelles ou risquées. Le superviseur coûte de l'effort et s'épuise.",
              "Une procédure sûre doit forcer le passage au mode supervisé aux moments critiques. Après lésion frontale, on observe des erreurs d'action automatiques ou des difficultés de planification (syndrome dysexécutif) : l'illustration clinique du rôle de ce système."],
      cas: ["Références à vérifier avant publication : Norman et Shallice (1986) ; Shallice et Burgess (1991) sur les lésions frontales."],
      blue: [["Signaux", "validation par habitude (« je clique toujours sur oui ») ; procédures si fluides qu'on les exécute sans y penser ; erreurs de routine dans les opérations à fort enjeu."],
             ["Contre-mesures", "introduire une friction volontaire sur l'action irréversible (confirmation explicite, délai, double validation) ; varier légèrement la procédure pour casser l'automatisme ; réserver la vigilance aux décisions critiques."]],
      red: [["Hypothèse testée", "une demande qui ressemble à une routine passe-t-elle sans déclencher le mode vérification ?"],
            ["Indicateur", "taux de vérification d'une demande fictive d'apparence routinière, avec et sans friction volontaire sur l'action irréversible."],
            ["Cadre", RC]],
      pistes: ["Effet d'une confirmation obligatoire sur les erreurs d'action à enjeu.", "Seuil de fatigue d'alerte au-delà duquel les confirmations deviennent des réflexes."],
      note: "Niveau de preuve : modèle classique, discuté dans les détails. Fiche liée au cours Neurologie et neuropsychologie de l'adulte et à la planification de l'action." },

    { id: "meconnaissance", ax: ["tra"], tag: NP, title: "Méconnaissance de sa propre vulnérabilité",
      teaser: "« Moi, je ne me ferais jamais avoir. »",
      socle: ["En neuropsychologie, l'anosognosie désigne l'absence de conscience d'un déficit, par exemple après une lésion pariétale droite. Ce n'est pas du déni psychologique : c'est un trouble de la connaissance de soi.",
              "Par analogie seulement, et sans équivalence clinique, chacun surestime souvent ses capacités de détection. Une personne persuadée d'être à l'abri baisse sa garde, et corrige moins son comportement après une alerte."],
      cas: ["Références à vérifier avant publication : Prigatano et Schacter (1991) sur la conscience du déficit ; Kruger et Dunning (1999), résultats discutés ; études de calibration confiance et exactitude."],
      blue: [["Signaux", "forte confiance déclarée et faible exactitude mesurée ; refus des exercices de sensibilisation (« cela ne me concerne pas ») ; récidive après alerte."],
             ["Contre-mesures", "retour chiffré et personnel sur la détection (calibration confiance et exactitude) ; présenter les cas comme des pièges conçus par des professionnels, pas comme des fautes ; cultiver la déclaration sans reproche."]],
      red: [["Hypothèse testée", "l'écart entre confiance et exactitude se réduit-il après un retour personnalisé ?"],
            ["Indicateur", "écart moyen entre la confiance déclarée et l'exactitude de détection, calculé pour le groupe, comparé entre des participants tirés au sort qui ont reçu le retour personnalisé et d'autres qui ne l'ont pas encore reçu ; données pseudonymisées, retour remis à la seule personne, supprimées après l'analyse."],
            ["Cadre", RC]],
      pistes: ["Mesure de la calibration avec l'outil « Repère la faille ».", "Effet du retour de calibration sur la déclaration d'incidents."],
      note: "Prudence : l'analogie avec l'anosognosie est pédagogique, ne pas l'étendre aux personnes. Fiche liée au cours Perspectives psychopathologiques cognitives." },

    { id: "pragmatique", ax: ["inf", "tra"], tag: NP, title: "Langage et pragmatique : ce qui est dit sans l'être",
      teaser: "L'essentiel d'un message passe par l'implicite.",
      socle: ["Comprendre un énoncé ne se limite pas à décoder les mots : on infère le sens voulu à partir du contexte (pragmatique). Les présupposés et sous-entendus passent plus facilement que les affirmations explicites, car on les examine moins.",
              "Après certaines lésions de l'hémisphère droit ou frontales, la compréhension de l'implicite, de l'ironie ou des métaphores peut être altérée, ce qui montre que l'inférence est une fonction à part entière."],
      cas: ["Références à vérifier avant publication : Grice (1975), maximes conversationnelles ; Ducrot sur le présupposé."],
      blue: [["Signaux", "affirmation essentielle placée en présupposé (« après l'échec de X… ») ; question qui contient sa propre conclusion ; vocabulaire flou qui laisse le lecteur combler."],
             ["Contre-mesures", "reformuler les implicites en énoncés explicites avant de les juger ; se demander ce qui est tenu pour acquis sans être dit ; relire un texte en retirant les adjectifs."]],
      red: [["Hypothèse testée", "des analystes repèrent-ils une affirmation présupposée dans un texte fictif, et la jugent-ils comme s'ils l'avaient lue explicitement ?"],
            ["Indicateur", "part des analystes qui repèrent l'affirmation présupposée, et écart entre leur jugement de cette affirmation sous forme implicite et sous forme explicite, comparés entre un groupe qui a reçu la consigne de reformuler les implicites et un groupe tiré au sort qui ne l'a pas reçue."],
            ["Cadre", RC]],
      pistes: ["Écart de crédibilité entre une affirmation explicite et la même affirmation présupposée.", "Effet d'un exercice de reformulation sur la détection."],
      note: "Niveau de preuve : bon pour le traitement du présupposé. Fiche liée au cours Psychologie du langage et à la fiche Cadrage et agenda." },

    { id: "reseaux-saillance", ax: ["tra"], tag: NP, title: "Réseaux de la saillance et du contrôle",
      teaser: "Ce que l'imagerie dit, et ne dit pas, de l'attention.",
      socle: ["L'imagerie cérébrale décrit des réseaux à grande échelle : un réseau de la saillance (insula antérieure, cortex cingulaire antérieur) qui détecte ce qui est important et fait basculer entre le mode par défaut et le contrôle exécutif.",
              "Utile comme cadre explicatif de la fiche Saillance : ce qui est saillant mobilise le contrôle. Limite à garder en tête : l'imagerie décrit des corrélations de groupe, elle ne permet ni de lire dans les pensées, ni de cibler une personne."],
      cas: ["Références à vérifier avant publication : Seeley et coll. (2007) ; Menon et Uddin (2010) sur le réseau de la saillance."],
      blue: [["Usage", "choisir des mesures comportementales plutôt que physiologiques pour évaluer la charge des analystes ; refuser les promesses de « lecture cérébrale » dans les offres commerciales."],
             ["Contre-mesures", "exiger la réplication et la taille d'échantillon avant toute décision fondée sur de l'imagerie ; interdire la collecte de données neuronales sur le lieu de travail sans cadre légal."]],
      red: [["Hypothèse testée", "des mesures simples de charge perçue (questionnaires) prédisent-elles la baisse de vigilance, sans aucune donnée cérébrale ?"],
            ["Indicateur", "lien statistique entre la charge perçue, mesurée par questionnaire, et la baisse de détection au cours de l'exercice, sans aucune donnée cérébrale ; données pseudonymisées, utilisées pour ajuster la charge de travail, jamais pour sélectionner des personnes."],
            ["Cadre", RC]],
      pistes: ["Comparer mesures subjectives et performances de détection.", "Revue des promesses de neuromarketing et de neuro-influence."],
      note: "Prudence : aucune piste de ciblage neuronal individuel. Fiche liée au cours Imagerie cérébrale et à la fiche Saillance." },

    { id: "declin-fraude", ax: ["ent", "tra"], tag: NP, title: "Déclin cognitif et vulnérabilité à la fraude",
      teaser: "Protéger sans stigmatiser.",
      socle: ["Les troubles neurocognitifs, dont les atteintes frontales et temporales, réduisent la capacité à repérer une tromperie, à résister à la pression et à juger la fiabilité d'une source. La littérature documente un risque accru de fraude financière avec l'âge et le déclin cognitif.",
              "Cela ne rend pas les personnes âgées ou atteintes « manipulables » en général. Cela impose de concevoir des protections qui ne dépendent pas du seul jugement individuel."],
      cas: ["Références à vérifier avant publication : travaux de Spreng et coll. sur la crédulité et le cortex préfrontal ; revue de la fraude financière chez les personnes âgées."],
      blue: [["Signaux", "changements soudains dans la gestion de l'argent ; décisions pressées sous influence d'un tiers ; isolement de la personne vis-à-vis de ses proches."],
             ["Contre-mesures", "délai obligatoire avant tout gros paiement ; personne de confiance désignée ; alertes bancaires sur les opérations inhabituelles ; mesures de protection juridique adaptées ; formations fondées sur la dignité."]],
      red: [["Hypothèse testée", "les procédures de l'organisation (banque, mairie, établissement) détectent-elles un parcours fictif de fraude ?"],
            ["Indicateur", "part des étapes du parcours fictif de fraude interceptées par les procédures (délai, alerte, personne de confiance), et étape à laquelle l'interception a lieu, lors d'un audit entre professionnels."],
            ["Cadre", "Aucun exercice sur des personnes vulnérables : audit des procédures et jeux de rôle entre professionnels informés uniquement."]],
      pistes: ["Évaluation des délais de réflexion obligatoires.", "Parcours de signalement pour les proches et les professionnels."],
      note: "Sujet sensible : lien avec les conditions cliniques de l'onglet Ressources. Fiche liée aux cours Neurologie, vieillissement et victimologie." },

    { id: "decision-emotion", ax: ["ent", "tra"], tag: NP, title: "Décision, émotion et cortex préfrontal ventromédian",
      teaser: "Sans émotion, on ne décide pas mieux.",
      socle: ["L'hypothèse des marqueurs somatiques de Damasio soutient que les émotions guident la décision en signalant l'intérêt ou le danger d'une option. Après une lésion préfrontale ventromédiane, des patients conservent leur intelligence mais décident mal dans la vie réelle.",
              "En situation de peur, de colère ou d'urgence, la décision change de nature : plus rapide, plus centrée sur la menace. Sécuriser une décision revient à séparer le moment de l'émotion du moment de l'engagement."],
      cas: ["Références à vérifier avant publication : Damasio (1994) ; Bechara et coll. (1994) sur la tâche de jeu de l'Iowa, dont l'interprétation est discutée."],
      blue: [["Signaux", "décisions prises à chaud juste après une alerte ou une émotion forte ; demande qui appuie sur la peur ou la honte ; échéances artificielles."],
             ["Contre-mesures", "règle du délai de refroidissement avant l'engagement ; second avis d'un tiers non touché par l'émotion ; scénarios d'entraînement pour automatiser la pause."]],
      red: [["Hypothèse testée", "un délai de refroidissement réduit-il l'engagement sur une demande fictive chargée émotionnellement ?"],
            ["Indicateur", "part des engagements sur une demande fictive à charge émotionnelle modérée (jamais la santé, l'emploi, les proches ni une prime), avec et sans délai de refroidissement."],
            ["Cadre", RC]],
      pistes: ["Effet d'un délai obligatoire sur les décisions à enjeu.", "Indicateurs de décision à chaud dans une organisation."],
      note: "Niveau de preuve : hypothèse influente mais débattue. Fiche liée aux fiches Urgence et Pression temporelle et au cours Cognition sociale et émotions." }
  );

  MAP.push(
    { label: "Reconnaissance des visages et familiarité", fiche: "visages", te: ["TE0332", "TE0422", "TE0312"], note: "Familiarité apparente et autorité d'un visage connu, avec confusion sur la source réelle." },
    { label: "Mémoire de travail et charge cognitive", fiche: "memoire-travail", te: ["TE0433", "TE0424"], note: "Saturation de la capacité de tri et pression temporelle, rapprochement partiel." },
    { label: "Mémoire de source et faux souvenirs", fiche: "memoire-sources", te: ["TE0312", "TE0121", "TE0332"], note: "Confusion de source, illusion de fréquence et exposition répétée." },
    { label: "Attention sélective, divisée et cécité attentionnelle", fiche: "attention-selective", te: ["TE0111", "TE0131", "TE0141", "TE0433"], note: "Ce qui attire l'attention et ce qui la sature. La cécité attentionnelle n'a pas de technique dédiée." },
    { label: "Contrôle exécutif : habitude contre supervision", fiche: "controle-executif", te: ["TE0432", "TE0424"], note: "Statu quo et pression ; les automatismes d'action n'ont pas de technique dédiée." },
    { label: "Méconnaissance de sa propre vulnérabilité", fiche: "meconnaissance", te: ["TE0222"], note: "Rapprochement faible (biais de confirmation) : l'excès de confiance est une lacune possible à signaler." },
    { label: "Langage et pragmatique", fiche: "pragmatique", te: ["TE0142", "TE0143"], note: "L'implicite fonctionne comme un cadre ou une ancre ; rapprochement partiel." },
    { label: "Réseaux de la saillance et du contrôle", fiche: "reseaux-saillance", te: ["TE0111", "TE0132", "TE0131"], note: "Substrat neural de la phase Detect : explication, pas technique." },
    { label: "Déclin cognitif et vulnérabilité à la fraude", fiche: "declin-fraude", te: ["TE0422", "TE0424"], note: "Autorité et pression exploitant une vulnérabilité de contrôle." },
    { label: "Décision, émotion et cortex préfrontal ventromédian", fiche: "decision-emotion", te: ["TE0132", "TE0414", "TE0424"], note: "Peur, négativité et pression temporelle." }
  );

  PSY["Déclin cognitif et vulnérabilité à la fraude"] = [
    ["Troubles neurocognitifs", "documenté", "Le déclin cognitif accroît le risque de fraude financière, quel que soit le levier."],
    ["Atteintes frontales (lésion, démence fronto-temporale)", "plausible", "Altération du jugement, de l'inhibition et du contrôle de l'impulsion."]];
  PSY["Décision, émotion et cortex préfrontal ventromédian"] = [
    ["Lésions préfrontales ventromédianes", "documenté", "Décisions de la vie réelle altérées malgré des tests cognitifs conservés (travaux de Damasio). La marque ne change plus la préférence dans un test de goût (Koenigs et Tranel, 2008, une seule étude), mais la publicité trompeuse convainc davantage (Asp et coll., 2012) : être moins sensible à un biais ne rend pas moins vulnérable."],
    ["Troubles anxieux", "plausible", "La peur amplifie la décision centrée sur la menace."]];
  PSY["Contrôle exécutif : habitude contre supervision"] = [
    ["Syndrome dysexécutif (atteinte frontale)", "documenté", "Erreurs d'action automatiques, difficulté de planification."],
    ["TDAH", "plausible", "Difficulté à inhiber une réponse habituelle."]];
  PSY["Méconnaissance de sa propre vulnérabilité"] = [
    ["Anosognosie (atteinte pariétale droite)", "documenté", "Absence de conscience d'un déficit. Analogie pédagogique seulement : ne pas étendre aux personnes."]];
  PSY["Mémoire de source et faux souvenirs"] = [
    ["Amnésie et troubles de la mémoire de source (atteinte frontale)", "documenté", "Confabulation et confusion sur l'origine des souvenirs."]];
  GLOSS.push(
    ["Administrateur central", "Composante du modèle de mémoire de travail de Baddeley qui coordonne l'attention et les systèmes de stockage temporaire."],
    ["Système attentionnel superviseur (SAS)", "Système du modèle de Norman et Shallice qui intervient dans les situations nouvelles ou risquées, au-dessus des schémas d'action automatiques."],
    ["Cécité attentionnelle", "Fait de ne pas percevoir un événement visible mais inattendu quand l'attention est mobilisée ailleurs."],
    ["Prosopagnosie", "Incapacité à reconnaître des visages familiers, avec une perception des visages par ailleurs préservée."],
    ["Syndrome de Capgras", "Conviction qu'un proche a été remplacé par un sosie, malgré la reconnaissance de ses traits."],
    ["Anosognosie", "Absence de conscience d'un déficit propre, d'origine neurologique."],
    ["Mémoire de source", "Capacité à retrouver l'origine d'une information ou d'un souvenir."],
    ["Pragmatique", "Étude de ce que l'on comprend d'un énoncé au-delà de ses mots, selon le contexte (présupposés, sous-entendus)."]
  );

  PSY["Reconnaissance des visages et familiarité"] = [
    ["Prosopagnosie (agnosie des visages)", "documenté", "Les visages familiers ne sont plus reconnus : la personne s'appuie sur la voix, la démarche, le contexte. Un canal de vérification visuel est inopérant, la voix devient critique."],
    ["Syndrome de Capgras", "documenté", "Reconnaissance des traits sans sentiment de familiarité : montre que familiarité et identification sont dissociables. Aucun lien avec la manipulabilité."],
    ["Cécité (périphérique ou corticale)", "hypothèse", "Le visage ne peut servir de preuve d'identité : l'usurpation vocale (vishing, voix synthétique) pèse davantage. Aucune étude citée : à tester, sans en conclure une moindre capacité de jugement."]];
  PSY["Attention sélective, divisée et cécité attentionnelle"] = [
    ["Héminégligence", "documenté", "Méconnaissance d'un côté de l'espace ou du corps, souvent le gauche après lésion pariétale droite : angle mort massif, illustre l'attention comme filtre."],
    ["Syndrome de Balint et simultanagnosie", "documenté", "Impossibilité de percevoir plus d'un élément à la fois : scène saisie par morceaux."],
    ["TDAH", "plausible", "Distractibilité et difficulté à maintenir l'attention sur une tâche de veille."]];
  PSY["Méconnaissance de sa propre vulnérabilité"].push(["Syndrome d'Anton (cécité corticale niée)", "documenté", "Un patient aveugle affirme voir et justifie ses erreurs : forme visuelle d'anosognosie. Analogie pédagogique seulement."]);
  /* ---------- Fiches issues de programmes consultés en ligne ---------- */
  FICHES.push(
    { id: "theorie-esprit", ax: ["pou", "tra"], tag: NP, title: "Théorie de l'esprit et lecture des intentions",
      teaser: "Deviner ce que l'autre veut, et se tromper sur ce qu'il veut vraiment.",
      socle: ["La théorie de l'esprit est la capacité d'attribuer des croyances, des désirs et des intentions à autrui. Elle permet la coopération, mais aussi l'erreur : on prête facilement de bonnes intentions à un interlocuteur qui se montre aimable ou cohérent.",
              "Un prétexte crédible est une histoire dans laquelle l'interlocuteur joue un rôle compréhensible. Plus le rôle paraît plausible, moins on questionne ses intentions."],
      cas: ["Références à vérifier avant publication : Premack et Woodruff (1978) ; Baron-Cohen et coll. sur la théorie de l'esprit ; programmes de cognition sociale cités dans les maquettes consultées."],
      blue: [["Signaux", "histoire qui explique d'avance chaque objection ; interlocuteur qui s'adapte aux réponses en gardant sa demande ; intérêt personnel de l'émetteur absent du récit."],
             ["Contre-mesures", "se demander « que gagne l'émetteur si j'accepte ? » ; séparer la crédibilité du récit de la légitimité de la demande ; vérifier le rôle annoncé par un canal indépendant."]],
      red: [["Hypothèse testée", "les équipes questionnent-elles l'intérêt de l'émetteur quand le récit est cohérent et poli ?"],
            ["Indicateur", "part des réponses qui interrogent l'intérêt de l'émetteur ou vérifient son rôle par un canal indépendant, pour un récit fictif cohérent et poli comparé à un récit maladroit, avec et sans la consigne de se demander ce que gagne l'émetteur."],
            ["Cadre", RC]],
      pistes: ["Écart entre crédibilité du récit et vérification de la demande.", "Entraînement à la question « à qui profite la demande ? »."],
      note: "Niveau de preuve : bon pour le cadre général, à préciser pour les applications. Fiche liée à Pretexting et canulars." },

    { id: "saillance-aberrante", ax: ["tra"], tag: NP, title: "Saillance aberrante et traitement des signaux ambigus",
      teaser: "Quand tout semble signifier quelque chose.",
      socle: ["Une hypothèse clinique décrit la psychose comme un état où des stimuli sans importance prennent une signification excessive (saillance aberrante). Sur un plan plus large, tout le monde voit parfois des liens là où il n'y en a pas, surtout sous stress, fatigue ou surcharge.",
              "Pour la défense, retenir ceci : dans un environnement saturé de signaux ambigus, la tendance à relier des éléments sans lien augmente. Les récits conspirationnistes s'en nourrissent, et la réponse n'est ni la moquerie ni la contradiction frontale."],
      cas: ["Référence à vérifier avant publication : Kapur (2003), saillance aberrante et psychose."],
      blue: [["Signaux", "multiplication de liens entre événements disparates ; méfiance croissante envers toute source ; fatigue informationnelle marquée."],
             ["Contre-mesures", "ralentir et réduire le volume d'informations ambiguës ; communication de crise claire, stable et cohérente ; orienter vers un soutien adapté plutôt que démentir en bloc."]],
      red: [["Hypothèse testée", "une organisation maintient-elle une communication claire quand un flux de signaux ambigus circule autour d'un événement fictif ?"],
            ["Indicateur", "délai avant la première communication claire de l'organisation, et nombre de messages contradictoires qu'elle émet pendant l'exercice."],
            ["Cadre", "Aucun exercice sur des personnes concernées par des troubles psychiques : jeux de données synthétiques et exercice de communication entre professionnels informés."]],
      pistes: ["Qualité de la communication de crise face aux rumeurs.", "Indicateurs de fatigue informationnelle."],
      note: "Sujet sensible : ne pas stigmatiser. Ne signifie pas que les personnes concernées sont plus manipulables. Fiche liée à Détournement de la saillance." },

    { id: "apprentissage-oubli", ax: ["tra"], tag: NP, title: "Apprentissage, oubli et durée de vie d'un patch",
      teaser: "Un patch cognitif a une date de péremption.",
      socle: ["Ce qu'on apprend s'oublie : la courbe de l'oubli est rapide au début, puis ralentit. Réviser à intervalles espacés et se tester soi-même consolide mieux qu'une longue séance unique. Les mêmes mécanismes devraient valoir pour une formation à la vigilance, mais cette transposition n'est pas mesurée.",
              "La neuroplasticité explique que l'entraînement modifie les réponses, mais pas qu'une session ponctuelle suffit. Un patch d'entraînement doit être répété, mesuré et renouvelé, et la remédiation cognitive en neuropsychologie offre un modèle d'entraînement progressif."],
      cas: ["Références à vérifier avant publication : Ebbinghaus (1885), courbe de l'oubli ; Cepeda et coll. (2006) sur l'effet d'espacement ; Roediger et Karpicke (2006) sur le test comme apprentissage."],
      blue: [["Signaux", "effet d'une formation qui s'efface en quelques semaines ; mêmes erreurs avant et après la session ; participants qui oublient les procédures pourtant enseignées."],
             ["Contre-mesures", "répétitions espacées et brèves ; quiz de rappel plutôt que relecture ; scénarios variés ; mesure de l'efficacité dans le temps ; réalité virtuelle et jeux sérieux possibles, à évaluer plutôt qu'à supposer efficaces."]],
      red: [["Hypothèse testée", "le taux de détection mesuré juste après une sensibilisation est-il encore présent plusieurs semaines plus tard ?"],
            ["Indicateur", "taux de détection mesuré juste après la sensibilisation puis plusieurs semaines plus tard, avec et sans rappels espacés."],
            ["Cadre", RC]],
      pistes: ["Courbe de rétention d'une procédure de vérification dans une équipe.", "Comparer formation unique et rappels espacés."],
      note: "Niveau de preuve : robuste pour l'espacement et le test. Deux grandes études en entreprise (Lain et coll. 2022, Ho et coll. 2025) ne trouvent pas d'effet protecteur notable de la formation seule, voire un effet défavorable (Lain et coll. 2022). Fiche liée aux patchs d'entraînement du Lexique." },

    { id: "stress-executif", ax: ["ent", "tra"], tag: NP, title: "Stress, émotion et contrôle exécutif",
      teaser: "Sous stress, le contrôle recule et l'automatisme avance.",
      socle: ["Un stress aigu mobilise l'organisme pour réagir vite. Dans le même temps, les fonctions du cortex préfrontal (planification, inhibition, mémoire de travail) fonctionnent moins bien et les réponses habituelles prennent le dessus.",
              "Un stress prolongé ou traumatique modifie aussi la mémoire et la vigilance. Les défenses doivent donc fonctionner même quand la personne n'est pas dans de bonnes conditions."],
      cas: ["Référence à vérifier avant publication : Arnsten (2009) sur le stress et le fonctionnement préfrontal."],
      blue: [["Signaux", "erreurs de procédure pendant les crises ; décisions plus rigides ; fatigue accumulée dans les équipes de permanence."],
             ["Contre-mesures", "procédures qui n'exigent pas de raisonnement complexe en crise (listes courtes) ; entraînement qui rend les gestes automatiques ; relais et récupération ; soutien après incident, sans reproche."]],
      red: [["Hypothèse testée", "les procédures de crise restent-elles appliquées quand le contexte de l'exercice est chargé en pression ?"],
            ["Indicateur", "part des étapes de la procédure de crise appliquées en contexte calme et en contexte chargé, avec et sans liste courte."],
            ["Cadre", RC + " Pas de stress induit au-delà du réaliste, arrêt possible à tout moment."]],
      pistes: ["Comparer l'application d'une liste courte et d'une procédure longue en situation chargée.", "Effet du relais sur les erreurs de permanence."],
      note: "Niveau de preuve : robuste pour l'effet du stress aigu sur le contrôle exécutif. Fiche liée à Contrôle exécutif et Urgence." },

    { id: "psychometrie", ax: ["tra"], tag: "Mesure", title: "Psychométrie : fiabilité et validité d'un exercice",
      teaser: "Mesurer sans se raconter d'histoires.",
      socle: ["Un test neuropsychologique est évalué sur sa fiabilité (résultats stables), sa validité (il mesure bien ce qu'il prétend) et ses normes de référence. Un bilan combine plusieurs épreuves et l'observation clinique.",
              "Pour ce site, la leçon s'applique aux exercices et aux quiz : peu d'items, aucune norme, aucun contrôle des conditions de passation donnent un indicateur pédagogique, pas une mesure."],
      cas: ["Références à vérifier avant publication : Anastasi et Urbina, Psychological testing ; maquettes consultées (évaluation cognitive, bilan neuropsychologique)."],
      blue: [["Signaux", "conclusions tirées d'un seul exercice ; indicateurs d'efficacité sans groupe de comparaison ; changements attribués à la sensibilisation alors que d'autres facteurs ont varié."],
             ["Contre-mesures", "plusieurs mesures indépendantes ; groupe de comparaison quand c'est possible ; taille d'échantillon annoncée ; distinguer taux de clics, signalements et comportements réels."]],
      red: [["Hypothèse testée", "les résultats d'un exercice de simulation sont-ils reproduits lors d'une seconde passation comparable ?"],
            ["Indicateur", "concordance des résultats par équipe d'au moins 10 personnes entre deux passations comparables, et cohérence entre plusieurs mesures indépendantes (clics, signalements, comportements observés)."],
            ["Cadre", RC]],
      pistes: ["Fiabilité test-retest d'un exercice de détection.", "Indicateurs combinés (signalement, délai, vérification) plutôt qu'un score unique."],
      note: "Fiche méthodologique, liée aux cours Traitement de données et Méthodologie cognitive, et à l'outil « Repère la faille »." },

    { id: "perception-reconstruction", ax: ["tra", "inf"], tag: NP, title: "Perception visuelle : voir est une reconstruction",
      teaser: "Le cerveau complète ce que l'œil ne donne pas.",
      socle: ["La perception visuelle n'enregistre pas le monde : elle construit une interprétation en plusieurs étapes, de l'organisation des formes à la reconnaissance de l'objet. L'agnosie aperceptive (difficulté à organiser la forme) et l'agnosie associative (forme perçue mais sens perdu) montrent ces étapes.",
              "Pour la défense, retenir ceci : les illusions, les ancrages d'échelle et les graphiques truqués exploitent ces constructions. Une image ou un graphique impose un cadre avant qu'on ait réfléchi."],
      cas: ["Références à vérifier avant publication : Marr (1982) ; Humphreys et Riddoch (1987) sur les agnosies ; littérature sur les graphiques trompeurs (axes tronqués, échelles)."],
      blue: [["Signaux", "axes tronqués ou échelles différentes entre graphiques comparés ; recadrage d'image qui change le sens ; couleur ou taille qui hiérarchise sans justification."],
             ["Contre-mesures", "vérifier les axes et l'origine ; comparer avec l'image complète ; traduire le graphique en phrase chiffrée ; adopter des gabarits de visualisation honnêtes ; ne pas fonder une vérification sur la seule vue : prévoir une version accessible (texte, audio, tiers) et des couleurs lisibles par les personnes daltoniennes."]],
      red: [["Hypothèse testée", "des lecteurs repèrent-ils un axe tronqué dans un graphique fictif, et corrigent-ils leur conclusion ?"],
            ["Indicateur", "part des lecteurs qui repèrent l'axe tronqué et corrigent leur conclusion, comparée entre un groupe qui a reçu la consigne de traduire le graphique en phrase chiffrée et un groupe tiré au sort qui ne l'a pas reçue."],
            ["Cadre", RC]],
      pistes: ["Taux de détection d'un axe tronqué selon la charge du lecteur.", "Effet d'une liste de contrôle de lecture d'un graphique.", "Accessibilité des procédures de vérification pour les personnes aveugles, malvoyantes ou daltoniennes."],
      note: "Niveau de preuve : bon pour les mécanismes perceptifs. Fiche liée à Cognition visuelle et Reconnaissance des visages." },

    { id: "recompense-renforcement", ax: ["inf", "tra"], tag: NP, title: "Récompense et renforcement variable",
      teaser: "Pourquoi un fil d'actualité donne envie de continuer.",
      socle: ["Le système de récompense apprend à partir des écarts entre ce qui est attendu et ce qui arrive (erreur de prédiction). Une récompense qui tombe de façon imprévisible entretient plus durablement un comportement qu'une récompense régulière : c'est le renforcement variable.",
              "Un produit numérique peut combiner nouveauté, imprévisibilité et retour social et favoriser un usage prolongé. Cette fiche sert à reconnaître ces mécanismes pour les auditer, pas à les optimiser."],
      cas: ["Références à vérifier avant publication : Schultz, Dayan et Montague (1997), erreur de prédiction de la récompense ; Skinner sur les programmes de renforcement ; littérature sur les conduites addictives et l'usage des écrans, dont les effets sont discutés."],
      blue: [["Signaux", "défilement sans fin, notifications variables, récompenses sociales irrégulières ; temps d'usage supérieur à l'intention ; difficulté à arrêter."],
             ["Contre-mesures", "pauses et limites par défaut ; suppression des notifications non essentielles ; audit de conception d'un produit (grille de mécanismes de rétention) ; éducation aux mécanismes."]],
      red: [["Hypothèse testée", "une équipe produit ou de veille identifie-t-elle les mécanismes de rétention présents dans un produit fictif décrit sur papier ?"],
            ["Indicateur", "part des mécanismes de rétention du produit fictif que l'équipe identifie, rapportée à ceux que la grille d'audit établie à l'avance permet de relever."],
            ["Cadre", "Audit sur un produit fictif. Aucune expérimentation sur des utilisateurs et aucun réglage de paramètres pour maximiser l'engagement."]],
      pistes: ["Grille d'audit des mécanismes de rétention.", "Comparer l'effet de limites d'usage par défaut et par choix."],
      note: "Les effets sur la santé mentale sont discutés. Prudence sur les comparaisons avec les substances. Fiche liée à Détournement de la saillance." }
  );

  MAP.push(
    { label: "Théorie de l'esprit et lecture des intentions", fiche: "theorie-esprit", te: ["TE0422", "TE0426"], note: "Prétexte crédible et réciprocité ; rapprochement partiel." },
    { label: "Saillance aberrante et traitement des signaux ambigus", fiche: "saillance-aberrante", te: ["TE0131", "TE0111"], note: "Bizarrerie et disponibilité ; la saillance aberrante est un concept clinique, sans technique dédiée." },
    { label: "Apprentissage, oubli et durée de vie d'un patch", fiche: "apprentissage-oubli", te: [], note: "Fiche défensive : aucune technique DIMA, relève de la durabilité des contre-mesures." },
    { label: "Stress, émotion et contrôle exécutif", fiche: "stress-executif", te: ["TE0424", "TE0132"], note: "Pression temporelle et négativité." },
    { label: "Psychométrie : fiabilité et validité d'un exercice", fiche: "psychometrie", te: [], note: "Fiche méthodologique : aucune technique DIMA." },
    { label: "Perception visuelle : voir est une reconstruction", fiche: "perception-reconstruction", te: ["TE0142", "TE0143", "TE0152"], note: "Ancrage, contraste et seuils de perception des différences." },
    { label: "Récompense et renforcement variable", fiche: "recompense-renforcement", te: ["TE0131", "TE0332", "TE0414"], note: "Nouveauté, exposition répétée et peur de rater ; rapprochement partiel." }
  );
  PSY["Saillance aberrante et traitement des signaux ambigus"] = [
    ["Troubles du spectre psychotique", "documenté", "Hypothèse de la saillance aberrante (Kapur). À ne pas généraliser aux personnes."]];
  PSY["Perception visuelle : voir est une reconstruction"] = [
    ["Schizophrénie", "documenté", "L'illusion du masque creux est moins perçue, surtout en phase aiguë (Dima et coll., 2009) : la perception s'appuie moins sur ce que l'on s'attend à voir. Ce n'est pas une protection : les conclusions hâtives sont plus fréquentes (méta-analyse de Dudley et coll., 2016)."],
    ["Agnosies visuelles (aperceptive, associative)", "documenté", "La forme est vue sans être organisée, ou organisée sans que le sens de l'objet soit reconnu : illustre les étapes de la reconstruction."],
    ["Cécité corticale et syndrome d'Anton", "documenté", "Après une lésion occipitale bilatérale, certains patients nient leur cécité : anosognosie visuelle, voir la fiche sur la méconnaissance de sa propre vulnérabilité."],
    ["Vision aveugle (blindsight)", "documenté", "Capacités visuelles résiduelles sans expérience consciente (lésion du cortex visuel primaire). Ne pas en déduire une influence « subliminale » efficace : ce lien n'est pas établi."],
    ["Syndrome de Charles Bonnet", "documenté", "Hallucinations visuelles lucides chez des personnes malvoyantes : la perception est construite même sans entrée visuelle."],
    ["Achromatopsie et daltonismes", "documenté", "Les graphiques qui reposent sur la couleur seule sont illisibles pour certaines personnes : question d'accessibilité, pas de vulnérabilité."],
    ["Cécité (périphérique ou corticale)", "hypothèse", "La vérification visuelle (visage, document, graphique) est impossible : la voix devient le canal central, donc l'usurpation vocale pèse davantage. Aucune étude citée : à tester, sans en conclure que les personnes aveugles sont plus manipulables."]];
  PSY["Récompense et renforcement variable"] = [
    ["Addictions comportementales", "plausible", "Usage excessif de produits numériques ; classification et seuils discutés."],
    ["TDAH", "plausible", "Sensibilité à la nouveauté et difficulté à différer une récompense."]];
  PSY["Stress, émotion et contrôle exécutif"] = [
    ["État de stress post-traumatique", "documenté", "Altérations de la mémoire, de la vigilance et du contrôle des émotions."]];
  PSY["Mémoire de travail et charge cognitive"] = [
    ["TDAH", "documenté", "Déficits de mémoire de travail fréquents : une demande qui empile consignes et urgence sature plus vite la capacité de tri."],
    ["Schizophrénie", "documenté", "Le déficit de mémoire de travail est l'un des plus constants de la maladie."],
    ["Troubles neurocognitifs (dont maladie d'Alzheimer)", "documenté", "Capacité et contrôle attentionnel réduits tôt : les procédures doivent rester courtes et écrites."],
    ["Dépression", "plausible", "Les ruminations occupent une part de la mémoire de travail disponible."]];
  PSY["Langage et pragmatique"] = [
    ["Lésions de l'hémisphère droit", "documenté", "Difficulté à saisir l'implicite, l'ironie et les sous-entendus, avec un langage formel préservé."],
    ["Schizophrénie", "documenté", "Difficultés pragmatiques bien décrites : métaphores, ironie et sous-entendus pris au pied de la lettre."],
    ["Trouble du spectre de l'autisme", "hypothèse", "Par analogie seulement : l'implicite agit comme un cadre, et l'effet de cadrage est en moyenne réduit chez de petits groupes d'adultes autistes (De Martino et coll., 2008). Aucune étude citée ne teste la compréhension de l'implicite. Cela ne protège pas des escroqueries (Griffiths et coll., 2019). Pour tous : reformuler les implicites en énoncés explicites, la contre-mesure de cette fiche."]];
  PSY["Réseaux de la saillance et du contrôle"] = [
    ["Démence fronto-temporale (variant comportemental)", "documenté", "Le réseau de la saillance est atteint tôt (travaux de Seeley) : ce qui devrait alerter ne capte plus l'attention."],
    ["Troubles du spectre psychotique", "plausible", "Fonctionnement altéré du réseau de la saillance décrit en imagerie (modèle du triple réseau de Menon)."],
    ["Troubles anxieux", "plausible", "Biais attentionnel vers la menace bien établi ; le rôle du réseau de la saillance reste discuté."],
    ["Dépression", "plausible", "Réseau du mode par défaut plus actif : l'attention reste tournée vers les pensées internes."]];
  PSY["Théorie de l'esprit et lecture des intentions"] = [
    ["Schizophrénie", "documenté", "Déficits de théorie de l'esprit établis par méta-analyse (Sprong et coll., 2007)."],
    ["Démence fronto-temporale (variant comportemental)", "documenté", "Atteinte précoce de la cognition sociale : une intention trompeuse est plus difficile à repérer."],
    ["Trouble du spectre de l'autisme", "documenté", "Différences dans l'attribution de fausses croyances (Baron-Cohen et coll., 1985). L'hypothèse de la double empathie (Milton, 2012) rappelle que la difficulté de compréhension est réciproque."]];
  PSY["Apprentissage, oubli et durée de vie d'un patch"] = [
    ["Syndromes amnésiques (lésion hippocampique, syndrome de Korsakoff)", "documenté", "Les consignes nouvelles ne se consolident pas, mais l'apprentissage procédural est souvent préservé : une routine répétée tient là où une formation s'oublie."],
    ["Maladie d'Alzheimer", "documenté", "Oubli accéléré des informations récentes : préférer les aides externes, les rappels fréquents et l'apprentissage sans erreur à une formation ponctuelle."],
    ["Dépression", "plausible", "Encodage des informations nouvelles moins efficace : les rappels espacés comptent davantage."]];
  PSY["Psychométrie : fiabilité et validité d'un exercice"] = [
    ["Troubles neurocognitifs", "documenté", "Effets plancher et fatigue : un exercice conçu pour la population générale mesure mal, et un score individuel ne doit pas être interprété."],
    ["Troubles anxieux (anxiété d'évaluation)", "documenté", "L'anxiété de test abaisse les performances : un score bas peut refléter le stress de la mesure plus que la vigilance."],
    ["Troubles spécifiques des apprentissages (dyslexie)", "plausible", "Un exercice écrit et chronométré mesure aussi la vitesse de lecture : prévoir des adaptations pour ne pas fausser le résultat."]];
  GLOSS.push(
    ["Saillance aberrante", "Hypothèse selon laquelle des stimuli sans importance prennent une signification excessive, notamment dans la psychose."],
    ["Théorie de l'esprit", "Capacité d'attribuer des croyances et des intentions à autrui."],
    ["Renforcement variable", "Programme où la récompense arrive de façon imprévisible, ce qui entretient durablement un comportement."],
    ["Effet d'espacement", "Meilleure rétention quand les révisions sont réparties dans le temps plutôt que regroupées."],
    ["Agnosie aperceptive / associative", "Difficulté à organiser la forme perçue / forme perçue mais sens de l'objet perdu."],
    ["Fiabilité et validité", "Stabilité des résultats d'un test et capacité à mesurer ce qu'il prétend mesurer."]
  );
  /* ---------- Références : [citation, lien vu, vérifiée (1) ou détails à contrôler (0)] ---------- */
  var D = "https://doi.org/";
  var R = {
    simons1999: ["Simons, D. J., & Chabris, C. F. (1999). Gorillas in our midst: Sustained inattentional blindness for dynamic events. Perception, 28(9), 1059–1074.", D + "10.1068/p281059", 1],
    posner1990: ["Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. Annual Review of Neuroscience, 13, 25–42.", "https://pubmed.ncbi.nlm.nih.gov/2183676/", 1],
    baddeley1974: ["Baddeley, A. D., & Hitch, G. (1974). Working memory. In G. H. Bower (Ed.), The Psychology of Learning and Motivation (Vol. 8, pp. 47–89). Academic Press.", D + "10.1016/S0079-7421(08)60452-1", 1],
    baddeley2000: ["Baddeley, A. (2000). The episodic buffer: A new component of working memory? Trends in Cognitive Sciences, 4(11), 417–423.", D + "10.1016/S1364-6613(00)01538-2", 1],
    sweller1988: ["Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285.", "https://dc2.philarchive.org/rec/SWECLD", 1],
    cowan2001: ["Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences, 24(1), 87–114.", D + "10.1017/S0140525X01003922", 1],
    miller1956: ["Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychological Review, 63(2), 81–97.", D + "10.1037/h0043158", 1],
    johnson1993: ["Johnson, M. K., Hashtroudi, S., & Lindsay, D. S. (1993). Source monitoring. Psychological Bulletin, 114(1), 3–28.", D + "10.1037/0033-2909.114.1.3", 1],
    hasher1977: ["Hasher, L., Goldstein, D., & Toppino, T. (1977). Frequency and the conference of referential validity. Journal of Verbal Learning and Verbal Behavior, 16(1), 107–112.", D + "10.1016/S0022-5371(77)80012-1", 1],
    loftus1974: ["Loftus, E. F., & Palmer, J. C. (1974). Reconstruction of automobile destruction: An example of the interaction between language and memory. Journal of Verbal Learning and Verbal Behavior, 13(5), 585–589.", D + "10.1016/s0022-5371(74)80011-3", 1],
    norman1986: ["Norman, D. A., & Shallice, T. (1986). Attention to action: Willed and automatic control of behavior. In R. J. Davidson, G. E. Schwartz, & D. Shapiro (Eds.), Consciousness and Self-Regulation (Vol. 4, pp. 1–18). Plenum Press. (DOI du livre.)", D + "10.1007/978-1-4757-0629-1", 1],
    shallice1991: ["Shallice, T., & Burgess, P. W. (1991). Deficits in strategy application following frontal lobe damage in man. Brain, 114(2), 727–741.", "https://pubmed.ncbi.nlm.nih.gov/2043945/", 1],
    stroop1935: ["Stroop, J. R. (1935). Studies of interference in serial verbal reactions. Journal of Experimental Psychology, 18(6), 643–662.", "https://psychclassics.yorku.ca/Stroop/", 1],
    bruce1986: ["Bruce, V., & Young, A. (1986). Understanding face recognition. British Journal of Psychology, 77(3), 305–327.", D + "10.1111/j.2044-8295.1986.tb02199.x", 1],
    ellis1990: ["Ellis, H. D., & Young, A. W. (1990). Accounting for delusional misidentifications. British Journal of Psychiatry, 157(2), 239–248.", D + "10.1192/bjp.157.2.239", 1],
    prigatano1991: ["Prigatano, G. P., & Schacter, D. L. (Eds.). (1991). Awareness of deficit after brain injury: Clinical and theoretical issues. Oxford University Press.", "https://dc2.philarchive.org/rec/PRIAOD", 1],
    kruger1999: ["Kruger, J., & Dunning, D. (1999). Unskilled and unaware of it: How difficulties in recognizing one's own incompetence lead to inflated self-assessments. Journal of Personality and Social Psychology, 77(6), 1121–1134. (Résultats discutés : l'effet pourrait être en partie un artefact statistique.)", D + "10.1037/0022-3514.77.6.1121", 1],
    grice1975: ["Grice, H. P. (1975). Logic and conversation. In P. Cole & J. L. Morgan (Eds.), Syntax and Semantics, Vol. 3: Speech Acts (pp. 41–58). Academic Press.", null, 1],
    seeley2007: ["Seeley, W. W., Menon, V., Schatzberg, A. F., Keller, J., Glover, G. H., Kenna, H., Reiss, A. L., & Greicius, M. D. (2007). Dissociable intrinsic connectivity networks for salience processing and executive control. Journal of Neuroscience, 27(9), 2349–2356.", D + "10.1523/JNEUROSCI.5587-06.2007", 1],
    menon2010: ["Menon, V., & Uddin, L. Q. (2010). Saliency, switching, attention and control: A network model of insula function. Brain Structure & Function, 214(5–6), 655–667.", D + "10.1007/s00429-010-0262-0", 1],
    asp2012: ["Asp, E., Manzel, K., Koestner, B., Cole, C. A., Denburg, N. L., & Tranel, D. (2012). A neuropsychological test of belief and doubt: Damage to ventromedial prefrontal cortex increases credulity for misleading advertising. Frontiers in Neuroscience, 6, 100.", D + "10.3389/fnins.2012.00100", 1],
    spreng2016: ["Spreng, R. N., Karlawish, J., & Marson, D. C. (2016). Cognitive, social, and neural determinants of diminished decision-making and financial exploitation risk in aging and dementia: A review and new model. Journal of Elder Abuse & Neglect, 28(4–5), 320–344.", D + "10.1080/08946566.2016.1237918", 1],
    boyle2019: ["Boyle, P. A., Yu, L., Schneider, J. A., Wilson, R. S., & Bennett, D. A. (2019). Scam awareness related to incident Alzheimer dementia and mild cognitive impairment: A prospective cohort study. Annals of Internal Medicine, 170(10), 702–709.", D + "10.7326/M18-2711", 1],
    damasio1994: ["Damasio, A. R. (1994). Descartes' error: Emotion, reason, and the human brain. G. P. Putnam's Sons. Trad. fr. : L'erreur de Descartes : la raison des émotions (1995), Odile Jacob.", null, 1],
    bechara1994: ["Bechara, A., Damasio, A. R., Damasio, H., & Anderson, S. W. (1994). Insensitivity to future consequences following damage to human prefrontal cortex. Cognition, 50(1–3), 7–15.", "https://pubmed.ncbi.nlm.nih.gov/8039375/", 1],
    premack1978: ["Premack, D., & Woodruff, G. (1978). Does the chimpanzee have a theory of mind? Behavioral and Brain Sciences, 1(4), 515–526.", D + "10.1017/S0140525X00076512", 1],
    baroncohen1985: ["Baron-Cohen, S., Leslie, A. M., & Frith, U. (1985). Does the autistic child have a « theory of mind » ? Cognition, 21(1), 37–46.", D + "10.1016/0010-0277(85)90022-8", 1],
    kapur2003: ["Kapur, S. (2003). Psychosis as a state of aberrant salience: A framework linking biology, phenomenology, and pharmacology in schizophrenia. American Journal of Psychiatry, 160(1), 13–23.", "https://ajp.psychiatryonline.org/cgi/content/full/160/1/13", 1],
    ebbinghaus1885: ["Ebbinghaus, H. (1885). Über das Gedächtnis. Duncker & Humblot. Trad. angl. (1913) : Memory: A contribution to experimental psychology (Ruger & Bussenius).", "https://psychclassics.yorku.ca/Ebbinghaus/memorypref.htm", 1],
    cepeda2006: ["Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354–380.", D + "10.1037/0033-2909.132.3.354", 1],
    roediger2006: ["Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255.", D + "10.1111/j.1467-9280.2006.01693.x", 1],
    arnsten2009: ["Arnsten, A. F. T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience, 10(6), 410–422.", "https://pubmed.ncbi.nlm.nih.gov/19455173/", 1],
    marr1982: ["Marr, D. (1982). Vision: A computational investigation into the human representation and processing of visual information. W. H. Freeman (réédition MIT Press, 2010).", null, 1],
    humphreys1987: ["Humphreys, G. W., & Riddoch, M. J. (1987). To see but not to see: A case study of visual agnosia. Londres : Lawrence Erlbaum Associates (réédition Psychology Press). ISBN 0-86377-065-7.", "https://www.routledge.com/products/9780863770654", 1],
    pandey2015: ["Pandey, A. V., Rall, K., Satterthwaite, M. L., Nov, O., & Bertini, E. (2015). How deceptive are deceptive visualizations? An empirical analysis of common distortion techniques. Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems (CHI '15), 1469–1478.", D + "10.1145/2702123.2702608", 1],
    schultz1997: ["Schultz, W., Dayan, P., & Montague, P. R. (1997). A neural substrate of prediction and reward. Science, 275(5306), 1593–1599.", D + "10.1126/science.275.5306.1593", 1],
    ferster1957: ["Ferster, C. B., & Skinner, B. F. (1957). Schedules of reinforcement. Appleton-Century-Crofts.", "https://search.worldcat.org/oclc/4596140", 1],
    anastasi1997: ["Anastasi, A., & Urbina, S. (1997). Psychological testing (7th ed.). Prentice Hall.", null, 1],
    tversky1974: ["Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. Science, 185(4157), 1124–1131.", D + "10.1126/science.185.4157.1124", 1],
    kahneman2011: ["Kahneman, D. (2011). Thinking, fast and slow. Farrar, Straus and Giroux.", null, 1],
    eppler2004: ["Eppler, M. J., & Mengis, J. (2004). The concept of information overload: A review of literature from organization science, accounting, marketing, MIS, and related disciplines. The Information Society, 20(5), 325–344.", D + "10.1080/01972240490507974", 1],
    vosoughi2018: ["Vosoughi, S., Roy, D., & Aral, S. (2018). The spread of true and false news online. Science, 359(6380), 1146–1151.", "https://www.media.mit.edu/publications/the-spread-of-true-and-false-news-online/", 1],
    lewandowsky2012: ["Lewandowsky, S., Ecker, U. K. H., Seifert, C. M., Schwarz, N., & Cook, J. (2012). Misinformation and its correction: Continued influence and successful debiasing. Psychological Science in the Public Interest, 13(3), 106–131.", D + "10.1177/1529100612451018", 1],
    pennycook2019: ["Pennycook, G., & Rand, D. G. (2019). Lazy, not biased: Susceptibility to partisan fake news is better explained by lack of reasoning than by motivated reasoning. Cognition, 188, 39–50.", D + "10.1016/j.cognition.2018.06.011", 1],
    mccombs1972: ["McCombs, M. E., & Shaw, D. L. (1972). The agenda-setting function of mass media. Public Opinion Quarterly, 36(2), 176–187.", "https://fbaum.unc.edu/teaching/articles/POQ-1972-McCOMBS-176-87.pdf", 1],
    entman1993: ["Entman, R. M. (1993). Framing: Toward clarification of a fractured paradigm. Journal of Communication, 43(4), 51–58.", "https://www.academia.edu/13166309", 1],
    horton1956: ["Horton, D., & Wohl, R. R. (1956). Mass communication and para-social interaction: Observations on intimacy at a distance. Psychiatry, 19(3), 215–229.", D + "10.1080/00332747.1956.11023049", 1],
    paul2016: ["Paul, C., & Matthews, M. (2016). The Russian « Firehose of Falsehood » propaganda model: Why it might work and options to counter it (PE-198). RAND Corporation.", D + "10.7249/PE198", 1],
    tajfel1979: ["Tajfel, H., & Turner, J. C. (1979). An integrative theory of intergroup conflict. In W. G. Austin & S. Worchel (Eds.), The social psychology of intergroup relations (pp. 33–47). Monterey, CA : Brooks/Cole.", "https://alnap.org/help-library/resources/an-integrative-theory-of-intergroup-conflict/", 1],
    milgram1963: ["Milgram, S. (1963). Behavioral study of obedience. Journal of Abnormal and Social Psychology, 67(4), 371–378.", "https://www.psy.miami.edu/_assets/pdf/rpo-articles/milgram-1963.pdf", 1],
    cialdini2001: ["Cialdini, R. B. (2001). Influence: Science and practice (4th ed.). Allyn & Bacon. Trad. fr. (2004) : Influence et manipulation, First.", "https://search.worldcat.org/oclc/43607370", 1],
    fechner1860: ["Fechner, G. T. (1860). Elemente der Psychophysik (2 vol.). Leipzig : Breitkopf und Härtel. (Loi de Weber-Fechner.)", null, 0],
    green1966: ["Green, D. M., & Swets, J. A. (1966). Signal detection theory and psychophysics. Wiley. ; Hautus, M. J., Macmillan, N. A., & Creelman, C. D. (2022). Detection theory: A user's guide (3e éd.). Routledge.", "https://www.routledge.com/Detection-Theory-A-Users-Guide/Hautus-Macmillan-Creelman/p/book/9781138320857", 1],
    lain2022: ["Lain, D., Kostiainen, K., & Čapkun, S. (2022). Phishing in organizations: Findings from a large-scale and long-term study. 2022 IEEE Symposium on Security and Privacy (SP), 842–859. (Plus de 14 000 employés sur 15 mois : la formation intégrée aux simulations n'apporte pas de bénéfice et peut rendre plus vulnérable ; les avertissements dans les courriels et le signalement par les employés sont efficaces.)", D + "10.1109/SP46214.2022.9833766", 1],
    ho2025: ["Ho, G., Mirian, A., Luo, E., Tong, K., Lee, E., Liu, L., Longhurst, C. A., Dameff, C., Savage, S., & Voelker, G. M. (2025). Understanding the efficacy of phishing training in practice. 2025 IEEE Symposium on Security and Privacy (SP), 37–54. (Essai contrôlé randomisé, plus de 19 500 employés sur 8 mois : la formation annuelle n'a pas d'effet significatif, et la formation intégrée ne réduit les clics que d'environ 2 %.)", D + "10.1109/SP61157.2025.00076", 1],
    arup2024: ["Magramo, K. (2024, 16 mai). British engineering giant Arup revealed as $25 million deepfake scam victim. CNN. (Arup confirme que « de fausses voix et de fausses images » ont été utilisées.)", "https://edition.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk", 1],
    biden2024: ["Swenson, A., & Weissert, W. (2024, 22 janvier). AI-generated robocall impersonates Biden in an apparent attempt to suppress votes in New Hampshire. Associated Press.", "https://www.news4jax.com/news/politics/2024/01/22/ai-generated-robocall-impersonates-biden-in-an-apparent-attempt-to-suppress-votes-in-new-hampshire/", 1],
    vovan: ["Cass, Z., & Proofpoint Threat Research Team (2023, 7 mars). Don't answer that! Russia-aligned TA499 beleaguers targets with video call requests. Proofpoint. (Vovan et Lexus, appels et visioconférences avec des responsables sous une fausse identité.)", "https://www.proofpoint.com/us/blog/threat-insight/dont-answer-russia-aligned-ta499-beleaguers-targets-video-call-requests", 1],
    gru2020: ["Lawfare (2020, 19 octobre). Justice Department charges six Russian GRU officers for widespread hacking efforts. (Inculpation d'officiers du GRU, notamment pour ingérence dans l'élection française de 2017 ; renvoie au communiqué du ministère américain de la Justice.)", "https://www.lawfaremedia.org/article/justice-department-charges-six-russian-gru-officers-widespread-hacking-efforts", 1],
    iran2024: ["ODNI, FBI & CISA (2024, 19 août). Joint ODNI, FBI, and CISA statement on Iranian election influence efforts. (Compromission de la campagne de Donald Trump attribuée à l'Iran ; ingénierie sociale visant les deux campagnes.)", "https://content.govdelivery.com/accounts/USDHSCISA/bulletins/3afd156", 1],
    apt28fr2025: ["Ministère de l'Europe et des Affaires étrangères (2025, 29 avril). Russie : attribution de cyberattaques contre la France au service de renseignement militaire russe (APT28).", "https://www.diplomatie.gouv.fr/fr/presse-et-ressources/decouvrir-et-informer/actualites/russie-attribution-de-cyberattaques-contre-la-france-au-service-de-renseignement-militaire-russe", 1],
    macronleaks: ["Jeangène Vilmer, J.-B. (2019, 20 juin). The « Macron Leaks » operation: A post-mortem. Atlantic Council.", "https://www.atlanticcouncil.org/in-depth-research-reports/report/the-macron-leaks-operation-a-post-mortem/", 1],
    podesta: ["United States v. Netyksho et al., n° 1:18-cr-00215 (D.D.C., 13 juillet 2018), acte d'accusation, § 21(a) et § 49. (Messagerie du président de la campagne d'Hillary Clinton compromise le 19 mars 2016 par un courriel imitant une alerte de sécurité Google ; publication par « Organization 1 » à partir du 7 octobre 2016.)", "https://en.wikisource.org/wiki/U.S._v._Viktor_Borisovich_Netyksho,_et_al", 1],
    viginum: ["SGDSN / VIGINUM (2025, mai). Analyse du mode opératoire informationnel russe Storm-1516. (77 opérations recensées jusqu'au 5 mars 2025.)", "https://www.defense.gouv.fr/desinformation/aller-plus-loin/analyses-sgdsn/sgdsn-viginum-analyse-du-mode-operatoire-informationnel-russe-storm", 1],
    deonto: ["CERéDéPsy (2021). Code de déontologie des psychologues (version consolidée du 9 septembre 2021).", "https://psychologues.org/wp-content/uploads/2025/01/CODE-DE-DEONTOLOGIE-DES-PSYCHOLOGUES-2021_Colonnes_A3.pdf", 1],
    helsinki: ["World Medical Association (1964, révisée 2024). Declaration of Helsinki: Ethical principles for medical research involving human participants.", "https://www.wma.net/policies-post/wma-declaration-of-helsinki", 1],
    anton: ["Das, J. M., & Naqvi, I. A. Anton syndrome. In StatPearls. StatPearls Publishing (Treasure Island, FL), NBK538155, mise à jour régulière. (Cécité corticale niée, anosognosie visuelle.)", "https://www.ncbi.nlm.nih.gov/books/NBK538155/", 1],
    weiskrantz1986: ["Weiskrantz, L. (1986). Blindsight: A case study and implications. Oxford University Press (Clarendon Press).", "https://academic.oup.com/book/2388/chapter/142573040", 1],
    attack: ["MITRE. MITRE ATT&CK.", "https://attack.mitre.org/", 1],
    dima: ["M82 Project. DIMA (Detect, Inform, Memorise, Act).", "https://m82-project.github.io/DIMA/", 1]
  };
  var FREFS = {
    "autorite": ["milgram1963", "cialdini2001"],
    "urgence": ["cialdini2001", "kahneman2011"],
    "usurpation": ["arup2024", "biden2024", "bruce1986"],
    "hamecon-cible": ["lain2022", "ho2025", "podesta", "macronleaks", "gru2020", "apt28fr2025", "iran2024"],
    "pretexting": ["vovan", "cialdini2001"],
    "cadrage-agenda": ["mccombs1972", "entman1993", "tversky1974"],
    "inondation": ["paul2016", "eppler2004", "lewandowsky2012", "vosoughi2018"],
    "parasocial": ["horton1956"],
    "adversaire": ["tajfel1979", "pennycook2019"],
    "saillance": ["tversky1974", "seeley2007", "menon2010"],
    "psychophysique": ["green1966", "fechner1860"],
    "visages": ["bruce1986", "ellis1990"],
    "memoire-travail": ["baddeley1974", "baddeley2000", "sweller1988", "cowan2001", "miller1956"],
    "memoire-sources": ["johnson1993", "hasher1977", "loftus1974", "lewandowsky2012"],
    "attention-selective": ["simons1999", "posner1990"],
    "controle-executif": ["norman1986", "shallice1991", "stroop1935"],
    "meconnaissance": ["prigatano1991", "kruger1999", "anton"],
    "pragmatique": ["grice1975"],
    "reseaux-saillance": ["seeley2007", "menon2010"],
    "declin-fraude": ["spreng2016", "asp2012", "boyle2019"],
    "decision-emotion": ["damasio1994", "bechara1994"],
    "theorie-esprit": ["premack1978", "baroncohen1985", "griffiths2019"],
    "saillance-aberrante": ["kapur2003"],
    "apprentissage-oubli": ["ebbinghaus1885", "cepeda2006", "roediger2006", "lain2022", "ho2025"],
    "stress-executif": ["arnsten2009"],
    "psychometrie": ["anastasi1997"],
    "perception-reconstruction": ["marr1982", "humphreys1987", "pandey2015", "weiskrantz1986", "anton"],
    "recompense-renforcement": ["schultz1997", "ferster1957"]
  };
  /* Niveau de preuve de la contre-mesure elle-même (pas du mécanisme), d'après les références de la fiche :
     evaluee = une étude citée a mesuré l'effet d'une contre-mesure de ce type, sur ce terrain (sécurité, désinformation) ;
     evaluee-ailleurs = mesurée dans un autre domaine (santé, environnement, aide) ; a-tester = hypothèse ou mécanisme débattu ;
     methode = principe de méthode établi. Une fiche absente de cette table est « plausible » : la contre-mesure découle
     d'un mécanisme documenté, mais aucune étude citée ne l'a évaluée. */
  var CMLV = {
    "hamecon-cible": ["evaluee", "la formation par simulation a été évaluée en entreprise, sans effet notable, voire avec un effet défavorable (Lain et coll. 2022 ; Ho et coll. 2025) ; le signalement par les employés a été évalué favorablement (Lain et coll. 2022) ; les autres mesures découlent du mécanisme."],
    "apprentissage-oubli": ["evaluee", "espacement et test sont évalués en apprentissage, sur du matériel verbal (Cepeda et coll. 2006 ; Roediger et Karpicke 2006) ; en entreprise, la formation seule n'a pas d'effet protecteur notable (Lain et coll. 2022 ; Ho et coll. 2025)."],
    "inoculation": ["evaluee", "évaluée en laboratoire et sur le terrain (Banas et Rains 2010 ; Maertens et coll. 2021 ; Roozenbeek et coll. 2022), avec des effets modestes qui s'érodent sans rappel."],
    "spectateur": ["evaluee-ailleurs", "nommer une personne dans un salon de discussion accélère l'aide (Markey 2000), et une demande adressée à une seule personne reçoit plus de réponses (Barron et Yechiam 2002) ; ces études portent sur des demandes d'aide, pas sur le signalement d'un message suspect."],
    "normes": ["evaluee-ailleurs", "les messages normatifs ont été évalués sur le terrain, hors sécurité (Cialdini 2003 ; Schultz et coll. 2007)."],
    "identite-sociale": ["evaluee-ailleurs", "le contact entre groupes est associé à moins de préjugés (méta-analyse de Pettigrew et Tropp 2006, surtout corrélationnelle) ; il vise la polarisation, pas l'usurpation d'une appartenance commune."],
    "plans-si-alors": ["evaluee-ailleurs", "les intentions de mise en œuvre sont évaluées par méta-analyse, hors sécurité (Gollwitzer et Sheeran 2006) ; leur effet face à l'ingénierie sociale n'est pas encore mesuré."],
    "delegation": ["a-tester", "hypothèse prospective : aucune étude citée."],
    "meconnaissance": ["a-tester", "l'effet d'un retour sur la calibration reste à évaluer, et l'effet Kruger et Dunning est discuté."],
    "reseaux-saillance": ["a-tester", "aucune étude citée ne relie des mesures simples de charge à la vigilance en exercice."],
    "decision-emotion": ["a-tester", "le modèle sous-jacent est débattu, et l'effet d'un délai de refroidissement reste à mesurer."],
    "saillance-aberrante": ["a-tester", "transposition d'un cadre clinique à la communication de crise, à vérifier."],
    "psychophysique": ["methode", ""],
    "psychometrie": ["methode", ""],
    "analyse-exercice": ["methode", ""],
    "plan-exercice": ["methode", ""],
    "ethique-simulation": ["methode", ""]
  };
  var CMLV_LBL = { evaluee: ["évaluée", "lv-d"], "evaluee-ailleurs": ["évaluée hors sécurité", "lv-d"], plausible: ["plausible", "lv-p"], "a-tester": ["à tester", "lv-h"], methode: ["méthode établie", "lv-d"] };
  var CMLV_DEF = { plausible: "découle d'un mécanisme documenté, mais aucune étude citée n'a évalué la contre-mesure elle-même.", methode: "principe de méthode établi : il sert à mesurer, pas à corriger une faille." };
  function cmlvOf(f) { var x = CMLV[f.id] || ["plausible", ""]; return { k: x[0], lbl: CMLV_LBL[x[0]][0], cls: CMLV_LBL[x[0]][1], why: x[1] || CMLV_DEF[x[0]] || "" }; }
  /* nettoyage : les mentions « à sourcer » sont remplacées par la section Références */
  FICHES.forEach(function (f) {
    f.cas = (f.cas || []).filter(function (c) { return !/^R[ée]f[ée]rences? à vérifier/.test(c); });
    f.note = (f.note || "").replace(/\s*Références? à sourcer[^.]*\./g, "").replace(/\s*Cas publics? à sourcer[^.]*\./g, "").replace(/\s*Références à ajouter avant publication\./g, "").trim();
  });
  function refLi(k) {
    var r = R[k];
    var c = r[1] ? r[0] + ' <a href="' + r[1] + '" target="_blank" rel="noopener">lien</a>' : r[0];
    return '<li>' + c + ' <span class="lv ' + (r[2] ? 'ok' : 'half') + '" title="' + (r[2] ? 'Titre, auteurs, année et support confirmés en ligne.' : 'Référence existante ; pagination, éditeur ou lien à contrôler.') + '">' + (r[2] ? 'vérifiée' : 'à contrôler') + '</span></li>';
  }
  function refsHTML(f) {
    var ks = f.refs || FREFS[f.id] || [];
    if (!ks.length) return '<section id="s-refs"><h2 style="margin-top:28px">Références</h2><p class="note" style="margin-top:0;border-top:0;padding-top:0">Aucune référence pour l\'instant : cette fiche est une hypothèse prospective, à valider par la recherche.</p></section>';
    return '<section id="s-refs"><h2 style="margin-top:28px">Références</h2><ul class="plain refs">' + ks.map(refLi).join("") + '</ul><p class="note" style="margin-top:0;border-top:0;padding-top:0">« Vérifiée » : titre, auteurs, année et support confirmés en ligne. « À contrôler » : la référence existe mais un détail (pages, éditeur, lien) n\'a pas été relu à la source. <a href="#references">Toutes les références</a>.</p></section>';
  }


  /* ---------- Programme (cours et notions) ---------- */
  /* [notion, statut (fiche | integre | todo), id de fiche, liens] */
  var COURS = [
    { d: "Cognition et psychopathologie", n: [
      ["Cognition visuelle", "fiche", "visages", "Suivi · reconnaissance des visages et familiarité ; voir aussi Usurpation"],
      ["Modèles de la mémoire", "fiche", "memoire-sources", "Suivi · mémoire de source, vérité illusoire (TE0121, TE0332)"],
      ["Mémoire de travail et charge cognitive", "fiche", "memoire-travail", "Suivi · Baddeley, charge et vérification"],
      ["Attention sélective, divisée et cécité attentionnelle", "fiche", "attention-selective", "Suivi · Posner, cécité attentionnelle"],
      ["Décision, émotion et marqueurs somatiques", "fiche", "decision-emotion", "Damasio ; liens : urgence, peur"],
      ["Perspectives psychopathologiques cognitives et fondamentales", "integre", "meconnaissance", "Suivi · conscience du déficit, excès de confiance"],
      ["Neurologie et neuropsychologie de l'adulte", "fiche", "declin-fraude", "Suivi · déclin cognitif et vulnérabilité à la fraude"],
      ["Développement cognitif et apprentissage", "integre", "apprentissage-oubli", "liens : patchs d'entraînement"],
      ["Psychopathologie du développement", "todo", null, "lien faible avec le périmètre, à décider"]
    ]},
    { d: "Psychologie sociale et communication", n: [
      ["Psychologie sociale et performances", "integre", "autorite", "intégrée à la fiche Autorité (conformité, pression sociale)"],
      ["Communication, changement et construction identitaire", "integre", "adversaire", "intégrée à la fiche Adversaire (identité sociale) ; cadrage à relier"],
      ["Cognition sociale et émotions", "integre", "parasocial", "liens : parasocial, urgence, peur"],
      ["Psychologie du langage", "fiche", "pragmatique", "Suivi · implicite, présupposé, inférence"]
    ]},
    { d: "Psychopathologie clinique", n: [
      ["Psychopathologie clinique du vieillissement", "fiche", "vieillissement-confiance", "liens : vulnérabilité à la fraude, hameçonnage ciblé"],
      ["Victimologie", "fiche", "victimologie", "liens : fraude, après-coup, soutien aux victimes"],
      ["Psychopathologie des comportements violents", "todo", null, "périmètre sensible, à cadrer avant tout contenu"],
      ["Fondements théoriques et cliniques des TCC", "fiche", "plans-si-alors", "liens : patchs d'entraînement, régulation émotionnelle"]
    ]},
    { d: "Compléments", n: [
      ["Planification et contrôle du mouvement, référentiel spatial", "integre", "controle-executif", "Suivi · contrôle exécutif, habitude et supervision"],
      ["Management et mobilisation des ressources humaines", "integre", "delegation", "liens : délégation, culture de sécurité"],
      ["Problématiques gérontologiques", "integre", "vieillissement-confiance", "liens : vulnérabilité à la fraude"]
    ]},
    { d: "Méthodes et outils", n: [
      ["Traitement de données et initiation à R", "fiche", "analyse-exercice", "base du calcul de d', critère et scores"],
      ["Méthodologie cognitive", "fiche", "plan-exercice", "Suivi · protocoles de mesure, plans d'expérience"],
      ["Méthodologie sociale et clinique", "fiche", "ethique-simulation", "cadre des simulations red team et du consentement"]
    ]},
    { d: "Autres programmes consultés en ligne", n: [
      ["Apprentissage et mémoire ; remédiation cognitive ; neuroplasticité", "fiche", "apprentissage-oubli", "durée de vie des patchs d'entraînement"],
      ["Émotion et motivation ; neurobiologie des émotions et du stress", "fiche", "stress-executif", "stress et contrôle exécutif"],
      ["Conduites addictives ; systèmes de récompense", "fiche", "recompense-renforcement", "renforcement variable, audit de conception"],
      ["Perception et motricité ; agnosies visuelles", "fiche", "perception-reconstruction", "perception comme reconstruction"],
      ["Cognition sociale, théorie de l'esprit", "fiche", "theorie-esprit", "lecture des intentions"],
      ["Hallucinations et activités délirantes", "fiche", "saillance-aberrante", "sujet sensible, sans ciblage de personnes"],
      ["Évaluation cognitive, bilan neuropsychologique", "fiche", "psychometrie", "fiabilité et validité des exercices"],
      ["Fonctions exécutives et attentionnelles ; héminégligence", "integre", "controle-executif", "fiches Contrôle exécutif et Attention"],
      ["Neuropsychologie des troubles acquis ; psychologie du vieillissement", "integre", "declin-fraude", "fiche Déclin cognitif et fraude"],
      ["Syndromes de déconnexion, Gerstmann, Balint, apraxies", "todo", null, "lien faible avec le périmètre, à décider"],
      ["Aphasie progressive primaire, épilepsies, sclérose en plaques, traumatismes crâniens", "todo", null, "clinique pure, lien faible avec le périmètre"],
      ["Neuropsychologie des troubles psychiatriques ; troubles neurodéveloppementaux", "todo", null, "sujet sensible, à cadrer avant tout contenu"]
    ]},
    { d: "Programmes belges", n: [
      ["Neuropsychologie du langage", "fiche", "pragmatique", "implicite, présupposé, inférence"],
      ["Évaluation et diagnostic en neuropsychologie de l'adulte ; évaluation et prise en charge", "fiche", "psychometrie", "fiabilité et validité des exercices"],
      ["Revalidation neuropsychologique de l'adulte", "fiche", "apprentissage-oubli", "entraînement progressif, durée de vie des patchs"],
      ["Neuropsychologie de la personne âgée ; Psychology of aging", "fiche", "declin-fraude", "protéger sans stigmatiser"],
      ["Psychologie clinique des émotions", "fiche", "decision-emotion", "décision, émotion et marqueurs somatiques"],
      ["Psychologie clinique des assuétudes", "fiche", "recompense-renforcement", "renforcement variable, audit de conception"],
      ["Advances in cognitive neuroscience ; Clinical neuroscience", "fiche", "reseaux-saillance", "réseaux de la saillance et du contrôle"],
      ["Questions de neurologie et de psychiatrie associées à la neuropsychologie ; Neurologie", "todo", null, "clinique pure, lien faible avec le périmètre"],
      ["Difficultés d'apprentissage ; troubles sensoriels chez l'enfant", "todo", null, "hors périmètre actuel, à décider"]
    ]},
    { d: "Recherche et méthodes", n: [
      ["Psychophysique et analyse des signaux", "fiche", "psychophysique", "Suivi · seuils, sensibilité d', critère ; outil « Repère la faille »"],
      ["Outils et méthode en psychologie sociale", "integre", "plan-exercice", "liens : influence, simulations contrôlées"],
      ["Méthodologie de recherche en psychologie du travail et ergonomie", "fiche", "facteurs-humains", "liens : facteurs humains, conception des patchs"],
      ["Imagerie cérébrale et modélisation neuromimétique", "fiche", "reseaux-saillance", "Suivi · réseaux de la saillance et du contrôle"],
      ["Méthodologie de la recherche clinique", "integre", "niveaux-preuve", "liens : conditions cliniques, prudence"],
      ["Épistémologie", "fiche", "niveaux-preuve", "liens : statut des hypothèses, niveaux de preuve"]
    ]}
  ];

  /* ---------- Helpers ---------- */
  var NONE = document.createElement("div");
  /* On a phone each table row reads as a block: every cell carries the title of its column */
  function labelCells(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll(".tablewrap table"), function (t) {
      var heads = Array.prototype.map.call(t.querySelectorAll("thead th"), function (th) { return th.getAttribute("data-label") || th.textContent; });
      Array.prototype.forEach.call(t.querySelectorAll("tbody tr"), function (tr) {
        Array.prototype.forEach.call(tr.children, function (td, i) { if (td.tagName === "TD" && heads[i]) td.setAttribute("data-label", heads[i]); });
      });
    });
  }
  function $(id) { return document.getElementById(id) || NONE; }
  /* Published pages (publication/, made by build.mjs) carry data-page on <body>: one view per file */
  var STATIC = document.body.hasAttribute("data-page");

  /* ---------- Contribuer ----------
     Adresse du formulaire Framaforms (contributions et contact). Tant qu'elle est vide, les boutons mènent
     à la page Contribuer, qui annonce le formulaire ; aucun envoi n'est simulé. */
  var CONTRIB_FORM = "https://framaforms.org/formulaire-de-contact-1793119061";
  function contribLink(label, cls) {
    return '<a' + (cls ? ' class="' + cls + '"' : '') + ' href="' + (CONTRIB_FORM || "#contribuer") + '"' + (CONTRIB_FORM ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
  }
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  /* Phones and small tablets: the longest lists fold. build.mjs works at a wider size, so the built pages keep everything open and their dates do not move */
  var FOLD = window.matchMedia("(max-width: 60rem)");
  function foldBtn(label, open) { return '<button type="button" class="fold-btn" aria-expanded="' + open + '">' + label + '</button>'; }

  /* A marker that glides to the chosen tab ("box", "under") or to the sommaire entry being read ("left") */
  function slide(group, mode, sel) {
    if (!group) return;
    var on = group.querySelector(sel || '[aria-pressed="true"]');
    if (!on || !on.offsetWidth) return;
    var s = group.querySelector(":scope > .slider"), fresh = !s;
    if (fresh) {
      s = document.createElement("span");
      s.className = "slider";
      s.setAttribute("aria-hidden", "true");
      group.insertBefore(s, group.firstChild);
    }
    var t = mode === "under" ? "translate(" + on.offsetLeft + "px," + (on.offsetTop + on.offsetHeight - 2) + "px) scaleX(" + on.offsetWidth / 100 + ")"
      : mode === "left" ? "translateY(" + on.offsetTop + "px) scaleY(" + on.offsetHeight / 100 + ")"
      : "translate(" + on.offsetLeft + "px," + on.offsetTop + "px) scale(" + on.offsetWidth / 100 + "," + on.offsetHeight / 100 + ")";
    if (fresh) {
      s.style.transition = "none";
      s.style.transform = group.dataset.at || t;
      void s.offsetWidth;
      s.style.transition = "";
    }
    s.style.transform = t;
    group.dataset.at = t;
  }
  function slideAll() {
    slide($("lever-tabs"), "box");
    slide($("lab-tabs"), "under");
    slide(document.querySelector("#v-fiche .toc ol"), "left", '[aria-current="true"]');
  }
  window.addEventListener("resize", slideAll);
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function rx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function hi(text, q) {
    q = (q || "").trim();
    if (!q) return text;
    return text.replace(new RegExp("(" + rx(q) + ")", "gi"), "<mark>$1</mark>");
  }
  function items(list) { return list.map(function (x) { return '<p class="item"><b>' + x[0] + ' :</b> ' + x[1] + '</p>'; }).join(""); }
  function pills(f) { return f.ax.map(function (a) { return '<span class="pill ' + a + '">' + AX[a] + '</span>'; }).join(""); }
  /* Espace insécable devant : ; ? ! » et après « : la ponctuation ne passe jamais seule à la ligne */
  function nb(s) { return s.replace(/ ([:;?!»])/g, "\u00a0$1").replace(/« /g, "«\u00a0"); }
  function rowHTML(f) {
    return '<a class="row" href="#fiche-' + f.id + '"><div><h3>' + nb(f.title) + '</h3><p>' + f.teaser + '</p></div><div class="tags">' + pills(f) + '</div></a>';
  }
  function ficheById(id) { return FICHES.filter(function (x) { return x.id === id; })[0]; }

  /* ---------- Plus sensibles, moins exposées : par levier ou par fiche ----------
     Un nom seul reprend l'entrée clinique de PSY pour ce libellé ; [qui, niveau, pourquoi] ajoute une condition ou une situation ;
     { note } quand aucun profil n'est établi ; illus : entrées de PSY qui éclairent le mécanisme sans indiquer de sensibilité. */
  var SENS = {
    "Levier : Autorité": {
      plus: ["Trouble de la personnalité dépendante", "Troubles neurocognitifs",
        ["Nouveaux arrivants et intérimaires", "plausible", "Connaissent mal les procédures et hésitent à vérifier une demande venue d'en haut."],
        ["Salariés d'organisations très hiérarchiques", "plausible", "Contester un supérieur y coûte cher : l'obéissance l'emporte sur la vérification (Milgram, 1963)."]],
      moins: [["Personnes explicitement autorisées à refuser et à rappeler", "plausible", "Le droit écrit de vérifier, même un dirigeant, retire au titre son pouvoir d'exemption."],
        ["Fort besoin de cognition", "plausible", "Ces personnes s'appuient davantage sur les arguments que sur le statut de l'émetteur (modèle de la probabilité d'élaboration)."]]
    },
    "Levier : Urgence": {
      plus: ["TDAH", "Épisode maniaque ou hypomaniaque (trouble bipolaire)", "Trouble anxieux généralisé", "Jeu pathologique et addictions comportementales",
        ["Personnes en surcharge ou sous pression réelle", "documenté", "La pression temporelle et la charge de travail augmentent les clics sur les messages piégés."]],
      moins: [["Personnes qui appliquent un délai de vérification", "plausible", "Une règle simple (aucun paiement urgent sans contre-appel) neutralise l'échéance imposée par l'attaquant."]]
    },
    "Levier : Familiarité": {
      plus: ["Troubles neurocognitifs", "Isolement social marqué (facteur de risque, pas un trouble)",
        ["Échanges réguliers sur un même canal", "plausible", "Messagerie ou réseau social familiers : la répétition crée une confiance que personne ne revérifie."]],
      moins: [["Personnes qui vérifient l'identité hors canal, même pour un proche", "plausible", "La familiarité ressentie ne sert plus de preuve : seul compte le second canal."]]
    },
    "Levier : Réciprocité": {
      plus: ["Trouble de la personnalité dépendante", "Trouble d'anxiété sociale",
        ["Métiers d'accueil, d'assistance et de support", "plausible", "La norme professionnelle d'obligeance rend le refus coûteux."]],
      moins: [["Personnes qui ont une règle claire sur les faveurs et les cadeaux", "plausible", "Une règle connue d'avance permet de refuser sans se sentir redevable."]]
    },
    "Levier : Preuve sociale": {
      plus: ["Trouble d'anxiété sociale", "Dépression",
        ["Situations nouvelles ou ambiguës", "documenté", "L'incertitude renforce la tendance à suivre ce que font les autres (Cialdini)."]],
      moins: [["Personnes formées par inoculation (prebunking)", "plausible", "Avoir vu les techniques de manipulation en version affaiblie, dont les faux consensus, réduit leur effet ; gains modestes qui s'érodent (Roozenbeek et van der Linden, 2019)."]]
    },
    "Usurpation de voix et d'image": {
      plus: ["Prosopagnosie", "Troubles neurocognitifs",
        ["Tout le monde face aux contenus synthétiques", "documenté", "La détection humaine des voix et vidéos synthétiques est peu fiable : l'oreille et l'œil ne suffisent plus."]],
      moins: [["Équipes qui ont convenu d'un code ou d'une question de contrôle", "plausible", "Le contrôle ne dépend plus de la ressemblance mais d'une information partagée à l'avance."]]
    },
    "Hameçonnage ciblé de responsables": {
      plus: ["TDAH", "Troubles neurocognitifs", "Épuisement professionnel (état de surcharge, pas un trouble)",
        ["Usage très habituel et rapide de la messagerie", "plausible", "Les gestes automatiques laissent moins de place à la vérification (voir la fiche Contrôle exécutif)."]],
      moins: [["Personnes équipées d'une clé de sécurité physique", "plausible", "Le site piégé ne peut pas récupérer d'identifiants réutilisables : le clic ne suffit plus."],
        ["Personnes entraînées par simulations", "hypothèse", "Effet nul ou très faible en entreprise (Lain et coll., 2022 ; Ho et coll., 2025) ; l'intérêt d'un entraînement répété et débriefé reste à démontrer."]]
    },
    "Pretexting et canulars": {
      plus: ["Trouble d'anxiété sociale", "Trouble de la personnalité dépendante",
        ["Accueil, standard, assistance informatique", "plausible", "Leur rôle est d'aider vite : ce sont les premiers interlocuteurs visés par un prétexte."]],
      moins: [["Personnes qui suivent une procédure de vérification d'identité", "plausible", "Rappeler sur un numéro connu avant de répondre coupe court au scénario, si crédible soit-il."]]
    },
    "Cadrage et agenda": {
      plus: ["Troubles anxieux",
        ["Faible numératie", "documenté", "Les personnes moins à l'aise avec les nombres sont plus influencées par la façon de présenter un chiffre (Peters et coll., 2006)."]],
      moins: [["Bonne numératie", "documenté", "Moindre sensibilité aux effets de cadrage des chiffres (Peters et coll., 2006)."],
        ["Trouble du spectre de l'autisme", "plausible", "Moindre effet de cadrage en moyenne, mesuré en laboratoire sur de petits effectifs (De Martino et coll., 2008), et choix un peu moins déplacés par une option leurre (Farmer et coll., 2017). Cela ne protège pas des escroqueries : les adultes autistes déclarent plus souvent avoir été poussés ou trompés pour donner de l'argent (Griffiths et coll., 2019)."]]
    },
    "Inondation informationnelle": {
      plus: ["TDAH", "Troubles anxieux", "Épuisement informationnel (état de surcharge, pas un trouble)",
        ["Information reçue surtout par des fils algorithmiques", "plausible", "Le flux impose son rythme et son tri : moins de temps pour vérifier."]],
      moins: [["Personnes qui pratiquent la lecture latérale", "documenté", "Vérifier la source ailleurs avant de lire, comme les vérificateurs professionnels (Wineburg et McGrew, 2019)."]]
    },
    "Proximité et relation parasociale": {
      plus: ["Isolement social marqué (facteur de risque, pas un trouble)", "Troubles psychotiques (idées de référence)",
        ["Forte consommation d'un même créateur ou média", "plausible", "L'exposition quotidienne renforce le sentiment de connaître la personne."]],
      moins: [["Personnes avec un réseau social hors ligne solide", "hypothèse", "Le besoin de lien est comblé ailleurs ; à tester."]]
    },
    "Désignation d'un adversaire": {
      plus: ["Traits de personnalité paranoïaque", "Troubles anxieux",
        ["Forte identité partisane", "documenté", "Le raisonnement motivé accepte plus facilement ce qui accuse l'autre camp (Van Bavel et Pereira, 2018)."],
        ["Périodes de crise et de menace collective", "plausible", "L'incertitude favorise la recherche d'un responsable."]],
      moins: [["Humilité intellectuelle élevée", "plausible", "Associée à une moindre adhésion aux informations fausses et aux récits de bouc émissaire."],
        ["Contacts réels et réguliers avec l'autre camp", "plausible", "Hypothèse du contact : connaître des personnes réduit la caricature."]]
    },
    "Détournement de la saillance": {
      plus: ["Schizophrénie et spectre psychotique", "Trouble de stress post-traumatique", "Troubles anxieux", "TDAH",
        ["Défilement rapide d'un fil d'actualité", "plausible", "Peu de temps par élément : ce qui est bizarre ou menaçant l'emporte."]],
      moins: [{ note: "Aucun profil protégé : la nouveauté et la menace captent l'attention de tous. Seule une pause avant d'agir ou de relayer aide." }]
    },
    "Capture de la délégation décisionnelle": {
      plus: ["Syndrome dysexécutif (lésions frontales, TDAH)", "Dépression (apathie, perte d'initiative)", "Troubles neurocognitifs",
        ["Personnes en surcharge qui s'appuient sur une aide automatique", "documenté", "Le biais d'automatisation augmente avec la charge, chez les novices comme chez les experts (Parasuraman et Manzey, 2010)."]],
      moins: [["Personnes qui ont déjà vu l'outil se tromper", "documenté", "Avoir vécu des erreurs de l'automate réduit la complaisance envers lui (Bahner et coll., 2008)."]]
    },
    "Psychophysique et analyse des signaux": {
      plus: [["Comparaisons rapides, sans valeur de référence", "plausible", "On perçoit les écarts relatifs : une petite différence sur un grand montant passe inaperçue."]],
      moins: [["Personnes qui fixent à l'avance un seuil en valeur absolue", "plausible", "Comparer à un chiffre décidé d'avance contourne la perception relative."]],
      illus: ["Schizophrénie", "Trouble du spectre de l'autisme"]
    },
    "Reconnaissance des visages et familiarité": {
      plus: ["Prosopagnosie (agnosie des visages)",
        ["Tout le monde face à un visage connu ou synthétique", "documenté", "Un visage familier déclenche la confiance avant la vérification ; les visages synthétiques sont jugés aussi crédibles que les vrais (Nightingale et Farid, 2022)."]],
      moins: [["Super-reconnaisseurs", "plausible", "Reconnaissance des visages exceptionnelle (Russell et coll., 2009) ; leur avantage face aux visages synthétiques n'est pas établi."]],
      illus: ["Syndrome de Capgras", "Cécité (périphérique ou corticale)"]
    },
    "Mémoire de travail et charge cognitive": {
      plus: ["TDAH", "Schizophrénie", "Troubles neurocognitifs (dont maladie d'Alzheimer)", "Dépression",
        ["Multitâche et interruptions fréquentes", "documenté", "Chaque interruption consomme la mémoire de travail et augmente les erreurs."]],
      moins: [["Personnes qui s'appuient sur des listes et procédures écrites", "plausible", "Ce qui est écrit n'a pas à tenir en mémoire de travail."]]
    },
    "Mémoire de source et faux souvenirs": {
      plus: ["Amnésie et troubles de la mémoire de source (atteinte frontale)",
        ["Vieillissement normal", "documenté", "La mémoire de la source décline plus que celle du contenu : on retient l'information, pas d'où elle vient."]],
      moins: [{ note: "Aucun profil protégé : l'effet de vérité illusoire touche aussi les personnes qui connaissent la bonne réponse (Fazio et coll., 2015)." },
        ["Personnes qui notent la source au moment de lire", "plausible", "Encoder la source tout de suite limite les confusions ultérieures."]]
    },
    "Attention sélective, divisée et cécité attentionnelle": {
      plus: ["TDAH",
        ["Charge attentionnelle élevée", "documenté", "Plus la tâche principale est exigeante, plus l'inattendu passe inaperçu."]],
      moins: [{ note: "Aucun profil fiable : même des radiologues experts manquent un élément inattendu dans une image (Drew et coll., 2013)." }],
      illus: ["Héminégligence", "Syndrome de Balint et simultanagnosie"]
    },
    "Contrôle exécutif : habitude contre supervision": {
      plus: ["Syndrome dysexécutif (atteinte frontale)", "TDAH",
        ["Gestes très routiniers (valider, signer, cliquer)", "documenté", "Plus une action est automatique, plus une erreur d'action passe sans contrôle (Reason, 1990)."],
        ["Fatigue et manque de sommeil", "documenté", "Les fonctions exécutives sont parmi les premières touchées."]],
      moins: [["Personnes travaillant avec une étape d'arrêt imposée", "plausible", "Double validation ou temps d'attente rendent la main au contrôle délibéré."]]
    },
    "Méconnaissance de sa propre vulnérabilité": {
      plus: [["Personnes qui se jugent peu vulnérables", "plausible", "L'excès de confiance dans sa capacité à repérer un piège va de pair avec de moins bonnes performances."],
        ["Experts et dirigeants", "hypothèse", "Une compétence réelle dans un domaine peut nourrir une confiance qui ne s'étend pas à la détection des tromperies."]],
      moins: [["Personnes déjà confrontées à une tentative, puis débriefées", "plausible", "L'expérience vécue et expliquée corrige l'illusion d'invulnérabilité."]],
      illus: ["Anosognosie (atteinte pariétale droite)", "Syndrome d'Anton (cécité corticale niée)"]
    },
    "Langage et pragmatique": {
      plus: [["Lecture rapide et superficielle", "documenté", "Les présupposés passent sans examen : c'est l'illusion de Moïse, où l'on répond sans remarquer l'erreur glissée dans la question."]],
      moins: ["Trouble du spectre de l'autisme"],
      illus: ["Lésions de l'hémisphère droit", "Schizophrénie"]
    },
    "Réseaux de la saillance et du contrôle": {
      plus: ["Démence fronto-temporale (variant comportemental)", "Troubles du spectre psychotique", "Troubles anxieux",
        ["Dépression", "plausible", "Biais attentionnel vers l'information négative : les messages de menace captent davantage."]],
      moins: [{ note: "Aucun profil protégé établi : la saillance capte l'attention de tous. Une routine de vérification décide à sa place." }]
    },
    "Déclin cognitif et vulnérabilité à la fraude": {
      plus: ["Troubles neurocognitifs", "Atteintes frontales (lésion, démence fronto-temporale)",
        ["Isolement social, deuil récent", "documenté", "Chez les personnes âgées, l'isolement et la dépression prédisent la victimisation par la fraude (Lichtenberg et coll., 2013)."]],
      moins: [["Personnes âgées entourées, avec un tiers de confiance", "plausible", "Un proche consulté avant toute décision financière inhabituelle sert de second canal."],
        ["Bonne littératie financière", "plausible", "Associée à une moindre réceptivité aux escroqueries chez les personnes âgées (James et coll., 2014)."]]
    },
    "Décision, émotion et cortex préfrontal ventromédian": {
      plus: ["Lésions préfrontales ventromédianes", "Troubles anxieux",
        ["Forte émotion au moment de décider", "documenté", "La peur et la colère orientent le jugement du risque (Lerner et Keltner, 2001)."]],
      moins: [["Personnes qui diffèrent toute décision prise sous le coup de l'émotion", "plausible", "Reporter de quelques heures laisse retomber l'émotion qui fait agir."]]
    },
    "Théorie de l'esprit et lecture des intentions": {
      plus: ["Schizophrénie", "Démence fronto-temporale (variant comportemental)",
        ["Vieillissement", "plausible", "Une baisse de la détection du mensonge est rapportée chez les adultes âgés (Ruffman et coll., 2012)."],
        ["Trouble du spectre de l'autisme", "plausible", "Les adultes autistes déclarent plus souvent avoir été trompés ou poussés à donner de l'argent (48 % contre 20 %, enquête par autodéclaration, Griffiths et coll., 2019). Le mécanisme n'est pas établi : l'enquête ne mesure pas la lecture des intentions, et l'hypothèse de la double empathie (Milton, 2012) rappelle que la difficulté de compréhension est réciproque."]],
      moins: [["Personnes formées au prétexte par des exercices débriefés", "plausible", "Connaître les scénarios types aide à repérer une intention qui ne colle pas au rôle affiché."]],
      illus: ["Trouble du spectre de l'autisme"]
    },
    "Saillance aberrante et traitement des signaux ambigus": {
      plus: ["Troubles du spectre psychotique",
        ["Privation de sommeil et stress intense", "plausible", "Des expériences de type psychotique transitoires apparaissent aussi chez des personnes sans trouble."]],
      moins: [{ note: "Aucun profil protégé identifié." }]
    },
    "Apprentissage, oubli et durée de vie d'un patch": {
      plus: ["Syndromes amnésiques (lésion hippocampique, syndrome de Korsakoff)", "Maladie d'Alzheimer", "Dépression"],
      moins: [["Personnes entraînées par rappels espacés", "documenté", "L'effet d'espacement allonge la durée de vie d'un patch d'entraînement."],
        ["Routines pratiquées régulièrement", "plausible", "Une procédure répétée s'oublie moins qu'une consigne apprise une fois."]]
    },
    "Stress, émotion et contrôle exécutif": {
      plus: ["État de stress post-traumatique",
        ["Stress aigu au moment de la demande", "documenté", "Le stress affaiblit le contrôle exécutif et pousse vers les réponses habituelles (Schwabe et Wolf, 2009)."]],
      moins: [["Personnes entraînées sous stress simulé", "plausible", "Répéter la procédure en exercice réaliste la rend disponible sous pression."]]
    },
    "Psychométrie : fiabilité et validité d'un exercice": {
      plus: ["Troubles neurocognitifs", "Troubles anxieux (anxiété d'évaluation)", "Troubles spécifiques des apprentissages (dyslexie)"],
      moins: [["Participants informés, sans enjeu individuel", "plausible", "Sans note individuelle, l'anxiété d'évaluation pèse moins et le score reflète mieux la vigilance."]]
    },
    "Perception visuelle : voir est une reconstruction": {
      plus: [["Lecture rapide d'images et de graphiques", "plausible", "Ancrage et contraste visuels jouent davantage quand l'examen est bref, sur petit écran ou sous pression."],
        ["Faible aisance avec les graphiques", "documenté", "La littératie graphique prédit la lecture correcte d'un graphique (Galesic et Garcia-Retamero, 2011)."]],
      moins: [["Personnes qui lisent les valeurs et les échelles des axes", "plausible", "Revenir aux chiffres neutralise une partie des effets de contraste et d'échelle."]],
      illus: ["Schizophrénie", "Agnosies visuelles (aperceptive, associative)", "Cécité corticale et syndrome d'Anton", "Vision aveugle (blindsight)", "Syndrome de Charles Bonnet", "Achromatopsie et daltonismes", "Cécité (périphérique ou corticale)"]
    },
    "Récompense et renforcement variable": {
      plus: ["Addictions comportementales", "TDAH",
        ["Adolescence et début de l'âge adulte", "documenté", "La sensibilité à la récompense culmine à cet âge (Steinberg, 2008)."]],
      moins: [["Personnes qui regroupent ou coupent les notifications", "plausible", "Moins de sollicitations imprévisibles, donc moins de renforcement variable."]]
    }
  };

  /* ---------- Psychologie sociale : fiches, techniques DIMA, références, sensibilités et glossaire ---------- */
  var PS = "Psychologie sociale";
  FICHES.push(
    { id: "spectateur", ax: ["ent", "pou"], tag: PS, title: "Effet spectateur et diffusion de responsabilité",
      teaser: "Quand tout le monde a vu l'alerte, chacun pense qu'un autre l'a signalée.",
      socle: ["Plus il y a de témoins, moins chacun se sent tenu d'agir : c'est la diffusion de responsabilité, mise en évidence par Darley et Latané (1968) dans des situations d'urgence simulées. Une méta-analyse portant sur plus de 7 700 participants confirme l'effet, d'ampleur modérée, et montre qu'il s'atténue quand le danger est évident (Fischer et coll., 2011).",
              "Le même mécanisme joue en ligne : une demande envoyée à plusieurs destinataires reçoit moins de réponses qu'un message individuel (Barron et Yechiam, 2002), et dans un salon de discussion, s'adresser à une personne par son nom fait presque disparaître l'effet (Markey, 2000). En entreprise, un message suspect reçu par toute une équipe, une alerte visible par plusieurs services ou une boîte partagée créent la même situation : chacun suppose qu'un autre a déjà signalé.",
              "À nuancer : sur des images de vidéosurveillance de conflits réels, au moins un témoin intervient dans neuf cas sur dix, et davantage de témoins augmente la probabilité qu'une personne agisse (Philpot et coll., 2020). Le groupe n'empêche pas d'agir ; ce sont l'ambiguïté de la situation et le flou sur qui doit agir qui freinent. C'est sur eux que porte la défense."],
      cas: ["Fuite de données de Target (2013) : d'après l'enquête de Bloomberg Businessweek (2014), des alertes de l'outil de détection ont été vues et transmises sans qu'aucune équipe n'agisse ; l'entreprise a reconnu ensuite qu'il aurait fallu agir sur ces premières alertes. Le cas illustre le flou sur qui doit agir ; il ne prouve pas à lui seul un effet spectateur."],
      blue: [["Signaux", "message suspect reçu par plusieurs personnes à la fois ; alerte visible par plusieurs services sans responsable nommé ; boîte de messagerie partagée ; silence collectif (« quelqu'un a dû le signaler ») ; personne ne sait à qui signaler."],
             ["Contre-mesures", "un responsable nommé pour chaque type d'alerte et chaque boîte partagée ; un bouton de signalement en un clic, sans reproche en cas de fausse alerte ; la règle « signaler même si d'autres l'ont reçu » ; accuser réception des signalements pour montrer qu'ils servent ; s'adresser à une personne nommée plutôt qu'à « l'équipe »."]],
      red: [["Hypothèse testée", "un message fictif envoyé à toute une équipe est-il signalé plus tard, ou moins souvent, que le même message envoyé à une seule personne ?"],
            ["Indicateur", "taux et délai médian de signalement du même message fictif envoyé à une équipe ou à des destinataires individuels, et selon qu'un responsable de la boîte partagée a été désigné ou non."],
            ["Cadre", RC]],
      pistes: ["Mesurer le délai avant le premier signalement selon le nombre de destinataires.", "Comparer une alerte adressée à « l'équipe » et une alerte adressée à une personne nommée.", "Tester l'effet d'un accusé de réception sur les signalements suivants."],
      note: "Niveau de preuve : effet documenté par méta-analyse, d'ampleur modérée et sensible au contexte ; sa transposition au signalement en entreprise est plausible, appuyée par les études sur les messages collectifs. L'affaire Kitty Genovese (1964), qui a inspiré ces travaux, a été déformée par la presse de l'époque (Manning et coll., 2007)." }
  );
  TE.TE0431 = "Biais d'omission";
  MAP.push({ label: "Effet spectateur et diffusion de responsabilité", fiche: "spectateur", te: ["TE0431", "TE0432"], note: "Omission et statu quo : ne rien faire paraît sans risque. Rapprochement partiel, l'effet spectateur n'a pas de technique dédiée." });
  R.darley1968 = ["Darley, J. M., & Latané, B. (1968). Bystander intervention in emergencies: Diffusion of responsibility. Journal of Personality and Social Psychology, 8(4), 377–383.", D + "10.1037/h0025589", 1];
  R.fischer2011 = ["Fischer, P., Krueger, J. I., Greitemeyer, T., et coll. (2011). The bystander-effect: A meta-analytic review on bystander intervention in dangerous and non-dangerous emergencies. Psychological Bulletin, 137(4), 517–537.", D + "10.1037/a0023304", 1];
  R.philpot2020 = ["Philpot, R., Liebst, L. S., Levine, M., Bernasco, W., & Lindegaard, M. R. (2020). Would I be helped? Cross-national CCTV footage shows that intervention is the norm in public conflicts. American Psychologist, 75(1), 66–75.", D + "10.1037/amp0000469", 1];
  R.markey2000 = ["Markey, P. M. (2000). Bystander intervention in computer-mediated communication. Computers in Human Behavior, 16, 183–188.", D + "10.1016/S0747-5632(99)00056-4", 1];
  R.barron2002 = ["Barron, G., & Yechiam, E. (2002). Private e-mail requests and the diffusion of responsibility. Computers in Human Behavior, 18, 507–520.", D + "10.1016/S0747-5632(02)00007-9", 1];
  R.manning2007 = ["Manning, R., Levine, M., & Collins, A. (2007). The Kitty Genovese murder and the social psychology of helping: The parable of the 38 witnesses. American Psychologist, 62(6), 555–562.", D + "10.1037/0003-066X.62.6.555", 1];
  R.target2014 = ["Bloomberg Businessweek (2014, 13 mars). Missed alarms and 40 million stolen credit card numbers: How Target blew it. (Source de presse.)", "https://www.bloomberg.com/news/articles/2014-03-13/target-missed-warnings-in-epic-hack-of-credit-card-data", 1];
  FREFS.spectateur = ["darley1968", "fischer2011", "philpot2020", "markey2000", "barron2002", "manning2007", "target2014"];
  SENS["Effet spectateur et diffusion de responsabilité"] = {
    plus: [["Destinataires d'un message collectif", "plausible", "Une demande envoyée à plusieurs destinataires reçoit moins de réponses qu'une demande personnelle (Barron et Yechiam, 2002, une seule étude)."],
      ["Équipes sans responsable nommé", "plausible", "Quand personne n'est désigné, chacun attend qu'un autre agisse."],
      ["Situations ambiguës", "documenté", "L'effet est plus fort quand le danger n'est pas évident, ce qui est le cas d'un message bien imité (Fischer et coll., 2011)."]],
    moins: [["Personnes nommément désignées", "plausible", "Être appelé par son nom accélère nettement l'aide dans un salon de discussion (Markey, 2000, une seule étude)."],
      ["Équipes où signaler est simple et remercié", "plausible", "Un signalement en un clic, sans reproche, abaisse le coût d'agir."]]
  };
  GLOSS.push(
    ["Effet spectateur", "Tendance à moins intervenir quand d'autres personnes sont témoins de la même situation."],
    ["Diffusion de responsabilité", "Sentiment, au sein d'un groupe, que la responsabilité d'agir revient à quelqu'un d'autre."]
  );

  FICHES.push(
    { id: "normes", ax: ["ent", "inf"], tag: PS, title: "Normes sociales : ce que font les autres, ce qu'ils approuvent",
      teaser: "« Beaucoup cliquent encore » apprend surtout que cliquer est normal.",
      socle: ["Nous ajustons notre conduite à deux repères : ce que la plupart des gens font (norme descriptive) et ce qu'ils approuvent (norme prescriptive). Cialdini et ses collègues l'ont montré sur les déchets jetés par terre : un lieu déjà sale en attire davantage, un lieu propre en décourage (Cialdini et coll., 1990).",
              "Le piège concerne d'abord les défenseurs : un message qui insiste sur l'ampleur d'un mauvais comportement le rend normal. Dans un parc national américain, un panneau déplorant les nombreux vols de bois pétrifié a été suivi de plus de vols qu'un panneau demandant simplement de ne pas en prendre (Cialdini, 2003). Annoncer qu'un collaborateur sur trois clique sur les liens piégés dit implicitement que cliquer est courant.",
              "Les attaquants, eux, fabriquent des normes : faux avis, faux compteurs, comptes coordonnés qui donnent l'impression que « tout le monde » partage une position (voir le levier Preuve sociale). Côté défense, associer la norme à une approbation explicite évite l'effet boomerang : des foyers informés qu'ils consommaient moins d'énergie que la moyenne augmentaient leur consommation, sauf si l'information s'accompagnait d'un signe d'approbation (Schultz et coll., 2007)."],
      blue: [["Signaux", "campagne de sensibilisation qui chiffre surtout les erreurs ; impression que « tout le monde fait comme ça » ; compteurs, avis ou soutiens apparus soudainement ; comportement à risque présenté comme habituel dans l'équipe."],
             ["Contre-mesures", "mettre en avant la majorité qui vérifie et signale ; associer chaque chiffre à une approbation claire (« merci aux 70 % qui ont signalé ») ; rendre visibles les signalements utiles ; vérifier l'origine des chiffres et des soutiens avant de s'y fier."]],
      red: [["Hypothèse testée", "une campagne fictive qui annonce « la majorité d'entre vous signale » augmente-t-elle les signalements par rapport à « beaucoup cliquent encore » ?"],
            ["Indicateur", "taux de signalement après chacune des deux formulations de la campagne fictive, comparés entre groupes tirés au sort."],
            ["Cadre", RC]],
      pistes: ["Réécrire les messages de sensibilisation existants en norme positive et comparer les taux de signalement.", "Repérer dans une campagne d'influence les signaux de norme fabriquée : compteurs, consensus soudain, soutiens sans historique."],
      note: "Niveau de preuve : distinction entre normes descriptives et prescriptives bien établie ; l'ampleur des effets varie selon les études et les terrains. Fiche liée au levier Preuve sociale." },

    { id: "obeissance", ax: ["ent", "pou"], tag: PS, title: "Obéissance et conformité : ce qui rend le refus possible",
      teaser: "Un seul allié qui dit non suffit souvent à libérer les autres.",
      socle: ["Dans les expériences de Milgram, une majorité de participants a administré des chocs électriques, fictifs mais crus réels, sur ordre d'un expérimentateur (Milgram, 1963) ; une réplication partielle, arrêtée plus tôt pour des raisons éthiques, trouve des taux proches (Burger, 2009). Dans celles d'Asch, des participants se rangent à une réponse manifestement fausse quand tout le groupe la donne (Asch, 1956).",
              "Ces résultats sont souvent mal résumés. La conformité varie selon les cultures et a diminué depuis les années 1950 (Bond et Smith, 1996). L'obéissance chute quand l'autorité paraît moins légitime ou quand des pairs refusent, et l'idée d'une « obéissance aveugle » est discutée : les participants agissent aussi parce qu'ils adhèrent au projet qu'on leur présente (Haslam et Reicher, 2012). L'expérience de la prison de Stanford, souvent citée avec elles, n'est pas une base fiable (Le Texier, 2019).",
              "Pour la défense, le résultat le plus utile est le pouvoir du désaccord : dans les variantes d'Asch, un seul partenaire qui donne la bonne réponse fait fortement chuter la conformité. Une organisation qui confie à quelqu'un le rôle explicite de vérifier, même face à la direction, crée cet allié."],
      blue: [["Signaux", "demande qui contourne la procédure au nom d'un supérieur ; pression du type « tout le monde est d'accord » ; peur d'être la seule personne à objecter ; personne n'est chargé de dire non."],
             ["Contre-mesures", "un rôle de vérification attribué par écrit et protégé, même face à la direction ; le droit explicite de suspendre une opération douteuse ; un second avis systématique au-delà d'un seuil ; valoriser publiquement les refus motivés ; en réunion, recueillir les avis avant que la personne la plus haut placée ne s'exprime."]],
      red: [["Hypothèse testée", "une demande fictive venant d'un supérieur et contraire à la procédure est-elle plus souvent suspendue quand un collègue a le rôle explicite de vérifier ?"],
            ["Indicateur", "part des demandes fictives contraires à la procédure qui sont suspendues, avec et sans rôle explicite de vérification."],
            ["Cadre", RC]],
      pistes: ["Mesurer combien de personnes se sentent autorisées à refuser une demande de la direction.", "Tester l'effet d'une personne désignée pour exprimer le doute en réunion."],
      note: "Niveau de preuve : effets de conformité et d'obéissance bien établis, avec de fortes variations selon le contexte ; leur interprétation est débattue. Fiche liée à Autorité usurpée." },

    { id: "identite-sociale", ax: ["inf", "ent"], tag: PS, title: "Identité sociale : « nous » contre « eux »",
      teaser: "Appartenir à un groupe suffit à en favoriser les membres, et à baisser sa garde.",
      socle: ["Il suffit de répartir des personnes en groupes sur un critère arbitraire pour qu'elles favorisent les membres de leur groupe (Tajfel et coll., 1971). La théorie de l'identité sociale explique cet effet par le besoin de valoriser le groupe auquel on s'identifie (Tajfel et Turner, 1979).",
              "Deux usages offensifs en découlent. En ingénierie sociale, se présenter comme membre du même groupe (même service, même école, même métier) abaisse la vigilance. En influence politique, opposer un « nous » menacé à un « eux » responsable mobilise et polarise : on accepte plus facilement ce qui conforte son camp (Van Bavel et Pereira, 2018). Voir la fiche Désignation d'un adversaire.",
              "La défense la mieux établie est le contact : une méta-analyse de plus de 500 études associe le contact entre groupes à une baisse des préjugés (Pettigrew et Tropp, 2006). Rappeler une identité commune plus large, comme la même organisation ou le même public, est une autre piste, moins établie."],
      cas: ["Élection présidentielle américaine de 2016 : selon le rapport de la commission du renseignement du Sénat américain (2019), l'Internet Research Agency a animé des pages qui se présentaient comme issues de communautés, notamment afro-américaines, pour gagner leur confiance avant d'y diffuser ses messages. Le rapport indique qu'aucun groupe n'a été davantage ciblé que les Afro-Américains."],
      blue: [["Signaux", "interlocuteur qui insiste sur une appartenance commune (« entre collègues », « entre anciens ») pour obtenir une faveur ; message qui oppose un « nous » à un « eux » désigné comme responsable ; page ou compte qui se réclame d'une communauté sans historique vérifiable."],
             ["Contre-mesures", "appliquer la même vérification à un membre supposé du groupe qu'à un inconnu ; vérifier l'historique et l'origine des comptes communautaires ; dans la communication interne, rappeler les objectifs communs plutôt que les oppositions entre services ; favoriser les échanges réels entre équipes."]],
      red: [["Hypothèse testée", "un message fictif qui se réclame d'une appartenance professionnelle commune est-il moins vérifié qu'un message neutre ?"],
            ["Indicateur", "taux de vérification du message fictif qui se réclame d'une appartenance professionnelle commune, comparé à celui d'un message neutre au contenu identique, avec et sans la règle d'appliquer la même vérification à tous."],
            ["Cadre", RC + " Aucune appartenance politique, religieuse ou d'origine n'est utilisée."]],
      pistes: ["Cartographier les appartenances qu'un attaquant pourrait invoquer à partir de ce que l'organisation publie.", "Mesurer l'effet d'une identité commune rappelée en début d'exercice."],
      note: "Niveau de preuve : favoritisme envers son groupe et effet du contact bien établis ; ampleur variable selon les contextes. Décrit de façon symétrique : le mécanisme est employé par tous les camps." },

    { id: "engagement", ax: ["ent", "pou"], tag: PS, title: "Engagement et cohérence : l'escalade des petites demandes",
      teaser: "Après un premier oui, le second coûte moins.",
      socle: ["Une personne qui a accepté une petite demande accepte plus souvent une demande plus importante ensuite : c'est le pied dans la porte (Freedman et Fraser, 1966). Une synthèse montre que l'effet existe mais reste modeste et dépend des conditions, par exemple que la première demande ait été réellement accomplie (Burger, 1999).",
              "Variante proche, l'amorçage : obtenir un accord, puis révéler un coût plus élevé ; beaucoup maintiennent leur engagement (Cialdini et coll., 1978). Le besoin de rester cohérent avec ce qu'on a fait ou dit en est un moteur, comme le décrit la théorie de la dissonance cognitive (Festinger et Carlsmith, 1959). Et l'escalade de l'engagement prolonge un choix qui ne marche plus, parce qu'on y a déjà investi (Staw, 1976).",
              "En ingénierie sociale, l'attaquant commence par une question anodine, comme la confirmation d'une adresse ou le nom d'un responsable, puis enchaîne vers une demande d'accès ou de paiement. Dans les escroqueries sentimentales ou au faux conseiller, chaque étape franchie rend la suivante plus difficile à refuser."],
      blue: [["Signaux", "demandes qui grandissent par petites étapes ; rappel de ce qui a déjà été accepté (« vous m'avez déjà confirmé… ») ; coût révélé après l'accord ; difficulté à revenir en arrière après un premier engagement."],
             ["Contre-mesures", "évaluer chaque demande comme si elle arrivait seule ; seuils de validation qui s'appliquent quel que soit l'historique de l'échange ; droit explicite de revenir sur un accord quand les conditions changent ; point d'arrêt prévu dans les échanges longs (« je vérifie et je vous rappelle »)."]],
      red: [["Hypothèse testée", "une série de demandes fictives de plus en plus engageantes est-elle interrompue plus tôt quand un seuil de validation existe ?"],
            ["Indicateur", "rang de la demande à partir duquel la série fictive est interrompue, avec et sans seuil de validation."],
            ["Cadre", RC]],
      pistes: ["Compter, dans les cas publics, le nombre d'étapes avant la demande critique.", "Tester une consigne simple : toute demande qui change de nature repasse par un second canal."],
      note: "Niveau de preuve : effets documentés mais modestes et dépendants du contexte. Fiche liée aux techniques DIMA Pied dans la porte et coûts irrécupérables." },

    { id: "reactance", ax: ["ent", "inf"], tag: PS, title: "Réactance : quand la règle donne envie de la contourner",
      teaser: "Une règle vécue comme imposée est contournée, même quand elle protège.",
      socle: ["Quand une personne sent sa liberté menacée, elle cherche à la rétablir, parfois en faisant précisément ce qu'on lui interdit : c'est la réactance (Brehm, 1966). Une méta-analyse la décrit comme un mélange de colère et de pensées négatives envers le message (Rains, 2013) ; un ton impératif, menaçant ou culpabilisant l'augmente.",
              "Elle concerne surtout les défenseurs. Des consignes de sécurité nombreuses, changeantes ou sans explication produisent une fatigue sécuritaire : lassitude, évitement, décisions hâtives (Stanton et coll., 2016). Les utilisateurs ne sont pas l'ennemi : ils contournent les règles qui entravent leur travail, souvent faute d'en comprendre la raison (Adams et Sasse, 1999).",
              "Un attaquant peut aussi s'en servir, en présentant une consigne de sécurité comme une contrainte absurde à contourner (« le service informatique bloque tout, passez par ce lien »). Cet usage reste une hypothèse à documenter."],
      blue: [["Signaux", "règles contournées dès qu'elles gênent ; ton impératif ou culpabilisant des consignes ; multiplication des alertes et des obligations ; message qui invite à contourner une règle présentée comme absurde."],
             ["Contre-mesures", "expliquer la raison de chaque règle ; peu de règles, simples et stables ; laisser un choix entre plusieurs façons de se protéger quand c'est possible ; associer les équipes à la conception ; préférer un ton factuel au ton menaçant ; supprimer les alertes inutiles."]],
      red: [["Hypothèse testée", "une même consigne de sécurité, formulée de façon impérative ou expliquée, est-elle suivie différemment dans un exercice fictif ?"],
            ["Indicateur", "taux d'application de la consigne fictive dans sa version impérative et dans sa version expliquée, comparés entre groupes tirés au sort."],
            ["Cadre", RC]],
      pistes: ["Recenser les règles le plus souvent contournées et la justification qui leur est donnée.", "Tester des alertes plus rares mais mieux expliquées."],
      note: "Niveau de preuve : réactance bien documentée en communication ; son rôle dans le contournement des règles de sécurité est plausible et appuyé par les études sur la fatigue sécuritaire. Fiche liée aux patchs de procédure du Lexique." },

    { id: "inoculation", ax: ["inf", "ent"], tag: PS, title: "Inoculation : s'entraîner sur une version affaiblie",
      teaser: "Reconnaître une technique avant de la rencontrer en vrai.",
      socle: ["Comme un vaccin, l'inoculation expose à une version affaiblie d'une tentative de persuasion, accompagnée de sa réfutation, pour préparer à la reconnaître (McGuire et Papageorgis, 1961). Une méta-analyse confirme qu'elle réduit l'effet des tentatives ultérieures (Banas et Rains, 2010).",
              "Le prébunking applique ce principe aux techniques plutôt qu'aux contenus : apprendre à repérer le langage émotionnel, les faux dilemmes ou la désignation d'un bouc émissaire, quel que soit le sujet. Un jeu où l'on crée soi-même de fausses informations améliore leur repérage (Roozenbeek et van der Linden, 2019), et de courtes vidéos diffusées comme publicités ont produit un effet semblable à grande échelle (Roozenbeek et coll., 2022).",
              "Limites : les effets sont modestes et s'estompent en quelques semaines ou mois sans rappel (Maertens et coll., 2021). L'inoculation complète les patchs d'environnement et de procédure, elle ne les remplace pas."],
      cas: ["Campagnes de prébunking de Jigsaw (Google) à l'automne 2022 en Pologne, en Tchéquie et en Slovaquie, sur les fausses informations visant les réfugiés ukrainiens, puis en Allemagne en 2023 : de courtes vidéos montraient les techniques employées, sans traiter d'une fausse information en particulier."],
      blue: [["Signaux", "techniques de manipulation qui reviennent d'une campagne à l'autre (émotion forte, faux dilemme, bouc émissaire) ; formation unique jamais rappelée ; sensibilisation centrée sur des contenus plutôt que sur des techniques."],
             ["Contre-mesures", "montrer des exemples affaiblis des techniques réellement utilisées, avec leur réfutation ; viser les techniques plutôt que les sujets ; rappels courts et réguliers ; mesurer la détection dans le temps ; combiner avec des procédures de vérification."]],
      red: [["Hypothèse testée", "une courte séance de prébunking améliore-t-elle la détection de messages fictifs un mois plus tard, avec ou sans rappel ?"],
            ["Indicateur", "taux de détection de messages fictifs nouveaux un mois après la séance, comparé à celui d'un groupe tiré au sort qui ne l'a pas encore suivie, avec et sans rappel."],
            ["Cadre", RC]],
      pistes: ["Construire un jeu court sur les cinq leviers du site.", "Comparer l'effet d'un rappel à un mois et à trois mois."],
      note: "Niveau de preuve : efficacité documentée en laboratoire et sur le terrain, avec des effets modestes qui s'érodent. Fiche défensive, liée aux patchs d'entraînement du Lexique et à la fiche Apprentissage, oubli et durée de vie d'un patch." }
  );
  TE.TE0421 = "Biais des coûts irrécupérables";
  MAP.push(
    { label: "Normes sociales", fiche: "normes", te: ["TE0423", "TE0251"], note: "Les attaquants fabriquent des normes perçues : preuve sociale artificielle et faux consensus." },
    { label: "Obéissance et conformité", fiche: "obeissance", te: ["TE0422", "TE0423"], note: "Autorité et pression du nombre." },
    { label: "Identité sociale et biais entre groupes", fiche: "identite-sociale", te: ["TE0231", "TE0241"], note: "Homogénéité prêtée à l'autre groupe et opposition à somme nulle." },
    { label: "Engagement et cohérence", fiche: "engagement", te: ["TE0425", "TE0421"], note: "Pied dans la porte et coûts irrécupérables." },
    { label: "Réactance", fiche: "reactance", te: [], note: "Aucune technique DIMA : la réactance concerne surtout la conception des défenses, qui peuvent la provoquer." },
    { label: "Inoculation (prébunking)", fiche: "inoculation", te: [], note: "Contre-mesure transversale : aucune technique DIMA, elle prépare à en reconnaître plusieurs." }
  );
  R.cialdini1990 = ["Cialdini, R. B., Reno, R. R., & Kallgren, C. A. (1990). A focus theory of normative conduct: Recycling the concept of norms to reduce littering in public places. Journal of Personality and Social Psychology, 58(6), 1015–1026.", D + "10.1037/0022-3514.58.6.1015", 1];
  R.cialdini2003 = ["Cialdini, R. B. (2003). Crafting normative messages to protect the environment. Current Directions in Psychological Science, 12(4), 105–109.", D + "10.1111/1467-8721.01242", 1];
  R.schultz2007 = ["Schultz, P. W., Nolan, J. M., Cialdini, R. B., Goldstein, N. J., & Griskevicius, V. (2007). The constructive, destructive, and reconstructive power of social norms. Psychological Science, 18(5), 429–434.", D + "10.1111/j.1467-9280.2007.01917.x", 1];
  R.asch1956 = ["Asch, S. E. (1956). Studies of independence and conformity: I. A minority of one against a unanimous majority. Psychological Monographs: General and Applied, 70(9), 1–70.", D + "10.1037/h0093718", 1];
  R.bond1996 = ["Bond, R., & Smith, P. B. (1996). Culture and conformity: A meta-analysis of studies using Asch's (1952b, 1956) line judgment task. Psychological Bulletin, 119(1), 111–137.", D + "10.1037/0033-2909.119.1.111", 1];
  R.burger2009 = ["Burger, J. M. (2009). Replicating Milgram: Would people still obey today? American Psychologist, 64(1), 1–11.", D + "10.1037/a0010932", 1];
  R.haslam2012 = ["Haslam, S. A., & Reicher, S. D. (2012). Contesting the \"nature\" of conformity: What Milgram and Zimbardo's studies really show. PLoS Biology, 10(11), e1001426.", D + "10.1371/journal.pbio.1001426", 1];
  R.letexier2019 = ["Le Texier, T. (2019). Debunking the Stanford Prison Experiment. American Psychologist, 74(7), 823–839.", D + "10.1037/amp0000401", 1];
  R.tajfel1971 = ["Tajfel, H., Billig, M. G., Bundy, R. P., & Flament, C. (1971). Social categorization and intergroup behaviour. European Journal of Social Psychology, 1(2), 149–178.", D + "10.1002/ejsp.2420010202", 1];
  R.vanbavel2018 = ["Van Bavel, J. J., & Pereira, A. (2018). The partisan brain: An identity-based model of political belief. Trends in Cognitive Sciences, 22(3), 213–224.", D + "10.1016/j.tics.2018.01.004", 1];
  R.pettigrew2006 = ["Pettigrew, T. F., & Tropp, L. R. (2006). A meta-analytic test of intergroup contact theory. Journal of Personality and Social Psychology, 90(5), 751–783.", D + "10.1037/0022-3514.90.5.751", 1];
  R.senat2019 = ["U.S. Senate Select Committee on Intelligence (2019, 8 octobre). Report on Russian active measures campaigns and interference in the 2016 U.S. election, Volume 2: Russia's use of social media with additional views. (Rapport officiel.)", "https://www.intelligence.senate.gov/press/senate-intel-committee-releases-bipartisan-report-russia%E2%80%99s-use-social-media", 1];
  R.freedman1966 = ["Freedman, J. L., & Fraser, S. C. (1966). Compliance without pressure: The foot-in-the-door technique. Journal of Personality and Social Psychology, 4(2), 195–202.", D + "10.1037/h0023552", 1];
  R.burger1999 = ["Burger, J. M. (1999). The foot-in-the-door compliance procedure: A multiple-process analysis and review. Personality and Social Psychology Review, 3(4), 303–325.", D + "10.1207/s15327957pspr0304_2", 1];
  R.cialdini1978 = ["Cialdini, R. B., Cacioppo, J. T., Bassett, R., & Miller, J. A. (1978). Low-ball procedure for producing compliance: Commitment then cost. Journal of Personality and Social Psychology, 36(5), 463–476.", D + "10.1037/0022-3514.36.5.463", 1];
  R.festinger1959 = ["Festinger, L., & Carlsmith, J. M. (1959). Cognitive consequences of forced compliance. Journal of Abnormal and Social Psychology, 58(2), 203–210.", D + "10.1037/h0041593", 1];
  R.staw1976 = ["Staw, B. M. (1976). Knee-deep in the big muddy: A study of escalating commitment to a chosen course of action. Organizational Behavior and Human Performance, 16(1), 27–44.", D + "10.1016/0030-5073(76)90005-2", 1];
  R.brehm1966 = ["Brehm, J. W. (1966). A theory of psychological reactance. New York : Academic Press.", null, 1];
  R.rains2013 = ["Rains, S. A. (2013). The nature of psychological reactance revisited: A meta-analytic review. Human Communication Research, 39(1), 47–73.", D + "10.1111/j.1468-2958.2012.01443.x", 1];
  R.stanton2016 = ["Stanton, B., Theofanos, M. F., Prettyman, S. S., & Furman, S. (2016). Security fatigue. IT Professional, 18(5), 26–32.", D + "10.1109/MITP.2016.84", 1];
  R.adams1999 = ["Adams, A., & Sasse, M. A. (1999). Users are not the enemy. Communications of the ACM, 42(12), 40–46.", D + "10.1145/322796.322806", 1];
  R.mcguire1961 = ["McGuire, W. J., & Papageorgis, D. (1961). The relative efficacy of various types of prior belief-defense in producing immunity against persuasion. Journal of Abnormal and Social Psychology, 62(2), 327–337.", D + "10.1037/h0042026", 1];
  R.banas2010 = ["Banas, J. A., & Rains, S. A. (2010). A meta-analysis of research on inoculation theory. Communication Monographs, 77(3), 281–311.", D + "10.1080/03637751003758193", 1];
  R.roozenbeek2019 = ["Roozenbeek, J., & van der Linden, S. (2019). Fake news game confers psychological resistance against online misinformation. Palgrave Communications, 5, 65.", D + "10.1057/s41599-019-0279-9", 1];
  R.roozenbeek2022 = ["Roozenbeek, J., van der Linden, S., Goldberg, B., Rathje, S., & Lewandowsky, S. (2022). Psychological inoculation improves resilience against misinformation on social media. Science Advances, 8(34), eabo6254.", D + "10.1126/sciadv.abo6254", 1];
  R.maertens2021 = ["Maertens, R., Roozenbeek, J., Basol, M., & van der Linden, S. (2021). Long-term effectiveness of inoculation against misinformation: Three longitudinal experiments. Journal of Experimental Psychology: Applied, 27(1), 1–16.", D + "10.1037/xap0000315", 1];
  R.jigsaw2022 = ["Google, Jigsaw (2022). Campagne de prébunking en Pologne, en Tchéquie et en Slovaquie sur la désinformation visant les réfugiés ukrainiens. (Page officielle.)", "https://safety.google/stories/defanging-disinformation-in-cee/", 1];
  R.ap2023 = ["Associated Press (2023, 13 février). Google to expand misinformation 'prebunking' initiative in Europe. (Source de presse, reprise par PBS NewsHour.)", "https://www.pbs.org/newshour/politics/google-to-expand-misinformation-prebunking-initiative-in-europe", 1];
  FREFS.normes = ["cialdini1990", "cialdini2003", "schultz2007"];
  FREFS.obeissance = ["milgram1963", "burger2009", "asch1956", "bond1996", "haslam2012", "letexier2019"];
  FREFS["identite-sociale"] = ["tajfel1971", "tajfel1979", "vanbavel2018", "pettigrew2006", "senat2019"];
  FREFS.engagement = ["freedman1966", "burger1999", "cialdini1978", "festinger1959", "staw1976"];
  FREFS.reactance = ["brehm1966", "rains2013", "stanton2016", "adams1999"];
  FREFS.inoculation = ["mcguire1961", "banas2010", "roozenbeek2019", "roozenbeek2022", "maertens2021", "jigsaw2022", "ap2023"];
  SENS["Normes sociales"] = {
    plus: [["Personnes nouvelles dans un groupe", "plausible", "Elles s'appuient davantage sur ce que font les autres pour savoir ce qui est attendu."],
      ["Situations incertaines", "documenté", "La norme descriptive guide d'autant plus que la situation est floue (Cialdini et coll., 1990)."]],
    moins: [["Personnes qui connaissent la norme réelle", "plausible", "Savoir que la majorité signale corrige l'impression que personne ne le fait."],
      ["Trouble du spectre de l'autisme", "hypothèse", "Dans une tâche de dons, être observé changeait moins la générosité de 10 adultes autistes que celle de 11 témoins (Izuma et coll., 2011). L'étude ne teste pas la norme descriptive, et beaucoup d'adultes autistes décrivent au contraire un effort important pour se conformer, le camouflage social (Hull et coll., 2017). Cela ne protège pas des escroqueries (Griffiths et coll., 2019). Pour tous : connaître la norme réelle, ci-dessus."]]
  };
  SENS["Obéissance et conformité"] = {
    plus: [["Personne seule face à un groupe unanime", "documenté", "La conformité est la plus forte quand personne d'autre ne s'oppose (Asch, 1956)."],
      ["Hiérarchies où contester coûte cher", "plausible", "Le risque perçu d'un désaccord pousse à exécuter plutôt qu'à vérifier."]],
    moins: [["Personnes qui ont un allié qui refuse", "documenté", "Un seul désaccord dans le groupe fait fortement chuter la conformité (Asch, 1956)."],
      ["Organisations où le refus motivé est explicitement permis", "plausible", "Un droit écrit de suspendre une opération rend le refus légitime."]]
  };
  SENS["Identité sociale et biais entre groupes"] = {
    plus: [["Forte identification à un groupe qui se sent menacé", "plausible", "La menace renforce la défense du groupe et la méfiance envers l'extérieur."],
      ["Destinataires d'un message qui se réclame du même groupe", "plausible", "« Entre collègues », « entre nous » : l'appartenance commune baisse la vigilance."]],
    moins: [["Personnes en contact régulier avec l'autre groupe", "documenté", "Le contact entre groupes réduit les préjugés (Pettigrew et Tropp, 2006)."],
      ["Groupes qui partagent une identité plus large", "plausible", "Rappeler ce qui unit atténue l'opposition entre « eux » et « nous »."]]
  };
  SENS["Engagement et cohérence"] = {
    plus: [["Personnes déjà engagées dans un échange", "documenté", "Une première réponse rend la suivante plus probable, avec un effet modeste (Burger, 1999)."],
      ["Fort besoin de cohérence avec soi", "plausible", "Revenir sur un accord est vécu comme une incohérence coûteuse."]],
    moins: [["Personnes qui réévaluent chaque demande séparément", "plausible", "Juger la nouvelle demande comme si elle arrivait seule coupe l'escalade."],
      ["Procédures avec des seuils de validation", "plausible", "Au-delà d'un montant ou d'un niveau d'accès, la demande repasse par un second regard, quel que soit l'historique."]]
  };
  SENS["Réactance"] = {
    plus: [["Personnes très attachées à leur autonomie", "plausible", "La réactance varie selon les personnes : certaines vivent plus vite une consigne comme une contrainte."],
      ["Équipes soumises à des règles nombreuses et sans explication", "plausible", "La fatigue sécuritaire mène à l'évitement et au contournement (Stanton et coll., 2016)."]],
    moins: [["Personnes associées à la conception des règles", "plausible", "Une règle comprise et discutée est vécue comme un choix, pas comme une contrainte."]]
  };
  SENS["Inoculation (prébunking)"] = {
    plus: [["Personnes jamais exposées aux techniques", "plausible", "Sans exemple préalable, une technique de manipulation est plus difficile à reconnaître."],
      ["Formation ancienne, sans rappel", "documenté", "L'effet protecteur s'estompe en quelques semaines ou mois sans rappel (Maertens et coll., 2021)."]],
    moins: [["Personnes récemment formées par prébunking", "documenté", "Voir une technique en version affaiblie améliore sa détection (Roozenbeek et coll., 2022)."]]
  };
  GLOSS.push(
    ["Norme descriptive, norme prescriptive", "Ce que la plupart des gens font ; ce qu'ils approuvent ou désapprouvent."],
    ["Conformité", "Alignement de son jugement ou de sa conduite sur celui d'un groupe."],
    ["Identité sociale", "Part de l'image de soi qui vient des groupes auxquels on appartient."],
    ["Technique de l'amorçage", "Obtenir un accord, puis révéler un coût plus élevé que prévu."],
    ["Réactance", "Réaction de défense de sa liberté face à une pression perçue, qui pousse à faire l'inverse de ce qui est demandé."],
    ["Inoculation (prébunking)", "Exposition préventive à une version affaiblie d'une technique de manipulation, avec sa réfutation."],
    ["Fatigue sécuritaire", "Lassitude face à des consignes de sécurité trop nombreuses, qui conduit à les éviter ou à les contourner."]
  );

  /* ---------- Cours rédigés : victimologie, vieillissement, TCC, méthodes, ergonomie, épistémologie ---------- */
  FICHES.push(
    { id: "victimologie", ax: ["ent", "tra"], tag: "Psychologie clinique", title: "Après l'escroquerie : honte, silence et revictimisation",
      teaser: "Une victime qui se tait est une victime qu'on peut tromper à nouveau.",
      socle: ["L'escroquerie ne coûte pas seulement de l'argent. Les victimes de fraude décrivent de la honte, de la colère, une perte de confiance et parfois des effets sur la santé et sur la famille, que la somme perdue soit grande ou petite (Button et coll., 2014).",
              "Beaucoup ne signalent pas les faits. La honte et la crainte d'être jugées y jouent un rôle, entretenues par une idée répandue : seules les personnes naïves ou cupides se feraient avoir (Cross, 2015). Celles qui signalent rapportent souvent un accueil décevant et un manque de soutien (Cross et coll., 2016).",
              "Le silence a un coût : une personne déjà escroquée peut être sollicitée à nouveau, par exemple par un faux service qui promet de récupérer les fonds contre paiement. Côté défense, la priorité est double : accueillir sans blâmer, et prévenir ces secondes escroqueries."],
      blue: [["Signaux", "personne qui minimise ou cache une perte ; contact inattendu qui propose de récupérer les fonds contre paiement ou contre des coordonnées ; collègue qui n'ose pas dire qu'il a cliqué ; isolement après les faits."],
             ["Contre-mesures", "accueillir sans reproche ni ironie ; orienter vers l'assistance officielle (en France, 17Cyber, ouvert fin 2024 par la police, la gendarmerie et Cybermalveillance.gouv.fr) et vers le dépôt de plainte ; prévenir qu'aucun service sérieux ne fait payer la récupération des fonds ; en entreprise, garantir qu'un clic signalé ne sera pas sanctionné ; proposer un soutien psychologique quand le choc est fort."]],
      red: [["Hypothèse testée", "après un exercice fictif, un débriefing sans reproche augmente-t-il les signalements lors de l'exercice suivant, par rapport à un débriefing qui insiste sur l'échec ?"],
            ["Indicateur", "taux de signalement à l'exercice suivant, selon que le débriefing précédent était sans reproche ou centré sur l'échec."],
            ["Cadre", RC]],
      pistes: ["Recenser les canaux par lesquels une personne peut signaler une erreur sans honte dans une organisation.", "Mesurer le délai entre une erreur et son signalement selon la culture de l'équipe."],
      note: "Niveau de preuve : impact des fraudes et sous-signalement documentés ; la revictimisation par de faux services de récupération est décrite par les organismes de protection des consommateurs. Fiche liée à Effet spectateur." },

    { id: "vieillissement-confiance", ax: ["ent", "tra"], tag: NP, title: "Vieillissement et confiance : un facteur de risque, pas une fatalité",
      teaser: "Avec l'âge, les signaux de méfiance s'atténuent, mais la plupart des personnes âgées ne sont pas victimes.",
      socle: ["Dans une étude, des adultes âgés ont jugé plus dignes de confiance que des adultes jeunes des visages perçus comme peu fiables, avec une moindre activation de l'insula antérieure, une région liée aux signaux de méfiance (Castle et coll., 2012). Ils repèrent aussi moins bien le mensonge (Ruffman et coll., 2012).",
              "Ces différences s'inscrivent dans une évolution plus large : quand l'horizon de temps perçu se raccourcit, l'attention se porte davantage sur les relations et les informations positives (Carstensen, 2006). C'est une force pour le bien-être, mais un escroc qui se montre chaleureux en tire parti.",
              "Le risque ne tient pas à l'âge lui-même. Un modèle de synthèse le relie à la combinaison d'un déclin cognitif, de l'isolement social et de facteurs émotionnels (Spreng et coll., 2016). La plupart des personnes âgées ne sont pas victimes : les protéger, c'est agir sur ces facteurs sans les infantiliser. Voir aussi la fiche Déclin cognitif et vulnérabilité à la fraude."],
      blue: [["Signaux", "nouvel interlocuteur très chaleureux qui s'impose vite ; demande de discrétion vis-à-vis des proches ; urgence financière présentée comme une affaire de confiance ; changement soudain d'habitudes bancaires."],
             ["Contre-mesures", "un tiers de confiance choisi à l'avance pour toute décision financière inhabituelle ; des règles simples et écrites (on ne donne jamais un code par téléphone) ; alertes et plafonds bancaires ; garder le lien social ; informer sans infantiliser."]],
      red: [["Hypothèse testée", "une règle écrite et un tiers de confiance réduisent-ils, dans un exercice de lecture de messages fictifs, les réponses aux demandes chaleureuses mais suspectes ?"],
            ["Indicateur", "part des réponses aux demandes fictives chaleureuses mais suspectes, avec et sans règle écrite et tiers de confiance, chez des participants volontaires, dans une tâche de jugement annoncée, sans envoi surprise, avec des résultats par groupe."],
            ["Cadre", RC + " Participation volontaire, aucune personne vulnérable mise en difficulté."]],
      pistes: ["Construire avec des associations de personnes âgées des messages d'entraînement réalistes et respectueux.", "Comparer l'effet d'un tiers de confiance et celui d'une simple information."],
      note: "Niveau de preuve : différences liées à l'âge documentées, souvent sur de petits échantillons et en laboratoire ; modèle de risque issu d'une revue de littérature. Ne pas généraliser à l'ensemble des personnes âgées." },

    { id: "plans-si-alors", ax: ["ent", "pou"], tag: "Psychologie clinique", title: "Plans « si… alors » et réévaluation : des outils des TCC contre la pression",
      teaser: "Décider à l'avance de ce qu'on fera quand l'urgence arrivera.",
      socle: ["Les thérapies cognitives et comportementales (TCC) apprennent à repérer les pensées automatiques, à les examiner et à préparer d'autres réponses. Deux de leurs outils, étudiés aussi hors de la clinique, se transposent bien à la défense contre la manipulation.",
              "Le premier est la réévaluation : changer l'interprétation d'une situation plutôt que réprimer l'émotion qu'elle provoque. Elle diminue l'émotion ressentie, alors que la répression la laisse intacte et pèse sur la mémoire (Gross, 2002). Devant une demande pressante, se dire « l'urgence est un signal d'alerte, pas une raison d'agir » est une réévaluation.",
              "Le second est le plan si… alors, ou intention de mise en œuvre : « si on me demande un virement urgent, alors je raccroche et je rappelle le numéro de l'annuaire ». Formulé à l'avance, il se déclenche presque automatiquement dans la situation prévue (Gollwitzer, 1999) ; une méta-analyse trouve un effet moyen à fort sur l'atteinte des objectifs (Gollwitzer et Sheeran, 2006). Son efficacité contre l'ingénierie sociale reste à mesurer."],
      blue: [["Signaux", "réaction immédiate à une demande pressante, sans étape de vérification ; consignes générales (« soyez vigilants ») sans réponse concrète ; stress vécu comme une raison d'agir."],
             ["Contre-mesures", "écrire avec chaque équipe deux ou trois plans si… alors pour les demandes à risque ; les répéter en exercice ; afficher la réponse attendue près des postes concernés ; apprendre à nommer l'urgence comme un signal (« je sens de la pression, donc je vérifie »)."]],
      red: [["Hypothèse testée", "un plan si… alors formulé avant un exercice fictif augmente-t-il la part des demandes urgentes vérifiées par un second canal ?"],
            ["Indicateur", "part des demandes urgentes fictives vérifiées par un second canal, avec et sans plan si… alors formulé à l'avance."],
            ["Cadre", RC]],
      pistes: ["Construire une bibliothèque de plans si… alors pour les cinq leviers du site.", "Comparer un plan rédigé par la personne elle-même et un plan imposé."],
      note: "Niveau de preuve : réévaluation et intentions de mise en œuvre bien documentées ; leur application à l'ingénierie sociale est plausible mais pas encore mesurée. Fiche liée au levier Urgence." },

    { id: "analyse-exercice", ax: ["tra"], tag: "Mesure", title: "Lire les résultats d'un exercice : taux, sensibilité et critère",
      teaser: "Un taux de clic qui baisse ne prouve pas que l'équipe repère mieux.",
      socle: ["Un exercice d'hameçonnage produit d'abord des taux : clics, saisies d'identifiants, signalements. Ils dépendent autant du message choisi que de la vigilance : un message facile fait baisser les clics sans que personne ne soit devenu plus attentif.",
              "La théorie de la détection du signal sépare deux choses que ces taux mélangent : la sensibilité (d'), c'est-à-dire la capacité à distinguer un message piégé d'un message légitime, et le critère (c), la tendance à signaler dans le doute (Stanislaw et Todorov, 1999 ; Macmillan et Creelman, 2005). Une équipe qui signale tout a beaucoup de bonnes détections, mais aussi beaucoup de fausses alertes. Appliquée à l'hameçonnage, cette approche montre que repérer un piège et décider d'agir sont deux décisions distinctes (Canfield et coll., 2016).",
              "Sur de petits effectifs, les écarts d'une campagne à l'autre sont souvent du bruit. Mieux vaut donner un intervalle, comparer des messages de difficulté proche et suivre les signalements autant que les clics. C'est le calcul qu'utilise l'outil « Repère la faille » du Labo."],
      blue: [["Signaux", "taux de clic présenté seul ; comparaison entre campagnes aux messages différents ; conclusions tirées de quelques dizaines de personnes ; fausses alertes jamais comptées."],
             ["Contre-mesures", "compter signalements et fausses alertes ; calculer d' et c quand c'est possible ; donner des intervalles plutôt que des chiffres secs ; comparer à difficulté égale ; présenter les résultats par équipe, jamais par personne."]],
      red: [["Hypothèse testée", "deux campagnes fictives de difficulté différente produisent-elles des taux de clic différents alors que la sensibilité d' reste la même ?"],
            ["Indicateur", "taux de clic, taux de signalement, sensibilité d' et critère c de chaque campagne, avec leurs intervalles, présentés par équipe d'au moins 10 personnes."],
            ["Cadre", RC]],
      pistes: ["Proposer un modèle de tableau de bord qui montre d', c et les signalements.", "Recalculer d'anciennes campagnes avec ces mesures."],
      note: "Niveau de preuve : cadre statistique établi ; son usage en entreprise demande des effectifs suffisants. Fiche liée à Psychophysique et analyse des signaux et au Labo." },

    { id: "plan-exercice", ax: ["tra"], tag: "Méthode", title: "Concevoir un exercice qui mesure vraiment",
      teaser: "Avant, après : la différence ne dit rien sans point de comparaison.",
      socle: ["Comparer une campagne avant et après une formation semble simple, mais beaucoup d'autres choses changent entre les deux : la difficulté des messages, la période, la nouveauté de l'exercice, le bouche-à-oreille. Sans groupe de comparaison, on ne sait pas ce qui a produit l'écart (Shadish et coll., 2002).",
              "Trois précautions limitent ces biais : tirer au sort qui reçoit quoi et quand ; contrebalancer, en faisant recevoir les mêmes messages dans un ordre différent ; noter la difficulté des messages, par exemple avec l'échelle de difficulté de l'hameçonnage proposée par le NIST (Steves et coll., 2020). Deux grandes études en entreprise montrent l'intérêt de cette rigueur : mesurée ainsi, la formation seule protège peu (Lain et coll., 2022 ; Ho et coll., 2025).",
              "La psychologie sociale offre d'autres outils que l'expérience de terrain : les vignettes (des situations écrites à juger), l'observation des pratiques réelles, les entretiens. Ils mesurent moins directement le comportement, mais posent moins de problèmes éthiques. Décider à l'avance de ce qu'on mesurera, et l'écrire, évite de retenir après coup les résultats qui arrangent."],
      blue: [["Signaux", "comparaison avant-après sans groupe témoin ; messages plus faciles après la formation qu'avant ; indicateur choisi après avoir vu les résultats ; échantillon trop petit pour conclure."],
             ["Contre-mesures", "groupe de comparaison tiré au sort ; mêmes messages en ordre contrebalancé ; difficulté notée avant l'envoi ; indicateurs fixés et écrits à l'avance ; effectifs suffisants, ou résultats présentés comme exploratoires."]],
      red: [["Hypothèse testée", "une formation améliore-t-elle la détection quand on la compare à un groupe tiré au sort qui ne l'a pas encore suivie ?"],
            ["Indicateur", "écart de détection entre le groupe formé et le groupe tiré au sort qui ne l'est pas encore, avec son intervalle et l'effectif annoncé."],
            ["Cadre", RC]],
      pistes: ["Rédiger un modèle de protocole d'exercice en une page.", "Noter la difficulté des messages du Labo avec une échelle commune."],
      note: "Niveau de preuve : principes méthodologiques établis. Fiche liée à Lire les résultats d'un exercice et à Simuler une attaque sans trahir." },

    { id: "ethique-simulation", ax: ["tra", "ent"], tag: "Méthode", title: "Simuler une attaque sans trahir : consentement, tromperie et débriefing",
      teaser: "Un exercice qui humilie fait perdre plus de sécurité qu'il n'en apporte.",
      socle: ["Un exercice d'hameçonnage réaliste suppose de tromper les participants. La recherche n'accepte la tromperie qu'à des conditions strictes : elle doit être justifiée, sans alternative raisonnable, ne pas causer de tort sérieux, et être suivie d'un débriefing rapide (American Psychological Association, 2017, normes 8.07 et 8.08). Le code de déontologie des psychologues et la déclaration d'Helsinki posent des exigences proches.",
              "Ces règles valent aussi en entreprise, où se posent des questions propres : accord de l'organisation et information générale des équipes, absence de sanction individuelle, données agrégées, choix des leurres (Resnik et Finn, 2018). Un leurre qui joue sur une prime, la santé ou l'emploi peut blesser et détruire la confiance envers l'équipe de sécurité.",
              "Le cadre de ce site en découle : exercices fictifs, participants informés, indicateurs agrégés, débriefing, aucune personne désignée. Un exercice réussi n'est pas celui qui piège le plus, mais celui qui laisse les équipes plus capables et plus confiantes."],
      cas: ["GoDaddy (décembre 2020) : environ 500 salariés ont reçu un faux courriel promettant une prime de fin d'année de 650 dollars. Ceux qui avaient cliqué ont appris deux jours plus tard qu'ils avaient échoué à un test et devaient refaire une formation ; l'entreprise s'est excusée (Bell, 2020).",
            "West Midlands Trains (mai 2021) : environ 2 500 salariés ont reçu un message semblant venir de la direction, qui promettait une prime pour leur travail pendant la pandémie. C'était un exercice d'hameçonnage ; le syndicat TSSA l'a jugé « grossier et répréhensible », l'entreprise l'a défendu (Coble, 2021)."],
      blue: [["Signaux", "exercice lancé sans cadre écrit ; leurre qui promet une prime, menace l'emploi ou touche à la santé ; résultats individuels diffusés ; aucun débriefing prévu ; participants qui découvrent l'exercice par la sanction."],
             ["Contre-mesures", "cadre écrit validé par la direction et les représentants du personnel ; information générale des équipes sur l'existence des exercices ; liste de leurres interdits ; débriefing rapide et bienveillant ; données agrégées ; possibilité de se retirer."]],
      red: [["Hypothèse testée", "informer les équipes de l'existence des exercices, sans date ni contenu, change-t-il la mesure par rapport à des exercices non annoncés, et améliore-t-il la confiance envers l'équipe de sécurité ?"],
            ["Indicateur", "écart de détection entre exercices annoncés et non annoncés, et confiance envers l'équipe de sécurité, mesurée par questionnaire anonyme dans les deux conditions."],
            ["Cadre", RC]],
      pistes: ["Rédiger une charte d'exercice type, inspirée des comités d'éthique de la recherche.", "Recenser les leurres à proscrire et les remplacer par des équivalents neutres."],
      note: "Niveau de preuve : principes éthiques établis ; leur application aux exercices en entreprise fait l'objet de discussions. Fiche liée à la page Chapeaux." },

    { id: "facteurs-humains", ax: ["ent", "tra"], tag: "Ergonomie", title: "Facteurs humains : concevoir pour l'erreur plutôt que contre l'utilisateur",
      teaser: "Les erreurs sont inévitables ; les accidents viennent des systèmes qui ne les rattrapent pas.",
      socle: ["Deux façons de voir l'erreur s'opposent. L'approche centrée sur la personne cherche un coupable ; l'approche systémique considère l'erreur comme normale et demande à l'organisation de prévoir des défenses successives, comme des tranches de fromage suisse dont les trous ne doivent pas s'aligner (Reason, 2000).",
              "Toutes les erreurs ne se ressemblent pas. Les ratés et les oublis surviennent dans des gestes routiniers ; les fautes viennent d'un mauvais raisonnement ; les violations sont des écarts volontaires, souvent pour gagner du temps (Reason, 1990). Chacune appelle une parade différente : rappels et vérifications, formation, ou règles plus simples.",
              "En sécurité informatique, les règles qui gênent le travail sont contournées (Adams et Sasse, 1999) : chacun dispose d'un budget de conformité limité, que des exigences trop nombreuses épuisent (Beautement et coll., 2008). Une procédure qui résiste à l'erreur demande peu d'effort, s'insère dans le travail et fait de chacun un capteur qui signale plutôt qu'un maillon faible."],
      blue: [["Signaux", "recherche d'un coupable après chaque incident ; règles contournées de façon répétée ; procédures longues sur des gestes fréquents ; incidents évités de justesse jamais rapportés."],
             ["Contre-mesures", "analyser les incidents sans chercher de coupable ; recenser les contournements et en comprendre la raison ; ajouter des défenses indépendantes plutôt qu'une seule règle stricte ; simplifier les gestes fréquents ; encourager le signalement des incidents évités de justesse."]],
      red: [["Hypothèse testée", "une procédure de vérification simplifiée est-elle davantage appliquée, dans un exercice fictif, qu'une procédure complète mais longue ?"],
            ["Indicateur", "taux d'application de la procédure simplifiée et de la procédure complète, et nombre de contournements déclarés pour chacune."],
            ["Cadre", RC]],
      pistes: ["Cartographier les tranches de défense d'un circuit de paiement.", "Mesurer le temps que chaque règle de sécurité coûte aux équipes."],
      note: "Niveau de preuve : modèles bien établis en sécurité industrielle et médicale ; leur transposition à la sécurité informatique est documentée. Fiche liée à Réactance et à Contrôle exécutif." },

    { id: "niveaux-preuve", ax: ["tra", "inf"], tag: "Méthode", title: "Niveaux de preuve : documenté, plausible, hypothèse",
      teaser: "Une étude n'est pas une preuve, et un effet célèbre n'est pas toujours solide.",
      socle: ["Ce site classe chaque affirmation en trois niveaux. Documenté : établi par plusieurs études concordantes, idéalement des méta-analyses. Plausible : appuyé indirectement, ou par des études peu nombreuses. Hypothèse : piste à tester. Cette prudence répond à un problème réel de la recherche en psychologie.",
              "Une vaste tentative de reproduire 100 études publiées en psychologie a obtenu des résultats significatifs dans un peu plus d'un tiers des cas, avec des effets en moyenne moitié moindres que dans les études originales (Open Science Collaboration, 2015). Petits échantillons, analyses choisies après coup et préférence des revues pour les résultats positifs expliquent qu'une part des résultats publiés soient faux (Ioannidis, 2005). Le « réalisme dépressif », l'idée que les personnes déprimées jugeraient plus lucidement leur contrôle sur les événements (Alloy et Abramson, 1979), en est un exemple : son effet est très faible dans une méta-analyse (Moore et Fresco, 2012) et ne se retrouve pas dans une réplication préenregistrée (Dev et coll., 2022).",
              "Des parades existent : méta-analyses, réplications et préenregistrement, qui consiste à déposer à l'avance hypothèses et analyses (Nosek et coll., 2018). Pour un lecteur, quelques questions suffisent : combien de participants ? L'effet a-t-il été reproduit ? Qui a financé l'étude ? Les campagnes de désinformation exploitent volontiers une étude isolée présentée comme une preuve définitive."],
      blue: [["Signaux", "« une étude montre que… » sans référence ni taille d'échantillon ; effet spectaculaire jamais reproduit ; chiffre repris de source en source sans l'original ; certitude affichée sur un sujet débattu."],
             ["Contre-mesures", "remonter à la source originale ; chercher une méta-analyse ou une réplication ; noter la taille de l'échantillon ; préciser le niveau de preuve quand on cite ; préenregistrer ses propres exercices."]],
      red: [["Hypothèse testée", "des participants entraînés à trois questions (échantillon, réplication, financement) repèrent-ils mieux des affirmations scientifiques fictives exagérées ?"],
            ["Indicateur", "part des affirmations fictives exagérées correctement repérées, avant et après l'entraînement aux trois questions, comparée à un groupe tiré au sort qui ne l'a pas encore suivi."],
            ["Cadre", RC]],
      pistes: ["Ajouter à chaque fiche une ligne qui justifie son niveau de preuve.", "Créer un exercice du Labo sur les fausses preuves scientifiques."],
      note: "Niveau de preuve : crise de la réplication documentée en psychologie ; son ampleur varie selon les domaines. Fiche de méthode, liée à la page Références." }
  );
  MAP.push(
    { label: "Après l'escroquerie : victimes et revictimisation", fiche: "victimologie", te: [], note: "Fiche consacrée à l'après-coup : aucune technique DIMA." },
    { label: "Vieillissement et confiance", fiche: "vieillissement-confiance", te: ["TE0332", "TE0422"], note: "Familiarité et autorité apparente ; rapprochement partiel." },
    { label: "Plans si… alors et réévaluation", fiche: "plans-si-alors", te: ["TE0424", "TE0414"], note: "Contre-mesure : prépare une réponse aux leviers d'urgence et de peur de rater." },
    { label: "Lire les résultats d'un exercice", fiche: "analyse-exercice", te: [], note: "Fiche méthodologique : aucune technique DIMA." },
    { label: "Concevoir un exercice qui mesure vraiment", fiche: "plan-exercice", te: [], note: "Fiche méthodologique : aucune technique DIMA." },
    { label: "Éthique des exercices de simulation", fiche: "ethique-simulation", te: [], note: "Fiche de cadre : aucune technique DIMA." },
    { label: "Facteurs humains et erreur", fiche: "facteurs-humains", te: [], note: "Fiche de conception : aucune technique DIMA." },
    { label: "Niveaux de preuve", fiche: "niveaux-preuve", te: ["TE0222"], note: "Le biais de confirmation fait retenir l'étude qui arrange ; rapprochement partiel." }
  );
  R.button2014 = ["Button, M., Lewis, C., & Tapley, J. (2014). Not a victimless crime: The impact of fraud on individual victims and their families. Security Journal, 27(1), 36–54.", D + "10.1057/sj.2012.11", 1];
  R.cross2015 = ["Cross, C. (2015). No laughing matter: Blaming the victim of online fraud. International Review of Victimology, 21(2), 187–204.", D + "10.1177/0269758015571471", 1];
  R.cross2016 = ["Cross, C., Richards, K., & Smith, R. G. (2016). The reporting experiences and support needs of victims of online fraud. Trends & Issues in Crime and Criminal Justice, 518. Australian Institute of Criminology.", "https://www.aic.gov.au/publications/tandi/tandi518", 1];
  R.castle2012 = ["Castle, E., Eisenberger, N. I., Seeman, T. E., Moons, W. G., Boggero, I. A., Grinblatt, M. S., & Taylor, S. E. (2012). Neural and behavioral bases of age differences in perceptions of trust. Proceedings of the National Academy of Sciences, 109(51), 20848–20852.", D + "10.1073/pnas.1218518109", 1];
  R.carstensen2006 = ["Carstensen, L. L. (2006). The influence of a sense of time on human development. Science, 312(5782), 1913–1915.", D + "10.1126/science.1127488", 1];
  R.ruffman2012 = ["Ruffman, T., Murray, J., Halberstadt, J., & Vater, T. (2012). Age-related differences in deception. Psychology and Aging, 27(3), 543–549.", D + "10.1037/a0023380", 1];
  R.gollwitzer1999 = ["Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. American Psychologist, 54(7), 493–503.", D + "10.1037/0003-066X.54.7.493", 1];
  R.gollwitzer2006 = ["Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38, 69–119.", D + "10.1016/S0065-2601(06)38002-1", 1];
  R.gross2002 = ["Gross, J. J. (2002). Emotion regulation: Affective, cognitive, and social consequences. Psychophysiology, 39(3), 281–291.", D + "10.1017/S0048577201393198", 1];
  R.stanislaw1999 = ["Stanislaw, H., & Todorov, N. (1999). Calculation of signal detection theory measures. Behavior Research Methods, Instruments, & Computers, 31(1), 137–149.", D + "10.3758/BF03207704", 1];
  R.macmillan2005 = ["Macmillan, N. A., & Creelman, C. D. (2005). Detection theory: A user's guide (2e éd.). Lawrence Erlbaum Associates.", null, 1];
  R.canfield2016 = ["Canfield, C. I., Fischhoff, B., & Davis, A. (2016). Quantifying phishing susceptibility for detection and behavior decisions. Human Factors, 58(8), 1158–1172.", D + "10.1177/0018720816665025", 1];
  R.shadish2002 = ["Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002). Experimental and quasi-experimental designs for generalized causal inference. Houghton Mifflin.", null, 1];
  R.steves2020 = ["Steves, M., Greene, K., & Theofanos, M. (2020). Categorizing human phishing difficulty: A Phish Scale. Journal of Cybersecurity, 6(1), tyaa009.", D + "10.1093/cybsec/tyaa009", 1];
  R.resnik2018 = ["Resnik, D. B., & Finn, P. R. (2018). Ethics and phishing experiments. Science and Engineering Ethics, 24(4), 1241–1252.", D + "10.1007/s11948-017-9952-9", 1];
  R.apa2017 = ["American Psychological Association (2017). Ethical principles of psychologists and code of conduct (2002, amendé en 2010 et 2017 ; normes 8.07 et 8.08).", "https://www.apa.org/ethics/code", 1];
  R.reason2000 = ["Reason, J. (2000). Human error: Models and management. BMJ, 320(7237), 768–770.", D + "10.1136/bmj.320.7237.768", 1];
  R.reason1990 = ["Reason, J. (1990). Human error. Cambridge University Press.", null, 1];
  R.beautement2008 = ["Beautement, A., Sasse, M. A., & Wonham, M. (2008). The compliance budget: Managing security behaviour in organisations. Proceedings of the 2008 New Security Paradigms Workshop, 47–58.", D + "10.1145/1595676.1595684", 1];
  R.osc2015 = ["Open Science Collaboration (2015). Estimating the reproducibility of psychological science. Science, 349(6251), aac4716.", D + "10.1126/science.aac4716", 1];
  R.ioannidis2005 = ["Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124.", D + "10.1371/journal.pmed.0020124", 1];
  R.nosek2018 = ["Nosek, B. A., Ebersole, C. R., DeHaven, A. C., & Mellor, D. T. (2018). The preregistration revolution. Proceedings of the National Academy of Sciences, 115(11), 2600–2606.", D + "10.1073/pnas.1708274114", 1];
  R.bell2020 = ["Bell, K. (2020, 24 décembre). GoDaddy phishing 'test' teased employees with a fake holiday bonus. Engadget.", "https://www.engadget.com/godaddy-sent-fake-phising-email-promising-holiday-bonus-220756457.html", 1];
  R.coble2021 = ["Coble, S. (2021, 10 mai). Staff bonus was \"crass\" phishing simulation. Infosecurity Magazine.", "https://www.infosecurity-magazine.com/news/staff-bonus-was-crass-phishing/", 1];
  FREFS.victimologie = ["button2014", "cross2015", "cross2016"];
  FREFS["vieillissement-confiance"] = ["castle2012", "ruffman2012", "carstensen2006", "spreng2016"];
  FREFS["plans-si-alors"] = ["gross2002", "gollwitzer1999", "gollwitzer2006"];
  FREFS["analyse-exercice"] = ["stanislaw1999", "macmillan2005", "canfield2016"];
  FREFS["plan-exercice"] = ["shadish2002", "steves2020", "lain2022", "ho2025"];
  FREFS["ethique-simulation"] = ["apa2017", "resnik2018", "deonto", "helsinki", "bell2020", "coble2021"];
  FREFS["facteurs-humains"] = ["reason2000", "reason1990", "adams1999", "beautement2008"];
  FREFS["niveaux-preuve"] = ["osc2015", "ioannidis2005", "nosek2018"];
  SENS["Après l'escroquerie : victimes et revictimisation"] = {
    plus: [["Victimes récentes d'une escroquerie", "plausible", "Elles peuvent être sollicitées à nouveau, notamment par de faux services de récupération des fonds."],
      ["Personnes isolées après les faits", "plausible", "La honte pousse à se taire, ce qui prive de soutien et de conseils."]],
    moins: [["Victimes accueillies sans jugement", "plausible", "Un accueil qui ne blâme pas favorise le signalement et l'accès aux bons conseils."]]
  };
  SENS["Vieillissement et confiance"] = {
    plus: [["Personnes âgées isolées", "documenté", "L'isolement s'ajoute aux changements liés à l'âge dans les modèles de risque (Spreng et coll., 2016)."],
      ["Déclin cognitif débutant", "documenté", "Il réduit la capacité à repérer une demande anormale, souvent sans que la personne en ait conscience."]],
    moins: [["Personnes âgées entourées, avec un tiers de confiance", "plausible", "Un proche consulté avant toute décision inhabituelle sert de second canal."]]
  };
  SENS["Plans si… alors et réévaluation"] = {
    plus: [["Personnes sans réponse préparée", "plausible", "Sous pression, sans plan, on improvise et l'urgence décide."]],
    moins: [["Personnes qui ont formulé un plan si… alors", "plausible", "La réponse préparée se déclenche dans la situation prévue (Gollwitzer et Sheeran, 2006)."]]
  };
  SENS["Lire les résultats d'un exercice"] = {
    plus: [["Exercices jugés sur le seul taux de clic", "plausible", "Le chiffre dépend autant du message choisi que de la vigilance des équipes."]],
    moins: [["Exercices qui comptent aussi signalements et fausses alertes", "documenté", "Sensibilité et critère se calculent séparément (Stanislaw et Todorov, 1999)."]]
  };
  SENS["Concevoir un exercice qui mesure vraiment"] = {
    plus: [["Exercices sans groupe de comparaison", "documenté", "L'écart avant-après mélange l'effet de la formation et tout ce qui a changé entre-temps (Shadish et coll., 2002)."]],
    moins: [["Exercices tirés au sort et préparés à l'avance", "documenté", "Le tirage au sort rend les groupes comparables."]]
  };
  SENS["Éthique des exercices de simulation"] = {
    plus: [["Participants piégés sans débriefing", "plausible", "Ils retiennent l'humiliation plus que la leçon, et signalent moins ensuite."]],
    moins: [["Équipes informées du principe des exercices", "plausible", "Savoir que des exercices existent, sans en connaître la date, préserve la confiance."]]
  };
  SENS["Facteurs humains et erreur"] = {
    plus: [["Organisations qui cherchent un coupable", "plausible", "Les erreurs y sont cachées, donc jamais corrigées."],
      ["Équipes chargées de règles nombreuses", "documenté", "Le budget de conformité s'épuise et les contournements se multiplient (Beautement et coll., 2008)."]],
    moins: [["Organisations qui analysent les incidents sans blâme", "plausible", "Les incidents évités de justesse remontent et les défenses s'améliorent."]]
  };
  SENS["Niveaux de preuve"] = {
    plus: [["Lecteurs pressés devant un chiffre spectaculaire", "plausible", "Un résultat frappant circule plus vite que sa réfutation."]],
    moins: [["Personnes formées à lire une étude", "plausible", "Trois questions simples (échantillon, réplication, financement) suffisent à repérer bien des exagérations."]]
  };
  GLOSS.push(
    ["Revictimisation", "Fait d'être à nouveau victime, par exemple d'un faux service qui promet de récupérer les fonds perdus."],
    ["Réévaluation cognitive", "Stratégie qui change l'interprétation d'une situation pour en modifier l'émotion."],
    ["Plan si… alors (intention de mise en œuvre)", "Plan qui associe à l'avance une situation précise à une réponse précise."],
    ["Sensibilité (d') et critère (c)", "En théorie de la détection du signal : capacité à distinguer un signal d'un bruit, et tendance à répondre « signal » dans le doute."],
    ["Contrebalancement", "Présentation des mêmes conditions dans des ordres différents pour neutraliser l'effet de l'ordre."],
    ["Débriefing", "Entretien qui suit un exercice ou une expérience : on explique ce qui s'est passé, on répond aux questions, on rassure."],
    ["Modèle du fromage suisse", "Représentation des défenses d'un système comme des tranches successives dont les failles ne doivent pas s'aligner."],
    ["Budget de conformité", "Quantité limitée d'efforts qu'une personne consacre aux règles de sécurité avant de les contourner."],
    ["Préenregistrement", "Dépôt public des hypothèses et des analyses d'une étude avant de recueillir les données."],
    ["Crise de la réplication", "Constat qu'une part importante des résultats publiés, notamment en psychologie, ne se reproduit pas."]
  );

  /* ---------- Psychopathologies concernées : protéger et renforcer la résilience ----------
     [groupe, troubles réunis, noms repris de PSY (pour retrouver les fiches concernées), protéger, renforcer,
     fiche dont l'indicateur permet de tester la protection sur la procédure].
     Chaque mesure reprend une contre-mesure ou un constat déjà présent dans les fiches. */
  var RESIL = [
    ["Troubles neurocognitifs et lésions cérébrales acquises", "Maladie d'Alzheimer et autres troubles neurocognitifs, démence fronto-temporale, syndromes amnésiques, lésions frontales ou de l'hémisphère droit.",
      ["Troubles neurocognitifs", "Troubles neurocognitifs (dont maladie d'Alzheimer)", "Maladie d'Alzheimer", "Atteintes frontales (lésion, démence fronto-temporale)", "Démence fronto-temporale (variant comportemental)", "Syndromes amnésiques (lésion hippocampique, syndrome de Korsakoff)", "Lésions préfrontales ventromédianes", "Lésions de l'hémisphère droit", "Syndrome dysexécutif (atteinte frontale)", "Amnésie et troubles de la mémoire de source (atteinte frontale)"],
      "Un délai avant tout paiement important, des alertes et des plafonds bancaires que la personne choisit d'activer, une personne de confiance qu'elle désigne elle-même, et, en dernier recours, une mesure de protection juridique décidée par le juge, la moins contraignante possible, ou anticipée par la personne (mandat de protection future). Des procédures courtes, écrites et visibles, qui remplacent le souvenir par une aide externe.",
      "Des routines répétées plutôt qu'une formation ponctuelle : dans les syndromes amnésiques, l'apprentissage procédural est souvent préservé. Des rappels fréquents, un apprentissage sans erreur, le lien social maintenu, et une information qui ne retire ni la dignité ni le droit de décider.", "declin-fraude"],
    ["TDAH et syndromes dysexécutifs", "Trouble déficit de l'attention avec ou sans hyperactivité, difficultés de planification et d'inhibition.",
      ["TDAH", "Syndrome dysexécutif (lésions frontales, TDAH)"],
      "Une friction volontaire sur toute action irréversible : confirmation explicite, délai ou double validation. Aucune opération sensible traitée en multitâche, des listes de contrôle courtes et moins de notifications non essentielles.",
      "Des plans « si… alors » préparés à l'avance (« si c'est urgent, je rappelle »), puis répétés en exercice. Un poste de travail qui limite les interruptions au moment des décisions sensibles.", "controle-executif"],
    ["Troubles anxieux et stress post-traumatique", "Trouble anxieux généralisé, anxiété d'évaluation, trouble de stress post-traumatique.",
      ["Troubles anxieux", "Trouble anxieux généralisé", "Troubles anxieux (anxiété d'évaluation)", "Trouble de stress post-traumatique", "État de stress post-traumatique"],
      "Le droit écrit de prendre le temps de vérifier et de faire remonter un doute sans reproche. Des flux d'information filtrés plutôt que bruts, une communication régulière et prévisible, et des exercices sans stress au-delà du réaliste, avec un arrêt possible à tout moment.",
      "Apprendre à nommer la pression comme un signal (« je sens de l'urgence, donc je vérifie ») grâce à la réévaluation et aux plans « si… alors » issus des TCC. Un soutien après incident, sans reproche, et des exercices dont la mesure ne confond pas anxiété de test et manque de vigilance.", "plans-si-alors"],
    ["Anxiété sociale et personnalité dépendante", "Trouble d'anxiété sociale, trouble de la personnalité dépendante.",
      ["Trouble d'anxiété sociale", "Trouble de la personnalité dépendante"],
      "Le droit de refuser et de rappeler, écrit dans la procédure et valable même face à un supérieur. Une phrase toute prête pour suspendre un échange (« je vérifie et je vous rappelle »), une règle claire sur les faveurs, et la consigne de ne rien confirmer sans vérification.",
      "Répéter ces phrases en exercice jusqu'à ce qu'elles deviennent automatiques, valoriser publiquement les refus motivés, et proposer un accompagnement adapté si la personne le souhaite.", "obeissance"],
    ["Dépression", "Épisode dépressif, avec ou sans apathie et perte d'initiative.",
      ["Dépression", "Dépression (apathie, perte d'initiative)"],
      "Proposer, si la personne le souhaite, de prendre à deux les décisions importantes ; un délai avant tout engagement, et des aides externes (listes, rappels) quand la concentration baisse.",
      "Des rappels espacés plutôt qu'une session unique, le soutien de l'entourage, un retour sans culpabilisation après une erreur, et l'orientation vers le soin quand c'est utile.", "decision-emotion"],
    ["Épisodes maniaques ou hypomaniaques et addictions comportementales", "Épisodes maniaques ou hypomaniaques d'un trouble bipolaire, jeu pathologique et autres addictions comportementales.",
      ["Épisode maniaque ou hypomaniaque (trouble bipolaire)", "Jeu pathologique et addictions comportementales", "Addictions comportementales"],
      "Des plafonds et des délais bancaires, un tiers de confiance choisi par la personne pour les décisions financières inhabituelles, des pauses et des limites par défaut, et moins de notifications.",
      "Convenir à l'avance, en période stable et à la demande de la personne, des garde-fous qu'elle souhaite voir appliquer pendant une phase difficile.", "vieillissement-confiance"],
    ["Spectre psychotique et traits paranoïaques", "Schizophrénie et troubles du spectre psychotique, idées de référence, traits de personnalité paranoïaque.",
      ["Schizophrénie", "Schizophrénie et spectre psychotique", "Troubles du spectre psychotique", "Troubles psychotiques (idées de référence)", "Traits de personnalité paranoïaque"],
      "Une communication claire, stable et cohérente, avec moins d'informations ambiguës. Des consignes explicites plutôt qu'implicites, et une vérification de l'identité par un canal indépendant plutôt que par l'interprétation des intentions.",
      "Orienter vers un soutien adapté plutôt que démentir en bloc, s'appuyer sur des repères fixes et partagés, et construire les messages de prévention avec les personnes concernées, des pairs aidants et les soignants.", "saillance-aberrante"],
    ["Trouble du spectre de l'autisme", "Différences dans la communication sociale, l'implicite et le traitement sensoriel.",
      ["Trouble du spectre de l'autisme"],
      "Des consignes écrites et explicites, et des vérifications qui ne reposent pas sur la lecture des intentions : rappeler sur un numéro connu, vérifier le rôle annoncé par un autre canal.",
      "Une procédure claire protège sans dépendre du flair social. L'hypothèse de la double empathie (Milton, 2012) rappelle que la difficulté de compréhension est réciproque : les formations se conçoivent avec les personnes concernées.", "theorie-esprit"],
    ["Troubles sensoriels, perceptifs et des apprentissages", "Prosopagnosie, cécité et malvoyance, daltonisme, agnosies visuelles, héminégligence, dyslexie.",
      ["Prosopagnosie", "Prosopagnosie (agnosie des visages)", "Cécité (périphérique ou corticale)", "Cécité corticale et syndrome d'Anton", "Achromatopsie et daltonismes", "Agnosies visuelles (aperceptive, associative)", "Syndrome de Balint et simultanagnosie", "Héminégligence", "Troubles spécifiques des apprentissages (dyslexie)"],
      "Des vérifications qui ne reposent pas sur la vue : un code ou une question convenus à l'avance, un rappel sur un numéro connu. Des versions accessibles (texte, audio, lecteur d'écran), des couleurs lisibles par les personnes daltoniennes, et des exercices écrits sans chronomètre ou avec un temps adapté.",
      "Associer ces personnes à la conception des procédures : une vérification pensée pour elles peut aussi servir à tout le monde.", "visages"],
    ["Surcharge, épuisement et isolement", "Des états ou des situations, pas des troubles : épuisement professionnel ou informationnel, isolement social marqué.",
      ["Épuisement professionnel (état de surcharge, pas un trouble)", "Épuisement informationnel (état de surcharge, pas un trouble)", "Isolement social marqué (facteur de risque, pas un trouble)"],
      "Alléger la charge au moment des décisions sensibles, prévoir des relais et des temps de récupération, et limiter l'exposition aux flux bruts.",
      "Garder le lien social, encourager l'entraide dans l'équipe, et rendre le signalement simple et remercié.", "memoire-travail"]
  ];

  /* Quand une particularité rend moins sensible à un biais précis : références vérifiées (Crossref) */
  R.demartino2008 = ["De Martino, B., Harrison, N. A., Knafo, S., Bird, G., & Dolan, R. J. (2008). Explaining enhanced logical consistency during decision making in autism. The Journal of Neuroscience, 28(42), 10746–10750. (14 adultes autistes et 15 témoins : effet de cadrage réduit, pas absent.)", D + "10.1523/JNEUROSCI.2895-08.2008", 1];
  R.farmer2017 = ["Farmer, G. D., Baron-Cohen, S., & Skylark, W. J. (2017). People with autism spectrum conditions make more consistent decisions. Psychological Science, 28(8), 1067–1076. (Étude préenregistrée en ligne, 90 autistes et 212 témoins : effet de leurre réduit, écart faible.)", D + "10.1177/0956797617694867", 1];
  R.izuma2011 = ["Izuma, K., Matsumoto, K., Camerer, C. F., & Adolphs, R. (2011). Insensitivity to social reputation in autism. Proceedings of the National Academy of Sciences, 108(42), 17302–17307. (10 adultes autistes et 11 témoins.)", D + "10.1073/pnas.1107038108", 1];
  R.griffiths2019 = ["Griffiths, S., Allison, C., Kenny, R., Holt, R., Smith, P., & Baron-Cohen, S. (2019). The Vulnerability Experiences Quotient (VEQ): A study of vulnerability, mental health and life satisfaction in autistic adults. Autism Research, 12(10), 1516–1528. (426 autistes et 268 témoins : 48 % contre 20 % déclarent avoir été trompés ou poussés à donner de l'argent ; correctif de 2026 sans effet sur les conclusions.)", D + "10.1002/aur.2162", 1];
  R.dima2009 = ["Dima, D., Roiser, J. P., Dietrich, D. E., Bonnemann, C., Lanfermann, H., Emrich, H. M., & Dillo, W. (2009). Understanding why patients with schizophrenia do not perceive the hollow-mask illusion using dynamic causal modelling. NeuroImage, 46(4), 1180–1186.", D + "10.1016/j.neuroimage.2009.03.033", 1];
  R.dudley2016 = ["Dudley, R., Taylor, P., Wickham, S., & Hutton, P. (2016). Psychosis, delusions and the « jumping to conclusions » reasoning bias: A systematic review and meta-analysis. Schizophrenia Bulletin, 42(3), 652–665.", D + "10.1093/schbul/sbv150", 1];
  R.koenigs2008 = ["Koenigs, M., & Tranel, D. (2008). Prefrontal cortex damage abolishes brand-cued changes in cola preference. Social Cognitive and Affective Neuroscience, 3(1), 1–6. (12 patients avec lésion ventromédiane.)", D + "10.1093/scan/nsm032", 1];
  R.alloy1979 = ["Alloy, L. B., & Abramson, L. Y. (1979). Judgment of contingency in depressed and nondepressed students: Sadder but wiser? Journal of Experimental Psychology: General, 108(4), 441–485.", D + "10.1037/0096-3445.108.4.441", 1];
  R.moore2012 = ["Moore, M. T., & Fresco, D. M. (2012). Depressive realism: A meta-analytic review. Clinical Psychology Review, 32(6), 496–509. (75 études : effet global très faible, qui dépend de la méthode.)", D + "10.1016/j.cpr.2012.05.004", 1];
  R.dev2022 = ["Dev, A. S., Moore, D. A., Johnson, S. L., & Garrett, K. T. (2022). Sadder ≠ wiser: Depressive realism is not robust to replication. Collabra: Psychology, 8(1), 38529. (Réplication préenregistrée : aucun lien entre symptômes dépressifs et illusion de contrôle.)", D + "10.1525/collabra.38529", 1];
  FREFS["cadrage-agenda"].push("demartino2008", "farmer2017", "griffiths2019");
  FREFS.pragmatique.push("demartino2008", "griffiths2019");
  FREFS.normes.push("izuma2011", "griffiths2019");
  FREFS["perception-reconstruction"].push("dima2009", "dudley2016");
  FREFS["decision-emotion"].push("koenigs2008", "asp2012");
  FREFS["niveaux-preuve"].push("alloy1979", "moore2012", "dev2022");
  R.milton2012 = ["Milton, D. E. M. (2012). On the ontological status of autism: The « double empathy problem ». Disability & Society, 27(6), 883–887.", D + "10.1080/09687599.2012.710008", 1];
  R.hull2017 = ["Hull, L., Petrides, K. V., Allison, C., Smith, P., Baron-Cohen, S., Lai, M.-C., & Mandy, W. (2017). « Putting on my best normal »: Social camouflaging in adults with autism spectrum conditions. Journal of Autism and Developmental Disorders, 47(8), 2519–2534.", D + "10.1007/s10803-017-3166-5", 1];
  FREFS["theorie-esprit"].push("milton2012");
  FREFS.normes.push("hull2017");

  /* ---------- Blog : billets (date au format AAAA-MM-JJ) ---------- */
  R.maybin2017 = ["Maybin, S. (2017, 10 mars). Busting the attention span myth. BBC News.", "https://www.bbc.com/news/health-38896790", 0];
  R.andrzejewski2024 = ["Andrzejewski, D., Zeilinger, E. L., & Pietschnig, J. (2024). Is there a Flynn effect for attention? Cross-temporal meta-analytical evidence for better test performance (1990–2021). Personality and Individual Differences, 216, 112417.", D + "10.1016/j.paid.2023.112417", 1];
  R.schelenz2024 = ["Schelenz, R. (2024, 2 janvier). How to sharpen your attention and meet your goals in 2024 [entretien avec G. Mark]. UC Newsroom, University of California.", "https://www.universityofcalifornia.edu/news/how-sharpen-your-attention-and-meet-your-goals-2024", 1];
  R.mark2016 = ["Mark, G., Iqbal, S. T., Czerwinski, M., Johns, P., & Sano, A. (2016). Neurotics can't focus: An in situ study of online multitasking in the workplace. Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems, 1739–1744.", D + "10.1145/2858036.2858202", 1];
  R.lorenzspreen2019 = ["Lorenz-Spreen, P., Mønsted, B. M., Hövel, P., & Lehmann, S. (2019). Accelerating dynamics of collective attention. Nature Communications, 10, 1759.", D + "10.1038/s41467-019-09311-w", 1];
  R.hallin1992 = ["Hallin, D. C. (1992). Sound bite news: Television coverage of elections, 1968–1988. Journal of Communication, 42(2), 5–24.", D + "10.1111/j.1460-2466.1992.tb00775.x", 1];
  R.sangar2018 = ["Sangar, E. (2018, 11 juin). Comment analyser le(s) rôle(s) des émotions dans les relations internationales? ABSP, Association belge francophone de science politique.", "https://absp.be/article/comment-analyser-les-roles-des-emotions-dans-les-relations-internationales/", 1];
  R.clement2017 = ["Clément, M., Lindemann, T., & Sangar, E. (2017). The \"Hero-Protector Narrative\": Manufacturing emotional consent for the use of force. Political Psychology, 38(6), 991–1008.", D + "10.1111/pops.12385", 1];
  R.clementsangar2018 = ["Clément, M., & Sangar, E. (dir.) (2018). Researching emotions in international relations: Methodological perspectives on the emotional turn. Palgrave Macmillan.", D + "10.1007/978-3-319-65575-8", 1];
  R.moisi2026 = ["Moïsi, D. (2026, 17 juin). Quand la géopolitique est dominée par les émotions [entretien recueilli par A. Piveteau]. Polytechnique Insights.", "https://www.polytechnique-insights.com/tribunes/geopolitique/quand-la-geopolitique-est-dominee-par-les-emotions/", 0];
  R.hochschild1979 = ["Hochschild, A. R. (1979). Emotion work, feeling rules, and social structure. American Journal of Sociology, 85(3), 551–575.", D + "10.1086/227049", 0];
  R.paez2015 = ["Páez, D., Rimé, B., Basabe, N., Wlodarczyk, A., & Zumeta, L. (2015). Psychosocial effects of perceived emotional synchrony in collective gatherings. Journal of Personality and Social Psychology, 108(5), 711–729.", D + "10.1037/pspi0000014", 1];
  R.deleersnyder2014 = ["De Leersnyder, J., Mesquita, B., Kim, H., Eom, K., & Choi, H. (2014). Emotional fit with culture: A predictor of individual differences in relational well-being. Emotion, 14(2), 241–245.", D + "10.1037/a0035296", 1];
  R.goldenberg2014 = ["Goldenberg, A., Saguy, T., & Halperin, E. (2014). How group-based emotions are shaped by collective emotions: Evidence for emotional transfer and emotional burden. Journal of Personality and Social Psychology, 107(4), 581–596.", D + "10.1037/a0037462", 1];
  R.noelleneumann1974 = ["Noelle-Neumann, E. (1974). The spiral of silence: A theory of public opinion. Journal of Communication, 24(2), 43–51.", D + "10.1111/j.1460-2466.1974.tb00367.x", 0];
  R.matthes2018 = ["Matthes, J., Knoll, J., & von Sikorski, C. (2018). The \"spiral of silence\" revisited: A meta-analysis on the relationship between perceptions of opinion support and political opinion expression. Communication Research, 45(1), 3–33.", D + "10.1177/0093650217745429", 1];
  R.prentice1993 = ["Prentice, D. A., & Miller, D. T. (1993). Pluralistic ignorance and alcohol use on campus: Some consequences of misperceiving the social norm. Journal of Personality and Social Psychology, 64(2), 243–256.", D + "10.1037/0022-3514.64.2.243", 1];
  R.bursztyn2020 = ["Bursztyn, L., González, A. L., & Yanagizawa-Drott, D. (2020). Misperceived social norms: Women working outside the home in Saudi Arabia. American Economic Review, 110(10), 2997–3029.", D + "10.1257/aer.20180975", 1];
  R.keller2020 = ["Keller, F. B., Schoch, D., Stier, S., & Yang, J. (2020). Political astroturfing on Twitter: How to coordinate a disinformation campaign. Political Communication, 37(2), 256–280.", D + "10.1080/10584609.2019.1661888", 1];
  R.brady2021 = ["Brady, W. J., McLoughlin, K., Doan, T. N., & Crockett, M. J. (2021). How social learning amplifies moral outrage expression in online social networks. Science Advances, 7(33), eabe5641.", D + "10.1126/sciadv.abe5641", 1];
  R.houde2025 = ["Houde, A.-M. (2025). Emotions, International Relations, and the everyday: Individuals' emotional attachments to international organisations. Review of International Studies, 51(3), 504–522. Publié en ligne en 2023.", D + "10.1017/S0260210523000554", 0];
  var BILLETS = [
    { id: "attention-discours", type: "Réflexion", date: "2026-10-31",
      title: "Court et marquant : ce que la course à l'attention fait au discours politique",
      lead: "Pour être entendu, un discours politique a de plus en plus besoin d'être court et marquant. Mais les données racontent autre chose qu'une simple baisse de notre attention.",
      sections: [
        { h: "Mon point de départ", p: [
          "On entend partout que les gens ont de moins en moins d'attention. J'en tire une conséquence : un discours politique doit être assez court et assez marquant pour avoir une chance d'être écouté. Les sources confirment cette conséquence, mais elles obligent à préciser le constat."
        ] },
        { h: "Ce que disent les sources", p: [
          '<ul class="plain">' +
          "<li><b>Le chiffre des huit secondes ne prouve rien.</b> Ce chiffre, « moins qu'un poisson rouge », est très repris, mais son origine est contestée (Maybin, 2017, référence à contrôler).</li>" +
          "<li><b>La capacité ne semble pas s'effondrer.</b> Entre 1990 et 2021, sur 287 échantillons et 21 291 personnes de 32 pays, les adultes gagnent modérément en concentration à un test d'attention. Les enfants n'y gagnent pas : ils vont plus vite et font plus d'erreurs (Andrzejewski et coll., 2024). Ce n'est qu'un seul test.</li>" +
          "<li><b>Nos usages changent.</b> Chez des travailleurs de l'information, Gloria Mark rapporte environ 2 min 30 sur un écran avant de changer dans sa première étude, publiée en 2004, et une moyenne de 47 secondes sur des études de 2016-2020 (Schelenz, 2024). Une de ces études donne une médiane de 40 secondes (Mark et coll., 2016). C'est le temps passé sur un écran, pas une capacité d'attention.</li>" +
          "<li><b>L'attention collective s'accélère.</b> Chaque sujet retient l'attention du public moins longtemps. La cause principale avancée, à partir d'un modèle volontairement simple, est la hausse des contenus produits et consommés (Lorenz-Spreen et coll., 2019). Cette étude porte sur les sujets, pas sur les personnes.</li>" +
          "<li><b>Le format rétrécit depuis longtemps.</b> Dans des échantillons de journaux du soir des grandes chaînes américaines, la citation moyenne en période d'élection présidentielle passe de 43 secondes en 1968 à 9 secondes en 1988 (Hallin, 1992), bien avant les réseaux sociaux.</li>" +
          "</ul>"
        ] },
        { h: "Ce que j'en retiens", p: [
          "Ce qui manque n'est peut-être pas notre capacité d'attention, mais la place pour s'en servir : trop de messages se disputent le même temps. C'est une hypothèse. Elle mène à la même conclusion pratique : sans version courte et marquante, un discours a peu de chances d'être entendu.",
          "Faire court n'est pas manipuler. Tous les camps le font, et la clarté respecte celles et ceux qui écoutent. Mais une phrase laisse forcément de côté des conditions, des chiffres et des objections. Une formule courte se répète aussi plus facilement, et la répétition rend une affirmation plus familière, donc plus crédible. La version courte devrait donc toujours renvoyer à une version longue, facile à trouver."
        ] },
        { h: "Un test à faire soi-même", p: [
          "Prenez cinq phrases politiques qui vous ont marqué cette semaine, venues de camps différents. Pour chacune, cherchez la source et la version longue. Notez deux choses : combien de phrases vous avez pu sourcer, et combien changent de sens une fois replacées dans leur contexte. Recommencez un mois plus tard.",
          "C'est une idée personnelle, pas une méthode évaluée. Sans groupe de comparaison, ce test ne prouve rien : il sert à voir ce que le format retire."
        ] }
      ],
      fiches: ["cadrage-agenda", "memoire-sources", "attention-selective"],
      refs: ["maybin2017", "andrzejewski2024", "schelenz2024", "mark2016", "lorenzspreen2019", "hallin1992"] },
    { id: "emotions-relations-internationales", type: "Ressource", date: "2026-10-31",
      title: "À lire : étudier les émotions en relations internationales",
      lead: "Un billet d'Eric Sangar, publié en 2018 par l'Association belge francophone de science politique, sur une question difficile : comment savoir ce que les émotions font vraiment à la politique internationale ?",
      sections: [
        { h: "Ce que dit le texte", p: [
          "En théorie des relations internationales, un « tournant émotionnel » s'est dessiné depuis les années 1990 : les émotions y deviennent un objet de recherche. Elles restent pourtant difficiles à saisir, et les chercheurs ne s'accordent pas sur leur nature. L'auteur demande donc un choix de méthode conscient et transparent, et présente six débats de méthode tirés d'un ouvrage collectif (Clément et Sangar, 2018).",
          '<p><a href="https://absp.be/article/comment-analyser-les-roles-des-emotions-dans-les-relations-internationales/" target="_blank" rel="noopener">Lire le billet sur le site de l\'ABSP</a></p>'
        ] },
        { h: "L'exemple qui m'intéresse", p: [
          "Le billet s'appuie sur un article de son auteur et de ses collègues. Ils y comparent des discours favorables et opposés au recours à la force. Les premiers, dont ceux de George W. Bush et d'Oussama Ben Laden sur la guerre d'Irak, partagent un récit qui combine compassion, colère morale et identification à un héros : le « récit du héros-protecteur » (Clément, Lindemann et Sangar, 2017).",
          "La comparaison porte sur la structure du récit, pas sur les personnes ni sur leurs actes. Le résumé de l'article ne fait état d'aucune mesure de l'effet sur le public : il décrit un récit, sans dire s'il convainc."
        ] },
        { h: "Une autre lecture, à mettre en regard", p: [
          "Dans un entretien, le géopolitologue Dominique Moïsi propose une lecture plus large : des émotions collectives comme l'espoir, la peur ou l'humiliation aideraient à comprendre le monde actuel, et les émotions négatives auraient pris le dessus depuis 2022. Il distingue l'émotion, plus brève, de la passion, plus durable, et estime que les réseaux sociaux amplifient les émotions (Moïsi, 2026).",
          "C'est un point de vue d'expert : l'entretien ne donne ni chiffres ni références, et prêter une émotion à toute une région reste une généralisation. Les deux textes se complètent : l'un propose une grille de lecture, l'autre demande comment vérifier ce que les émotions font vraiment.",
          '<p><a href="https://www.polytechnique-insights.com/tribunes/geopolitique/quand-la-geopolitique-est-dominee-par-les-emotions/" target="_blank" rel="noopener">Lire l\'entretien sur Polytechnique Insights</a></p>'
        ] },
        { h: "Pourquoi je le garde", p: [
          'Il complète mon billet sur <a href="#billet-attention-discours">le discours court et marquant</a>. Mon hypothèse : une phrase courte garde rarement les arguments, mais elle garde plus facilement une histoire et les émotions qu\'elle porte.',
          "Devant un discours, de n'importe quel camp, ces questions aident à voir le récit : qui est présenté comme victime, comme coupable, comme héros ? Quelle action paraît alors inévitable ? Quelles autres options ont disparu ?"
        ] }
      ],
      fiches: ["decision-emotion", "cadrage-agenda"],
      refs: ["sangar2018", "clement2017", "clementsangar2018", "moisi2026"] },
    { id: "hors-du-climat-emotionnel", type: "Réflexion", date: "2026-10-31",
      title: "Quand on ne ressent pas ce que son pays semble ressentir",
      lead: "Deuil, fierté, colère : il arrive qu'une émotion paraisse partagée par tout un pays. Que se passe-t-il pour celles et ceux qui ne la ressentent pas, et pourquoi cet écart compte-t-il face à l'influence ?",
      sections: [
        { h: "De quoi je parle", p: [
          "Après un attentat, une victoire sportive, une élection ou le début d'une guerre, une émotion semble parfois occuper toute la place. Certaines personnes ne la ressentent pas, ou en ressentent une autre. Cela peut tenir à leur histoire, à leur groupe, à leurs convictions ou au moment de leur vie.",
          "Ce décalage n'est ni un trouble ni une trahison. Et l'émotion « du pays » est en partie une impression : on voit surtout celles et ceux qui l'expriment, pas celles et ceux qui se taisent."
        ] },
        { h: "Ce que la recherche permet de dire", p: [
          '<ul class="plain">' +
          "<li><b>Il existe des règles implicites.</b> Arlie Hochschild parle de règles de sentiment : des attentes sur ce qu'il convient de ressentir dans une situation (Hochschild, 1979, référence à contrôler).</li>" +
          "<li><b>Ressentir ensemble peut faire du bien.</b> Dans des marches folkloriques et des manifestations, la synchronie émotionnelle perçue accompagne une identité collective, une intégration sociale et une estime de soi plus fortes (Páez et coll., 2015). L'étude ne dit rien de celles et ceux qui ne participent pas.</li>" +
          "<li><b>L'ajustement émotionnel est lié aux relations.</b> Aux États-Unis, en Belgique et en Corée, être ajusté émotionnellement à sa culture est associé au bien-être relationnel (De Leersnyder et coll., 2014). C'est une association, pas une cause, et elle porte sur la culture plutôt que sur un événement national.</li>" +
          "<li><b>Le décalage ne fait pas que réduire au silence.</b> Quand une personne juge une émotion appropriée mais perçoit que son groupe ne la ressent pas, elle peut la ressentir plus fortement et se sentir responsable de la porter au nom du groupe. Les auteurs parlent de fardeau émotionnel (Goldenberg et coll., 2014).</li>" +
          "<li><b>Se croire minoritaire pèse sur la prise de parole, un peu.</b> C'est l'idée de la spirale du silence (Noelle-Neumann, 1974, référence à contrôler). Une méta-analyse de 66 études trouve un lien faible mais significatif entre le climat d'opinion perçu et le fait de s'exprimer (r = 0,10 ; Matthes et coll., 2018). Ces travaux portent sur les opinions : les étendre aux émotions est mon hypothèse.</li>" +
          "<li><b>On peut se croire seul à tort.</b> Des étudiants se croyaient tous plus mal à l'aise que l'étudiant moyen face aux pratiques d'alcool du campus, et cet écart illusoire était lié à un sentiment d'éloignement (Prentice et Miller, 1993). En Arabie saoudite, de jeunes hommes mariés sous-estimaient le soutien de leurs pairs au travail des femmes hors du foyer. Corriger cette croyance a accru leur disposition à aider leur épouse à chercher un emploi, et ces épouses ont ensuite davantage postulé (Bursztyn et coll., 2020). Là encore, il s'agit de normes, pas d'émotions.</li>" +
          "<li><b>Ne rien montrer ne veut pas dire ne rien ressentir.</b> Dans 21 groupes de discussion menés en Belgique, en France, en Italie et au Portugal au printemps 2019, Anne-Marie Houde observe des attachements émotionnels à l'Union européenne, souvent implicites, qui peuvent passer pour de l'indifférence. Les participants les plus eurosceptiques jugent négative cette difficulté à imaginer leur pays hors de l'Union. L'échantillon n'est pas représentatif, et l'autrice appelle à davantage de recherches sur les attachements négatifs (Houde, 2025).</li>" +
          "</ul>"
        ] },
        { h: "Pourquoi cet écart compte face à l'influence", p: [
          "Ce qui suit est mon analyse. Elle s'appuie sur ces travaux, mais aucune étude citée ne la mesure directement. Tous les camps peuvent être concernés.",
          '<ul class="plain">' +
          "<li><b>Une émotion peut paraître plus partagée qu'elle ne l'est.</b> Lors de la présidentielle sud-coréenne de 2012, des agents coordonnés du service de renseignement se sont fait passer pour des citoyens indépendants sur Twitter. Les auteurs concluent toutefois à un impact limité (Keller et coll., 2020).</li>" +
          "<li><b>Ce qu'on voit en ligne n'est pas un sondage.</b> Sur Twitter, le retour social positif rend l'indignation future plus probable, et les utilisateurs ajustent leur indignation aux normes de leur réseau (Brady et coll., 2021).</li>" +
          "<li><b>Le décalage peut servir de prise, de deux façons.</b> On peut désigner celles et ceux qui ne ressentent pas la même chose comme des traîtres. On peut aussi leur offrir une communauté de remplacement, où eux seuls verraient clair. Dans les deux cas, on transforme une différence ordinaire en frontière entre « nous » et « eux ».</li>" +
          "</ul>"
        ] },
        { h: "Ce qui pourrait protéger", p: [
          "Pour soi : avant de conclure qu'on est seul, distinguer ce qu'on voit passer de ce qui a été mesuré. Un fil d'actualité ne dit pas ce que ressent un pays.",
          "Pour celles et ceux qui informent : éviter « les Français sont en colère » quand seule une partie l'exprime, et montrer l'éventail des réactions quand il est connu. Et ne jamais exiger d'une personne qu'elle affiche une émotion.",
          "Pour un groupe en formation, un test à essayer : demander de façon anonyme à chacun ce qu'il ressent face à une actualité, et ce qu'il pense que les autres ressentent. L'indicateur est l'écart entre les deux, en résultat de groupe. On montre ensuite les résultats, et on mesure à nouveau cet écart sur un autre sujet quelques semaines plus tard.",
          "Ce test transpose aux émotions un résultat obtenu sur les normes : il reste à évaluer. Il demande le consentement des participants, et il ne doit jamais servir à repérer ou à surveiller quelqu'un."
        ] }
      ],
      fiches: ["normes", "identite-sociale", "adversaire", "inondation"],
      refs: ["hochschild1979", "paez2015", "deleersnyder2014", "goldenberg2014", "noelleneumann1974", "matthes2018", "prentice1993", "bursztyn2020", "houde2025", "keller2020", "brady2021"] }
  ];

  /* ---------- Tables (DIMA, lexique) ---------- */
  /* Filters of the DIMA table: a condition or situation from « Plus sensibles », a practice from « Ce qui protège », a DIMA technique.
     A condition written differently from one fiche to another is brought together under one name, so that a person finds at once
     every lever that concerns them; the states marked « pas un trouble » keep their name without that remark. */
  var DCANON = {};
  [["Schizophrénie et troubles psychotiques", ["Schizophrénie", "Schizophrénie et spectre psychotique", "Troubles du spectre psychotique", "Troubles psychotiques (idées de référence)"]],
    ["Troubles neurocognitifs (dont maladie d'Alzheimer)", ["Troubles neurocognitifs", "Troubles neurocognitifs (dont maladie d'Alzheimer)", "Maladie d'Alzheimer"]],
    ["Démence fronto-temporale et atteintes frontales", ["Démence fronto-temporale (variant comportemental)", "Atteintes frontales (lésion, démence fronto-temporale)", "Syndrome dysexécutif (atteinte frontale)", "Lésions préfrontales ventromédianes", "Amnésie et troubles de la mémoire de source (atteinte frontale)"]],
    ["Troubles anxieux", ["Troubles anxieux", "Trouble anxieux généralisé", "Troubles anxieux (anxiété d'évaluation)"]],
    ["Stress post-traumatique", ["Trouble de stress post-traumatique", "État de stress post-traumatique"]],
    ["Dépression", ["Dépression", "Dépression (apathie, perte d'initiative)"]],
    ["Prosopagnosie", ["Prosopagnosie", "Prosopagnosie (agnosie des visages)"]],
    ["Addictions comportementales (dont jeu pathologique)", ["Jeu pathologique et addictions comportementales", "Addictions comportementales"]],
    ["TDAH", ["TDAH", "Syndrome dysexécutif (lésions frontales, TDAH)"]],
    ["Trouble bipolaire (épisodes maniaques ou hypomaniaques)", ["Épisode maniaque ou hypomaniaque (trouble bipolaire)"]]
  ].forEach(function (c) { c[1].forEach(function (v) { DCANON[v] = c[0]; }); });
  function canonOf(n) { return DCANON[n] || String(n).replace(/ \((?:facteur de risque|état de surcharge), pas un trouble\)$/, ""); }
  function sensName(x) { return typeof x === "string" ? x : x.note ? "" : x[0]; }
  function isClinical(n) { return !/pas un trouble/.test(n) && Object.keys(PSY).some(function (k) { return PSY[k].some(function (p) { return p[0] === n; }); }); }
  var dPlus = {}, dMoins = {}, dFilter = { plus: "", moins: "", te: "" };
  MAP.forEach(function (m) {
    var s = SENS[m.label] || {};
    (s.plus || []).forEach(function (x) { var n = sensName(x); if (n) dPlus[canonOf(n)] = dPlus[canonOf(n)] || isClinical(n); });
    (s.moins || []).forEach(function (x) { var n = sensName(x); if (n) dMoins[canonOf(n)] = dMoins[canonOf(n)] || isClinical(n); });
  });
  var frSort = function (a, b) { return a.localeCompare(b, "fr", { sensitivity: "base" }); };
  function optionsHTML(all, groups) {
    return '<option value="">' + all + '</option>' + groups.map(function (g) {
      return g[1].length ? '<optgroup label="' + g[0] + '">' + g[1].sort(frSort).map(function (v) { return '<option>' + v + '</option>'; }).join("") + '</optgroup>' : '';
    }).join("");
  }
  $("f-plus").innerHTML = optionsHTML("Tous les troubles et situations", [
    ["Troubles et états de santé", Object.keys(dPlus).filter(function (k) { return dPlus[k]; })],
    ["Situations", Object.keys(dPlus).filter(function (k) { return !dPlus[k]; })]]);
  $("f-moins").innerHTML = optionsHTML("Toutes les protections", [
    ["Moins sensibles à un biais précis", Object.keys(dMoins).filter(function (k) { return dMoins[k]; })],
    ["Pratiques et profils", Object.keys(dMoins).filter(function (k) { return !dMoins[k]; })]]);
  $("f-te").innerHTML = '<option value="">Toutes les techniques</option>' + ["1", "2", "3", "4"].map(function (p) {
    return '<optgroup label="Phase ' + DIMA_PHASE[p] + '">' + Object.keys(TE).filter(function (t) { return t.charAt(3) === p; }).sort().map(function (t) {
      return '<option value="' + t + '">' + t + ' · ' + TE[t] + '</option>';
    }).join("") + '</optgroup>';
  }).join("");
  /* The RESIL card that gathers the protections for a condition, if there is one */
  function resilOf(c) { for (var i = 0; i < RESIL.length; i++) if (RESIL[i][2].some(function (v) { return canonOf(v) === c; })) return i; return -1; }
  function renderDima() {
    var f = dFilter;
    var rows = MAP.filter(function (m) {
      var s = SENS[m.label] || {};
      return (!f.plus || (s.plus || []).some(function (x) { var n = sensName(x); return n && canonOf(n) === f.plus; })) &&
        (!f.moins || (s.moins || []).some(function (x) { var n = sensName(x); return n && canonOf(n) === f.moins; })) &&
        (!f.te || m.te.indexOf(f.te) !== -1);
    });
    $("dima-body").innerHTML = rows.length ? rows.map(function (m) {
      var name = m.fiche ? '<a href="#fiche-' + m.fiche + '">' + m.label + '</a>' : m.label;
      return '<tr><td>' + name + '</td><td>' + chipsHTML(m.te) + '</td><td>' + m.note + '</td><td>' + sensListHTML(m.label, "plus", f.plus) + '</td><td>' + sensListHTML(m.label, "moins", f.moins) + '</td></tr>';
    }).join("") : '<tr><td colspan="5">Aucun levier ni aucune fiche ne correspond à ces filtres.</td></tr>';
    if (f.te) Array.prototype.forEach.call($("dima-body").querySelectorAll('.chip[data-te="' + f.te + '"]'), function (c) { c.classList.add("on"); });
    var n = rows.length, on = f.plus || f.moins || f.te, msg = [];
    var cnt = n + " levier" + (n > 1 ? "s" : "") + " ou fiche" + (n > 1 ? "s" : "");
    if (f.plus) {
      var g = resilOf(f.plus);
      msg.push('<p><b>' + f.plus + '</b> : ' + cnt + ' où redoubler de vigilance. Pour chacun, la colonne « Ce qui protège » dit quoi faire' +
        (g !== -1 ? ', et la carte <a href="#resil-' + g + '">' + RESIL[g][0] + '</a> rassemble les protections et les appuis pour cette famille.' : '.') +
        (dPlus[f.plus] ? ' C\'est une tendance de groupe, jamais une fatalité : un diagnostic ne dit pas qu\'une personne est manipulable. Il sert à adapter les formations et les procédures, jamais à écarter quelqu\'un d\'un poste ou d\'une habilitation.' : '') + '</p>');
    }
    if (f.moins) msg.push('<p><b>' + f.moins + '</b> : ' + (dMoins[f.moins] ? 'en moyenne, dans de petits groupes étudiés, un biais précis a moins joué dans ' + cnt + '.' +
      ' C\'est une tendance de groupe, ni une protection générale, ni un trait de chaque personne' +
      (resilOf(f.moins) !== -1 ? ' : la carte <a href="#resil-' + resilOf(f.moins) + '">' + RESIL[resilOf(f.moins)][0] + '</a> dit aussi où rester vigilant.' : '.') : 'protège dans ' + cnt + '.') + '</p>');
    if (f.te) msg.push('<p><b>' + f.te + ' ' + TE[f.te] + '</b>, phase ' + DIMA_PHASE[f.te.charAt(3)] + ' : rapprochée de ' + cnt + '.</p>');
    $("dima-focus").innerHTML = msg.join("");
    $("dima-focus").hidden = !msg.length;
    $("dima-count").textContent = on ? n + " sur " + MAP.length + " leviers et fiches" : MAP.length + " leviers et fiches";
    $("f-reset").hidden = !on;
    $("f-plus").value = f.plus; $("f-moins").value = f.moins; $("f-te").value = f.te;
    labelCells(document);
    /* On a small screen each row opens on demand; a filter shows its answer at once */
    if (FOLD.matches && !on && rows.length) Array.prototype.forEach.call($("dima-body").children, function (tr) {
      tr.classList.add("folded");
      tr.insertAdjacentHTML("beforeend", '<td class="fold-td">' + foldBtn("Plus sensibles, ce qui protège", false) + '</td>');
    });
  }
  /* The choice is kept in the address (?plus=…&protege=…&te=…), so that a filtered view can be shared as a link */
  function dimaToUrl() {
    var q = [["plus", dFilter.plus], ["protege", dFilter.moins], ["te", dFilter.te]].filter(function (x) { return x[1]; })
      .map(function (x) { return x[0] + "=" + encodeURIComponent(x[1]); }).join("&");
    try { history.replaceState(null, "", location.pathname + (q ? "?" + q : "") + location.hash); } catch (e) {}
  }
  [["f-plus", "plus"], ["f-moins", "moins"], ["f-te", "te"]].forEach(function (x) {
    $(x[0]).addEventListener("change", function () { dFilter[x[1]] = this.value; renderDima(); dimaToUrl(); });
  });
  $("f-reset").addEventListener("click", function () { dFilter = { plus: "", moins: "", te: "" }; renderDima(); dimaToUrl(); });
  /* A technique card in the table selects that technique */
  function pickChip(e) {
    var c = e.target.closest && e.target.closest(".chip[data-te]");
    if (!c || (e.type === "keydown" && e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    dFilter.te = dFilter.te === c.getAttribute("data-te") ? "" : c.getAttribute("data-te");
    renderDima(); dimaToUrl();
  }
  $("dima-body").addEventListener("click", pickChip);
  $("dima-body").addEventListener("click", function (e) {
    var b = e.target.closest(".fold-btn");
    if (!b) return;
    b.setAttribute("aria-expanded", String(b.closest("tr").classList.toggle("folded") === false));
  });
  $("dima-body").addEventListener("keydown", pickChip);
  (function () {
    var p = new URLSearchParams(location.search), match = function (v, list) {
      v = norm(v || "").trim();
      return v ? list.filter(function (k) { return norm(k) === v; })[0] || list.filter(function (k) { return norm(k).indexOf(v) === 0; })[0] || "" : "";
    };
    dFilter.plus = match(p.get("plus"), Object.keys(dPlus));
    dFilter.moins = match(p.get("protege"), Object.keys(dMoins));
    dFilter.te = match(p.get("te"), Object.keys(TE));
  })();
  renderDima();
  /* The fiches where a group of conditions appears, found through PSY (a lever without a fiche keeps its name) */
  function psyFiches(names) {
    return Object.keys(PSY).filter(function (lab) { return PSY[lab].some(function (p) { return names.indexOf(p[0]) !== -1; }); }).map(function (lab) {
      var m = MAP.filter(function (x) { return x.label === lab; })[0];
      var f = m && m.fiche ? ficheById(m.fiche) : FICHES.filter(function (x) { return x.title === lab; })[0];
      return f ? '<a href="#fiche-' + f.id + '">' + nb(f.title) + '</a>' : lab.replace(/^Levier : (.*)$/, "levier $1");
    });
  }
  $("resil").innerHTML = RESIL.map(function (g, i) {
    var fl = psyFiches(g[2]);
    return '<article class="tcard rcard" id="resil-' + i + '"><h4>' + g[0] + '</h4><p class="tags pdesc">' + g[1] + '</p><dl>' +
      '<div class="pr"><dt>Protéger</dt><dd>' + g[3] + '</dd></div>' +
      '<div class="rf"><dt>Renforcer la résilience</dt><dd>' + g[4] + '</dd></div>' +
      (g[5] && ficheById(g[5]) ? '<div class="ts"><dt>Tester la protection</dt><dd>Avec l\'indicateur de la fiche <a href="#fiche-' + g[5] + '">' + nb(ficheById(g[5]).title) +
        '</a>, mesuré sur la procédure, par un audit ou un exercice avec des volontaires informés, jamais en ciblant les personnes concernées.</dd></div>' : '') +
      (fl.length ? '<div class="fl"><dt>Fiches concernées</dt><dd>' + fl.join(", ") + '</dd></div>' : '') + '</dl></article>';
  }).join("");
  function byName(a, b) { return a[0].localeCompare(b[0], "fr", { sensitivity: "base" }); }
  $("lex-body").innerHTML = LEXCATS.map(function (c) {
    return '<tr class="tcat"><th colspan="5" scope="rowgroup">' + c[1] + '</th></tr>' +
      LEX.filter(function (r) { return r[5] === c[0]; }).sort(byName).map(function (r) {
        return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + (r[4] || '') + '</td></tr>';
      }).join("");
  }).join("");

  /* ---------- Accueil ---------- */
  var TERRAINS = { "organisations": "ent", "dirigeants-cibles": "pou", "dirigeants-qui-influencent": "inf" };
  var SLUG = { ent: "organisations", pou: "dirigeants-cibles", inf: "dirigeants-qui-influencent" };
  var AXDEF = [
    ["ent", "Axe 1", "Organisations", "Phishing, vishing, pretexting, fraude au président, usurpation par deepfake."],
    ["pou", "Axe 2", "Dirigeants ciblés", "Responsables, cabinets et entourages comme cibles : hameçonnage, canulars, usurpations, désinformation."],
    ["inf", "Axe 3", "Dirigeants qui influencent", "Communication politique : cadrage, agenda, inondation informationnelle, proximité, désignation d'un adversaire. Décrite de façon symétrique, sans viser un camp."]
  ];
  function countAx(a) { return FICHES.filter(function (f) { return f.ax.indexOf(a) !== -1; }).length; }
  $("axes").innerHTML = AXDEF.map(function (a) {
    var n = countAx(a[0]);
    return '<a class="axis-card ax-' + a[0] + '" href="#' + SLUG[a[0]] + '" data-ax="' + a[0] + '"><h3>' + a[2] + '</h3><p>' + a[3] + '</p><span class="go"><b>' + n + '</b> <span>fiche' + (n > 1 ? 's' : '') + '</span></span></a>';
  }).join("");
  var tests = FICHES.filter(function (f) { return f.red.some(function (p) { return p[0] === "Indicateur"; }); }).length;
  var checked = Object.keys(R).filter(function (k) { return R[k][2]; }).length;
  $("home-meta").innerHTML = [[FICHES.length, "fiches"], [tests, "protocoles de test"], [Object.keys(TE).length, "techniques DIMA rapprochées"], [checked, "références vérifiées"]].map(function (x) {
    return '<div><dt>' + x[1] + '</dt><dd>' + x[0] + '</dd></div>';
  }).join("");
  $("home-rows").innerHTML = FICHES.slice(-3).reverse().map(rowHTML).join("");

  var lever = 0;
  function renderLever() {
    $("lever-tabs").innerHTML = LEVERS.map(function (l, i) {
      return '<button type="button" data-i="' + i + '" aria-pressed="' + (i === lever) + '">' + l.k + '</button>';
    }).join("");
    var l = LEVERS[lever];
    $("lever-out").innerHTML =
      '<div class="e"><h3>Organisations</h3><p>' + l.e + '</p></div>' +
      '<div class="p"><h3>Dirigeants ciblés</h3><p>' + l.p + '</p></div>' +
      '<div class="c"><h3>Dirigeants qui influencent</h3><p>' + (LEVER_C[l.k] || "") + '</p></div>' +
      '<div class="d"><h3>Défense</h3><p>' + l.d + '</p></div>';
    slide($("lever-tabs"), "box");
  }
  $("lever-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    lever = parseInt(b.getAttribute("data-i"), 10);
    renderLever();
    $("lever-out").classList.add("swap");
    $("lever-tabs").classList.add("moved");
  });
  renderLever();

  /* ---------- Terrains : une page d'entrée par terrain ---------- */
  var TERRAIN_FOR = {
    ent: "équipes sécurité, comptabilité, assistance et direction : toute personne qui reçoit des demandes de paiement, d'accès ou d'information.",
    pou: "élus, cabinets, collaborateurs et entourages : les personnes que l'on cherche à tromper pour obtenir une information ou une décision.",
    inf: "journalistes, analystes et citoyens : pour reconnaître les techniques de communication politique, de quelque camp qu'elles viennent."
  };
  function terrainHTML(ax) {
    var d = AXDEF.filter(function (a) { return a[0] === ax; })[0];
    var list = FICHES.filter(function (f) { return f.ax.indexOf(ax) !== -1; });
    var cm = [];
    list.forEach(function (f) { (f.blue || []).forEach(function (b) { if (b[0] === "Contre-mesures") cm.push([f, b[1]]); }); });
    return '<header class="page-head"><a class="back" href="#fiches">Toutes les fiches</a>' +
      '<h1>' + d[2] + '</h1><p class="lead">' + d[3] + '</p>' +
      '<p class="t-for"><b>Pour qui :</b> ' + TERRAIN_FOR[ax] + '</p></header>' +
      '<section class="block"><h2>Les cinq leviers sur ce terrain</h2>' +
      '<div class="tablewrap"><table><thead><tr><th>Levier</th><th>Comment il joue ici</th><th>Se prémunir</th></tr></thead><tbody>' +
      LEVERS.map(function (l) {
        var here = ax === "ent" ? l.e : ax === "pou" ? l.p : (LEVER_C[l.k] || "");
        return '<tr><td><b>' + l.k + '</b></td><td>' + here + '</td><td>' + l.d + '</td></tr>';
      }).join("") + '</tbody></table></div></section>' +
      '<section class="block"><h2>Les ' + list.length + ' fiches de ce terrain</h2><div class="rows">' + list.map(rowHTML).join("") + '</div></section>' +
      (cm.length ? '<section class="block"><h2>Contre-mesures réunies</h2><ul class="plain t-cm">' + cm.map(function (x) {
        return '<li><a href="#fiche-' + x[0].id + '">' + x[0].title + '</a> : ' + x[1] + '</li>';
      }).join("") + '</ul></section>' : '') +
      '<p class="note">Les autres terrains reposent souvent sur les mêmes leviers : comparez-les avec le <a href="#accueil">comparateur de l\'accueil</a>, ou parcourez <a href="#fiches">toutes les fiches</a>.</p>';
  }

  /* ---------- Fiches (liste) ---------- */
  /* Familles : d'abord ce que les attaques exploitent, puis les sciences qui l'expliquent, puis la méthode ; de A à Z dans chaque famille.
     Une fiche dont le type n'a pas de famille va dans « Autres fiches ». */
  var FAMS = [
    ["attaque", "Leviers et techniques d'attaque", "Ce que l'attaquant exploite, et comment le repérer."],
    ["politique", "Communication et influence politique", "Cadrer, saturer, désigner : l'influence à grande échelle."],
    ["np", NP, "Perception, mémoire, attention, décision : les mécanismes visés."],
    ["ps", PS, "Le groupe, les normes, l'autorité et l'engagement."],
    ["soin", "Clinique et facteurs humains", "Soutenir les victimes, préparer ses réponses, concevoir pour l'erreur."],
    ["methode", "Méthode, mesure et éthique", "Mesurer sans se tromper, simuler sans trahir."],
    ["autres", "Autres fiches", ""]
  ];
  var FAM_OF = { "Levier": "attaque", "Technique": "attaque", "Mécanisme": "attaque", "Prospective": "attaque", "Communication politique": "politique",
    "Psychologie clinique": "soin", "Ergonomie": "soin", "Mesure": "methode", "Méthode": "methode" };
  FAM_OF[NP] = "np"; FAM_OF[PS] = "ps";
  function famOf(f) { return FAM_OF[f.tag] || "autres"; }
  function byTitle(a, b) { return a.title.localeCompare(b.title, "fr", { sensitivity: "base", ignorePunctuation: true }); }
  /* Ordre de lecture, repris par les liens « fiche précédente / suivante » ; FICHES garde l'ordre d'ajout pour les « dernières fiches » */
  var FORDER = FAMS.reduce(function (out, fam) {
    return out.concat(FICHES.filter(function (f) { return famOf(f) === fam[0]; }).sort(byTitle));
  }, []);
  var filter = "all", fquery = "", fsort = "theme";
  try { if (localStorage.getItem("hc-fsort") === "az") fsort = "az"; } catch (e) {}
  var FILTERS = [["all", "Toutes"], ["ent", "Organisations"], ["pou", "Dirigeants ciblés"], ["inf", "Dirigeants qui influencent"], ["tra", "Transversal"]];
  function renderFiches() {
    $("filters").innerHTML = FILTERS.map(function (f) {
      var n = f[0] === "all" ? FICHES.length : countAx(f[0]);
      return '<button type="button" data-f="' + f[0] + '" aria-pressed="' + (filter === f[0]) + '">' + f[1] + ' (' + n + ')</button>';
    }).join("");
    Array.prototype.forEach.call($("fsort").querySelectorAll("button"), function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-s") === fsort)); });
    var q = norm(fquery).trim();
    var list = FORDER.filter(function (f) {
      if (filter !== "all" && f.ax.indexOf(filter) === -1) return false;
      if (!q) return true;
      return norm(f.title + " " + f.teaser + " " + f.socle.join(" ")).indexOf(q) !== -1;
    });
    $("all-rows").innerHTML = fsort === "az"
      ? '<div class="rows">' + list.slice().sort(byTitle).map(rowHTML).join("") + '</div>'
      : FAMS.map(function (fam) {
        var rows = list.filter(function (f) { return famOf(f) === fam[0]; });
        if (!rows.length) return "";
        return '<section class="cgroup fgroup" id="fg-' + fam[0] + '"><div class="cgroup-head"><h2>' + fam[1] + ' <span class="n">' + rows.length + '</span></h2>' + (fam[2] ? '<p>' + fam[2] + '</p>' : '') + '</div><div class="rows">' + rows.map(rowHTML).join("") + '</div></section>';
      }).join("");
    $("fcount").textContent = list.length + " fiche" + (list.length > 1 ? "s" : "");
    $("f-empty").hidden = list.length > 0;
  }
  $("filters").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    filter = b.getAttribute("data-f");
    renderFiches();
  });
  $("fsort").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-s]");
    if (!b) return;
    fsort = b.getAttribute("data-s");
    try { localStorage.setItem("hc-fsort", fsort); } catch (err) {}
    renderFiches();
  });
  $("fq").addEventListener("input", function (e) { fquery = e.target.value; renderFiches(); });
  $("axes").addEventListener("click", function (e) {
    var a = e.target.closest("a[data-ax]");
    if (!a) return;
    filter = a.getAttribute("data-ax");
    fquery = ""; $("fq").value = "";
    renderFiches();
  });
  renderFiches();

  /* ---------- Fiche (détail) ---------- */
  var SECS = [];
  /* Date de mise à jour : la fabrication des pages la place dans une balise meta, le visiteur la voit dans l'en-tête de la fiche */
  function majHTML() {
    var m = document.querySelector('meta[property="article:modified_time"]');
    if (!m) return "";
    var d = new Date(m.content + "T12:00:00");
    return '<div data-maj><dt>Mise à jour</dt><dd><time datetime="' + m.content + '">' + d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) + '</time></dd></div>';
  }
  function ficheHTML(f) {
    SECS = [["s-socle", "Socle"]];
    var out = '<header class="page-head"><a class="back" href="#fiches">Toutes les fiches</a>' +
      '<h1>' + nb(f.title) + '</h1><p class="lead">' + f.teaser + '</p>' +
      '<dl class="fmeta"><div><dt>Terrains</dt><dd>' + f.ax.map(function (a) { return SLUG[a] ? '<a class="pill ' + a + '" href="#' + SLUG[a] + '">' + AX[a] + '</a>' : '<span class="pill ' + a + '">' + AX[a] + '</span>'; }).join("") + '</dd></div><div><dt>Type</dt><dd>' + f.tag + '</dd></div>' + majHTML() + '</dl></header><div class="fiche-layout"><article class="fiche-main">' +
      '<section class="block" id="s-socle" style="margin-top:36px"><h2>Socle</h2>' + f.socle.map(function (p) { return '<p>' + p + '</p>'; }).join("") + '</section>';
    if (f.cas && f.cas.length) {
      SECS.push(["s-cas", "Cas publics"]);
      out += '<section id="s-cas"><div class="cas"><h2>Cas publics</h2><ul>' + f.cas.map(function (c) { return '<li>' + c + '</li>'; }).join("") + '</ul></div></section>';
    }
    SECS.push(["s-equipes", "Blue et red team"]);
    out += '<section id="s-equipes" class="block" style="margin-top:40px"><div class="cols">' +
      '<div class="team b"><h3 class="team-label b">Blue team : défense</h3>' + items(f.blue) + '</div>' +
      '<div class="team r"><h3 class="team-label r">Red team : simulation encadrée</h3>' + items(f.red) + '</div></div></section>';
    SECS.push(["s-pistes", "Pistes originales"]);
    out += '<section class="block" id="s-pistes" style="margin-top:40px"><h2>Pistes originales</h2><ul class="plain">' + f.pistes.map(function (p) { return '<li>' + p + '</li>'; }).join("") + '</ul></section>';
    var d = dimaHTML(f);
    if (d) { SECS.push(["s-dima", "DIMA et clinique"]); out += '<section id="s-dima">' + d + '</section>'; }
    SECS.push(["s-refs", "Références"]); out += refsHTML(f);
    out += '<p class="note">' + f.note + '</p>';
    SECS.push(["s-contrib", "Contribuer"]);
    out += '<section id="s-contrib" class="contrib"><h2>Contribuer à cette fiche</h2>' +
      '<p>Une source, un cas public, une correction ? Chaque proposition est relue avant publication. Précisez le titre de la fiche : « ' + f.title + ' ».</p>' +
      '<p class="contrib-act">' + contribLink("Proposer une contribution", "btn") + '<a href="#contribuer">Lire la charte</a></p>' +
      (f.relu && f.relu.length ? '<p class="credits"><b>Relue par :</b> ' + f.relu.join(", ") + '</p>' : '') +
      (f.contrib && f.contrib.length ? '<p class="credits"><b>Avec les contributions de :</b> ' + f.contrib.join(", ") + '</p>' : '') +
      '</section>';
    var at = FORDER.indexOf(f), prev = FORDER[at - 1], next = FORDER[at + 1];
    out += '<nav class="pn" aria-label="Fiches voisines">' +
      (prev ? '<a class="prev" href="#fiche-' + prev.id + '"><small>Fiche précédente</small><span>' + nb(prev.title) + '</span></a>' : '<span></span>') +
      (next ? '<a class="next" href="#fiche-' + next.id + '"><small>Fiche suivante</small><span>' + nb(next.title) + '</span></a>' : '') + '</nav>';
    out += '</article><aside class="toc" aria-label="Sommaire"><h2>Sur cette page</h2><ol>' +
      SECS.map(function (s, i) { return '<li><button type="button" data-t="' + s[0] + '"' + (i === 0 ? ' aria-current="true"' : '') + '>' + s[1] + '</button></li>'; }).join("") + '</ol></aside></div>';
    return out;
  }
  $("v-fiche").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-t]");
    if (!b) return;
    var el = $(b.getAttribute("data-t"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Blog ---------- */
  function billetById(id) { return BILLETS.filter(function (x) { return x.id === id; })[0]; }
  function dateFR(iso) { return new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); }
  function renderBlog() {
    $("blog-rows").innerHTML = '<div class="rows">' + BILLETS.slice().sort(function (a, b) { return b.date.localeCompare(a.date); }).map(function (b) {
      return '<a class="row" href="#billet-' + b.id + '"><div><h3>' + nb(b.title) + '</h3><p>' + b.lead + '</p></div>' +
        '<div class="tags"><span class="pill">' + b.type + '</span><span class="billet-date">' + dateFR(b.date) + '</span></div></a>';
    }).join("") + '</div>';
  }
  renderBlog();
  function billetHTML(b) {
    var fiches = (b.fiches || []).map(ficheById).filter(Boolean);
    return '<header class="page-head"><a class="back" href="#blog">Tous les billets</a>' +
      '<h1>' + nb(b.title) + '</h1><p class="lead">' + b.lead + '</p>' +
      '<dl class="fmeta"><div><dt>Type</dt><dd>' + b.type + '</dd></div><div><dt>Publié le</dt><dd><time data-pub datetime="' + b.date + '">' + dateFR(b.date) + '</time></dd></div></dl></header>' +
      '<article class="billet">' +
      b.sections.map(function (s) {
        return '<section class="block"><h2>' + s.h + '</h2>' + s.p.map(function (p) { return p.charAt(0) === "<" ? p : '<p>' + p + '</p>'; }).join("") + '</section>';
      }).join("") +
      (fiches.length ? '<section class="block"><h2>Sur la carte</h2><ul class="plain">' + fiches.map(function (f) { return '<li><a href="#fiche-' + f.id + '">' + nb(f.title) + '</a> : ' + f.teaser + '</li>'; }).join("") + '</ul></section>' : '') +
      (b.refs && b.refs.length ? refsHTML(b) : '') +
      '<p class="note">Ce billet donne un point de vue personnel. Il n\'a pas la valeur d\'une <a href="#fiches">fiche</a>. Une source ou une correction à proposer ? ' + contribLink("Écrire à l'autrice") + '.</p>' +
      '</article>';
  }

  /* ---------- Carte : chaque fiche placée par famille et par phase DIMA, avec ses contre-mesures et leur test ---------- */
  var PHASES = ["1", "2", "3", "4"];
  function part(list, k) { var x = (list || []).filter(function (p) { return p[0] === k; })[0]; return x ? x[1] : ""; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function teOf(f) { var m = MAP.filter(function (x) { return x.fiche === f.id; })[0]; return m ? m.te : []; }
  function phasesOf(f) { var te = teOf(f); return PHASES.filter(function (p) { return te.some(function (t) { return t.charAt(3) === p; }); }); }
  /* A fiche on the map: tinted with its first terrain, one small square per terrain */
  function tileHTML(f) {
    return '<a class="tile t-' + f.ax[0] + '" href="#fiche-' + f.id + '" data-f="' + f.id + '" data-ax="' + f.ax.join(" ") + '"><span>' + nb(f.title) + '</span>' +
      '<span class="dots" aria-hidden="true">' + f.ax.map(function (a) { return '<i class="' + a + '"></i>'; }).join("") + '</span></a>';
  }
  function renderCarte() {
    var fams = FAMS.filter(function (fam) { return FORDER.some(function (f) { return famOf(f) === fam[0]; }); });
    var inPhase = function (p) { return function (f) { return p ? phasesOf(f).indexOf(p) !== -1 : !phasesOf(f).length; }; };
    var cols = PHASES.concat([""]);
    var head = function (p) {
      var n = FORDER.filter(inPhase(p)).length, label = p ? DIMA_PHASE[p] : "Hors DIMA", fr = label.replace(/ \(.*\)$/, "");
      return '<th data-label="' + label + '"' + (p ? '' : ' class="hors"') + '><span class="ph-n"' + (p ? '>0' + p : ' aria-hidden="true">&nbsp;') + '</span><b>' + fr + '</b>' +
        '<small>' + (p ? label.replace(/^.*\((.*)\)$/, "$1") + ' · ' : 'défense, méthode, soin · ') + n + ' fiche' + (n > 1 ? 's' : '') + '</small></th>';
    };
    $("carte-map").innerHTML = '<table class="carte-map"><thead><tr><th data-label="Famille">Famille</th>' + cols.map(head).join("") + '</tr></thead><tbody>' +
      fams.map(function (fam) {
        var list = FORDER.filter(function (f) { return famOf(f) === fam[0]; });
        /* Only a phase with no fiche in a family of vulnerabilities is a blank zone; care and method fiches sit outside DIMA by nature */
        var gaps = fam[0] !== "soin" && fam[0] !== "methode";
        return '<tr><td><b>' + fam[1] + '</b><span class="n">' + list.length + ' fiche' + (list.length > 1 ? 's' : '') + '</span></td>' + cols.map(function (p) {
          var here = list.filter(inPhase(p));
          if (here.length) return '<td' + (p ? '' : ' class="hors"') + '>' + here.map(tileHTML).join("") + '</td>';
          return p && gaps ? '<td class="blank"><span>à cartographier</span></td>' : '<td' + (p ? '' : ' class="hors"') + '></td>';
        }).join("") + '</tr>';
      }).join("") + '</tbody></table>';
    labelCells($("carte-map"));
    var item = function (cls, k, v) { return '<div class="' + cls + '"><dt>' + k + '</dt><dd>' + cap(v) + '</dd></div>'; };
    $("carte-tests").innerHTML = fams.map(function (fam) {
      var list = FORDER.filter(function (f) { return famOf(f) === fam[0]; });
      return '<div class="tgroup"><h3>' + fam[1] + ' <span class="n">' + list.length + '</span></h3><div class="tcards">' + list.map(function (f) {
        return '<article class="tcard t-' + f.ax[0] + '" data-ax="' + f.ax.join(" ") + '"><h4><a href="#fiche-' + f.id + '">' + nb(f.title) + '</a></h4>' +
          '<p class="tags">' + pills(f) + '</p><dl>' + item("cm", "Contre-mesures", part(f.blue, "Contre-mesures")) +
          item("hy", "Hypothèse testée", part(f.red, "Hypothèse testée")) + item("ind", "Indicateur", part(f.red, "Indicateur")) + '</dl>' +
          (function (l) { return '<p class="cmlv"><span class="lv ' + l.cls + '">' + (l.k === "methode" ? cap(l.lbl) : 'Contre-mesure ' + l.lbl) + '</span> ' + cap(l.why) + '</p>'; })(cmlvOf(f)) + '</article>';
      }).join("") + '</div></div>';
    }).join("");
    carteFilter();
    foldTests();
    /* The gaps: phases with no fiche in a family of vulnerabilities (care and method fiches describe no attack technique),
       and levers that have no fiche yet */
    var empty = [];
    FAMS.forEach(function (fam) {
      if (fam[0] === "soin" || fam[0] === "methode") return;
      var list = FORDER.filter(function (f) { return famOf(f) === fam[0]; });
      var none = PHASES.filter(function (p) { return !list.some(function (f) { return phasesOf(f).indexOf(p) !== -1; }); });
      var names = none.map(function (p) { return DIMA_PHASE[p].replace(/ \(.*\)$/, ""); });
      if (list.length && names.length) empty.push(fam[1] + ", phase" + (names.length > 1 ? "s " : " ") + names.slice(0, -1).join(", ") + (names.length > 1 ? " et " : "") + names[names.length - 1]);
    });
    var levers = MAP.filter(function (m) { return !m.fiche; }).map(function (m) { return m.label.replace(/^Levier : /, ""); });
    $("carte-blanc").innerHTML = '<ul class="plain">' +
      (empty.length ? '<li><b>Cases vides de la carte :</b> ' + empty.join(" ; ") + '.</li>' : '') +
      (levers.length ? '<li><b>Leviers décrits sur l\'accueil mais sans fiche dédiée :</b> ' + levers.join(", ") + '.</li>' : '') +
      '</ul><p class="contrib-act">' + contribLink("Proposer une fiche ou un cas", "btn") + '</p>';
  }
  /* On a small screen the test cards fold by family, the first one open, and a chosen terrain opens them all; the map above keeps every family and every blank cell in view */
  function foldTests() {
    Array.prototype.forEach.call($("carte-tests").querySelectorAll(".tgroup"), function (g, i) {
      var h = g.querySelector("h3"), b = h.querySelector(".fold-btn"), open = cax !== "all" || i === 0;
      if (!FOLD.matches) { if (b) h.innerHTML = b.innerHTML; g.classList.remove("folded"); return; }
      if (b) b.setAttribute("aria-expanded", String(open)); else h.innerHTML = foldBtn(h.innerHTML, open);
      g.classList.toggle("folded", !open);
    });
  }
  $("carte-tests").addEventListener("click", function (e) {
    var b = e.target.closest(".fold-btn");
    if (!b) return;
    b.setAttribute("aria-expanded", String(b.closest(".tgroup").classList.toggle("folded") === false));
  });
  FOLD.addEventListener("change", function () { renderDima(); foldTests(); });
  /* The terrain buttons are the map's legend and its filter: the map keeps its shape and dims the other fiches, the test cards show only this terrain */
  var cax = "all";
  function carteFilter() {
    $("carte-filters").innerHTML = FILTERS.map(function (x) {
      return '<button type="button" data-ax="' + x[0] + '" aria-pressed="' + (x[0] === cax) + '">' + (x[0] === "all" ? '' : '<span class="swatch ' + x[0] + '" aria-hidden="true"></span>') + x[1] + '</button>';
    }).join("");
    var on = function (el) { return cax === "all" || el.getAttribute("data-ax").split(" ").indexOf(cax) !== -1; };
    Array.prototype.forEach.call($("carte-map").querySelectorAll(".tile"), function (t) { t.classList.toggle("off", !on(t)); });
    var n = 0;
    Array.prototype.forEach.call($("carte-tests").querySelectorAll(".tcard"), function (c) { c.hidden = !on(c); if (!c.hidden) n++; });
    Array.prototype.forEach.call($("carte-tests").querySelectorAll(".tgroup"), function (g) { g.hidden = !g.querySelector(".tcard:not([hidden])"); });
    $("carte-count").textContent = n + " fiche" + (n > 1 ? "s" : "") + (cax === "all" ? "" : " sur ce terrain");
  }
  $("carte-filters").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-ax]");
    if (!b) return;
    cax = b.getAttribute("data-ax");
    carteFilter();
    foldTests();
  });
  /* A fiche placed in several phases: pointing at one lights up the others */
  function relTile(e, on) {
    var t = e.target.closest && e.target.closest(".tile[data-f]");
    if (!t) return;
    Array.prototype.forEach.call($("carte-map").querySelectorAll('.tile[data-f="' + t.getAttribute("data-f") + '"]'), function (x) { x.classList.toggle("rel", on && x !== t); });
  }
  ["mouseover", "focusin"].forEach(function (type) { $("carte-map").addEventListener(type, function (e) { relTile(e, true); }); });
  ["mouseout", "focusout"].forEach(function (type) { $("carte-map").addEventListener(type, function (e) { relTile(e, false); }); });
  renderCarte();
  /* The map as a CSV file, separated by semicolons and with a BOM so that a French spreadsheet reads it as is */
  function carteCSV() {
    var strip = function (s) { var d = document.createElement("div"); d.innerHTML = s || ""; return d.textContent.replace(/\s+/g, " ").trim(); };
    var q = function (s) { return '"' + strip(String(s)).replace(/"/g, '""') + '"'; };
    var url = function (f) { return STATIC ? new URL(fileFor("fiche-" + f.id), location.href).href : location.href.split("#")[0] + "#fiche-" + f.id; };
    var head = ["id", "fiche", "adresse", "famille", "type", "terrains", "techniques DIMA", "phases DIMA", "signaux", "contre-mesures", "hypothèse testée", "indicateur", "cadre",
      "niveau de preuve de la contre-mesure", "justification", "note de la fiche", "références", "statut des références"];
    var rows = FORDER.map(function (f) {
      var fam = FAMS.filter(function (x) { return x[0] === famOf(f); })[0], l = cmlvOf(f), keys = FREFS[f.id] || [];
      /* A few fiches name their first blue block otherwise (Indicateurs, Mesures, Usage): the label is kept */
      var sig = (f.blue || []).filter(function (x) { return x[0] !== "Contre-mesures"; })[0];
      return [f.id, f.title, url(f), fam ? fam[1] : "", f.tag, f.ax.map(function (a) { return AX[a]; }).join(", "),
        teOf(f).map(function (t) { return t + " " + TE[t]; }).join(", "), phasesOf(f).map(function (p) { return DIMA_PHASE[p]; }).join(", "),
        sig ? (sig[0] === "Signaux" ? "" : sig[0] + " : ") + sig[1] : "", part(f.blue, "Contre-mesures"), part(f.red, "Hypothèse testée"), part(f.red, "Indicateur"), part(f.red, "Cadre"),
        l.lbl, l.why, f.note || "",
        keys.map(function (k) { return R[k] ? R[k][0] : ""; }).join(" | "),
        keys.map(function (k) { return R[k] ? (R[k][2] ? "vérifiée" : "à contrôler") : ""; }).join(" | ")].map(q).join(";");
    });
    return "﻿" + [head.map(q).join(";")].concat(rows).join("\r\n") + "\r\n";
  }
  $("carte-csv").addEventListener("click", function () {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([carteCSV()], { type: "text/csv;charset=utf-8" }));
    a.download = "hack-cognitif-carte.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  /* ---------- Cours : rangés par thème ; le programme d'origine reste indiqué sur chaque notion ---------- */
  var CTHEMES = [
    ["perception", "Perception et attention", "Ce que l'on voit, ce que l'on remarque et ce qui passe inaperçu."],
    ["memoire", "Mémoire et apprentissage", "Retenir, oublier, réapprendre : la durée de vie d'un patch."],
    ["decision", "Décision, émotion et récompense", "Quand la peur, l'urgence ou le gain décident à notre place."],
    ["controle", "Contrôle exécutif et réseaux cérébraux", "Habitudes, supervision et réseaux qui trient l'information."],
    ["social", "Langage, influence et cognition sociale", "L'implicite, l'autorité, les intentions d'autrui."],
    ["age", "Vieillissement, fraude et victimes", "Protéger sans stigmatiser."],
    ["clinique", "Psychopathologie et neurologie clinique", "Ce que la clinique éclaire, avec prudence."],
    ["methodes", "Méthodes, mesure et recherche", "Mesurer, évaluer, argumenter."]
  ];
  var CTHEME_OF = {
    "Cognition visuelle": "perception",
    "Attention sélective, divisée et cécité attentionnelle": "perception",
    "Perception et motricité ; agnosies visuelles": "perception",
    "Psychophysique et analyse des signaux": "perception",
    "Modèles de la mémoire": "memoire",
    "Mémoire de travail et charge cognitive": "memoire",
    "Développement cognitif et apprentissage": "memoire",
    "Apprentissage et mémoire ; remédiation cognitive ; neuroplasticité": "memoire",
    "Revalidation neuropsychologique de l'adulte": "memoire",
    "Décision, émotion et marqueurs somatiques": "decision",
    "Fondements théoriques et cliniques des TCC": "decision",
    "Émotion et motivation ; neurobiologie des émotions et du stress": "decision",
    "Conduites addictives ; systèmes de récompense": "decision",
    "Psychologie clinique des émotions": "decision",
    "Psychologie clinique des assuétudes": "decision",
    "Planification et contrôle du mouvement, référentiel spatial": "controle",
    "Fonctions exécutives et attentionnelles ; héminégligence": "controle",
    "Advances in cognitive neuroscience ; Clinical neuroscience": "controle",
    "Imagerie cérébrale et modélisation neuromimétique": "controle",
    "Psychologie sociale et performances": "social",
    "Communication, changement et construction identitaire": "social",
    "Cognition sociale et émotions": "social",
    "Psychologie du langage": "social",
    "Management et mobilisation des ressources humaines": "social",
    "Cognition sociale, théorie de l'esprit": "social",
    "Neuropsychologie du langage": "social",
    "Neurologie et neuropsychologie de l'adulte": "age",
    "Psychopathologie clinique du vieillissement": "age",
    "Victimologie": "age",
    "Problématiques gérontologiques": "age",
    "Neuropsychologie des troubles acquis ; psychologie du vieillissement": "age",
    "Neuropsychologie de la personne âgée ; Psychology of aging": "age",
    "Perspectives psychopathologiques cognitives et fondamentales": "clinique",
    "Psychopathologie du développement": "clinique",
    "Psychopathologie des comportements violents": "clinique",
    "Hallucinations et activités délirantes": "clinique",
    "Syndromes de déconnexion, Gerstmann, Balint, apraxies": "clinique",
    "Aphasie progressive primaire, épilepsies, sclérose en plaques, traumatismes crâniens": "clinique",
    "Neuropsychologie des troubles psychiatriques ; troubles neurodéveloppementaux": "clinique",
    "Questions de neurologie et de psychiatrie associées à la neuropsychologie ; Neurologie": "clinique",
    "Difficultés d'apprentissage ; troubles sensoriels chez l'enfant": "clinique",
    "Traitement de données et initiation à R": "methodes",
    "Méthodologie cognitive": "methodes",
    "Méthodologie sociale et clinique": "methodes",
    "Évaluation cognitive, bilan neuropsychologique": "methodes",
    "Évaluation et diagnostic en neuropsychologie de l'adulte ; évaluation et prise en charge": "methodes",
    "Outils et méthode en psychologie sociale": "methodes",
    "Méthodologie de recherche en psychologie du travail et ergonomie": "methodes",
    "Méthodologie de la recherche clinique": "methodes",
    "Épistémologie": "methodes"
  };
  var CITEMS = [];
  COURS.forEach(function (g) {
    g.n.forEach(function (x) {
      var li = x[3] || "";
      CITEMS.push({ name: x[0], st: x[1], id: x[2], suivi: /^Suivi\b/.test(li), li: li.replace(/^Suivi\s*·\s*/, ""), th: CTHEME_OF[x[0]] || "methodes" });
    });
  });
  var cf = "all", cq = "";
  function citemHTML(i) {
    var name = i.id ? '<a href="#fiche-' + i.id + '">' + hi(i.name, cq) + '</a>' : hi(i.name, cq);
    var st = i.st === "fiche" ? '<span class="st f">Fiche</span>' : i.st === "integre" ? '<span class="st i">Intégrée</span>' : '<span class="st t">À rédiger</span>';
    return '<li class="citem' + (i.st === "todo" ? " todo" : "") + '"><div class="cmain"><span class="nm">' + name + '</span>' +
      (i.li ? '<span class="li">' + hi(i.li, cq) + '</span>' : '') +
      (i.st === "todo" ? contribLink("Proposer de rédiger cette notion", "clink") : '') + '</div>' +
      '<div class="cbadges">' + st + (i.suivi ? '<span class="st s">Suivi</span>' : '') + '</div></li>';
  }
  function renderCours() {
    var total = CITEMS.length;
    var ready = CITEMS.filter(function (i) { return i.st !== "todo"; }).length;
    var suivis = CITEMS.filter(function (i) { return i.suivi; }).length;
    $("cprog").innerHTML = ready + ' notion' + (ready > 1 ? 's' : '') + ' couverte' + (ready > 1 ? 's' : '') + ' sur ' + total + '<div class="meter" aria-hidden="true"><i style="width:' + Math.round(ready / total * 100) + '%"></i></div>';
    var F = [["all", "Toutes (" + total + ")"], ["done", "Avec fiche (" + ready + ")"], ["todo", "À rédiger (" + (total - ready) + ")"], ["suivi", "Suivis (" + suivis + ")"]];
    $("cfilters").innerHTML = F.map(function (x) { return '<button type="button" data-c="' + x[0] + '" aria-pressed="' + (cf === x[0]) + '">' + x[1] + '</button>'; }).join("");
    var q = norm(cq).trim();
    var shown = CITEMS.filter(function (i) {
      if (cf === "done" && i.st === "todo") return false;
      if (cf === "todo" && i.st !== "todo") return false;
      if (cf === "suivi" && !i.suivi) return false;
      return !q || norm(i.name + " " + i.li).indexOf(q) !== -1;
    });
    $("ctiles").innerHTML = CTHEMES.map(function (t) {
      var all = CITEMS.filter(function (i) { return i.th === t[0]; });
      var done = all.filter(function (i) { return i.st !== "todo"; }).length;
      var n = shown.filter(function (i) { return i.th === t[0]; }).length;
      return '<button type="button" class="ctile" data-th="' + t[0] + '"' + (n ? '' : ' disabled') + '><b>' + t[1] + '</b>' +
        '<span class="cnum">' + done + ' sur ' + all.length + ' couvertes</span><span class="meter" aria-hidden="true"><i style="width:' + Math.round(done / all.length * 100) + '%"></i></span></button>';
    }).join("");
    $("ccount").textContent = shown.length + " notion" + (shown.length > 1 ? "s" : "");
    $("cours-list").innerHTML = CTHEMES.map(function (t) {
      var rows = shown.filter(function (i) { return i.th === t[0]; });
      if (!rows.length) return "";
      return '<section class="cgroup" id="ct-' + t[0] + '"><div class="cgroup-head"><h2>' + t[1] + '</h2><p>' + t[2] + '</p></div><ul class="clist">' + rows.map(citemHTML).join("") + '</ul></section>';
    }).join("") || '<p class="note">Aucune notion ne correspond à cette recherche.</p>';
  }
  $("cfilters").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    cf = b.getAttribute("data-c");
    renderCours();
  });
  $("cq").addEventListener("input", function (e) { cq = e.target.value; renderCours(); });
  $("ctiles").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-th]");
    var sec = b && document.getElementById("ct-" + b.getAttribute("data-th"));
    if (sec) sec.scrollIntoView({ behavior: calm.matches ? "auto" : "smooth", block: "start" });
  });
  renderCours();

  /* ---------- Glossaire ---------- */
  var GCATS = [["cyber", "Cybersécurité et ingénierie sociale"], ["info", "Influence et information"], ["cog", "Psychologie cognitive et neuropsychologie"], ["soc", "Psychologie sociale"]];
  var GCAT_OF = {
    "Social engineering (ingénierie sociale)": "cyber", "Hameçonnage (phishing)": "cyber", "Hameçonnage ciblé (spear phishing)": "cyber", "Vishing": "cyber",
    "Pretexting": "cyber", "Fraude au président": "cyber", "Deepfake": "cyber", "OSINT": "cyber", "Blue team / red team": "cyber",
    "Lutte informatique offensive (LIO) / défensive (LID)": "cyber", "Fatigue sécuritaire": "cyber",
    "Influence": "info", "Opérations militaires d'influence (OMI)": "info", "PsyOps": "info", "Lutte informatique d'influence (L2I)": "info",
    "Lutte informationnelle": "info", "Désinformation / mésinformation": "info", "Ingérence numérique étrangère": "info", "Guerre cognitive": "info",
    "Résilience informationnelle": "info", "Cadrage (framing)": "info", "Mise à l'agenda (agenda-setting)": "info", "Fenêtre d'Overton": "info",
    "Relation parasociale": "info", "Inondation informationnelle": "info", "Microciblage": "info", "Astroturfing": "info", "Inoculation (prébunking)": "info",
    "Administrateur central": "cog", "Système attentionnel superviseur (SAS)": "cog", "Cécité attentionnelle": "cog", "Prosopagnosie": "cog",
    "Syndrome de Capgras": "cog", "Anosognosie": "cog", "Mémoire de source": "cog", "Pragmatique": "cog", "Saillance aberrante": "cog",
    "Théorie de l'esprit": "cog", "Renforcement variable": "cog", "Effet d'espacement": "cog", "Agnosie aperceptive / associative": "cog", "Fiabilité et validité": "cog",
    "Effet spectateur": "soc", "Diffusion de responsabilité": "soc", "Norme descriptive, norme prescriptive": "soc", "Conformité": "soc",
    "Identité sociale": "soc", "Technique de l'amorçage": "soc", "Réactance": "soc",
    "Revictimisation": "cyber", "Débriefing": "cyber", "Modèle du fromage suisse": "cyber", "Budget de conformité": "cyber",
    "Réévaluation cognitive": "cog", "Plan si… alors (intention de mise en œuvre)": "cog", "Sensibilité (d') et critère (c)": "cog",
    "Contrebalancement": "cog", "Préenregistrement": "cog", "Crise de la réplication": "cog"
  };
  var gcat = "all";
  function initial(t) { return norm(t).charAt(0).toUpperCase(); }
  function renderGloss(q) {
    var n = norm(q || "").trim();
    var inCat = function (g) { return gcat === "all" || GCAT_OF[g[0]] === gcat; };
    var out = GLOSS.filter(function (g) { return inCat(g) && (!n || norm(g[0] + " " + g[1]).indexOf(n) !== -1); })
      .sort(function (a, b) { return a[0].localeCompare(b[0], "fr", { sensitivity: "base" }); });
    $("gfilters").innerHTML = [["all", "Toutes"]].concat(GCATS).map(function (c) {
      var count = GLOSS.filter(function (g) { return c[0] === "all" || GCAT_OF[g[0]] === c[0]; }).length;
      return '<button type="button" data-g="' + c[0] + '" aria-pressed="' + (gcat === c[0]) + '">' + c[1] + ' (' + count + ')</button>';
    }).join("");
    var letters = [];
    out.forEach(function (g) { var l = initial(g[0]); if (letters.indexOf(l) === -1) letters.push(l); });
    $("gindex").innerHTML = letters.map(function (l) { return '<button type="button" data-l="' + l + '" aria-label="Aller à la lettre ' + l + '">' + l + '</button>'; }).join("");
    $("gloss").innerHTML = letters.map(function (l) {
      return '<section class="gsec" id="gl-' + l + '"><h2 class="gletter">' + l + '</h2><dl class="gloss">' + out.filter(function (g) { return initial(g[0]) === l; }).map(function (g) {
        var cat = GCATS.filter(function (c) { return c[0] === GCAT_OF[g[0]]; })[0];
        return '<div><dt>' + hi(g[0], q) + (cat ? '<span class="gcat">' + cat[1] + '</span>' : '') + '</dt><dd>' + hi(g[1], q) + '</dd></div>';
      }).join("") + '</dl></section>';
    }).join("");
    $("gloss-empty").hidden = out.length > 0;
    $("gcount").textContent = out.length + " terme" + (out.length > 1 ? "s" : "");
  }
  $("gfilters").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-g]");
    if (!b) return;
    gcat = b.getAttribute("data-g");
    renderGloss($("q").value);
  });
  $("gindex").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-l]");
    var sec = b && document.getElementById("gl-" + b.getAttribute("data-l"));
    if (sec) sec.scrollIntoView({ behavior: calm.matches ? "auto" : "smooth", block: "start" });
  });
  renderGloss("");
  var gq = new URLSearchParams(location.search).get("q");
  if (gq) { $("q").value = gq; renderGloss(gq); }
  $("q").addEventListener("input", function (e) { renderGloss(e.target.value); });

  /* ---------- Thème ---------- */
  /* Until the reader chooses, the site follows the system; each click then flips what is on screen */
  var THEME_LBL = { light: "Clair", dark: "Sombre" };
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  var theme = "auto";
  try { theme = localStorage.getItem("hc-theme") || "auto"; } catch (e) {}
  if (!THEME_LBL[theme]) theme = "auto";
  function shown() { return theme === "auto" ? (systemDark.matches ? "dark" : "light") : theme; }
  function applyTheme() {
    var r = document.documentElement;
    if (theme === "auto") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", theme);
    $("theme-lbl").textContent = THEME_LBL[shown()];
    $("theme-btn").setAttribute("aria-label", shown() === "dark" ? "Passer en mode clair" : "Passer en mode sombre");
  }
  if (systemDark.addEventListener) systemDark.addEventListener("change", applyTheme);
  $("theme-btn").addEventListener("click", function () {
    theme = shown() === "dark" ? "light" : "dark";
    try { localStorage.setItem("hc-theme", theme); } catch (e) {}
    if (!document.startViewTransition || calm.matches) { applyTheme(); return; }
    var r = document.documentElement;
    r.classList.add("vt-theme");
    var vt = document.startViewTransition(applyTheme);
    vt.ready.catch(function () {});
    vt.finished.then(function () { r.classList.remove("vt-theme"); });
  });
  applyTheme();

  /* ---------- Menu mobile ---------- */
  $("menu-btn").addEventListener("click", function () {
    var o = $("top").classList.toggle("open");
    $("menu-btn").setAttribute("aria-expanded", o ? "true" : "false");
  });
  function closeMenu() { $("top").classList.remove("open"); $("menu-btn").setAttribute("aria-expanded", "false"); }
  $("nav").addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("click", function (e) { if ($("top").classList.contains("open") && !e.target.closest("#top")) closeMenu(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && $("top").classList.contains("open")) { closeMenu(); $("menu-btn").focus(); }
  });

  /* ---------- Routage ---------- */
  var VIEWS = ["accueil", "carte", "fiches", "fiche", "terrain", "cours", "labo", "chapeaux", "references", "glossaire", "lexique", "ressources", "blog", "billet", "a-propos", "contribuer", "contact", "mentions-legales"];
  var current = "accueil";
  /* Sur le site publié, les adresses n'ont pas d'extension : l'hébergeur sert fiches.html à l'adresse « fiches ».
     En aperçu local (fichier ouvert depuis le disque, Live Server), rien ne fait ce lien : les liens gardent .html */
  var LOCAL = location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var EXT = LOCAL ? ".html" : "";
  function fileFor(h) {
    if (!h || h === "accueil") return LOCAL ? "index.html" : "./";
    if (h.indexOf("fiche-") === 0) return ficheById(h.slice(6)) ? h + EXT : null;
    if (h.indexOf("billet-") === 0) return billetById(h.slice(7)) ? h + EXT : null;
    if (TERRAINS[h] || (VIEWS.indexOf(h) !== -1 && h !== "fiche" && h !== "terrain" && h !== "billet")) return h + EXT;
    return null;
  }
  function nav(h, q) {
    if (!STATIC) { location.hash = h; return; }
    var t = fileFor(h);
    if (t) location.href = t + (q ? "?q=" + encodeURIComponent(q) : "");
  }
  window.HC_ROUTES = VIEWS.filter(function (v) { return v !== "fiche" && v !== "terrain" && v !== "billet"; })
    .concat(Object.keys(TERRAINS), FICHES.map(function (f) { return "fiche-" + f.id; }), BILLETS.map(function (b) { return "billet-" + b.id; }));
  function route() {
    var h = STATIC ? document.body.getAttribute("data-page") : (location.hash || "").slice(1) || "accueil";
    var view = h, f = null;
    if (TERRAINS[h]) {
      view = "terrain";
      $("v-terrain").innerHTML = terrainHTML(TERRAINS[h]);
      $("v-terrain").setAttribute("data-band", TERRAINS[h]);
      labelCells($("v-terrain"));
    } else if (h.indexOf("fiche-") === 0) {
      var id = h.slice(6);
      f = ficheById(id) || null;
      view = f ? "fiche" : "fiches";
    } else if (h.indexOf("billet-") === 0) {
      var b = billetById(h.slice(7));
      view = b ? "billet" : "blog";
      if (b) $("v-billet").innerHTML = billetHTML(b);
    } else if (VIEWS.indexOf(h) === -1 || h === "fiche" || h === "terrain" || h === "billet") { view = "accueil"; }
    if (f) {
      $("v-fiche").innerHTML = ficheHTML(f);
      $("v-fiche").setAttribute("data-band", f.ax[0]);
    }
    VIEWS.forEach(function (v) { $("v-" + v).hidden = (v !== view); });
    var cur = view === "fiche" ? "fiches" : view === "billet" ? "blog" : view === "terrain" ? "" : view;
    Array.prototype.forEach.call(document.querySelectorAll("#nav a"), function (a) {
      if (a.getAttribute("data-v") === cur) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    current = view;
    window.scrollTo(0, 0);
    slideAll();
    onScroll();
  }
  window.addEventListener("hashchange", function () {
    var h = (location.hash || "").slice(1);
    if (h && !fileFor(h)) return;
    if (STATIC) { location.replace(fileFor(h)); return; }
    if (document.startViewTransition && !calm.matches) document.startViewTransition(route).ready.catch(function () {});
    else route();
  });
  if (STATIC) {
    /* On a published page, links to a view open its file; an old shared #address lands on the right page */
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var t = fileFor(a.getAttribute("href").slice(1));
      if (t) { e.preventDefault(); location.href = t; }
    });
    var old = (location.hash || "").slice(1);
    if (old && fileFor(old)) location.replace(fileFor(old));
    /* Links the script draws (filters, fiche, terrain) point at files too, so they open in a new tab as they should */
    var relink = function () {
      Array.prototype.forEach.call($("main").querySelectorAll('a[href^="#"]'), function (a) {
        var t = fileFor(a.getAttribute("href").slice(1));
        if (t) a.setAttribute("href", t);
      });
    };
    /* In a local preview, the page's own links (written without extension) get their .html back */
    if (LOCAL) Array.prototype.forEach.call(document.querySelectorAll("a[href]"), function (a) {
      var v = a.getAttribute("href"), t = v === "./" ? "index.html" : /^[\w-]+$/.test(v) && fileFor(v);
      if (t) a.setAttribute("href", t);
    });
    relink();
    new MutationObserver(relink).observe($("main"), { childList: true, subtree: true });
    /* A crossfade between pages the browser declines (a file opened from disk) is simply skipped */
    ["pageswap", "pagereveal"].forEach(function (type) {
      window.addEventListener(type, function (e) { if (e.viewTransition) { e.viewTransition.ready.catch(function () {}); e.viewTransition.finished.catch(function () {}); } });
    });
  }

  /* ---------- Progression de lecture et sommaire ---------- */
  var ticking = false, tocAt = null;
  $("totop").addEventListener("click", function () {
    window.scrollTo(0, 0);
    document.querySelector(".brand").focus({ preventScroll: true });
  });
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      var bar = $("progress");
      $("totop").hidden = window.scrollY < 2 * window.innerHeight;
      if (current !== "fiche") { bar.style.transform = "scaleX(0)"; return; }
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
      var active = SECS.length ? SECS[0][0] : null;
      SECS.forEach(function (s) {
        var el = $(s[0]);
        if (el && el.getBoundingClientRect().top < 140) active = s[0];
      });
      Array.prototype.forEach.call(document.querySelectorAll(".toc button"), function (b) {
        b.setAttribute("aria-current", b.getAttribute("data-t") === active ? "true" : "false");
        /* In the strip of a small screen, the entry being read stays in view */
        if (b.getAttribute("data-t") === active && active !== tocAt) { tocAt = active; b.closest("ol").scrollLeft = b.parentNode.offsetLeft - 16; }
      });
      slide(document.querySelector("#v-fiche .toc ol"), "left", '[aria-current="true"]');
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Recherche globale ---------- */
  var PAGES = [["Accueil", "accueil"], ["Carte des vulnérabilités cognitives", "carte"], ["Fiches", "fiches"], ["Cours et notions", "cours"], ["Labo : anatomie, quiz, score de gravité", "labo"], ["Chapeaux blancs, gris et noirs", "chapeaux"], ["Références et sources", "references"], ["Glossaire", "glossaire"], ["Lexique IT", "lexique"], ["Ressources et correspondance DIMA", "ressources"], ["Blog", "blog"], ["À propos", "a-propos"], ["Contribuer", "contribuer"], ["Contact", "contact"], ["Mentions légales", "mentions-legales"]];
  var IDX = [];
  PAGES.forEach(function (p) { IDX.push({ t: p[0], k: "Page", x: "", go: function () { nav(p[1]); } }); });
  Object.keys(TERRAINS).forEach(function (slug) { IDX.push({ t: AX[TERRAINS[slug]], k: "Terrain", x: TERRAIN_FOR[TERRAINS[slug]], go: function () { nav(slug); } }); });
  FICHES.forEach(function (f) { IDX.push({ t: f.title, k: "Fiche", x: f.teaser + " " + f.socle.join(" "), go: function () { nav("fiche-" + f.id); } }); });
  BILLETS.forEach(function (b) { IDX.push({ t: b.title, k: "Blog", x: b.lead, go: function () { nav("billet-" + b.id); } }); });
  COURS.forEach(function (g) { g.n.forEach(function (x) { IDX.push({ t: x[0], k: "Cours", x: x[3] || "", go: function () { nav(x[2] ? "fiche-" + x[2] : "cours"); } }); }); });
  GLOSS.forEach(function (g) { IDX.push({ t: g[0], k: "Glossaire", x: g[1], go: function () { $("q").value = g[0]; renderGloss(g[0]); nav("glossaire", g[0]); } }); });
  LEX.forEach(function (r) { IDX.push({ t: r[0], k: "Lexique IT", x: r[1] + " " + r[2] + " " + r[3], go: function () { nav("lexique"); } }); });
  Object.keys(TE).forEach(function (id) { IDX.push({ t: id + " " + TE[id], k: "DIMA", x: "", go: function () { nav("ressources"); } }); });

  var spRes = [], spSel = 0, spReturn = null;
  function spRender() {
    var q = norm($("sp-in").value).trim(), toks = q.split(/\s+/).filter(Boolean);
    if (!toks.length) {
      spRes = IDX.filter(function (i) { return i.k === "Fiche"; }).slice(0, 6).concat(IDX.filter(function (i) { return i.k === "Page"; }).slice(0, 3));
    } else {
      var scored = [];
      IDX.forEach(function (it) {
        var tt = norm(it.t), xx = norm(it.x), s = 0;
        for (var j = 0; j < toks.length; j++) {
          if (tt.indexOf(toks[j]) === 0) s += 3; else if (tt.indexOf(toks[j]) > -1) s += 2; else if (xx.indexOf(toks[j]) > -1) s += 1; else { s = -1; break; }
        }
        if (s > 0) scored.push([s, it]);
      });
      scored.sort(function (a, b) { return b[0] - a[0]; });
      spRes = scored.slice(0, 10).map(function (x) { return x[1]; });
    }
    spSel = 0;
    $("sp-list").innerHTML = spRes.length ? spRes.map(function (it, i) {
      return '<li role="option" data-i="' + i + '"' + (i === 0 ? ' class="sel" aria-selected="true"' : '') + '><span class="k">' + it.k + '</span><span class="t">' + it.t + '</span></li>';
    }).join("") : '<li class="empty">Aucun résultat</li>';
  }
  function spMark() {
    Array.prototype.forEach.call($("sp-list").children, function (li, i) {
      li.classList.toggle("sel", i === spSel);
      if (i === spSel) { li.setAttribute("aria-selected", "true"); li.scrollIntoView({ block: "nearest" }); } else li.removeAttribute("aria-selected");
    });
  }
  function spOpen() {
    spReturn = document.activeElement;
    $("sp").hidden = false;
    document.documentElement.classList.add("noscroll");
    $("sp-in").value = "";
    spRender();
    $("sp-in").focus();
  }
  function spClose() {
    $("sp").hidden = true;
    document.documentElement.classList.remove("noscroll");
    if (spReturn && spReturn.focus) spReturn.focus();
  }
  function spGo(i) {
    var it = spRes[i];
    if (!it) return;
    spClose();
    it.go();
  }
  $("sp-open").addEventListener("click", spOpen);
  $("sp-in").addEventListener("input", spRender);
  $("sp-in").addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); if (spRes.length) { spSel = (spSel + 1) % spRes.length; spMark(); } }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (spRes.length) { spSel = (spSel - 1 + spRes.length) % spRes.length; spMark(); } }
    else if (e.key === "Enter") { e.preventDefault(); spGo(spSel); }
    else if (e.key === "Escape") { e.preventDefault(); spClose(); }
  });
  $("sp-list").addEventListener("click", function (e) {
    var li = e.target.closest("li[data-i]");
    if (li) spGo(parseInt(li.getAttribute("data-i"), 10));
  });
  $("sp").addEventListener("click", function (e) { if (e.target.closest("[data-close]")) spClose(); });
  /* The keyboard of a phone covers the page without always shrinking it: the panel takes the height it leaves */
  if (window.visualViewport) window.visualViewport.addEventListener("resize", function () {
    document.documentElement.style.setProperty("--vvh", window.visualViewport.height + "px");
  });
  document.addEventListener("keydown", function (e) {
    var tag = (e.target && e.target.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA";
    if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) { e.preventDefault(); if ($("sp").hidden) spOpen(); else spClose(); }
    else if (e.key === "/" && !typing && $("sp").hidden) { e.preventDefault(); spOpen(); }
    else if (e.key === "Escape" && !$("sp").hidden) { spClose(); }
  });

  if (CONTRIB_FORM) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-contrib]"), function (a) {
      a.setAttribute("href", CONTRIB_FORM);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-contrib-wait]"), function (el) { el.hidden = true; });
  }
  route();


  /* ---------- Labo : anatomie d'un message, quiz de détection, score de gravité ---------- */

  var FLAWS = {
    expediteur: { lever: "Usurpation d'identité", te: ["TE0312", "TE0422"], signal: "Le nom affiché est celui de la direction, mais l'adresse réelle n'est pas vérifiée.", pt: "Outil", patch: "Afficher l'adresse complète et marquer les messages venant de l'extérieur." },
    canal: { lever: "Autorité et coupure du canal de vérification", te: ["TE0422"], signal: "L'émetteur se rend injoignable pour empêcher un rappel.", pt: "Procédure", patch: "Rappeler un numéro déjà connu ou valider par un second canal, même si la personne se dit injoignable." },
    urgence: { lever: "Urgence", te: ["TE0424", "TE0414"], signal: "Échéance serrée, sans justification.", pt: "Procédure", patch: "Règle : plus c'est urgent, plus on vérifie. Délai minimal pour tout paiement hors habitude." },
    secret: { lever: "Contournement de procédure par le secret", te: ["TE0422"], signal: "On demande de ne pas informer les personnes qui contrôleraient la demande.", pt: "Environnement", patch: "Double validation obligatoire, impossible à contourner seul." },
    confiance: { lever: "Flatterie et sentiment d'être choisi", te: ["TE0426"], signal: "Le message valorise le destinataire pour réduire sa méfiance.", pt: "Entraînement", patch: "Reconnaître le procédé : une marque de confiance n'est pas une autorisation." },
    canalpay: { lever: "Demande de paiement hors circuit", te: ["TE0422"], signal: "Coordonnées bancaires fournies dans le message lui-même.", pt: "Outil", patch: "Ne payer que vers des coordonnées enregistrées ; tout changement est vérifié par rappel." },
    autorite2: { lever: "Autorité par délégation", te: ["TE0422"], signal: "On invoque un haut responsable sans preuve ni canal officiel.", pt: "Procédure", patch: "Authentifier toute demande « au nom de » auprès du secrétariat concerné, par un canal connu." },
    urgence2: { lever: "Urgence et demande d'information sensible", te: ["TE0424", "TE0414"], signal: "Une liste de personnes est demandée dans un délai court.", pt: "Procédure", patch: "Aucune liste de participants sans validation, quelle que soit l'urgence annoncée." },
    canal2: { lever: "Changement de canal", te: ["TE0312"], signal: "La réponse est demandée hors de la messagerie officielle.", pt: "Environnement", patch: "Filtrer l'envoi d'informations du cabinet vers des adresses personnelles." },
    familiarite2: { lever: "Familiarité suggérée", te: ["TE0332"], signal: "Un souvenir commun est suggéré pour créer de la proximité.", pt: "Entraînement", patch: "Se demander « est-ce que je le connais vraiment ? » et vérifier auprès d'un tiers." }
  };
  var MSGS = [
    { label: "En entreprise",
      head: [["De", "M. Directeur Exemple <direction@societe-exemple.invalid>", "expediteur"], ["À", "Camille", ""], ["Objet", "Urgent : règlement à effectuer", ""]],
      body: [
        ["Bonjour Camille,"],
        [["canal", "Je suis en déplacement et injoignable par téléphone."], " J'ai une demande pour vous, à traiter ", ["urgence", "aujourd'hui avant 17 h"], "."],
        ["Un nouveau prestataire doit être réglé sans attendre. ", ["secret", "Ne m'en parlez pas par les canaux habituels et n'en informez pas la comptabilité pour l'instant."]],
        [["confiance", "Vous êtes la seule personne en qui j'ai pleinement confiance sur ce dossier."], " ", ["canalpay", "Je vous envoie le RIB par retour de message."]],
        ["Cordialement,", "M. Directeur Exemple"]
      ] },
    { label: "Dans un cabinet",
      head: [["De", "Un conseiller du Ministre Exemple <conseiller@ministere-exemple.invalid>", ""], ["À", "Chargée de mission", ""], ["Objet", "Demande du Ministre", ""]],
      body: [
        ["Bonjour,"],
        [["autorite2", "Le Ministre m'a demandé de vous écrire directement."], " Il a besoin de ", ["urgence2", "la liste des participants de la réunion de demain avant midi"], "."],
        [["canal2", "Merci de répondre sur mon adresse personnelle, la messagerie du cabinet est en maintenance."]],
        [["familiarite2", "Nous nous sommes croisés lors de la dernière visite sur le terrain, vous vous en souvenez sûrement."], " Merci d'avance pour votre discrétion."],
        ["Bien cordialement,", "Un conseiller du Ministre Exemple"]
      ] }
  ];
  var anatMsg = 0, anatKey = null, anatAll = false;

  function anatHTML() {
    var m = MSGS[anatMsg];
    function span(k, t) { return '<button type="button" class="hl' + (anatKey === k ? ' on' : '') + '" data-k="' + k + '">' + t + '</button>'; }
    var head = m.head.map(function (h) {
      return '<div class="mh"><span>' + h[0] + '</span><span>' + (h[2] ? span(h[2], h[1].replace(/</g, "&lt;").replace(/>/g, "&gt;")) : h[1].replace(/</g, "&lt;").replace(/>/g, "&gt;")) + '</span></div>';
    }).join("");
    var body = m.body.map(function (p) {
      if (p.every(function (x) { return typeof x === 'string'; })) return '<p>' + p.join('<br>') + '</p>';
      return '<p>' + p.map(function (x) { return typeof x === "string" ? x : span(x[0], x[1]); }).join("") + '</p>';
    }).join("");
    var tools = '<div class="filters" role="group" aria-label="Choix du message">' +
      MSGS.map(function (x, i) { return '<button type="button" data-m="' + i + '" aria-pressed="' + (i === anatMsg) + '">' + x.label + '</button>'; }).join("") +
      '<button type="button" data-all="1" aria-pressed="' + anatAll + '">Montrer toutes les failles</button></div>';
    return tools + '<div class="mail' + (anatAll ? ' showall' : '') + '"><div class="mh top"><span class="fake">Message fictif d\'entraînement</span></div>' + head + '<div class="mb">' + body + '</div></div>' +
      '<div class="detail" id="anat-detail" aria-live="polite">' + detailHTML(anatKey) + '</div>';
  }
  function detailHTML(k) {
    var f = FLAWS[k];
    if (!f) return '<p class="hint">Survolez ou touchez une phrase soulignée pour voir le levier cognitif exploité, la technique DIMA associée et le patch qui casserait l\'attaque.</p>';
    return '<h3>' + f.lever + '</h3>' + chipsHTML(f.te) +
      '<p><b>Signal à repérer :</b> ' + f.signal + '</p>' +
      '<p><b>Patch (' + f.pt.toLowerCase() + ') :</b> ' + f.patch + '</p>' +
      '<p class="hint" style="font-size:.88rem">Rapprochement DIMA proposé, à valider.</p>';
  }
  function renderAnat() { $("lab-anat").innerHTML = anatHTML(); }
  $("lab-anat").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-m")) { anatMsg = parseInt(b.getAttribute("data-m"), 10); anatKey = null; renderAnat(); }
    else if (b.hasAttribute("data-all")) { anatAll = !anatAll; renderAnat(); }
    else if (b.hasAttribute("data-k")) { anatKey = b.getAttribute("data-k"); renderAnat(); }
  });
  $("lab-anat").addEventListener("mouseover", function (e) {
    var b = e.target.closest("button.hl");
    if (!b || anatKey === b.getAttribute("data-k")) return;
    anatKey = b.getAttribute("data-k");
    Array.prototype.forEach.call($("lab-anat").querySelectorAll("button.hl"), function (x) { x.classList.toggle("on", x.getAttribute("data-k") === anatKey); });
    $("anat-detail").innerHTML = detailHTML(anatKey);
  });
  renderAnat();

  /* Quiz : détection du signal */
  var ITEMS = [
    { t: "Direction : virement urgent à effectuer avant 17 h. C'est confidentiel, je ne suis pas joignable, répondez-moi directement.", trap: true, why: "Autorité, urgence et secret réunis, avec un canal de vérification coupé." },
    { t: "Sécurité informatique : votre mot de passe expire dans une heure. Cliquez sur ce lien raccourci pour le conserver.", trap: true, why: "Fausse urgence et lien masqué. Un service informatique ne demande pas cela par un lien raccourci." },
    { t: "Cabinet : le ministre souhaite la liste des participants de la réunion de demain. Merci de répondre à mon adresse personnelle.", trap: true, why: "Demande d'information sensible sur un canal hors messagerie officielle." },
    { t: "Votre fournisseur habituel : notre IBAN a changé, merci d'utiliser le nouveau dès la prochaine facture, sans confirmation nécessaire.", trap: true, why: "Changement de coordonnées bancaires sans vérification par un second canal." },
    { t: "Un appel d'un inconnu se présentant comme du service informatique : il a besoin du code reçu par SMS pour une vérification rapide.", trap: true, why: "Aucun service légitime ne demande un code à usage unique reçu par SMS." },
    { t: "Message vocal de votre directrice, voix légèrement robotique : acheter des cartes cadeaux pour un client, sans en parler.", trap: true, why: "Voix possiblement synthétique, demande inhabituelle et discrétion exigée." },
    { t: "Informatique : maintenance prévue samedi de 2 h à 4 h. Aucune action requise. Détails sur l'intranet habituel.", trap: false, why: "Aucune demande, canal habituel, aucune pression." },
    { t: "RH : le planning de la semaine prochaine est publié sur l'outil interne, comme chaque vendredi.", trap: false, why: "Routine connue, aucune action risquée." },
    { t: "Le directeur : peux-tu m'appeler pour valider le virement du prestataire ? La double validation habituelle s'applique.", trap: false, why: "Urgence faible, rappel demandé et procédure respectée : ce message renforce la vérification." },
    { t: "Votre banque : votre relevé mensuel est disponible dans votre espace client. Connectez-vous comme d'habitude, sans lien dans ce message.", trap: false, why: "Aucun lien, aucune demande de données, canal habituel." },
    { t: "Cabinet : la réunion est déplacée à 15 h, même salle, ordre du jour inchangé.", trap: false, why: "Information logistique, aucune donnée sensible demandée." },
    { t: "Un collègue que vous connaissez : peux-tu relire ma note avant 17 h ? Merci !", trap: false, why: "Échéance courte, mais enjeu faible et interlocuteur connu : l'urgence seule ne suffit pas à signaler." }
  ];
  var qOrder = [], qi = 0, qH = 0, qM = 0, qF = 0, qC = 0, qBad = [], qDone = false;
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function invNorm(p) {
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    var pl = 0.02425, ph = 1 - pl, q, r;
    if (p < pl) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    if (p > ph) { q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  function quizStart() { qOrder = shuffle(ITEMS.map(function (x, i) { return i; })); qi = 0; qH = qM = qF = qC = 0; qBad = []; qDone = false; renderQuiz(); }
  function quizResult() {
    var nT = ITEMS.filter(function (x) { return x.trap; }).length, nL = ITEMS.length - nT;
    var H = (qH + 0.5) / (nT + 1), FA = (qF + 0.5) / (nL + 1);
    var zH = invNorm(H), zF = invNorm(FA);
    var dp = zH - zF, cr = -(zH + zF) / 2;
    var sens = dp < 0.5 ? "faible" : dp < 1.5 ? "correcte" : "bonne";
    var tend = cr > 0.3 ? "plutôt prudent : vous signalez facilement, au prix de fausses alarmes" : cr < -0.3 ? "plutôt confiant : vous laissez passer facilement, au risque de manquer des pièges" : "équilibré entre prudence et confiance";
    var out = '<div class="qwrap"><h2 style="margin-bottom:6px">Votre profil de détection</h2><p class="hint">' + ITEMS.length + ' messages fictifs. Calcul inspiré de la théorie de la détection du signal (voir la fiche psychophysique).</p>' +
      '<dl class="rgrid"><div><dt>Pièges repérés</dt><dd>' + qH + '/' + nT + '</dd></div><div><dt>Fausses alarmes</dt><dd>' + qF + '/' + nL + '</dd></div><div><dt>Sensibilité d\'</dt><dd>' + dp.toFixed(2) + '</dd></div><div><dt>Critère c</dt><dd>' + cr.toFixed(2) + '</dd></div></dl>' +
      '<p><b>Sensibilité ' + sens + '.</b> Votre critère est ' + tend + '.</p>';
    if (qBad.length) {
      out += '<h3 style="margin:18px 0 8px">À revoir</h3><ul class="plain">' + qBad.map(function (i) { return '<li>« ' + ITEMS[i].t + ' » : ' + (ITEMS[i].trap ? 'piège manqué. ' : 'message légitime signalé à tort. ') + ITEMS[i].why + '</li>'; }).join("") + '</ul>';
    }
    out += '<p class="note">Douze messages ne suffisent pas à une mesure fiable : c\'est une illustration pédagogique, pas un test validé. Rien n\'est enregistré.</p><div class="cta"><button type="button" class="btn primary" id="q-restart">Recommencer</button></div></div>';
    return out;
  }
  function renderQuiz() {
    if (qi >= qOrder.length) { $("lab-quiz").innerHTML = quizResult(); return; }
    var it = ITEMS[qOrder[qi]];
    $("lab-quiz").innerHTML = '<div class="qwrap"><div class="qhead"><span>Message ' + (qi + 1) + ' sur ' + ITEMS.length + '</span><span class="fake">Fictif</span></div>' +
      '<div class="qmsg">' + it.t + '</div>' +
      '<div class="qbtns"><button type="button" data-a="ok">Légitime</button><button type="button" data-a="trap">Piégé</button></div>' +
      '<div id="q-fb" aria-live="polite"></div></div>';
  }
  $("lab-quiz").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.id === "q-restart") { quizStart(); return; }
    if (b.id === "q-next") { qi++; renderQuiz(); return; }
    var a = b.getAttribute("data-a");
    if (!a) return;
    var idx = qOrder[qi], it = ITEMS[idx], saidTrap = a === "trap", good = saidTrap === it.trap;
    if (it.trap) { if (saidTrap) qH++; else { qM++; qBad.push(idx); } } else { if (saidTrap) { qF++; qBad.push(idx); } else qC++; }
    Array.prototype.forEach.call($("lab-quiz").querySelectorAll(".qbtns button"), function (x) { x.disabled = true; });
    $("q-fb").innerHTML = '<div class="fb ' + (good ? 'ok' : 'ko') + '"><p><b>' + (good ? 'Bien vu.' : 'Raté.') + '</b> ' + (it.trap ? 'Ce message était piégé.' : 'Ce message était légitime.') + '</p><p>' + it.why + '</p><button type="button" class="btn" id="q-next">' + (qi + 1 >= ITEMS.length ? 'Voir mon profil' : 'Message suivant') + '</button></div>';
    var nx = $("q-next"); if (nx) nx.focus();
  });
  quizStart();

  /* Score de gravité cognitif */
  var SC_DEF = [
    ["expo", "Exposition", "Combien de personnes ou de situations sont concernées.", 5],
    ["prob", "Probabilité d'exploitation", "Chances que le levier fonctionne, y compris sous charge.", 5],
    ["imp", "Impact", "Gravité des conséquences si l'exploitation réussit.", 5],
    ["det", "Difficulté de détection", "À quel point la tentative passe inaperçue.", 5],
    ["ease", "Facilité de correction", "Rapidité et coût pour appliquer un patch efficace.", 5]
  ];
  var SC_PRE = [
    ["Fraude au président", [6, 6, 8, 5, 7]],
    ["Hameçonnage ciblé de cabinet", [4, 5, 9, 6, 5]],
    ["Inondation informationnelle", [9, 6, 6, 8, 2]],
    ["Détournement de la saillance", [9, 4, 5, 9, 2]],
    ["Délégation à un assistant IA", [7, 4, 7, 8, 4]]
  ];
  function scInit() {
    $("lab-score").innerHTML =
      '<p class="hint" style="max-width:62ch">Notez une faille sur cinq critères. Le score pondère l\'exposition (20 %), la probabilité (25 %), l\'impact (30 %) et la difficulté de détection (25 %). La facilité de correction ne baisse pas la gravité : elle sert à choisir quoi corriger en premier.</p>' +
      '<div class="filters" id="sc-pre" role="group" aria-label="Exemples">' + SC_PRE.map(function (p, i) { return '<button type="button" data-p="' + i + '">' + p[0] + '</button>'; }).join("") + '</div>' +
      '<div class="sgrid"><div id="sc-sliders">' + SC_DEF.map(function (s) {
        return '<div class="sl"><label for="sc-' + s[0] + '">' + s[1] + '<output id="o-' + s[0] + '">' + s[3] + '</output></label><input id="sc-' + s[0] + '" type="range" min="0" max="10" step="1" value="' + s[3] + '"><small>' + s[2] + '</small></div>';
      }).join("") + '</div>' +
      '<div class="panel" style="margin-top:0"><div class="sev" id="sc-num">0</div><div class="slabel" id="sc-lab"></div><div class="gauge" style="margin:12px 0"><i id="sc-fill"></i></div>' +
      '<svg class="radar" id="sc-radar" viewBox="0 0 240 240" role="img" aria-label="Profil de la faille sur quatre critères"></svg>' +
      '<p id="sc-adv" style="margin:8px 0 0;font-size:1rem"></p></div></div>' +
      '<p class="note">Les exemples sont des estimations indicatives, à discuter, pas des mesures. Rien n\'est enregistré.</p>';
    scUpdate();
  }
  function scVal(k) { return parseInt($("sc-" + k).value, 10); }
  function scUpdate() {
    SC_DEF.forEach(function (s) { $("o-" + s[0]).textContent = scVal(s[0]); });
    var e = scVal("expo"), p = scVal("prob"), i = scVal("imp"), d = scVal("det"), ez = scVal("ease");
    var g = 0.2 * e + 0.25 * p + 0.3 * i + 0.25 * d;
    var lab = g < 3 ? "Faible" : g < 5.5 ? "Modérée" : g < 7.5 ? "Élevée" : "Critique";
    $("sc-num").textContent = g.toFixed(1) + " / 10";
    $("sc-lab").textContent = "Gravité " + lab.toLowerCase();
    var f = $("sc-fill"); f.style.width = (g * 10) + "%";
    f.style.background = g < 3 ? "var(--color-inf)" : g < 5.5 ? "var(--color-ent)" : "var(--color-red)";
    var adv = "";
    if (g >= 5.5 && ez >= 6) adv = "Priorité haute : gravité élevée et correction facile. ";
    else if (g >= 5.5) adv = "Gravité élevée, correction difficile : combiner plusieurs patchs (défense en profondeur) et planifier. ";
    else if (ez >= 6) adv = "Risque modéré, correction facile : à traiter quand l'occasion se présente. ";
    else adv = "Risque modéré, correction difficile : surveiller. ";
    if (d >= 7) adv += "La détection est difficile : privilégier un patch d'outil ou d'environnement plutôt que la vigilance humaine.";
    else if (p >= 7 && e >= 6) adv += "Probabilité et exposition fortes : un patch de procédure simple et appliqué partout.";
    else adv += "Un patch d'entraînement peut suffire, à mesurer dans le temps.";
    $("sc-adv").textContent = adv;
    var R = 80, cx = 120, cy = 120;
    var ax = [[0, -1, "Exposition", e], [1, 0, "Probabilité", p], [0, 1, "Impact", i], [-1, 0, "Détection", d]];
    var grid = [0.25, 0.5, 0.75, 1].map(function (k) { return '<polygon class="grid" points="' + ax.map(function (a) { return (cx + a[0] * R * k) + "," + (cy + a[1] * R * k); }).join(" ") + '"></polygon>'; }).join("");
    var shape = '<polygon class="shape" points="' + ax.map(function (a) { return (cx + a[0] * R * a[3] / 10).toFixed(1) + "," + (cy + a[1] * R * a[3] / 10).toFixed(1); }).join(" ") + '"></polygon>';
    var labels = ax.map(function (a) {
      var anchor = a[0] === 0 ? "middle" : a[0] > 0 ? "start" : "end";
      return '<text x="' + (cx + a[0] * (R + 10)) + '" y="' + (cy + a[1] * (R + 14) + (a[1] > 0 ? 4 : a[1] < 0 ? -2 : 3)) + '" text-anchor="' + anchor + '">' + a[2] + '</text>';
    }).join("");
    $("sc-radar").innerHTML = grid + shape + labels;
  }
  $("lab-score").addEventListener("input", function (e) { if (e.target.type === "range") scUpdate(); });
  $("lab-score").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-p]");
    if (!b) return;
    var v = SC_PRE[parseInt(b.getAttribute("data-p"), 10)][1];
    ["expo", "prob", "imp", "det", "ease"].forEach(function (k, i) { $("sc-" + k).value = v[i]; });
    scUpdate();
  });
  scInit();

  /* Onglets du labo */
  var labTab = "anat";
  var LAB_TABS = [["anat", "Anatomie d'un message"], ["quiz", "Repère la faille"], ["score", "Score de gravité"]];
  function setLab(t) {
    labTab = t;
    $("lab-tabs").innerHTML = LAB_TABS.map(function (x) { return '<button type="button" data-t="' + x[0] + '" aria-pressed="' + (x[0] === labTab) + '">' + x[1] + '</button>'; }).join("");
    LAB_TABS.forEach(function (x) { $("lab-" + x[0]).hidden = (x[0] !== labTab); });
    slide($("lab-tabs"), "under");
  }
  $("lab-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b) setLab(b.getAttribute("data-t"));
  });
  setLab("anat");

  /* ---------- Chapeaux : white hat, grey hat, black hat ---------- */
  var HAT_ROWS = [
    ["Mémoire de travail et charge cognitive", "memoire-travail",
     "Mesurer, avec accord, à quel moment une procédure de vérification cède sous charge, puis l'alléger.",
     "Provoquer la surcharge d'une personne pour lui faire valider une demande sans vérification.",
     "Qui est informé, et ce qui est fait du résultat."],
    ["Attention et cécité attentionnelle", "attention-selective",
     "Révéler à une équipe ses angles morts de veille lors d'un exercice annoncé.",
     "Détourner délibérément l'attention d'une cible pour qu'elle manque un signal réel.",
     "Un signal réel contre un exercice délimité."],
    ["Mémoire de source et faux souvenirs", "memoire-sources",
     "Apprendre aux analystes à tracer la source d'une information et à démentir sans répéter la fausse affirmation.",
     "Faire circuler une affirmation fausse jusqu'à ce que sa familiarité la rende crédible.",
     "Vérité rendue visible contre fausseté rendue familière."],
    ["Récompense et renforcement variable", "recompense-renforcement",
     "Auditer sur papier les mécanismes de rétention d'un produit et proposer des limites par défaut.",
     "Concevoir un produit pour prolonger l'usage au détriment de l'intention de l'utilisateur.",
     "L'intérêt de la personne reste-t-il l'objectif ?"],
    ["Décision, émotion et délai de refroidissement", "decision-emotion",
     "Entraîner la pause avant les décisions à enjeu et mesurer son effet.",
     "Provoquer la peur ou la honte pour obtenir un engagement immédiat.",
     "Donner du temps contre en retirer."],
    ["Déclin cognitif et vulnérabilité à la fraude", "declin-fraude",
     "Concevoir des protections (délais, personne de confiance) qui ne reposent pas sur le seul jugement individuel.",
     "Cibler des personnes dont le jugement est altéré.",
     "Protéger contre cibler : ligne rouge absolue."],
    ["Psychométrie et mesure", "psychometrie",
     "Mesurer l'efficacité d'une sensibilisation avec fiabilité, comparaison et honnêteté sur les limites.",
     "Annoncer des chiffres d'efficacité sans méthode pour vendre une solution ou une influence.",
     "Honnêteté sur la méthode."]
  ];
  var HAT_TEST = [
    ["Une équipe de sécurité annonce un exercice de fraude fictive à la direction, avec accord écrit, puis fait un débriefing sans nommer d'individus.", "white", "Autorisation, périmètre, débriefing et protection des personnes : tous les critères sont réunis."],
    ["Un chercheur étudie publiquement une campagne d'influence réelle à partir de contenus publics, sans contacter les personnes concernées, pour alerter sur ses mécanismes.", "grey", "Intention défensive, mais pas d'accord des personnes concernées ni de cadre de consentement : zone grise à examiner (données publiques, absence de ciblage individuel, publication prudente)."],
    ["Quelqu'un envoie un faux message urgent à un employé réel, sans prévenir personne, pour « voir s'il tombe dans le piège ».", "black", "Pas d'autorisation ni de cadre, et une personne réelle est exposée. Même avec une bonne intention annoncée, cela relève de la manipulation sans consentement."],
    ["Une chargée d'étude découvre qu'une procédure de validation est contournable par la pression sociale, la signale en privé à la direction et attend la correction avant de publier.", "white", "Divulgation responsable : signaler au responsable avant de rendre public."],
    ["Un freelance conçoit une application dont l'engagement est maximisé par des récompenses imprévisibles, sans limite d'usage, pour une audience adolescente.", "black", "L'objectif n'est pas l'intérêt des utilisateurs, et le public est vulnérable."],
    ["Une équipe teste une procédure sur des volontaires informés avec des scénarios fictifs, puis publie des résultats agrégés avec leurs limites.", "white", "Consentement éclairé, anonymat, données minimales et transparence sur la méthode."]
  ];
  var HAT_LAB = { white: "Chapeau blanc", grey: "Chapeau gris", black: "Chapeau noir" };
  function hatsInit() {
    $("hat-rows").innerHTML = HAT_ROWS.map(function (r) {
      return '<tr><td><a href="#fiche-' + r[1] + '">' + r[0] + '</a></td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td></tr>';
    }).join("");
    $("hat-test").innerHTML = HAT_TEST.map(function (q, i) {
      return '<div class="hatq" data-i="' + i + '"><p>' + q[0] + '</p><div class="filters" role="group" aria-label="Quel chapeau ?">' +
        ["white", "grey", "black"].map(function (h) { return '<button type="button" data-h="' + h + '">' + HAT_LAB[h] + '</button>'; }).join("") +
        '</div><div class="hatfb" aria-live="polite"></div></div>';
    }).join("");
  }
  $("hat-test").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-h]");
    if (!b) return;
    var box = b.closest(".hatq"), q = HAT_TEST[parseInt(box.getAttribute("data-i"), 10)], ok = b.getAttribute("data-h") === q[1];
    Array.prototype.forEach.call(box.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    box.querySelector(".hatfb").innerHTML = '<div class="fb ' + (ok ? 'ok' : 'ko') + '"><p><b>' + (ok ? 'Bien vu.' : 'Pas tout à fait.') + '</b> Réponse : ' + HAT_LAB[q[1]].toLowerCase() + '.</p><p>' + q[2] + '</p></div>';
  });
  hatsInit();
  /* Page Références */
  function refsPage() {
    var q = norm($("refq").value).trim();
    var keys = Object.keys(R).sort(function (a, b) { return R[a][0].localeCompare(R[b][0], "fr"); }).filter(function (k) { return !q || norm(R[k][0]).indexOf(q) !== -1; });
    var cited = {};
    Object.keys(FREFS).forEach(function (id) { FREFS[id].forEach(function (k) { (cited[k] = cited[k] || []).push(id); }); });
    $("reflist").innerHTML = keys.map(function (k) {
      var used = (cited[k] || []).map(function (id) { var f = FICHES.filter(function (x) { return x.id === id; })[0]; return f ? '<a href="#fiche-' + id + '">' + f.title + '</a>' : ""; })
        .concat(BILLETS.filter(function (b) { return (b.refs || []).indexOf(k) !== -1; }).map(function (b) { return '<a href="#billet-' + b.id + '">' + b.title + '</a>'; })).join(", ");
      return refLi(k).replace(/<\/li>$/, (used ? '<br><span class="pdesc">Citée dans : ' + used + '</span>' : (k === "deonto" || k === "helsinki" || k === "attack" || k === "dima" ? '<br><span class="pdesc">Cadre et outils : voir Chapeaux et Ressources.</span>' : "")) + '</li>');
    }).join("");
    $("refcount").textContent = keys.length + " référence" + (keys.length > 1 ? "s" : "");
  }
  $("refq").addEventListener("input", refsPage);
  refsPage();

  labelCells(document);
})();
