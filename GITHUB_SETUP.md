# Ghid pentru Upload pe GitHub

## Pași pentru a urca proiectul NEXPALS pe GitHub

### 1. Inițializare Git Local

Deschide Terminal în folderul proiectului și rulează:

```bash
cd /Users/definedev/Downloads/NEXPALS

# Inițializează repo-ul git
git init

# Adaugă toate fișierele (exceptând cele din .gitignore)
git add .

# Fă primul commit
git commit -m "Initial commit: NEXPALS premium website"
```

### 2. Creează Repository pe GitHub

1. **Mergi pe GitHub.com** și loghează-te
2. **Click pe "+"** din colțul dreapta sus → **"New repository"**
3. **Completează:**
   - **Repository name**: `nexpals` (sau orice nume vrei)
   - **Description**: "Premium digital agency website - Next.js, TypeScript, Tailwind CSS"
   - **Visibility**: Public sau Private (alegi tu)
   - **NU bifa** "Initialize with README" (avem deja README.md)
4. **Click "Create repository"**

### 3. Conectează Repo-ul Local cu GitHub

După ce ai creat repository-ul pe GitHub, vei vedea instrucțiuni. Rulează în Terminal:

```bash
# Adaugă remote origin (înlocuiește USERNAME cu GitHub username-ul tău)
git remote add origin https://github.com/USERNAME/nexpals.git

# Sau dacă folosești SSH:
# git remote add origin git@github.com:USERNAME/nexpals.git

# Verifică remote-ul
git remote -v
```

### 4. Upload pe GitHub

```bash
# Push primul commit pe GitHub
git branch -M main
git push -u origin main
```

### 5. Verificare

1. Mergi pe GitHub.com
2. Accesează repository-ul tău
3. Verifică că toate fișierele sunt acolo

## Fișiere care NU vor fi urcate (datorită .gitignore)

✅ **Corect ignorate:**
- `node_modules/` - dependențele (se instalează cu `npm install`)
- `.next/` - build-ul (se generează cu `npm run build`)
- `.env*.local` - variabile de mediu sensibile
- `.DS_Store` - fișiere sistem macOS
- Log-uri și cache-uri

✅ **Fișiere care VOR fi urcate:**
- `app/`, `components/`, `i18n/`, `messages/`
- `public/` (imagini, video-uri, fonturi)
- `package.json`, `next.config.js`, etc.
- `README.md`

## Comenzi Git Utile

```bash
# Verifică status-ul
git status

# Vezi ce fișiere sunt adăugate
git status --short

# Adaugă un fișier specific
git add nume-fisier.js

# Commit cu mesaj
git commit -m "Mesaj descriptiv"

# Push pe GitHub
git push

# Pull de pe GitHub (pentru actualizări)
git pull

# Vezi istoricul commit-urilor
git log --oneline

# Vezi remote-urile configurate
git remote -v
```

## Actualizări Viitoare

Pentru a urca modificări noi:

```bash
# Verifică ce s-a schimbat
git status

# Adaugă modificările
git add .

# Sau adaugă fișiere specifice
git add components/Header.tsx

# Commit cu mesaj descriptiv
git commit -m "Update: descriere modificări"

# Push pe GitHub
git push
```

## Deploy Automat pe Vercel (Recomandat)

După ce ai urcat pe GitHub, poți conecta cu Vercel pentru deploy automat:

1. Mergi pe [vercel.com](https://vercel.com)
2. **Sign up** cu GitHub
3. **New Project** → Selectează repository-ul `nexpals`
4. Vercel detectează automat Next.js
5. Click **Deploy**
6. Site-ul va fi live în câteva minute!

**Avantaje:**
- ✅ Deploy automat la fiecare push pe GitHub
- ✅ SSL gratuit
- ✅ CDN global
- ✅ Preview deployments pentru fiecare branch
- ✅ Optimizat pentru Next.js

## Structura Git Repository

```
nexpals/
├── .git/              # Repo-ul git (nu se urcă)
├── .gitignore         # Fișiere ignorate
├── README.md          # Documentație
├── package.json       # Dependențe
├── next.config.js     # Configurare Next.js
├── app/               # Aplicația Next.js
├── components/        # Componente React
├── i18n/              # Configurație i18n
├── messages/          # Traduceri
├── public/            # Assets statice
└── middleware.ts      # Middleware Next.js
```

## Note Importante

⚠️ **NU urca:**
- `.env.local` sau orice fișiere `.env*` cu date sensibile
- `node_modules/` - prea mare, se instalează cu `npm install`
- `.next/` - se generează la build

⚠️ **Asigură-te că:**
- `.gitignore` este configurat corect
- Nu ai credențiale sau API keys în cod
- Toate fișierele necesare sunt incluse

## Troubleshooting

**Eroare: "Repository not found"**
- Verifică că ai acces la repository-ul de pe GitHub
- Verifică că URL-ul remote-ului este corect

**Eroare: "Permission denied"**
- Verifică credențialele GitHub (username/password sau SSH key)
- Configurează GitHub CLI sau SSH keys

**Fișiere mari nu se urcă**
- GitHub are limită de 100MB per fișier
- Pentru fișiere mari (video-uri), folosește Git LFS sau stochează-le separat
