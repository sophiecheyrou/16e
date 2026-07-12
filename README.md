# Jean Zay Explorer — V2

Jeu de découverte du 16e arrondissement — lundi 31 août 2026, de 9 h à 11 h.

## Mise en ligne immédiate

1. Décompressez le ZIP.
2. Déposez tous les fichiers sauf `Code.gs` dans le dépôt GitHub Pages actuel.
3. Validez les changements avec **Commit changes**.
4. Rechargez la PWA. En cas d’ancienne version persistante, videz le cache du navigateur ou désinstallez/réinstallez la PWA.

La V2 fonctionne immédiatement en **mode démonstration locale** : équipe, photos, progression et distance sont enregistrées sur le téléphone utilisé.

## Code organisateur

Le code provisoire est `1600`. Il peut être modifié dans :
- `app.js` → `ADMIN_PIN`
- `admin.js` → `ADMIN_PIN`
- `Code.gs` → `ADMIN_PIN`

## Activer le mode partagé Google Sheets / Drive

1. Créez un Google Sheet vide.
2. Créez un dossier Drive destiné aux photos.
3. Dans Apps Script, collez le contenu de `Code.gs`.
4. Remplacez `SHEET_ID` et `DRIVE_FOLDER_ID`.
5. Déployez le script comme **Application Web**, accessible à toute personne disposant du lien.
6. Copiez l’URL du déploiement.
7. Collez-la dans `app.js` et `admin.js`, dans `CONFIG.API_URL`.

### Important

Le front est entièrement prêt. Le fichier `Code.gs` fournit la structure du backend, mais l’envoi binaire des photos devra être finalisé en base64 pour Google Apps Script. Tant que `API_URL` reste vide, aucune photo ne quitte le téléphone.

## Fichiers

- `index.html` : application élèves
- `admin.html` : tableau organisateur
- `styles.css` : design
- `app.js` : logique du jeu
- `admin.js` : logique organisateur
- `manifest.json` : installation PWA
- `service-worker.js` : fonctionnement hors connexion
- `Code.gs` : backend Google Apps Script
