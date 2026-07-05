# ADR-001: Adopsi SwiftData untuk Persistence Lokal (Contoh Referensi)

> Contoh ADR nyata sebagai template & referensi untuk workshop ini (dirujuk Module 16 & 18).
> ADR bersifat *immutable* — bila keputusan berubah, buat ADR baru yang men-*supersede*, jangan edit yang lama.

## Status

Accepted — 2026-06-01

## Context

Aplikasi SaaS greenfield (SwiftUI-first, Swift 6.4 / iOS 27) membutuhkan cache lokal untuk daftar order agar mendukung offline mode (lihat Module 12). Karakteristik:

- Object graph berukuran sedang (Order, Item, Customer), tanpa relasi rekursif kompleks.
- Tim kecil (solo founder + kolaborator lepas) — kecepatan delivery bernilai tinggi.
- Butuh integrasi reaktif dengan SwiftUI.
- Tidak ada kebutuhan CloudKit **public** database; sync lintas device cukup private (opsional, fase berikutnya).
- Realm sudah di-*deprecate* MongoDB (Device Sync EOL 30 Sep 2025) — dikeluarkan dari pertimbangan (lihat Module 11).

## Decision

Gunakan **SwiftData** sebagai layer persistence lokal, **dibungkus di balik `OrderRepository`** (protocol di layer Domain, lihat Module 9). Akses SwiftData tidak pernah bocor ke ViewModel.

Konfigurasi:
- `ModelContainer` dengan `ModelConfiguration`; sync CloudKit private via `.automatic` disiapkan tetapi di-*gate* di belakang feature flag (Module 18) untuk fase berikutnya.
- Skema di-versikan sejak v1 (`VersionedSchema`) + `SchemaMigrationPlan` untuk mengantisipasi migrasi (Module 18).

## Consequences

**Positif**
- Boilerplate minimal, integrasi `@Query` reaktif — delivery lebih cepat.
- Jalur upgrade ke sync CloudKit private tersedia tanpa mengganti stack.
- Karena akses via Repository, logika domain tidak terikat ke SwiftData.

**Negatif / risiko**
- SwiftData relatif baru; kematangan *custom migration* kompleks belum setara Core Data. → *Mitigasi:* versikan skema sejak awal; simpan seed DB tiap versi untuk regression test migrasi di CI (Module 18).
- Beberapa skenario relasi/predicate lanjutan mungkin butuh fallback. → *Mitigasi:* boundary Repository memungkinkan migrasi ke Core Data terisolasi di data layer bila diperlukan, tanpa menyentuh domain/presentation.

**Netral**
- Tim perlu memahami perbedaan model `@Model` vs `NSManagedObject`.

## Alternatives Considered

| Alternatif | Alasan ditolak |
|---|---|
| **Core Data** | Lebih matang & kuat untuk object graph kompleks, tetapi verbose; kompleksitasnya tidak dibenarkan untuk graph sedang + tim kecil pada proyek greenfield ini. Tetap menjadi jalur fallback (via Repository). |
| **Realm** | Di-*deprecate* MongoDB; Device Sync EOL. Tidak dipilih untuk proyek baru (Module 11). |
| **SQLite manual (GRDB/raw)** | Kontrol penuh tetapi menambah beban maintenance & boilerplate yang tidak sepadan untuk kebutuhan saat ini. |

## Verifikasi

Karena SwiftData & kebijakan CloudKit dapat berubah antar versi iOS, verifikasi kematangan *migration* dan batas kuota terhadap dokumentasi Apple terkini sebelum mengandalkan fitur lanjutan.
