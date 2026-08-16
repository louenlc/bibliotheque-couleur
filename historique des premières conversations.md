Je suis un graphiste junior et je cherche à me créer des outils pour m’aider et m’inspirer dans mon travail.
Aujourd’hui j’aimerais créer une grande bibliothèque de couleurs un peu le site web https://coolors.co/colors mais avec quelques spécificités. Analyse le site web.
J’aimerais que cette bibliothèque de couleur soit accessible, tendances et agréable à la navigation.
Voici les premières fonctionnalités que je veux :
- Bibliothèque de couleurs par couleur (rouge, bleu, vert, rose, jaune, etc…)
- Des noms de couleurs « tendance » et dans l’air du temps pas des noms génériques, je veux plonger l’utilisateur dans un univers.
- Lorsque je passe le curseur au dessus d’une couleur, j’aimerais que ça affiche la valeur HEX.
- Une page dédiée pour chaque nuances de la bibliothèque dans lesquelles nous retrouveront :
    - Les valeurs de base de la nuance (HEX, RGB, CMJN, HSL, HSV, OKLCH)
    - Les variations de couleurs (Tailwind, Ombres, TEINTES CLAIRES, Saturation, TEINTES VOISINES, Tons)
    - Les harmonies de couleurs (Analogues, Complémentaires, Complémentaires divisées, Triades, Tétradiques, Carré, Monochromatique, Composé, Nuances)
    - Une note sur le rendu à l’impression (comment rendrait la couleur si elle est imprimé) et si des nuances similaires pour mieux rendre à l’impression si necessaire.


Web recherché, consulté un fichier
Web recherché, consulté un fichier
J'ai analysé Coolors : bibliothèque de +800 couleurs rangées par teinte, chips cliquables, et une fiche par couleur avec conversions, harmonies, couleurs proches et accessibilité. Je pars de cette base et j'ajoute ce qui manque chez eux : les noms d'univers, l'OKLCH, et surtout la simulation d'impression — qui n'existe nulle part chez Coolors.

Je construis l'outil.


Exécuté 15 commandes, a consulté 6 fichiers, 4 fichiers modifiés · 4 notes






Exécuté 15 commandes, a consulté 6 fichiers, 4 fichiers modifiés · 4 notes
144 nuances, 12 familles, un seul fichier HTML — à ouvrir dans le navigateur, rien à installer.

Ce que Coolors fait, en français et avec des noms d'univers
Les 144 noms sont écrits pour évoquer, pas pour décrire : Rouge Baiser, Caramel Beurre Salé, Bleu Cyanotype, Rose Millennial, Noir Prune. Chaque nuance porte aussi une ligne d'usage réel (« Fond sombre alternatif au noir », « Sous 8 % de trame, risque de disparaître »).

Le détail dont je suis le plus content : le HEX en surimpression. Au survol, le code s'affiche en mix-blend-mode: difference — il s'inverse automatiquement selon la couleur, donc il reste lisible sur Ivoire comme sur Noir Absolu. Pas de compromis blanc/noir à deviner.

Ce que Coolors n'a pas : l'épreuve d'impression
J'ai modélisé le gamut d'une presse offset couchée (chroma max par teinte en OKLCH, avec la clarté où chaque encre est la plus saturée). Chaque fiche montre côte à côte écran / papier couché / papier non couché, avec l'encrage total, un verdict, et un équivalent imprimable copiable.

Le résultat colle au métier : 127 nuances passent sans souci, et exactement 5 sortent du gamut — Lime Électrique, Cobalt Pop, Violet Néon, Magenta Électrique, Rose Néon. Toutes les fluo, aucune fausse alerte. Sur la page d'accueil, un point discret en haut à droite de l'aplat les signale avant même d'ouvrir la fiche.

Le reste est là : 6 espaces colorimétriques (dont OKLCH en syntaxe CSS prête à coller), 6 déclinaisons dont l'échelle Tailwind 50→950, les 9 harmonies, les contrastes WCAG, et les nuances proches classées par distance perceptuelle — pas par proximité de code hex, ce qui donne des voisines bien plus pertinentes.

<br>
Deux directions pour la suite, si tu veux itérer :

Un export palette (.ase pour Illustrator, variables CSS, tokens JSON) depuis n'importe quelle harmonie
Des favoris persistants pour te constituer tes propres planches à partir de la bibliothèque
Dis-moi laquelle t'intéresse — ou si tu préfères d'abord que j'étoffe la bibliothèque au-delà de 144 nuances.


Nuancier
Code · HTML 
J’aimerais pouvoir agencer la bibliothèque comme je le souhaite (ligne de 3 ou 4 ou 5 ou 6 ou agencement en style Bento)
Lorsque je passe mon curseur et que ça affiche la valeur HEX c’est écrit en une sorte de ton sur ton et ce n’est pas lisible pour toute les couleurs fais au plus simple (soit blanc soit noir selon la nuance)
Rajoute des nuances
• ⁃ J’aimerais avoir du blanc dans la bibliothèque


A exécuté une commande, consulté un fichier
A exécuté une commande, consulté un fichier
Je fais les trois modifications : agencement de la grille, lisibilité du HEX en survol, et extension de la bibliothèque avec une famille de blancs.


16 fichiers modifiés, a exécuté une commande · 4 notes
16 fichiers modifiés, a exécuté une commande · 4 notes
Maintenant je mets à jour les fonctions JS chip(), bande() et le rendu des harmonies pour injecter la couleur d'encre calculée (noir ou blanc, jamais de ton-sur-ton) au lieu du blend mode. Je duplique aussi ces changements dans le bloc <style> inline du fichier de référence (déjà fait) et dans le JS.


8 fichiers modifiés, a consulté 8 fichiers, exécuté 6 commandes · 7 notes







8 fichiers modifiés, a consulté 8 fichiers, exécuté 6 commandes · 7 notes
Les trois demandes sont traitées :

Agencement libre. Un sélecteur Affichage est apparu dans la colonne latérale : 3 / 4 / 5 / 6 colonnes, ou Bento. Les grilles en 3-4-5-6 restent responsive — si la fenêtre devient trop étroite pour tenir le nombre choisi, le nombre de colonnes se réduit tout seul plutôt que d'écraser les pastilles. Le Bento alterne des blocs standards et des blocs élargis (grille dense en 6 colonnes) pour casser la monotonie d'une grille uniforme.

Lisibilité du HEX corrigée. J'ai supprimé le mix-blend-mode: difference — il donnait un rendu ton-sur-ton illisible sur beaucoup de couleurs, tu avais raison. À la place, chaque code hex calcule son propre contraste (WCAG) contre blanc et noir, et prend automatiquement celui qui offre le plus grand rapport. Simple, prévisible, lisible à 100 % du temps — testé sur Cerise Noire (texte blanc) comme sur Blanc Pur (texte noir).

Bibliothèque étendue : 144 → 190 nuances.

3 nuances ajoutées à chacune des 12 familles existantes
Une nouvelle famille Blancs (10 nuances) : Blanc Pur, Blanc Neige, Blanc Coton, Blanc Lait, Blanc Porcelaine, Blanc Nacré, Blanc Glacier, Blanc Opalin, Blanc Lune, Blanc Zinc — volontairement distincte des Beiges & crèmes (chauds) pour couvrir aussi les blancs froids et neutres
Tout a été revalidé après ces ajouts : aucun doublon de code hex ni de nom, les 190 fiches se calculent sans erreur, et Blanc Pur porte un avertissement dans son usage — c'est une couleur d'écran, pas d'impression, elle vire toujours vers le blanc du papier au tirage.


Nuancier
Code · HTML 
