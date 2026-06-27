# 🎶 Breizh Pévèle — Site Web Officiel

Site web moderne de l'association de musiques et danses bretonnes Breizh Pévèle (Orchies, 59).

## 🚀 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **CSS** : Tailwind CSS
- **Backend** : Firebase (Auth + Firestore + Storage)
- **Hébergement** : Vercel (gratuit)

## ⚡ Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer Firebase (copier et remplir)
cp .env.example .env.local
# → Renseignez vos clés Firebase dans .env.local

# 3. Lancer en développement
npm run dev

# 4. Ouvrir http://localhost:3000
```

## 🔥 Configuration Firebase

1. Aller sur https://console.firebase.google.com
2. Créer un projet "breizh-pevele"
3. Activer **Authentication** → Sign-in method → **Email link (passwordless)**
4. Ajouter le domaine `breizh-pevele.vercel.app` dans les domaines autorisés
5. Activer **Firestore Database** (mode production avec les règles ci-dessous)
6. Activer **Storage**
7. Copier les clés dans `.env.local`

### Règles Firestore (copiez dans la console Firebase)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lecture publique pour actualités et galerie
    match /actualites/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'breizhpevele@gmail.com';
    }
    match /galerie/{doc} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'breizhpevele@gmail.com';
    }
  }
}
```

### Règles Storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /galerie/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'breizhpevele@gmail.com';
    }
  }
}
```

## 🌐 Déploiement Vercel

```bash
# Méthode recommandée : connectez votre repo GitHub à Vercel
# puis ajoutez les variables d'environnement dans le dashboard Vercel

# Ou en CLI :
npm install -g vercel
vercel --prod
```

## 🔒 Administration (CMS Caché)

**URL d'accès** (ne pas partager publiquement) : `/admin-bzh59`

Workflow :
1. Ouvrir `/admin-bzh59`
2. Entrer l'identifiant administrateur (`breizhpevele`) et le mot de passe (`Breizh2026@`)
3. Cliquer sur "Se connecter" → accès dashboard (persistance via `sessionStorage`)

## 🥚 Easter Eggs

- **Crêpes** 🥞 : Triple-clic rapide sur le logo Beffroi (haut de page)
- **Triskel** 🌀 : Survolez le Triskel dans le pied de page → rotation + musique

## 📁 Structure du projet

```
breizh-pevele/
├── app/
│   ├── layout.tsx              # SEO global
│   ├── page.tsx                # Accueil one-page
│   ├── mentions-legales/       # Page légale
│   ├── politique-confidentialite/
│   └── admin-bzh59/            # CMS caché
│       ├── page.tsx            # Login Admin (Identifiants)
│       └── dashboard/page.tsx  # Dashboard CMS
├── components/
│   ├── Hero.tsx                # + Easter Egg crêpes
│   ├── Cours.tsx
│   ├── Actualites.tsx          # Temps réel Firestore
│   ├── Galerie.tsx             # Masonry + Lightbox
│   ├── Footer.tsx              # + Easter Egg Triskel
│   └── RGPDBanner.tsx
├── lib/
│   ├── firebase.ts
│   └── firestore.ts
└── public/
    ├── hero.jpg
    ├── sitemap.xml
    ├── robots.txt
    └── triskel*.svg
```

## 🎯 SEO ciblé

- "danse bretonne Orchies"
- "fest-noz Orchies"  
- "musique celtique Pévèle"
