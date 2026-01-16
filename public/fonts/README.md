# Fonts Folder

Aici poți pune fonturile tale custom.

## Format suportat

- `.woff2` (recomandat - cel mai bun pentru web)
- `.woff`
- `.ttf`
- `.otf`

## Cum să folosești fonturile

După ce ai adăugat fișierele fonturilor aici, le poți folosi în `app/globals.css`:

```css
@font-face {
  font-family: 'NumeleFontului';
  src: url('/fonts/nume-fisier.woff2') format('woff2'),
       url('/fonts/nume-fisier.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

Apoi actualizează `tailwind.config.ts`:

```ts
fontFamily: {
  sans: ['NumeleFontului', 'sans-serif'],
},
```
