# Portfolio Improvement Plan — alhaz.me

### Priority Matrix

| # | Area | Severity | Effort | Impact |
|---|---|---|---|---|
| 1 | Fix project descriptions (copy-paste error) | 🔴 Critical | Low | High |
| 2 | Replace fake testimonials | 🔴 Critical | Medium | High |
| 3 | Add About section | 🟡 Medium | Medium | High |
| 4 | Add Services section | 🟡 Medium | Medium | High |
| 5 | Fix contact — add Calendly CTA | 🟡 Medium | Low | Medium |
| 6 | Fix stats credibility | 🟡 Medium | Low | Medium |
| 7 | Fix LinkedIn URL consistency | 🟢 Low | Low | Low |
| 8 | Strengthen agency branding | 🟢 Low | High | Medium |

---

## Task Breakdown

---

### 🔴 Task 1 — Fix Project Descriptions
**Lokasi di HTML:** Section `#projects`, card-card project

| Card | Current (Salah) | Fix |
|---|---|---|
| Salesku | "Internal lab management app operated by Laboratorium Klinik Sakura" | Tulis ulang sesuai fakta Salesku |
| Sepulsa | Deskripsi Chaterpress tertukar | Tulis ulang deskripsi Sepulsa yang benar |
| MLis | Sama persis dengan Lab Sakura | Bedakan deskripsi keduanya |

**Action:** Edit langsung teks di masing-masing card. Tidak perlu ubah struktur HTML.

---

### 🔴 Task 2 — Replace Testimonials
**Lokasi di HTML:** Section testimonials / reviews

**Opsi A (Ideal):** Ganti dengan testimoni nyata — nama lengkap, foto asli, company verifiable, tambah atribut `data-linkedin` atau link profil.

**Opsi B (Jika belum punya testimoni nyata):** Ganti seluruh section dengan **Case Study preview card** — brief, visual, hasil konkret. Contoh struktur:

```
[Project Name] — [Client Type]
Problem: ...
Solution: ...
Result: [metric konkret — "shipped in 3 weeks", "reduced load time 60%"]
```

**Opsi C (Minimum viable):** Tambah disclaimer kecil *"Testimonials from past collaborations — references available on request"* dan pastikan nama/company tidak terkesan fiktif.

**Rekomendasi:** Opsi B paling kuat untuk solo agency tanpa social proof platform (Upwork, dll).

---

### 🟡 Task 3 — Add About Section
**Lokasi di HTML:** Tambah section baru antara Hero dan Projects

**Konten yang harus ada:**
- 2–3 kalimat narasi: journey 10+ tahun, dari iOS engineer ke AI-Native founder
- Alhazme sebagai agency — bukan freelancer biasa
- Pendekatan: spec-driven, clean architecture, AI-augmented delivery
- Foto (gunakan `hero.png` yang sudah ada jika belum ada foto lain)

**Struktur HTML sederhana:**
```html
<section id="about">
  <div class="about-text">
    <span class="label">About</span>
    <h2>10+ Years. One Engineer. Full Delivery.</h2>
    <p>...</p>
    <p>...</p>
  </div>
  <div class="about-photo">
    <img src="/hero.png" alt="Fariz Al-Hazmi" />
  </div>
</section>
```

---

### 🟡 Task 4 — Add Services Section
**Lokasi di HTML:** Tambah section baru setelah About, sebelum Projects

**3 service card yang harus ada:**

| Service | Tagline | Detail |
|---|---|---|
| Done-for-You AI Product Build | From discovery to go-live | Mobile · Backend · AI Layer · CI/CD · Docs |
| White-label SaaS Delivery | Your brand, my build | Reusable, multi-tenant, fully documented |
| Digital Products | Ready to use, instantly | Flutter templates · Figma kits · ABK tools |

Tiap card: judul, deskripsi 1 kalimat, CTA button → `#contact`

---

### 🟡 Task 5 — Fix Contact CTA
**Lokasi di HTML:** Section `#contact` dan tombol "Hire Me" di nav

**Yang perlu diubah:**
- Ganti `mailto:` sebagai primary CTA → pindah ke secondary
- Primary CTA: tombol **"Book a Discovery Call"** → link ke Calendly / Cal.com kamu
- Tambah micro-copy: *"30-min call. No commitment. Let's see if we're a fit."*

---

### 🟡 Task 6 — Fix Stats Credibility
**Lokasi di HTML:** Stats bar di bawah hero (12+, 3x, 5★)

| Stat | Current | Fix |
|---|---|---|
| 12+ Products | OK | Tambah tooltip: *"across mobile, web, and backend"* |
| 3x Faster | Terlalu klaim | Ubah ke sesuatu yang verifiable — misal *"10+ Years Experience"* atau *"~14 months avg. delivery"* |
| 5★ Client Satisfaction | Tanpa source | Tambah *(references on request)* atau hapus jika tidak ada platform review |

---

### 🟢 Task 7 — LinkedIn URL
**Lokasi di HTML:** Footer link LinkedIn

Check: URL di footer adalah `/alhazmi` — sesuaikan dengan URL LinkedIn aktual kamu (`/alhazme` atau `/alhazmi`).

---

### 🟢 Task 8 — Agency Branding Reinforcement
**Lokasi di HTML:** Nav, Hero subtitle, Footer

**Perubahan kecil tapi impactful:**
- Footer: *"© 2026 Alhazme"* → *"© 2026 Alhazme — AI-Native Software Agency"*
- Hero subtitle: tambah *"Founder of Alhazme"* di bawah nama
- Nav brand: pertimbangkan *"Alhazme"* sebagai nama nav, bukan hanya `alhaz.me`

---

## Urutan Eksekusi yang Disarankan

```
Hari ini (< 1 jam):
  ☐ Task 1 — Fix project descriptions
  ☐ Task 7 — Fix LinkedIn URL
  ☐ Task 6 — Fix stats

Besok (1–2 jam):
  ☐ Task 5 — Fix contact CTA (setup Cal.com dulu jika belum)
  ☐ Task 8 — Agency branding reinforcement

Minggu ini (2–4 jam):
  ☐ Task 3 — Add About section
  ☐ Task 4 — Add Services section

Setelah ada testimoni nyata:
  ☐ Task 2 — Replace testimonials / case studies
```
