# Isi yang masih kosong

Checklist kerja untuk konten di `content/`. File ini bukan bagian dari koleksi Nuxt Content, jadi
tidak pernah dirender di situs maupun di README. Kalau satu poin selesai, hapus poinnya.

## profile.md

- Dua paragraf intro ditulis ulang oleh Daffa. Fakta yang boleh dipakai: latar CS Universitas
  Brawijaya, pengalaman profesional sejak 2023, sekarang tech lead di Rains dan founding developer
  di Mayfeyr, menulis di invasikode.com. Jangan tambah klaim angka sebelum angkanya diisi di
  `projects/` dan `experience/`.

## experience/

- `education.md`: tahun masuk sampai tahun lulus, plus satu kalimat fokus studi / skripsi /
  organisasi yang relevan dengan AI.
- `rains.md`: isi periode sebenarnya, lalu 2 sampai 4 bullet hasil (bukan jobdesk) dengan bentuk
  "kerjaan, dampak, angka". Contoh bentuk: "Pimpin tim N engineer, pegang arsitektur dan review
  untuk <produk>." atau "Pindahkan <X> ke <Y>, p95 turun dari A ke B."
- `mayfeyr.md`: isi periode sebenarnya, lalu 2 sampai 4 bullet. Role founding paling kuat kalau
  isinya hal yang belum ada lalu kamu buat: arsitektur awal, pipeline deploy, model, onboarding
  user. Kalau salah satu role sudah diputuskan untuk dilepas, tetap tampilkan di sini, cukup
  periodenya ditutup.

## projects/

- `genbatik.md`: angka nyata untuk `metrics` (jumlah generasi, p95 latency, biaya GPU per gambar).
  Selama angkanya belum terukur, biarkan `metrics: []`. Lalu tulis bagian "What I would change
  next": 2 sampai 3 hal nyata, misalnya batas biaya GPU, evaluasi kualitas otomatis, atau cara
  menangani prompt berbahaya.
- `identifeye.md`: ambang batas yang dipilih dan alasannya, plus penanganan kasus gagal (wajah
  tidak terdeteksi, dua wajah, pencahayaan buruk). Ini yang membedakan demo dari sistem.
- `sparse.md`: peran sebenarnya (model / backend / GIS / semuanya), status proyek, dan satu
  paragraf teknis yang tidak kelihatan dari UI: kelas apa yang diprediksi, ukuran dataset, resolusi
  tile, metrik evaluasi (mAP/IoU), dan bagian yang paling sulit.
- `tatakata.md`: apa yang sudah jalan, apa yang belum, dan kapan mau dilanjutkan.

## skills/

- `02-serving.md`: kalau ada angka latency atau biaya per request yang nyata, sebutkan di sini.
  Bagian ini yang paling dicari untuk role AI engineer.
- `03-monitoring.md`: kalau di Rains atau Mayfeyr pernah pasang metrics, alert, atau eval rutin,
  tulis dan tautkan. Kalau belum, tulis apa yang sedang dibangun, jangan diklaim sudah ada.

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
