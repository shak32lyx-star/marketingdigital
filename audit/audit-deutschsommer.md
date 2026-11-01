# Audit UX / UI : DeutschSommer

Audit de l'application web DeutschSommer (préparation à l'examen FIDE, niveaux A1 à B1), fondé sur la grille [bonnes-pratiques-ux-ui.md](bonnes-pratiques-ux-ui.md) (les numéros `[BP n]` y renvoient) et sur mon regard de relecteur extérieur.

**Périmètre.** Le README et 6 captures d'écran : page de connexion (desktop), accueil, leçon FIDE, historique d'examens, texte de lecture et compte (mobile, relevées le 27/09/2026). Je n'ai ni utilisé l'application ni lu le code. Je n'ai donc pas vu les pages de vocabulaire, de grammaire, ni l'examen en cours. Les points marqués *(hypothèse)* sont à vérifier.

## Verdict en bref

L'application a une base saine : design épuré, cartes lisibles, bon état vide sur l'historique, parcours centré sur un objectif clair (réussir le FIDE). Ses faiblesses viennent surtout de la **cohérence** (langues mélangées, bugs de texte), du **positionnement** (nom et page d'accueil qui ne disent pas ce que fait le produit) et de l'**absence de « prochaine action » évidente**. Les trois premiers points suffisent à améliorer nettement la première impression.

## Priorités

| Priorité | Points | Effort |
|---|---|---|
| **P0, à corriger tout de suite** | 1, 2, 3, 4, 5 | Faible |
| **P1, fort impact** | 6 à 13 | Moyen |
| **P2, évolutions** | 14 à 22 | Moyen à élevé |

---

## P0 : Corrections immédiates

### 1. Renommer le produit (nom trop générique et daté)
- **Constat.** « DeutschSommer » signifie « Allemand d'été ». Il est lié à une saison (daté dès l'automne), ne dit rien sur l'examen FIDE ni sur la Suisse, et n'est pas mémorisable. Son seul signal fort est le drapeau suisse.
- **Point de vigilance SEO.** « fide » renvoie d'abord à la fédération internationale d'échecs. Le nom doit donc porter un mot qui lève l'ambiguïté (« Prüfung », « Test », « Schweiz », « A1-B1 »).
- **Recommandation.** Un nom court qui combine promesse et usage, par exemple « FIDE Coach », « Fide Bereit » ou « Prüfungsklar ». Vérifier la disponibilité du nom de domaine et des marques. Utiliser un sous-titre explicite : *« Préparation à l'examen fide A1-B1, avec correction IA »*.
- **À ne pas faire.** Suggérer une affiliation officielle avec le test fide. Ajouter la mention « Préparation indépendante, non affiliée à fide ».
- Réf. [BP 3].

### 2. Corriger les textes mélangés et les bugs de libellé
- **Constat.** « Hier sind deine Lektionen **pour le** DeutschSommer » (allemand et français dans la même phrase, sur la page la plus vue). « Back to Program » dans une interface allemande. « Prüfungstraining History ». « CERTIFICATION PRACTICE » sous « FIDE Focus ». Le menu dit « Program » à côté de « Wortschatz ».
- **Impact.** Cela casse la crédibilité, surtout pour un produit qui enseigne une langue.
- **Recommandation.** Voir aussi le point 7 pour la stratégie de langue. Faire une passe de relecture sur tous les écrans, et externaliser les textes dans un fichier de traduction (i18n) pour éviter les oublis.
- Réf. [BP 2, 7].

### 3. Remplacer le message « Server error » à la connexion
- **Constat.** La page de connexion affiche un message technique brut, en anglais, sans issue.
- **Hypothèse.** L'hébergement `onrender.com` peut mettre un moment à répondre après une période d'inactivité (démarrage à froid des offres gratuites). Si c'est le cas, c'est la première chose que voit un nouvel utilisateur.
- **Recommandation.**
  1. Message humain et actionnable : « Le serveur se réveille, réessayez dans quelques secondes » avec un bouton « Réessayer ».
  2. Indicateur de chargement sur le bouton « Anmelden ».
  3. Distinguer erreur réseau, identifiants invalides et erreur serveur.
  4. Côté technique : réveil du serveur en arrière-plan dès l'arrivée sur la page, ou offre d'hébergement sans mise en veille.
- Réf. [BP 12].

### 4. Retirer le filigrane « Grok » de l'illustration de lecture
- **Constat.** Le logo de l'outil de génération d'images est visible sur l'image de « Die Mücke ». Une autre image de la leçon FIDE montre une étoile de génération en bas à droite.
- **Impact.** Aspect non fini, et risque sur les droits d'usage selon les conditions de l'outil (à vérifier).
- **Recommandation.** Régénérer ou recadrer les images, vérifier leur licence, et ajouter un texte alternatif pour l'accessibilité.
- Réf. [BP 2].

