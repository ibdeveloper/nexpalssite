# Images Directory

Acest folder conține toate imaginile folosite pe site.

## Structura:

- **`logo/`** - Logo-urile companiei
  - Logo principal (recomandat: `logo.svg` sau `logo.png`)
  - Logo pentru header (poate fi același sau o variantă simplificată)
  - Logo pentru footer (poate fi o versiune color sau alb-negru)

## Utilizare în cod:

Imaginile din folderul `public` sunt accesibile direct prin URL:

```tsx
// Exemplu în componentă:
<img src="/images/logo/logo.svg" alt="NEXPALS Logo" />

// Sau cu Next.js Image:
import Image from 'next/image'
<Image src="/images/logo/logo.svg" alt="NEXPALS Logo" width={200} height={50} />
```

## Formate recomandate:

- **Logo**: SVG (preferat) sau PNG cu fundal transparent
- **Imagini**: WebP, JPG, PNG
- **Icoane**: SVG

## Dimensiuni recomandate:

- Logo header: ~200x50px sau proporțional
- Logo footer: ~150x40px sau proporțional
- Imagini hero: min 1920x1080px (Full HD)
- Imagini portofoliu: 1200x800px
- Imagini servicii: 600x400px
