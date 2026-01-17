# Deploy Automat pe Vercel cu GitHub Integration

## 🚀 Setup Deploy Automat (5 minute)

### Pași pentru conectarea GitHub cu Vercel

#### 1. Creează cont Vercel

1. Mergi pe [vercel.com](https://vercel.com)
2. Click pe **"Sign Up"** sau **"Log In"**
3. Selectează **"Continue with GitHub"**
4. Autorizează Vercel să acceseze repository-urile tale GitHub

#### 2. Conectează Repository-ul

1. După logare, click pe **"Add New..."** → **"Project"**
2. Vei vedea lista cu repository-urile tale GitHub
3. Găsește repository-ul **`nexpalssite`** (sau `ibdeveloper/nexpalssite`)
4. Click pe **"Import"** lângă repository

#### 3. Configurează Proiectul

Vercel detectează automat că este un proiect Next.js, dar poți verifica:

**Project Settings:**
- **Framework Preset:** Next.js (detectat automat)
- **Root Directory:** `./` (implicit)
- **Build Command:** `npm run build` (implicit)
- **Output Directory:** `.next` (implicit pentru Next.js)
- **Install Command:** `npm install` (implicit)

**Environment Variables (dacă ai nevoie):**
- Click pe **"Environment Variables"**
- Adaugă variabilele necesare (ex: `NEXT_PUBLIC_SITE_URL=https://nexpals.com`)

#### 4. Deploy!

1. Click pe **"Deploy"**
2. Așteaptă 1-2 minute pentru build
3. **Gata!** Site-ul este live la un URL Vercel (ex: `nexpalssite.vercel.app`)

---

## ✅ Deploy Automat Activ

După conectarea repository-ului, **deploy-ul automat este activat implicit**!

### Ce se întâmplă automat:

✅ **Push pe `main` branch** → Deploy automat pe producție  
✅ **Push pe alte branch-uri** → Preview deployment  
✅ **Pull Request** → Preview deployment pentru PR  
✅ **Commit pe `main`** → Build și deploy automat  

### Verificare Deploy Automat

1. Mergi în **Vercel Dashboard** → Proiectul tău
2. Click pe tab-ul **"Deployments"**
3. Vei vedea toate deployment-urile, inclusiv cele automate

---

## 🔗 Conectare Domeniu Custom (Opțional)

### Pași pentru domeniul tău (nexpals.com):

1. În Vercel Dashboard → **Settings** → **Domains**
2. Adaugă domeniul: `nexpals.com`
3. Vercel îți va da instrucțiuni pentru configurarea DNS:
   - Adaugă record-uri CNAME sau A în DNS-ul domeniului
   - Folosește valorile furnizate de Vercel

4. După configurarea DNS (poate dura până la 24h):
   - Site-ul va fi live la `https://nexpals.com`
   - SSL/HTTPS este activat automat de Vercel

---

## 📋 Structura Deploy

### Deploy Production (branch `main`)

Când faci push pe `main`:
```
GitHub Push → Vercel Detectează → Build → Deploy → Live
```

**URL:** `https://nexpalssite.vercel.app` sau `https://nexpals.com`

### Preview Deployments (alte branch-uri)

Când faci push pe un alt branch sau creezi PR:
```
GitHub Push/PR → Vercel Build → Preview URL → Test
```

**URL:** `https://nexpalssite-git-branch-name.vercel.app`

---

## 🔧 Configurare Avansată (Opțional)

### Build Settings Custom

Dacă ai nevoie de configurare specială, creează `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**Nu este necesar pentru Next.js** - Vercel detectează automat!

### Environment Variables

Dacă ai variabile de mediu (ex: API keys):

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. Adaugă variabilele:
   - `NEXT_PUBLIC_SITE_URL` = `https://nexpals.com`
   - Alte variabile necesare
3. **IMPORTANT:** Variabilele cu `NEXT_PUBLIC_*` sunt disponibile în browser

---

## 🎯 Workflow Recomandat

### Pentru modificări mici (hotfix):

```bash
# 1. Faci modificările
git add .
git commit -m "Fix: descriere modificare"
git push origin main

# 2. Vercel face deploy automat în ~2 minute
# 3. Site-ul este live!
```

### Pentru funcționalități noi (feature):

```bash
# 1. Creezi branch nou
git checkout -b feature/nume-feature

# 2. Faci modificările
git add .
git commit -m "Feat: descriere feature"
git push origin feature/nume-feature

# 3. Vercel creează preview deployment automat
# 4. Testezi preview-ul
# 5. Creezi Pull Request pe GitHub
# 6. Merge PR → Deploy automat pe producție
```

---

## 📊 Monitoring și Logs

### Vezi Build Status

1. Vercel Dashboard → **Deployments**
2. Click pe un deployment pentru detalii:
   - Build logs
   - Error logs (dacă există)
   - Deployment URL

### Logs în Timp Real

1. Vercel Dashboard → Deployment → **Logs**
2. Vezi build-ul în timp real
3. Vezi erori (dacă există)

---

## 🐛 Troubleshooting

### ❌ Build Failed

**Cauze comune:**
- Dependențe lipsă în `package.json`
- Erori de TypeScript/ESLint
- Variabile de mediu lipsă

**Soluție:**
1. Verifică **Build Logs** în Vercel Dashboard
2. Rulează `npm run build` local pentru a reproduce eroarea
3. Fixează eroarea local, apoi push din nou

### ❌ Site-ul nu se încarcă

**Cauze comune:**
- Build-ul nu s-a terminat
- Erori în runtime (JavaScript errors)
- Configurație DNS greșită (dacă folosești domeniu custom)

**Soluție:**
1. Verifică **Deployments** - asigură-te că ultimul deployment este **Ready**
2. Verifică **Logs** pentru erori runtime
3. Testează local cu `npm run dev` și `npm run build`

### ❌ Deploy nu se declanșează automat

**Cauze:**
- GitHub integration nu este configurat corect
- Repository nu este conectat

**Soluție:**
1. Vercel Dashboard → **Settings** → **Git**
2. Verifică că repository-ul este conectat
3. Click pe **"Disconnect"** și reconectează dacă e necesar

---

## 🔒 Securitate

### Variabile de Mediu Sensibile

**NU** comite niciodată în Git:
- API keys
- Parole
- Tokens de autentificare

**Folosește** Environment Variables în Vercel Dashboard!

### Access Control

1. Vercel Dashboard → **Settings** → **Team**
2. Invită colaboratori (dacă e necesar)
3. Setează permisiuni (Viewer/Developer/Owner)

---

## 📈 Avantaje Vercel

✅ **Deploy automat** - Zero configurare necesară  
✅ **SSL/HTTPS gratuit** - Certificat automat  
✅ **CDN global** - Site rapid în toată lumea  
✅ **Preview deployments** - Testează înainte de producție  
✅ **Analytics** - Vezi performanța site-ului  
✅ **Optimizat pentru Next.js** - Performanță maximă  
✅ **Scaling automat** - Gestionat de Vercel  

---

## 🎉 Gata!

După configurare, orice push pe GitHub va declanșa automat deploy pe Vercel!

**Test:**
1. Faci o modificare mică (ex: schimbă un text)
2. `git commit -m "Test deploy"`
3. `git push origin main`
4. Verifică Vercel Dashboard - vei vedea build-ul automat în ~2 minute

---

**Link Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)  
**Documentație:** [vercel.com/docs](https://vercel.com/docs)
