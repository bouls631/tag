# Badge Info

Petite PWA pour réunir les infos d'un badge MIFARE Classic à partir des fichiers déjà produits :

- dump **Mifare Classic Tool** (format `+Sector: N` + 4 lignes hexadécimales),
- scan **TagInfo** (`.txt` ou `.xml`).

Elle produit un résumé copiable (UID, type de puce, originalité, date de fabrication, secteur 5, clés connues, numéro imprimé décomposé en hex).

## Import automatique (Web Share Target)

L'appli est enregistrée comme cible de partage. Depuis **Mifare Classic Tool** ou **TagInfo**, utilise « Partager » sur le dump / le scan et choisis **Badge Info** : l'appli s'ouvre, parse le fichier et affiche le résumé sans manipulation supplémentaire.

## Limite

Le Web NFC des navigateurs ne lit que le NDEF (MDN : *low-level operations are currently not supported*). Cette appli ne lit donc **pas** les secteurs MIFARE Classic avec clés : elle importe les fichiers générés par MCT / TagInfo. Le badge analysé ne contient pas de NDEF. Pour une lecture automatique au contact de la carte, il faut une appli native Android (`android.nfc.tech.MifareClassic`), pas une PWA.

## Installation

1. Pousser ces fichiers sur GitHub.
2. Dans le dépôt : **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Ouvrir l'URL `https://<user>.github.io/tag/` sur le téléphone Android.
4. Menu du navigateur → **Ajouter à l'écran d'accueil** / **Installer l'application**.

La PWA fonctionne aussi sans installation, depuis le navigateur.

## Fichiers

- `index.html` — interface et parseurs (tout est inclus, aucune dépendance)
- `manifest.webmanifest` — installation
- `sw.js` — cache hors-ligne
- `icon-192.png`, `icon-512.png` — icônes
