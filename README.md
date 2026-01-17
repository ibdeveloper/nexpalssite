# NEXPALS - Premium Digital Agency Website

Site corporate premium, modern, elegant și minimalist, inspirat din design-ul Apple, cu suport complet pentru limbile Uniunii Europene.

## 🚀 Caracteristici

- **Design Premium**: Stil minimalist, aerisit, inspirat de Apple
- **Multilingv**: Suport pentru toate limbile UE (24 de limbi)
- **Performanță**: Optimizat pentru Lighthouse Score > 90
- **Responsive**: Perfect pe desktop, tablet și mobile
- **Animații**: Micro-interacțiuni subtile cu Framer Motion
- **SEO Ready**: Configurat pentru SEO international (hreflang)
- **Accesibilitate**: ARIA labels, focus states, navigare cu tastatura

## 🛠️ Stack Tehnologic

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animații)
- **next-intl** (i18n)
- **React 18**

## 📦 Instalare

```bash
# Instalează dependențele
npm install

# Rulează serverul de dezvoltare
npm run dev

# Build pentru producție
npm run build

# Start producție
npm start
```

Site-ul va fi disponibil la `http://localhost:3000`

## 🌍 Limbile Disponibile

Site-ul suportă următoarele limbi (toate limbile UE):

- Română (ro) - limba implicită
- English (en)
- Français (fr)
- Deutsch (de)
- Italiano (it)
- Español (es)
- Português (pt)
- Polski (pl)
- Nederlands (nl)
- Български (bg)
- Čeština (cs)
- Dansk (da)
- Eesti (et)
- Suomi (fi)
- Gaeilge (ga)
- Ελληνικά (el)
- Hrvatski (hr)
- Latviešu (lv)
- Lietuvių (lt)
- Malti (mt)
- Magyar (hu)
- Slovenčina (sk)
- Slovenščina (sl)
- Svenska (sv)

## 📁 Structura Proiectului

```
NEXPALS/
├── app/
│   ├── [locale]/          # Rute locale (i18n)
│   │   ├── layout.tsx
│   │   └── page.tsx       # Homepage
│   ├── globals.css        # Stiluri globale
│   └── layout.tsx         # Root layout
├── components/            # Componente React
│   ├── Header.tsx         # Header cu glassmorphism
│   ├── Hero.tsx           # Hero section
│   ├── Services.tsx       # Secțiunea servicii
│   ├── Portfolio.tsx      # Portofoliu
│   ├── WhyUs.tsx          # De ce noi
│   ├── Process.tsx        # Procesul de lucru
│   ├── Testimonials.tsx   # Testimoniale
│   ├── CTA.tsx            # Call to action
│   ├── Footer.tsx         # Footer premium
│   └── LanguageSelector.tsx
├── i18n/                  # Configurație i18n
│   ├── routing.ts
│   └── request.ts
├── messages/              # Traduceri
│   ├── ro.json
│   ├── en.json
│   └── ... (alte limbi)
└── middleware.ts          # Middleware pentru i18n
```

## 🎨 Design System

### Culori
- **Background**: Alb (#FFFFFF)
- **Foreground**: Negru (#000000)
- **Accent**: #007AFF
- **Gray Scale**: Gri 50-900 (Apple style)

### Tipografie
- **Font**: Inter (Google Fonts)
- **Hero**: 4rem, bold, tracking-tight
- **Display**: 3rem, bold
- **Body**: 1rem, normal weight

### Componente
- **Cards**: Colțuri rotunjite (rounded-2xl), shadow soft
- **Buttons**: Rounded-full, hover states, transform effects
- **Glassmorphism**: Blur + transparency pe header la scroll

## 🔧 Configurare

### Adăugare Traduceri Noi

Pentru a adăuga traduceri pentru o limbă nouă:

1. Creează fișierul `messages/{locale}.json`
2. Copiază structura din `messages/ro.json`
3. Tradu conținutul
4. Limbile sunt detectate automat de middleware

### Personalizare Culori

Editează `tailwind.config.ts` pentru a schimba paleta de culori:

```typescript
colors: {
  accent: '#007AFF', // Schimbă culoarea accent
  // ...
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ✨ Funcționalități Cheie

### Header Premium
- Transparent la top
- Glassmorphism + blur la scroll
- Tranziție fluidă (300ms ease)
- Logo centrat
- Meniu responsive

### Hero Section
- Headline mare, clar
- Gradient background
- Abstract blur elements
- Animații fade-in / slide-up
- Scroll indicator

### Secțiuni
- Servicii: Grid cu carduri hover
- Portofoliu: Grid aerisit cu preview
- De ce noi: Valorile companiei
- Proces: Timeline vizual
- Testimoniale: Carduri clean
- CTA: Secțiune call-to-action
- Footer: Navigare + legal + social

## 🚀 Deployment

Site-ul este gata pentru deployment pe:
- **Vercel** (recomandat pentru Next.js) - deploy automat din GitHub ✅
  - Vezi `VERCEL_DEPLOY.md` pentru setup complet
  - Deploy automat la fiecare push pe GitHub
- **Netlify** - deploy automat din GitHub
- **cPanel** - vezi `DEPLOY_CPANEL.md` pentru instrucțiuni
- **AWS Amplify**
- Orice platformă suportând Next.js

### Upload pe GitHub

Pentru a urca proiectul pe GitHub, vezi `GITHUB_SETUP.md` pentru ghid complet.

### Deploy Automat pe Vercel

Pentru deploy automat când faci push pe GitHub, vezi `VERCEL_DEPLOY.md` - setup complet în 5 minute!

## 📝 Note

- Toate textele sunt i18n-ready (fără hardcode)
- SEO optimizat cu hreflang tags
- Performanță optimizată (code splitting, lazy loading)
- Accesibilitate: ARIA labels, keyboard navigation

## 📄 Licență

Acest proiect este proprietate privată.

---

Creat cu ❤️ folosind Next.js, Tailwind CSS și Framer Motion