### 5. Corriger la cohérence du contenu
- **Constat.** L'image de la leçon « Unit 1 » (niveau débutant) montre un tableau marqué « **Niveau B2** ». La carte d'accueil annonce « Dein Kursziel rückt näher! » à **0 %**. Le message de bienvenue dit « Student » (valeur par défaut, pas un prénom).
- **Recommandation.** Aligner les visuels sur le niveau de la leçon. Adapter le message de progression : à 0 %, « Commence ta première leçon » plutôt qu'un encouragement qui ne correspond à rien. Demander un prénom à l'inscription.

---

## P1 : Fort impact sur la conversion et l'usage

### 6. Faire de la page d'accueil publique une vraie page de conversion
- **Constat.** La page d'entrée est un écran de connexion avec un texte de bienvenue pour un utilisateur déjà inscrit (« Willkommen zurück »). Un visiteur nouveau ne trouve ni la promesse, ni le public visé, ni le niveau, ni le mot « FIDE », ni lien « Créer un compte ». Les deux cartes (« Präzise Module », « Fortschritt ») sont génériques.
- **Recommandation.** Séparer la **landing page** (publique, un objectif : créer un compte) de la **connexion**. Structure :
  1. Promesse claire : « Préparez l'examen fide A1-B1, avec correction de vos réponses par IA ».
  2. Bénéfices concrets : examen blanc complet (4 parties), correction détaillée, vocabulaire par répétition espacée, audio.
  3. Capture d'écran réelle de l'application.
  4. Un seul CTA : « Essayer gratuitement » (ou équivalent).
  5. Éléments de confiance : à quoi sert le fide, à qui s'adresse l'outil, FAQ (est-ce officiel ? les données ? le prix ?).
- Réf. [BP 3, 4, 5, 15].

### 7. Choisir la langue d'interface et s'y tenir
- **Constat.** Trois langues coexistent : allemand (titres), anglais (libellés, consignes d'exercice, boutons) et français (bug visible). Le README est en français et le public (FIDE : Français, Italiano, Deutsch) semble francophone en Suisse.
- **Recommandation.** Interface dans la langue de l'apprenant (français, éventuellement italien et anglais ensuite) et **allemand uniquement pour le contenu à apprendre** (textes, exercices, termes d'examen). Ajouter un sélecteur de langue. Les consignes des exercices doivent rester compréhensibles au niveau A1.
- Réf. [BP 11] (charge cognitive).

### 8. Placer une action principale unique sur l'accueil : « Continuer »
- **Constat.** L'accueil affiche un anneau de progression à 0 % puis deux gros boutons dégradés (rouge « FIDE Focus », bleu « Wortschatz ») de même poids. Aucun bouton ne dit « reprends où tu t'es arrêté ». La première leçon n'est pas suggérée.
- **Recommandation.** Une carte « Ta prochaine leçon » en tête : titre, durée estimée (« 10 min »), bouton « Commencer / Continuer ». Les deux entrées secondaires viennent ensuite, avec un style moins dominant. Changer le dégradé rouge : le rouge évoque une erreur ou une action destructive, et il est trop proche de la couleur d'alerte du formulaire.
- Réf. [BP 5, 10].

### 9. Onboarding et personnalisation
- **Constat.** Aucun écran n'explique le parcours, ne demande le niveau visé (A1, A2 ou B1) ni la date d'examen.
- **Recommandation.** Après l'inscription, 3 questions : niveau visé, date de l'examen, temps disponible par jour. En déduire un plan (« 12 semaines, 15 min/jour ») et un objectif concret affiché dans l'anneau de progression. Option : un mini test de placement.
- Réf. [BP 3, 11, 20].

### 10. Rendre la navigation et la barre d'onglets lisibles sur mobile
- **Constat.**
  - Sur la leçon FIDE, l'onglet « Wortsc… » est coupé : rien n'indique clairement qu'on peut faire défiler horizontalement.
  - « Back to Program » passe sur deux lignes.
  - Sur desktop, le menu comporte un seul sous-menu (« Program ») et « Wortschatz » : pas d'accès direct à l'examen ni à l'historique.
  - Sur mobile, tout passe par l'icône de profil.
- **Recommandation.** Barre de navigation fixe en bas sur mobile (Accueil, Programme, Vocabulaire, Examen, Compte). Onglets de leçon avec un dégradé de bord ou des flèches, ou passage en liste. Fil d'Ariane court (« ← Programme »).
- Réf. [BP 6, 7, 16].

### 11. Réduire le poids des images et laisser la tâche visible
- **Constat.** Sur la leçon FIDE, l'illustration occupe plus d'un tiers de l'écran avant la consigne. Sur la lecture, l'image pleine hauteur repousse le texte sous la ligne de flottaison. L'image est aussi plus étroite que la colonne de texte (alignement bancal).
- **Recommandation.** Image plus basse (ratio 16:9), ou repliable, et texte d'abord. Lazy loading et formats modernes (WebP/AVIF) pour la vitesse sur réseau mobile (1 barre de signal sur les captures).
- Réf. [BP 14, 16].

