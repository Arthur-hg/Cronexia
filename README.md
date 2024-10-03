# Cronexia

## Execution du code

Node.JS version used: v18.18.0. It can simply be installed through `nvm install && nvm use` or in any method of your choice if you don't use nvm.

- First run:
	- `npm install`
	- `npx tsc`

## Front end:
- `npm run server`: The website to run the test can be accessible through `http://localhost:5000/` by default.

## Back end:
- `npm run read-files`: This script will execute both async/sync file readers. Name and content of file will be printed.

# Reponse théorique:

## Front

1. Le FOUC est le fait qu'une page puisse s'afficher à l'utilisateur avant que les fichiers de style ne soient reçus par le client. Ce qui résulte, en bref, un affichage sans style et très sommaire.
Un des moyens d'empêcher le FOUC est d'éviter d'afficher le contenu de la page tant que les fichiers de style ne sont pas reçus par le serveur.
Il existe pour cela des événements associés au DOM de la page, étant émis quand ce dernier est prêt, qui peuvent permettre via script d'afficher le contenu seulement quand ce dernier est prêt.

2. Je n'ai à ce jour que rencontré l'utilisation du composant `Suspense` permettant, lors d'un chargement d'un fort contenu, d'afficher un composant plus léger et rapide le temps que le tout puisse être chargé et affiché.

## Backend

1. Les tables peuvent être associées entre elles via une ou plusieurs colonnes. Cela peut résulter, en fonction du design de la base de données, en plusieurs résultats :
- Relation one-to-one : Un utilisateur peut avoir différentes données uniques séparées dans plusieurs tables, pour un souci de design. Nous aurons donc une table primaire avec un identifiant (ou clé) associé à l'utilisateur. Cette clé sera donc reprise dans la table secondaire et sera également unique. Il est souvent utilisé des contraintes (comme les ForeignKey) afin de s'assurer que cet utilisateur existe bien.
- Relation one-to-many : Un utilisateur peut créer de multiples documents en base. Ces documents étant sauvegardés dans une table séparée, ils seront donc associés comme précédemment par l'identifiant de l'utilisateur. Ce dernier n'étant pas unique dans cette table, nous avons donc une relation d'un (utilisateur) à plusieurs (documents)
- Relation many-to-many : Prenons l'exemple d'une table utilisateur et d'objet. Un utilisateur peut avoir plusieurs objets, mais un objet peut également être obtenu par plusieurs utilisateurs. Il en résulte une relation de plusieurs à plusieurs. Il faudrait, dans ce cas, par souci d'optimisation, une table inventaire afin de faire le lien entre l'utilisateur et les objets.

2. Pour l'exemple cité, et afin d'optimiser l'utilisation de la database, j'aurai actuellement deux tables :
- Une table utilisateur
- Une table de relation

La table d'utilisateur étant définie avec une primary key, et la table utilisateur ayant deux primary key associées à cette table utilisateur (via ForeignKey, afin de s'assurer que les utilisateurs associés existent bien).
De ce fait, il serait facile et rapide d'exécuter une query afin d'obtenir toutes les relations d'un utilisateur, sans alourdir les tables utilisateur avec ces mêmes relations.
