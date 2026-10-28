# Alternatif dashboard Kalkulator HPP

Lima gambar konsep desktop dibuat menggunakan built-in image_gen. Prompt lengkap ada di prompts.json. Font dalam gambar merupakan pendekatan visual hasil generasi, bukan font web yang sudah diimplementasikan.

1. 01-inter-compact.png: tabel ringkas, Inter, putih dan biru.
2. 02-geist-workspace.png: workspace resep tiga panel, Geist, hijau.
3. 03-jakarta-warm.png: kartu menu, Plus Jakarta Sans, ivory dan oranye.
4. 04-sfpro-dark.png: tabel dan inspector dalam tema gelap, SF Pro.
5. 05-nunito-friendly.png: tabel dan akses utilitas, Nunito, teal dan kuning.

## Analisis sumber

index.html adalah aplikasi browser dengan empat tab: Bahan, Menu, Paket, Setting. Penyimpanan menggunakan localStorage dan opsional File System Access API. Ada import/export backup JSON, laporan menu JSON, serta laporan Markdown per menu dan semua menu.

Master bahan mendukung berat, volume, hitung, label satuan, pembagian bahan, berat per pcs, harga beli, dan tanggal pembaruan. Resep mengonversi satuan, menghitung biaya bahan, membagi sesuai hasil porsi, dan menambahkan overhead per porsi. HPP dibulatkan sebelum digunakan menghitung harga jual.

Harga langsung = HPP / (1 - target margin). Harga channel = harga langsung / (1 - komisi). Target margin adalah margin dari harga jual, bukan markup dari HPP.

Backup berisi 45 bahan, 8 menu, dan 4 channel: GrabFood 25%, GrabFood Boost 38%, Shopee Food 25%, GoFood 25%. Tidak ada bundling dalam backup, sehingga jumlah paket setelah import adalah 0.

| Menu | Hasil resep | HPP/porsi | Harga langsung |
| --- | ---: | ---: | ---: |
| Ayam Kremes | 4 | Rp 13.508 | Rp 27.016 |
| Bebek Kremes | 2 | Rp 41.558 | Rp 83.116 |
| Nasi Uduk | 4 | Rp 4.500 | Rp 9.000 |
| Tahu Goreng | 10 | Rp 1.500 | Rp 3.000 |
| Tempe Goreng | 10 | Rp 1.500 | Rp 3.000 |
| Sambal Tomat | 10 | Rp 2.000 | Rp 4.000 |
| Kremesan | 10 | Rp 3.000 | Rp 6.000 |
| Packaging | 1 | Rp 4.000 | Rp 4.000 |

Nilai dihitung dengan fungsi JavaScript aplikasi menggunakan data backup. Margin semua menu makanan 50%; Packaging 0%. Tidak ada data transaksi, omzet, stok, tanggal kedaluwarsa, atau histori perubahan harga.

## Catatan pemeriksaan gambar

Kelima gambar adalah eksplorasi komposisi dan gaya, bukan spesifikasi data final. Harga HPP dan harga langsung utama mengikuti perhitungan sumber. Detail teks dan ikon hasil generasi masih perlu dikoreksi saat implementasi:

- Gambar 01 menampilkan porsi 4 untuk semua menu; gunakan hasil resep pada tabel di atas. Panel stok dan kedaluwarsa harus diganti dengan harga terakhir diperbarui.
- Gambar 02 salah menamai HPP per porsi sebagai total empat porsi. HPP per porsi yang benar Rp 13.508; biaya bahan seresep sekitar Rp 52.274 dan overhead seresep Rp 1.756. Daftar bahan dan angka rinci dalam gambar bersifat ilustratif. Stok dan kedaluwarsa bukan fitur sumber.
- Gambar 03 menyebut kedaluwarsa pada peringatan; ganti dengan umur pembaruan harga.
- Gambar 04 menampilkan detail bahan ilustratif dan jumlah peringatan ilustratif.
- Gambar 05 menampilkan 3 bahan usang sebagai ilustrasi. Jumlah sebenarnya harus dihitung dari updatedAt dan staleDays, bukan angka tetap.
- Pencarian pada beberapa konsep merupakan usulan kontrol navigasi visual, bukan fitur daftar menu yang sudah ada.

Dalam implementasi, harga usang berarti umur tanggal pembaruan lebih dari 30 hari, bukan kondisi fisik bahan. Label yang disarankan: "Harga perlu diperbarui".

Temuan kode di luar lingkup desain: backupPayload() belum menyertakan bundling meskipun migrasi dan state mendukungnya. Paket berisiko tidak ikut backup. Tidak ada perubahan pada index.html atau JSON sumber dalam pekerjaan ini.
