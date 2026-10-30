# Isi yang masih kosong

Checklist kerja untuk konten di `content/`. File ini bukan bagian dari koleksi Nuxt Content, jadi
tidak pernah dirender di situs maupun di README. Kalau satu poin selesai, hapus poinnya.

## projects/

- `genbatik.md`: bagian "What I would change next" belum ada. Isinya 2 sampai 3 hal nyata, misalnya
  batas biaya GPU, evaluasi kualitas otomatis, atau cara menangani prompt berbahaya. `metrics` sudah
  terisi (60K+ pattern, 0% dropped request).
- `identifeye.md`: ambang batas yang dipilih dan alasannya, plus penanganan kasus gagal (wajah
  tidak terdeteksi, dua wajah, pencahayaan buruk). Ini yang membedakan demo dari sistem.
- `sparse.md`: ukuran dataset dan resolusi tile belum disebut. Metrik (0.6459 test F1, MaxViT-B) dan
  peran (team lead) sudah terisi.
- `tatakata.md`: apa yang belum jalan dan kapan mau dilanjutkan. Angka pemakaian sudah terisi.
- `alpr.md`: link dataset atau writeup kalau ada; sekarang tidak ada link sama sekali.

## skills/

- `02-serving.md`: angka latency sudah masuk (100ms ke 10ms). Kalau ada biaya per request yang nyata
  (GPU per gambar), sebutkan di sini.
- `03-monitoring.md`: sekarang mengklaim metrics dan CI/CD dari Rains. Ganti dengan nama tool yang
  benar-benar dipakai (Grafana? Actions? logging custom?) begitu dipastikan.

## testimonials/

Folder ini sengaja kosong. Selama tidak ada file `.md` di sini, section Testimonials tidak
dirender, baik di situs maupun di README. Menambah satu testimoni berarti menambah satu file:

```md
---
name: Rina
title: Engineering Manager
company: Rains
relation: Atasan langsung
order: 1
---

Kalimat testimoni di sini.
```

`title` adalah jabatan pemberi testimoni, `relation` hubungannya (atasan/klien/rekan), `order`
urutan tampil. Body Markdown-nya adalah kutipannya, tanpa tanda kutip di awal dan akhir karena situs
yang menambahkan.

## Belum dipakai di mana pun

Dari data CV terbaru, dua hal ini sengaja tidak dimasukkan: platform Pilketos 2017-2020 (React,
Angular, Pascal/Lazarus) dan benchmark awal GenBatik. Kalau mau ditampilkan, Pilketos paling cocok
jadi project card dengan `status: Legacy`.
