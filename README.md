# Découverte du 16e arrondissement — PWA

Application web installable (PWA) pour la course d'orientation du lycée Jean Zay (Paris 16e).

## Déploiement sur GitHub Pages

1. **Créer un dépôt GitHub** : rendez-vous sur [github.com](https://github.com), connectez-vous, cliquez sur **New repository**, donnez-lui un nom (ex. `decouverte-16e`), puis **Create repository**.

2. **Uploader les fichiers** : dans votre nouveau dépôt, cliquez sur **Add file → Upload files**, puis glissez-déposez les 4 fichiers suivants (ainsi que `icon.png` que vous ajouterez aussi) :
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `icon.png`
   
   Cliquez ensuite sur **Commit changes**.

3. **Activer GitHub Pages** : allez dans les **Settings** du dépôt → section **Pages** (à gauche) → **Source** : réglez sur **Deploy from a branch**, puis choisissez la branche **`main`** et le dossier **`/ (root)`**. Cliquez **Save**.

4. **Récupérer l'URL** : après quelques minutes, votre site sera accessible à l'adresse :
   `https://VOTRE-USERNAME.github.io/decouverte-16e/`

5. **Tester l'installation PWA** : ouvrez l'URL sur un téléphone Android, Chrome affichera automatiquement une bannière « Installer l'application ». Sur iPhone/iPad, ouvrez le lien dans Safari puis appuyez sur le bouton de partage (⌖) → **« Sur l'écran d'accueil »**.

## Contenu des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Interface mobile — carte, checklist, formulaire, install PWA |
| `manifest.json` | Métadonnées PWA (nom, icône, mode d'affichage) |
| `service-worker.js` | Cache offline pour fonctionnement sans connexion |
| `icon.png` | Icône 512×512 px (à fournir, voir ci-dessous) |

## Icône

L'icône `icon.png` (512×512 px) doit être placée au même niveau que `index.html` dans le dépôt. Elle doit représenter le thème du 16e arrondissement. Vous pouvez la créer gratuitement sur [Canva](https://www.canva.com) ou [favicon.io](https://favicon.io/favicon-generator/).
