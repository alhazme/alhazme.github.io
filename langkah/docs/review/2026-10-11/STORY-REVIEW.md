# Review alur cerita Langkah

Tanggal: 11 Oktober 2026. Cakupan: section 2 sampai sebelum footer, Indonesia dan Inggris.

## Temuan dan perbaikan

Sebelumnya, section 2 langsung menyebut jumlah kartu tanpa menjelaskan papan dua kartu.
Timer dan bintang menjelaskan fitur, tetapi belum menghubungkan fitur dengan tindakan anak.
Penjelasan Mode Anak juga belum menunjukkan bagaimana anak menyelesaikan kedua kegiatan.

Referensi [AAC BerKata](https://www.aacberkata.com/) mengenalkan konsep AAC sebelum
menjelaskan aplikasinya. Langkah memakai pendekatan pengenalan konsep itu dengan contoh
rutinitas yang bisa dibuat dalam aplikasi, lalu menjelaskan pengalaman anak dan orang tua.

| Section | Pertanyaan pembaca yang dijawab |
| --- | --- |
| 2. Kartu | Apa itu papan dua kartu? Contoh: pertama sikat gigi, lalu bermain. |
| 3. Timer | Bagaimana anak melihat sisa waktu, dan apa yang terjadi saat waktu habis? |
| 4. Bintang | Apa yang anak dapat setelah kedua kegiatan selesai? |
| 5. Mode | Bagaimana orang tua menyiapkan papan dan anak menjalankannya? |
| 6. Gratis dan Pro | Bisakah contoh tadi dibuat gratis? Apa yang ditambahkan Pro? |
| 7. Privasi | Di mana data anak disimpan, dan siapa yang mengakses pengaturan? |

Manfaat dijelaskan melalui fungsi yang ada: urutan kegiatan terlihat, waktu tersisa terlihat,
anak mengetuk Selesai untuk berpindah, dan satu bintang menandai papan selesai.
Foto benda yang anak kenal dan rekaman suara orang tua menjelaskan kegunaan kartu buatan
sendiri. Tidak ada janji perubahan perilaku atau hasil kesehatan.

## Dasar fakta

- `Langkah/Langkah/Domain/Constants.swift`: dua langkah, 10 kartu gratis, satu papan dan satu
  profil anak gratis. `brush_teeth` dan `play` ada dalam daftar gratis.
- `Langkah/Langkah/Core/Persistence/StaticActivityCatalog.swift`: 60 kartu bawaan.
- `Langkah/Langkah/Features/ChildMode/ChildRunView.swift`: kartu aktif, petunjuk langkah
  berikutnya, mengetuk kartu untuk suara, tombol Done untuk menyelesaikan langkah.
- `Langkah/Langkah/Features/ChildMode/RunSessionViewModel.swift` dan
  `Langkah/Langkah/Domain/UseCases/RunSessionUseCases.swift`: waktu habis tidak memindahkan
  kartu, penyelesaian dua langkah menambah satu bintang, sesi belum selesai tidak mengurangi
  bintang. Rekaman sendiri atau nama kegiatan dalam bahasa antarmuka dipakai untuk suara.
- `Langkah/Langkah/Features/ChildMode/AllDoneView.swift` dan `GoodJobView.swift`: perayaan
  memakai Dino atau Dina. Naskah tidak menyebut layar Hebat sebagai layar langsung setelah
  kartu kedua, karena aplikasi menampilkan All Done lebih dahulu.
- `privacy/id/index.html`: penyimpanan aplikasi di perangkat, tanpa akun, iklan atau analitik;
  pengaturan dan pembelian berada di Mode Orang Tua. Kalimat absolut tentang data tidak
  pernah keluar perangkat diganti dengan penjelasan bahwa aplikasi tidak mengirimnya kepada
  pengembang, sesuai penjelasan cadangan perangkat di kebijakan privasi.

## Validasi

- PASS: `python3 check.py --draft` memeriksa 6 halaman; `git diff --check` bersih.
- PASS: Indonesia dan Inggris pada 320, 390, 760, 1440 px dengan tinggi 900 px. Pengukuran
  setelah viewport selesai menggambar: tidak ada overflow halaman atau teks section yang
  keluar layar. Semua section memenuhi tinggi viewport di bawah header, atau lebih tinggi.
- PASS: urutan tetap hero, kartu, timer, bintang, mode, harga, privasi.
- PASS: empat tautan fitur menuju anchor yang benar pada kedua bahasa; header tetap di y=0.
- PASS: tautan privasi penutup dan tautan bantuan membuka dokumen yang benar di kedua bahasa.
- PASS: kontrol kartu bekerja dengan Enter di kedua bahasa; kontrol pratinjau bekerja dengan
  Enter dalam pemeriksaan Inggris. aria-pressed berubah true saat jeda dan false saat putar.
- PASS: strip masih memiliki 10 kartu asli. CSS, skrip, artwork, hero dan footer tidak diubah.
  Validasi reduced motion, tanpa JavaScript dan loader dari `MOTION-REVIEW.md` dan `REVIEW.md`
  tetap menjadi baseline untuk perilaku yang tidak berubah.

## Delivery gate

- R-01 PASS: palet aplikasi dipertahankan; tidak ada gradient tambahan.
- R-02 PASS: checker HTML lolos; naskah memakai tanda baca biasa.
- R-03 PASS: delapan kombinasi bahasa dan viewport tanpa overflow teks atau halaman.
- R-04 PASS: bintang tetap menandai hadiah papan; ikon gembok menjelaskan akses orang tua.
- R-05 PASS: urutan section mengikuti contoh rutinitas, pelaksanaan, lalu keputusan penggunaan.
- R-06 PASS: Nunito dan hierarki tipografi aplikasi dipertahankan sesuai DESIGN.md.
- R-07 PASS: latar polos aplikasi dipertahankan.
- R-08 PASS: tidak ada panah CTA tambahan; panah splash tetap menunjukkan urutan kegiatan.
- R-09 PASS: label tahap aplikasi tetap menjadi label fungsional; tidak ada badge promosi baru.
- R-10 PASS: permukaan dan header tetap solid, tanpa glassmorphism.
- R-11 PASS: radius kartu, panel dan kontrol tidak berubah.
- R-12 PASS: tidak ada shadow tambahan.
- R-13 PASS: tidak ada glow tambahan.
- R-14 PASS: penjelasan tetap memakai strip kartu, timer, ilustrasi dan dua kolom mode.
- R-15 PASS: tautan penutup tetap bernama Baca kebijakan privasi; kontrol menyebut aksinya.
- R-16 PASS: manfaat memakai kegiatan dan tindakan anak, tanpa buzzword pemasaran.
- R-17 PASS: angka dua, 10, 60 dan satu bintang ditelusuri ke kode aplikasi di atas.
- R-18 PASS: tidak ada testimoni atau orang rekaan.
- R-19 PASS: animasi yang sudah divalidasi tetap menjelaskan urutan aplikasi dan kartu gratis.
- R-20 PASS: contoh kegiatan, Dina/Dino dan papan Pertama/Lalu mempertahankan identitas Langkah.
- R-21 PASS: tema terang aplikasi dipertahankan.
- R-22 PASS: semua gambar tetap artwork aplikasi yang sudah tercatat provenance-nya.
- R-23 PASS: revisi narasi diotorisasi pengguna; tidak ada aset atau struktur navigasi baru.
- R-24 PASS: checker memeriksa tujuan link; tautan fitur, bahasa, privasi dan bantuan diaktifkan.
- R-25 PASS: CSS warna tidak berubah; pasangan teks yang dipakai mempertahankan hasil contrast
  baseline 5.14:1 sampai 9.25:1 dalam REVIEW.md.
- R-26 PASS: kontrol jeda berfungsi; tombol store tetap disabled dengan catatan dummy yang ada.
- R-27 PASS: konten statis tidak menambah state data; loader dan fallback baseline dipertahankan.
- R-28 PASS: tidak ada FAQ tambahan.
- R-29 PASS: warna tetap berasal dari sistem desain Langkah.
- R-30 PASS: referensi dipakai untuk pengenalan konsep; layout dan visual tetap milik Langkah.
- R-31 PASS: tujuan narasi dan contoh kartu gratis dicatat dalam DESIGN.md dan laporan ini.
- R-32 PASS: Enter mengaktifkan kontrol native; CSS fokus dan link skip yang sudah diuji tetap ada.
- R-33 PASS: HTML dan dokumentasi diedit langsung dengan patch sumber.
- R-34 PASS: tema tunggal diperiksa dalam kedua bahasa dan empat lebar layar.
- R-35 PASS: situs localhost dijalankan, pengukuran responsive dan aktivasi link dicatat di atas;
  click-through penuh yang tidak berubah tercatat dalam REVIEW.md.
- R-36 PASS: manfaat menjelaskan fungsi yang ada; tidak ada janji hasil perilaku atau kesehatan.
- R-37 PASS: DESIGN.md, arahan pengguna dan referensi narasi dibaca sebelum penulisan.
- R-38 PASS: contoh memakai kartu asli dan gratis; ketersediaan download tetap berlabel dummy.
- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 dipertahankan sesuai DESIGN.md.
- Konsistensi dial PASS: strip, section berpasangan dan field bintang tetap memakai komposisi berbeda.
- Focal point PASS: tiap section memiliki judul yang menjelaskan bagian pengalaman pengguna.
- Whitespace PASS: tinggi viewport memberi jeda antar bagian; konten mobile dapat tumbuh.
- Accent PASS: sage untuk aksi dan bintang untuk penghargaan tetap memiliki peran aplikasi.
- Identity motif PASS: contoh dua kegiatan menghubungkan kartu, penyelesaian dan pilihan gratis.
- Design read PASS: arah sebelum edit adalah bahasa ramah untuk orang tua, contoh gratis yang
  konkret, dan pengenalan konsep sebelum penjelasan fitur, dengan visual aplikasi yang ada.
- C-1 PASS: alasan contoh, urutan narasi dan manfaat tertulis dalam DESIGN.md dan laporan ini.
- C-2 PASS: tautan dan kontrol berfungsi; status store yang belum tersedia terlihat.
- C-3 PASS: tiap section menjawab pertanyaan penggunaan yang berbeda dalam tabel di atas.
- C-4 PASS: layout copy diperiksa pada empat lebar; perilaku fallback tidak diubah dari baseline.
- C-5 PASS: fakta bersumber dari kode dan kebijakan aplikasi, tanpa bukti sosial rekaan.
- Copy PASS: naskah dibaca ulang dalam kedua bahasa; kalimat menyebut tindakan nyata,
  memakai istilah aplikasi yang konsisten, dan tidak menambah fakta yang tidak bersumber.
