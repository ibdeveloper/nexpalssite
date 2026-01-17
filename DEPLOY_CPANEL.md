# Ghid Deploy pe cPanel

## Pași pentru a urca site-ul pe cPanel

### 1. Pregătire Locală

```bash
# Rulează build-ul local
npm run build
```

### 2. Fișiere de Urcat pe cPanel (Via File Manager)

**IMPORTANT:** Pentru deploy fără SSH, mai întâi rulează `npm run build` local, apoi urci folder-ul `.next/standalone/` generat.

Urci următoarele foldere și fișiere în **File Manager**, în folderul domeniului tău (de ex: `public_html` sau `domeniu.com`):

#### Foldere:
- ✅ `.next/standalone/` (generat după `npm run build` cu `output: 'standalone'`)
- ✅ `.next/static/` (generat după build)
- ✅ `public/` (folder cu imagini, fonturi, video-uri)
- ✅ `node_modules/` (SAU rulează `npm install` pe server)

#### Fișiere:
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.js`
- ✅ `middleware.ts`
- ✅ `tailwind.config.ts`
- ✅ `postcss.config.js`
- ✅ `tsconfig.json`
- ✅ `next-env.d.ts`

#### Fișiere de EXCLUS (nu urca):
- ❌ `.git/`
- ❌ `.gitignore`
- ❌ `README.md`
- ❌ `PERFORMANCE.md`
- ❌ `DEPLOY_CPANEL.md`
- ❌ `.env.local` (dacă există, cu date sensibile)

### 3. Pași pe Server (cPanel) - FĂRĂ SSH

#### Opțiunea 1: Build Local + Upload Standalone (Recomandat pentru cPanel fără SSH)

**Pași:**

1. **Pe computerul tău local**, rulează:
   ```bash
   npm run build
   ```

2. **După build**, vei avea:
   - Folder `.next/standalone/` - conține serverul minim
   - Folder `.next/static/` - assets statice
   - Folder `public/` - assets publice

3. **Via File Manager**, urci pe server:
   - ✅ **`.next/standalone/`** (intreg folder-ul)
   - ✅ **`.next/static/`** (intreg folder-ul)
   - ✅ **`public/`** (folder cu imagini, video-uri, fonturi)

4. **Structura pe server va fi:**
   ```
   public_html/ (sau domeniu.com/)
   ├── .next/
   │   ├── standalone/
   │   │   └── server.js
   │   └── static/
   ├── public/
   │   ├── fonts/
   │   └── images/
   └── package.json
   ```

#### Opțiunea 2: Via File Manager + Terminal cPanel (dacă e disponibil)

**Dacă cPanel are Terminal integrat:**

1. Urci toate fișierele via File Manager
2. Deschide **Terminal** din cPanel (dacă e disponibil în meniul cPanel)
3. Navighează la folderul domeniului:
   ```
   cd public_html
   ```
4. Instalează dependențele:
   ```
   npm install --production
   ```
5. Rulează build-ul:
   ```
   npm run build
   ```

**NOTĂ:** Dacă ai urcat deja folderele `.next/standalone/` și `.next/static/` de la build-ul local, poți sări peste pasul 5.

### 4. Configurare Node.js în cPanel (FĂRĂ SSH)

**Pași pentru a configura aplicația Node.js:**

1. În cPanel, mergi la **"Node.js Selector"** sau **"Setup Node.js App"**
2. Creează o aplicație Node.js:
   - **Node.js Version**: 18.x sau 20.x
   - **Application Root**: folderul domeniului (ex: `public_html`)
   - **Application URL**: domeniul tău
   - **Application Startup File**: `.next/standalone/server.js`

3. În **"Application Entry Point"** sau **"App Root"**, setează:
   ```
   .next/standalone
   ```
   SAU folderul domeniului tău (ex: `public_html`)

4. **IMPORTANT:** Dacă ai urcat `.next/standalone/` de la build-ul local, asigură-te că aplicația Node.js folosește path-ul corect către `.next/standalone/server.js`

### 5. Pornire Aplicație Node.js în cPanel

După ce ai configurat Node.js App:

1. În cPanel, mergi la **Node.js Apps**
2. Găsește aplicația creată
3. Click pe **"Start App"** sau **"Restart"**
4. Verifică log-urile pentru erori (dacă e disponibil)

**Dacă aplicația nu pornește:**
- Verifică că path-ul către `server.js` este corect (`.next/standalone/server.js`)
- Verifică că toate fișierele sunt urcate corect
- Verifică log-urile în cPanel

### 6. Configurare .htaccess (dacă e necesar)

Dacă cPanel nu suportă direct Node.js, poți folosi un reverse proxy:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

### 7. Verificare

1. Accesează domeniul în browser
2. Verifică că toate paginile funcționează
3. Testează toate locale-urile: `/ro`, `/en`, `/fr`, etc.
4. Verifică console-ul pentru erori

### 8. Optimizări Post-Deploy

- Activează **Gzip Compression** în cPanel
- Configurează **CDN** (dacă e disponibil)
- Activează **SSL/HTTPS** pentru domeniu
- Configurează **Cache** pentru assets statice

## Note Importante

⚠️ **Node.js Version**: Asigură-te că serverul suportă Node.js 18+ sau 20+

⚠️ **Memory Limit**: Next.js poate necesita mai multă memorie - verifică limitele în cPanel

⚠️ **Build Time**: Build-ul pe server poate dura mai mult - așteaptă finalizarea

⚠️ **Environment Variables**: Dacă ai variabile de mediu, configurează-le în cPanel Node.js App settings

## Troubleshooting (Fără SSH)

### Probleme comune și soluții:

**❌ Eroare: "Cannot find module"**
- **Soluție:** Ai nevoie de `node_modules/` pe server
  - Varianta 1: Urci `node_modules/` via File Manager (mare, 200MB+)
  - Varianta 2: Folosește Terminal cPanel pentru `npm install`
  - Varianta 3: Folosește standalone build (recomandat - include dependențele)

**❌ Eroare: "Port already in use"**
- **Soluție:** În cPanel Node.js App settings:
  - Schimbă portul aplicației
  - Sau oprește alte aplicații Node.js

**❌ Site-ul nu se încarcă**
- **Soluție:**
  1. Verifică că aplicația Node.js este pornită în cPanel
  2. Verifică log-urile în cPanel Node.js App
  3. Verifică că path-ul către `server.js` este corect (`.next/standalone/server.js`)
  4. Verifică că folder-ul `.next/standalone/` există

**❌ "404 Not Found" pentru pagini**
- **Soluție:** Verifică că `middleware.ts` este urcat
- Verifică că `next.config.js` este corect configurat
- Verifică că toate folderele `.next/standalone/`, `.next/static/`, `public/` sunt urcate

**❌ Assets (imagini, video-uri) nu se încarcă**
- **Soluție:** Verifică că folder-ul `public/` este urcat complet
- Verifică că path-urile în cod sunt corecte (încep cu `/images/...`)

## Alternativă: Deploy via Vercel/Netlify (Recomandat)

Dacă cPanel-ul tău nu suportă bine Node.js, poți folosi:

- **Vercel** (gratuit pentru proiecte Next.js):
  - Conectează GitHub repository
  - Deploy automat la fiecare push
  - SSL gratuit, CDN global

- **Netlify** (similar cu Vercel):
  - Deploy automat
  - SSL gratuit
  - CDN global

Pentru acestea, rulează doar `npm run build` local pentru test, apoi push pe GitHub și conectează la Vercel/Netlify.
