# Jean Zay Explorer — V2.1 corrective

Jeu de découverte du 16e arrondissement — lundi 31 août 2026, de 9 h à 11 h.

## Ce que corrige cette version

- accès organisateur visible depuis l’accueil et le classement ;
- explication claire de l’usage du code organisateur ;
- connexion sur `admin.html` avec le code provisoire `1600` ;
- validation, refus et remise en attente des preuves enregistrées localement ;
- aperçu des photos dans l’espace organisateur ;
- suppression du faux classement d’exemple ;
- indication claire du mode démonstration locale ;
- tirage au sort limité aux équipes ayant signalé leur retour ;
- bouton de réinitialisation du téléphone de test ;
- nouveau cache PWA pour forcer la mise à jour.

## Mise en ligne

1. Décompressez le ZIP.
2. Remplacez dans GitHub tous les fichiers de la V2 par ceux de ce dossier, sauf `Code.gs` si vous ne configurez pas encore Apps Script.
3. Faites **Commit changes**.
4. Rechargez l’adresse GitHub Pages.
5. Si l’ancienne version reste affichée, fermez complètement la PWA, videz les données du site ou désinstallez puis réinstallez l’application.

## Où utiliser le code organisateur ?

Deux accès sont désormais visibles :

- sur la page d’accueil, dans le bloc **Espace réservé aux adultes** ;
- dans l’onglet **Classement**, bouton **Espace organisateur**.

Ces boutons ouvrent `admin.html`. Saisissez alors le code `1600`.

Adresse directe : `https://sophiecheyrou.github.io/16e/admin.html`

## Limite importante de la V2.1

Tant que `API_URL` reste vide dans `app.js` et `admin.js`, toutes les données restent locales au téléphone. L’espace organisateur doit donc être ouvert sur le même téléphone que celui utilisé pour le test. La centralisation Google Sheets / Drive sera l’objet de la version suivante.