### 12. Clarifier le lecteur audio et la traduction
- **Constat.** « Listen to Text » et « Show Translation » sont de petits liens en serif sous le titre, peu visibles alors que l'audio est une fonction centrale. Aucun contrôle de vitesse, de pause, de répétition de phrase.
- **Recommandation.** Un lecteur audio visible (bouton lecture large, vitesse 0,75x/1x), surlignage de la phrase lue, traduction phrase par phrase au toucher. Attribuer les répliques aux personnages (qui parle ?) : le dialogue « Die Mücke » est difficile à suivre sans noms.
- Réf. [BP 5, 11, 16].

### 13. Confiance et transparence sur la correction par IA
- **Constat.** La correction IA est l'argument fort, mais rien ne dit sa fiabilité, ses limites, ni ce qui est fait des réponses (envoyées à Google Gemini). Le niveau FIDE « estimé » peut être pris pour un résultat officiel.
- **Recommandation.** Mentions claires : « estimation indicative », critères de correction utilisés (référence au *fide Test Handbuch*), exemples de feedback visibles avant inscription, possibilité de signaler une correction erronée. Politique de confidentialité conforme à la loi suisse sur la protection des données (nLPD) et au RGPD pour les utilisateurs européens.
- Réf. [BP 15, 17].

---

## P2 : Évolutions

### 14. Rétention et motivation
Série de jours (streak) discrète, objectif quotidien, rappel par e-mail ou notification, récap hebdomadaire. Après une longue inactivité, un message de reprise (« Il te reste 3 semaines avant l'examen »). Voir le cours 3 (CRM, rétention).

### 15. Tableau de bord de progression plus utile
Détailler la progression par compétence (Sprechen, Hören, Lesen, Schreiben) et par niveau, avec points faibles et suggestion d'exercice. L'anneau global à 0 % seul n'oriente pas l'action.

### 16. Page de résultats d'examen
L'état vide de l'historique est bon (explication + bouton « Start an Exam »). Prévoir ensuite : score par partie, évolution entre essais, comparaison, retour détaillé repliable.

### 17. Page Compte
- **Constat.** « Sign Out » est le bouton le plus visible, placé tout en haut, avant les informations du compte (risque de déconnexion accidentelle). L'avatar noir est massif. La date de dernière connexion est en anglais (« 27 September 2026 at 18:24 »). Le lien « Back to Program » est partiellement masqué sous l'en-tête fixe.
- **Recommandation.** Déconnexion en bas de page, en style secondaire. Dates formatées selon la langue choisie. Ajouter : prénom, objectif et date d'examen, préférences de rappel, suppression du compte et export des données. Corriger le chevauchement avec l'en-tête.

### 18. Accessibilité
Beaucoup de texte secondaire gris clair et de petites capitales espacées (« GESAMTFORTSCHRITT », « GERMAN LEARNING PLATFORM ») : vérifier le contraste (WCAG AA : 4,5:1) et la taille minimale. Cases à cocher et liens (« Vergessen? ») trop petits pour le tactile : viser 44×44 px. Ajouter des textes alternatifs, un focus clavier visible, et vérifier la compatibilité lecteur d'écran.

### 19. Cohérence typographique
Mélange de sans-serif (titres, boutons) et de serif (corps de texte, liens d'actions, consignes). La serif est lisible pour les textes d'étude, mais devient incohérente sur les contrôles (« Listen to Text »). Fixer des règles : serif pour les contenus à lire, sans-serif pour toute l'interface.

### 20. Identité visuelle et symbole
La croix suisse à côté du nom sert d'identité mais n'est pas un logo propre, et son usage est encadré en Suisse (loi sur la protection des armoiries). À vérifier juridiquement. Créer un logo simple et une palette limitée (une couleur principale, une d'alerte) plutôt que des dégradés rouge et bleu concurrents.

### 21. URL et crédibilité
L'adresse `onrender.com` rend le produit moins crédible, notamment pour une application avec compte et paiement potentiel. Prévoir un nom de domaine propre (`.ch`) et des pages légales (mentions, CGU, confidentialité).

### 22. Mesure et tests
Aucun indicateur n'est visible. Installer une analyse d'usage respectueuse de la vie privée et suivre : taux d'inscription, taux de première leçon terminée, passage à l'examen blanc, rétention à 7 et 30 jours. Faire des tests A/B sur le titre de la landing et le CTA, puis 5 tests utilisateurs avec de vrais candidats au fide.
Réf. [BP 18].

---

## Points forts à conserver

- Design sobre, cartes arrondies, espaces généreux : lecture agréable sur mobile.
- Hiérarchie typographique claire des titres.
- État vide de l'historique bien conçu (explication + action).
- Parcours structuré par unité avec onglets Grammatik / Fide / Lesen / Wortschatz.
- Fonctions différenciantes : examen blanc complet, audio, correction IA, vocabulaire en répétition espacée.

## Plan d'action suggéré

1. **Cette semaine** : points 2, 3, 4, 5 (corrections de texte, erreur de connexion, images).
2. **Sous 2 à 4 semaines** : points 1, 6, 7, 8 (nom, landing page, langue, action principale).
3. **Ensuite** : points 9 à 13, puis P2 selon les données d'usage recueillies (point 22).
