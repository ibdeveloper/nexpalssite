# Configurare DNS pentru Vercel - Redirecționare domeniu

## 🔴 Problema

Domeniul `nexpals.com` încă point-ează către cPanel, nu către Vercel. De aceea vezi "Index of /" (directoarele cPanel) în loc de site-ul de pe Vercel.

---

## ✅ Soluție: Configurează DNS-ul să point-eze către Vercel

### Pas 1: Configurează Domeniul în Vercel

1. **Mergi în Vercel Dashboard:**
   - [vercel.com/dashboard](https://vercel.com/dashboard)
   - Selectează proiectul `nexpalssite`

2. **Settings → Domains:**
   - Click pe tab-ul **"Domains"** (sau **Settings → Domains**)
   - Click pe butonul **"Add"** sau **"Add Domain"**

3. **Adaugă domeniul:**
   - Introdu: `nexpals.com`
   - (Opțional) Adaugă și: `www.nexpals.com`
   - Click **"Add"**

4. **Vercel îți va arăta instrucțiuni DNS:**
   - Vercel va genera valorile DNS pe care trebuie să le configurezi
   - Exemple:
     - **Type:** `A` record
     - **Name:** `@` (sau `nexpals.com`)
     - **Value:** IP-uri Vercel (ex: `76.76.21.21`)
     - SAU
     - **Type:** `CNAME` record
     - **Name:** `@` (sau `www`)
     - **Value:** `cname.vercel-dns.com`

---

### Pas 2: Schimbă DNS-ul în cPanel (sau unde ți-e domeniul)

**Opțiunea A: Schimbă DNS în cPanel (dacă domeniul e gestionat aici)**

1. **cPanel → Zone Editor** sau **DNS Management:**
   - Mergi în cPanel
   - Găsește **"Zone Editor"** sau **"DNS Management"** sau **"DNS Records"**

2. **Șterge sau modifică record-urile existente:**
   - Găsește record-urile `A` pentru `nexpals.com` (sau `@`)
   - Șterge-le sau modifică-le cu valorile Vercel

3. **Adaugă record-urile Vercel:**
   - Adaugă `A` record:
     - **Name:** `@` (sau `nexpals.com`)
     - **Type:** `A`
     - **Address:** IP-uri de la Vercel (vezi în Vercel Dashboard)
   - SAU adaugă `CNAME` record:
     - **Name:** `@` (sau `www`)
     - **Type:** `CNAME`
     - **CNAME:** `cname.vercel-dns.com`

**Opțiunea B: Schimbă DNS la Registrar-ul domeniului (recomandat)**

Dacă domeniul `nexpals.com` este înregistrat la un registrar (ex: Namecheap, GoDaddy, etc.):

1. **Loghează-te la registrar-ul domeniului** (unde ai cumpărat domeniul)

2. **Găsește secțiunea DNS / Nameservers:**
   - Caută **"DNS Management"**, **"DNS Settings"**, sau **"Nameservers"**

3. **Schimbă record-urile DNS:**
   - Modifică sau adaugă record-urile conform instrucțiunilor Vercel:
     - **A record** pentru root domain (`@`)
     - **CNAME record** pentru `www` (opțional)

4. **Folosește valorile de la Vercel:**
   - Reia valorile din **Vercel Dashboard → Settings → Domains**

---

### Pas 3: Așteaptă Propagarea DNS

⏱️ **DNS-ul se propagă în 5 minute - 24 ore** (de obicei 1-2 ore)

**Verificare:**
1. După 10-15 minute, testează: `https://nexpals.com`
2. Sau folosește [whatsmydns.net](https://www.whatsmydns.net) pentru a verifica propagarea DNS

---

## 🔍 Verificare DNS

### Cum să verifici dacă DNS-ul point-ează corect:

**Metoda 1: Verificare în Browser**
- Accesează `https://nexpals.com`
- Dacă vezi site-ul Vercel → DNS-ul funcționează ✅
- Dacă vezi "Index of /" sau site-ul cPanel → DNS-ul încă point-ează la cPanel ❌

**Metoda 2: Ping**
```bash
ping nexpals.com
# Ar trebui să vezi IP-ul Vercel (nu IP-ul cPanel)
```

**Metoda 3: DNS Lookup**
- Folosește [whatsmydns.net](https://www.whatsmydns.net)
- Introdu `nexpals.com`
- Verifică că IP-urile sunt de la Vercel

---

## ⚠️ Important

### Dacă domeniul e folosit și pentru email (ex: contact@nexpals.com):

**NU șterge toate record-urile DNS!**

1. **Păstrează record-urile MX** (pentru email):
   - Lasă neschimbate record-urile `MX`
   - Acestea sunt necesare pentru email-ul `@nexpals.com`

2. **Schimbă doar record-urile A și CNAME:**
   - Modifică doar record-urile care controlează site-ul web
   - Păstrează toate celelalte record-uri (MX, TXT, etc.)

---

## 🎯 Configurare Recomandată pentru Vercel

### Varianta 1: A Record (Root Domain)

```
Type: A
Name: @
Value: 76.76.21.21 (sau IP-ul de la Vercel)

Type: CNAME (opțional pentru www)
Name: www
Value: cname.vercel-dns.com
```

### Varianta 2: CNAME (Dacă suportă)

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**Notă:** Nu toți registrar-ii suportă CNAME pe root domain (`@`). În acest caz, folosește A records.

---

## 🔄 Deploy Vercel vs cPanel

### Opțiunea 1: Doar Vercel (Recomandat)

✅ **Toate modificările se fac pe GitHub → Deploy automat pe Vercel**  
✅ **Nu mai folosești cPanel pentru site**  
✅ **SSL/HTTPS gratuit automat**  

**Pași:**
1. Configurează DNS-ul să point-ează la Vercel (după pașii de mai sus)
2. Lasă cPanel doar pentru email (dacă e necesar)

### Opțiunea 2: cPanel pentru Email, Vercel pentru Site

✅ **Site-ul rulează pe Vercel**  
✅ **Email-ul rămâne pe cPanel**  

**Configurare DNS:**
- **A record** pentru `nexpals.com` → Vercel IP
- **MX records** → cPanel (păstrează-le neschimbate)
- **CNAME www** → Vercel (opțional)

---

## 🐛 Troubleshooting

### ❌ Site-ul încă arată cPanel după schimbarea DNS

**Cauze posibile:**
1. DNS-ul nu s-a propagat încă (așteaptă 1-2 ore)
2. Cache în browser (șterge cache sau folosește mod incognito)
3. DNS-ul nu a fost configurat corect

**Soluție:**
- Verifică DNS-ul cu [whatsmydns.net](https://www.whatsmydns.net)
- Șterge cache-ul browser-ului
- Așteaptă propagarea DNS (poate dura până la 24h)

### ❌ Email-ul nu mai funcționează

**Cauză:** Ai șters record-urile MX.

**Soluție:**
- Păstrează record-urile MX pentru email
- Schimbă doar record-urile A/CNAME pentru site

### ❌ SSL Certificate Error

**Cauză:** Vercel generează automat certificat SSL, dar poate dura câteva minute.

**Soluție:**
- Așteaptă 5-10 minute după configurarea domeniului în Vercel
- Vercel va genera automat certificat SSL (Let's Encrypt)

---

## ✅ Verificare Finală

După configurarea DNS-ul:

1. ✅ Site-ul funcționează: `https://nexpals.com`
2. ✅ Redirect automat la `/ro/` (limba implicită)
3. ✅ Toate limbile funcționează: `/en/`, `/fr/`, etc.
4. ✅ SSL/HTTPS funcționează (lacătul verde)
5. ✅ Email-ul funcționează (dacă ai configurat MX records)

---

## 📞 Suport

**Dacă ai probleme:**
- Verifică [Vercel DNS Docs](https://vercel.com/docs/concepts/projects/domains)
- Contactează suportul registrar-ului pentru ajutor cu DNS
- Verifică logs în Vercel Dashboard pentru erori

---

**Gata!** După configurarea DNS-ul, site-ul va rula pe Vercel în loc de cPanel. 🚀
