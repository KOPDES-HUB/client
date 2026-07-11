# SIMPUL Merah Putih — Design Brief & Google Stitch Prompts (Desktop/Web)

> Catatan: seluruh layar didesain sebagai **web desktop layout** (bukan mobile app). Halaman tetap responsive secara teknis di kode nanti, tapi mockup Stitch difokuskan ke tampilan browser desktop (viewport ~1440px) dengan sidebar/topbar khas web app. Satu-satunya elemen yang secara konsep butuh kamera HP adalah proses scan QR absensi RAT — untuk itu digambarkan sebagai **halaman web yang diakses lewat browser HP**, bukan mockup aplikasi native mobile.

## 1. Design System

### 1.1 Color Palette (pakai custom class `mint-leaf` dari global.css)

Gunakan 4 warna inti agar tetap clean:

| Role               | Token           | Hex       | Pemakaian                                                   |
| ------------------ | --------------- | --------- | ----------------------------------------------------------- |
| Primary            | `mint-leaf-600` | `#488451` | Tombol utama, ikon aktif, link                              |
| Primary Dark       | `mint-leaf-900` | `#122114` | Sidebar/navbar dark, teks heading di atas background terang |
| Surface/Background | `mint-leaf-50`  | `#eff6f0` | Background halaman, section terang                          |
| Accent/Border      | `mint-leaf-200` | `#bddbc2` | Border card, badge, divider, hover state                    |

Netral pendukung (bukan bagian dari 4 warna inti): putih `#ffffff` untuk card surface, abu `#4b5563`/`#9ca3af` untuk teks sekunder.

**Aturan pemakaian:**

- CTA utama (submit, vote, scan) → `mint-leaf-600`, hover → `mint-leaf-700`.
- Status "berhasil/aktif/terverifikasi" → `mint-leaf-500`/`mint-leaf-600`.
- Background utama app → `mint-leaf-50`, card di atasnya → putih dengan border `mint-leaf-200`.
- Sidebar navigasi & KTA digital card → gradient `mint-leaf-900` → `mint-leaf-700` agar terasa premium.

### 1.2 Tipografi

- Font sans modern (mis. `Inter` atau `Plus Jakarta Sans`).
- Heading: bold, tight tracking, hero 40–56px, section title 24–32px (skala lebih besar dari mobile karena kanvas web lebih luas).
- Body: 15–16px, line-height 1.6.

### 1.3 Layout & Komponen (Web-first)

- Struktur utama: **fixed left sidebar** (240–280px, dark `mint-leaf-900`) + **main content area** dengan max-width container (mis. 1200–1280px, center-aligned) di atas background `mint-leaf-50`.
- Topbar/header di atas main content: judul halaman, breadcrumb, search bar, avatar profil di kanan.
- Grid layout multi-kolom untuk dashboard (mis. grid 3–4 kolom untuk stat cards, grid 2 kolom untuk konten+sidebar detail).
- Card: `rounded-2xl`, shadow lembut (`shadow-md`), padding generous, border tipis `mint-leaf-200`.
- Tabel data (untuk halaman admin & riwayat) full-width dengan sticky header, hover row highlight.
- Modal/dialog center-screen (bukan bottom-sheet mobile) dengan overlay gelap transparan.
- Style clean modern, whitespace luas, hindari clutter.

### 1.4 Motion & Scroll Animation (catatan untuk developer, referensi visual di Stitch)

- **Lenis**: smooth scroll di seluruh halaman panjang (landing, dashboard, riwayat transaksi).
- **GSAP ScrollTrigger**: section fitur, statistik, dan chart fade-up + stagger saat masuk viewport saat scroll desktop.
- **Framer Motion**: hover elevation pada card, transisi crossfade antar tab, modal fade+scale-in (bukan slide-up ala mobile), sidebar item active-indicator sliding underline.
- Untuk mockup statis di Stitch, tunjukkan _state_ animasi sebagai referensi: card dengan efek elevated/hover, progress bar gradient fill, grafik dengan highlight pada data point aktif.

---

## 2. Struktur Layar (Screen List) — semua Desktop/Web

**Alur Anggota (web dashboard, bukan mobile app):**

1. Landing/Onboarding
2. Registrasi & Upload Dokumen KTA
3. Status Pengajuan KTA (Pending/Approved)
4. Dashboard Anggota (home)
5. KTA Digital (kartu + QR)
6. LMS — Daftar Kursus
7. LMS — Detail Modul & Kuis
8. Simpanan — Ringkasan (Pokok/Wajib/Sukarela + SHU)
9. Simpanan — Riwayat Transaksi
10. E-Voting — Daftar Polling
11. E-Voting — Detail & Konfirmasi Vote
12. E-Voting — Hasil Real-time
13. E-RAT — Detail Sesi & Agenda
14. E-RAT — Layar Proyektor (tampilkan QR besar)
15. E-RAT — Halaman Scan Absensi (dibuka via browser HP, tetap web page)
16. E-RAT — Konfirmasi Hadir + Akses Voting

**Alur Admin (desktop dashboard):** 17. Admin Dashboard — Overview (Governance + AI Co-Pilot) 18. Admin — CRUD Anggota/KTA (verifikasi) 19. Admin — CRUD LMS (kelola modul & kuis) 20. Admin — CRUD Simpanan (input transaksi, parameter SHU) 21. Admin — CRUD E-Voting (buat sesi) 22. Admin — CRUD E-RAT (buat sesi, generate QR, lihat kuorum)

---

## 3. Master Prompt (App-level, untuk Google Stitch)

```
Design a modern, clean web application called "SIMPUL Merah Putih" — a
cooperative management platform for Indonesian village cooperatives (Koperasi
Desa Merah Putih). Design ALL screens as desktop web layouts (viewport ~1440px
wide), NOT as mobile app screens. Use a fixed left sidebar navigation (dark
background) plus a wide main content area with a centered max-width container,
top header bar with breadcrumb/search/profile avatar, and multi-column grid
layouts for dashboards. The app has two roles: Member (Anggota) and
Admin/Cooperative Staff (Pengurus), both using the same desktop web dashboard
style (sidebar + content), just with different navigation items and
permissions.

Visual style: clean, modern, minimal clutter, generous whitespace, soft
rounded cards (rounded-2xl), soft shadows, clear grid alignment. Use only this
4-color palette:
- Primary green: #488451
- Deep dark green: #122114
- Light surface background: #eff6f0
- Soft accent/border green: #bddbc2
(plus white surfaces and neutral gray text). Do not introduce other hues.

Typography: modern geometric sans-serif (Inter/Plus Jakarta Sans style), bold
tight headings, comfortable 15-16px body text, larger hero headings (40-56px)
suited for wide desktop canvases.

The app should feel premium and trustworthy (used for real financial/voting
decisions by village communities), not playful or childish. Include subtle
motion cues in the design (elevated hover cards, gradient progress bars,
glowing active states, sliding tab indicators) to hint at scroll and
micro-interaction animations that will be implemented with GSAP, Lenis
smooth-scroll, and Framer Motion.

Core member flow: user registers → submits KTA (digital membership card)
application → once approved, gains role "Anggota" and unlocks a web dashboard
with sidebar access to: LMS (training academy), Simpanan (Pokok/Wajib/Sukarela
savings + SHU profit share), E-Voting, and E-RAT (annual member meeting with
QR barcode attendance — a large QR is shown on a projector screen, and members
scan it by opening a lightweight web page on their phone browser's camera,
still styled as a web page, not a native app).
```

---

## 4. Prompt Per Layar (detail, siap paste ke Stitch satu per satu)

### Screen 1 — Landing/Onboarding (desktop web)

```
Desktop web landing page (1440px wide) for "SIMPUL Merah Putih" cooperative
platform. Full-width hero section with deep dark green (#122114) gradient
background, large bold white headline "Satu Kartu, Semua Layanan Koperasi"
left-aligned within a max-width container, short subtext paragraph, and a
row of two buttons: primary rounded button "Daftar Jadi Anggota" in #488451,
secondary outline button "Masuk". Right side of hero shows a large mockup
illustration of the digital membership card. Below hero, a 3-column feature
section on #eff6f0 background with icon + title + short description cards
for "KTA Digital", "E-Voting Transparan", "Belajar & Sertifikasi". Simple top
navbar with logo left, nav links center, "Masuk"/"Daftar" buttons right.
```

### Screen 2 — Registrasi & Upload Dokumen KTA (desktop web)

```
Desktop web registration page on #eff6f0 background, centered card container
(max-width ~640px) with a horizontal step indicator at top (1. Data Diri, 2.
Dokumen, 3. Review) using #488451 for active step, #bddbc2 for inactive.
Two-column form grid fields: Nama Lengkap, NIK, Alamat, Nomor HP — white
rounded input fields with soft green border on focus, labels above each
field. Below, a drag-and-drop upload area for KTP photo and selfie with
dashed border. Primary button "Lanjutkan" in #488451 bottom-right of the
card, "Kembali" text link bottom-left.
```

### Screen 3 — Status Pengajuan KTA (desktop web)

```
Desktop web status page, centered content card on #eff6f0 background with a
clock icon inside a soft green circle badge. Headline "Pengajuan Sedang
Diverifikasi", status pill "Pending" (#bddbc2 background, #122114 text).
Horizontal timeline with 3 steps: Diajukan (done, green check), Diverifikasi
Admin (in progress, pulsing dot), Aktif (pending, gray) laid out left to
right with connecting line. Small note text below. Outline button "Kembali
ke Beranda".
```

### Screen 4 — Dashboard Anggota / Home (desktop web)

```
Desktop web dashboard (1440px) with fixed left sidebar (dark #122114
background, white logo top, nav items with icons: Home, LMS, Simpanan,
E-Voting, E-RAT, Profil — active item has a #488451 highlight pill). Top
header bar with page title "Dashboard", search input, and user avatar with
name/status badge dropdown right. Main content: welcome banner card
"Halo, [Nama]" with a mini KTA preview (member number + "Anggota
Terverifikasi" badge) on a gradient #122114-#488451 background. Below, a
4-column grid of quick-access cards (LMS, Simpanan, E-Voting, E-RAT) each
white rounded card with #488451 icon and hover elevation. Two-column section
below: left card "Ringkasan Simpanan" with 3 stat tiles (Pokok, Wajib,
Sukarela) and gradient progress bars; right card "Voting Aktif" listing 1-2
compact voting rows with countdown chips.
```

### Screen 5 — KTA Digital (desktop web)

```
Desktop web page showing a large digital membership card (KTA) centered in
the main content area, card styled like a premium ID card at a wide
aspect-ratio (similar to a physical ID card but larger, ~600x360px), gradient
background from #122114 to #488451, rounded corners, subtle sheen/glow
effect. Card contains: member photo (circular), full name, member number,
cooperative name "Koperasi Desa Merah Putih", status badge pill "Anggota
Terverifikasi", and a white QR code block on the right side of the card.
Below the card, two side-by-side buttons "Perbesar QR" and "Bagikan KTA" plus
a small info note. Page framed within the standard sidebar + header layout.
```

### Screen 6 — LMS Daftar Kursus (desktop web)

```
Desktop web page "Smart Cooperative Academy" within sidebar layout. Page
header with title and subtitle, filter tabs (Semua/Sedang Berjalan/Selesai)
top-right. Main content: 3-column grid of course cards on #eff6f0 background
— each white rounded card with thumbnail/icon banner top, title (e.g. "Dasar
Pembukuan Koperasi"), short description, progress bar (gradient #bddbc2 to
#488451) showing % complete, badge chips "3 Modul" and "Kuis", hover state
shows elevated shadow.
```

### Screen 7 — LMS Detail Modul & Kuis (desktop web)

```
Desktop web course detail page, two-column layout: left column (main, ~70%
width) shows video/reading content area with a large thumbnail and play icon
overlay in #488451 circle, title and description below; right column (~30%
width, sticky) shows a lesson list as accordion rows with checkmark icons
(green when complete, gray outline when not) and overall progress bar at
top. Sticky "Mulai Kuis" button in #488451 at bottom of right column.
Separate quiz screen state: centered card with single question, 3
multiple-choice options as selectable pill buttons (selected = filled
#488451, unselected = white with #bddbc2 border), progress dots at top for 3
questions, "Lanjut" button bottom-right.
```

### Screen 8 — Simpanan Ringkasan (desktop web)

```
Desktop web page "Simpanan Saya" within sidebar layout. Top: 3-column grid of
summary cards for Simpanan Pokok, Simpanan Wajib, Simpanan Sukarela — each
white rounded card with icon, label, large bold balance number, and a small
sparkline/trend line in #488451. Below, a full-width highlighted SHU section:
dark green (#122114) card titled "Estimasi SHU Tahun Ini" with a large amount
in white text, short explanatory caption, info icon, and a "Lihat Riwayat
Transaksi" button aligned right.
```

### Screen 9 — Simpanan Riwayat Transaksi (desktop web)

```
Desktop web transaction history page. Top row: segmented tab control "Pokok"
/ "Wajib" / "Sukarela" (active tab filled #488451) plus a date-range filter
button and export button aligned right. Below, a full-width data table with
sticky header: columns Tanggal, Deskripsi, Jenis, Nominal (green for
deposit, dark neutral for withdrawal), Status. Alternating row hover
highlight in light #eff6f0. Pagination controls at bottom.
```

### Screen 10 — E-Voting Daftar Polling (desktop web)

```
Desktop web page "E-Voting" listing active polls in a 2-column card grid on
#eff6f0 background. Each poll as a white rounded card: title (e.g.
"Persetujuan Pengadaan Stok Beras Grosir BUMDes"), short description,
countdown chip "Berakhir 2 hari lagi" in soft green pill, and a horizontal
bar showing current Setuju/Tidak Setuju ratio in #488451 vs light gray, with
a "Lihat Detail" button. Below, a "Riwayat Voting" section as a compact table
with final result badges.
```

### Screen 11 — E-Voting Detail & Konfirmasi (desktop web)

```
Desktop web poll detail page, centered content max-width ~800px. Title and
full description at top. Two large side-by-side buttons "Setuju" (filled
#488451, white text) and "Tidak Setuju" (outlined #bddbc2 border, dark text).
On click, show a centered modal dialog with dark overlay background:
"Anda yakin memilih Setuju?" with Cancel/Confirm buttons, rounded modal,
soft shadow, fade+scale-in styling (not a mobile bottom sheet).
```

### Screen 12 — E-Voting Hasil Real-time (desktop web)

```
Desktop web results page with a two-column layout: left column shows a large
donut/bar chart in #488451 and #bddbc2 comparing Setuju vs Tidak Setuju
percentages; right column shows total votes count, quorum status badge, and
a small live pulsing green indicator dot labeled "Live", plus a short
participation breakdown list.
```

### Screen 13 — E-RAT Detail Sesi & Agenda (desktop web)

```
Desktop web page for annual meeting (RAT) session detail. Header card with
meeting title, date, location, and a wide quorum progress bar (e.g. "68/120
Hadir") in gradient green spanning full card width. Below, a numbered agenda
list as rounded card rows in the main column, with a right sidebar card
showing a prominent "Scan Absensi" button in #488451 (replaced by a green
checkmark badge "Anda Sudah Hadir" once scanned) and related documents list.
```

### Screen 14 — E-RAT Layar Proyektor (large display/TV, landscape)

```
Landscape large-screen display (for projector/TV) with full dark green
(#122114) background, centered large white card containing: meeting title,
a very large QR code (white background, dark modules) taking most of the
card, and below it a short alternate link text "atau buka: simpul.id/scan/
[kode]" plus a live counter "Anggota Hadir: 68" in a green pill badge.
Clean, high-contrast, readable from a distance, no sidebar/navbar since this
is a display-only screen.
```

### Screen 15 — Halaman Scan Absensi (web page opened via phone browser)

```
A responsive web page (shown here in a browser window frame, not a native
app UI) titled "Scan Absensi RAT", with a live camera viewfinder area
centered, a rounded square scan-frame guide in #488451 with corner brackets
overlaying the camera preview, and instruction text above the viewfinder:
"Arahkan kamera ke QR di layar rapat" on a semi-transparent dark bar. Simple
minimal header showing the SIMPUL logo and page title, no sidebar since this
is a lightweight standalone web page.
```

### Screen 16 — Konfirmasi Hadir + Akses Voting (desktop/web page)

```
Web page success state shown within a centered card (browser window frame),
large green checkmark icon in a circle badge (#488451), headline "Absensi
Berhasil!", subtext with meeting name and timestamp. Button below "Lanjut ke
Voting RAT" in #488451 leading to the RAT-specific voting list page.
```

### Screen 17 — Admin Dashboard Overview (desktop)

```
Desktop admin dashboard, fixed left sidebar (dark #122114 background) with
nav items: Overview, Anggota/KTA, LMS, Simpanan, E-Voting, E-RAT. Main
content area on #eff6f0 background with top header showing page title and
admin profile menu. Top row: 4-column grid of stat cards (Omzet Harian,
Total Profit, Total Anggota Aktif, Kuorum RAT Terakhir) in white rounded
cards with #488451 accent numbers. Below, a two-column row: line/bar chart
card "Tren Penjualan Bulanan" (left, ~60% width) and a table card "Evaluasi
KPI Pengurus" (right, ~40% width, columns: Nama, Absensi %, Task Completion
%). Full-width "AI Cooperative Co-Pilot" card at the bottom with a soft
gradient border, sparkle icon, and an auto-generated advice text suggestion.
```

### Screen 18 — Admin CRUD Anggota/KTA (desktop)

```
Desktop admin page "Manajemen Anggota" within sidebar layout. Top toolbar:
search bar, status filter dropdown (Pending/Aktif/Nonaktif), and "+ Tambah
Anggota" button in #488451 aligned right. Full-width data table listing
members: photo thumbnail, name, member number, status pill (colored per
state within palette), action icons (view/edit/verify/deactivate) in the
last column. Row hover state highlighted with light #eff6f0 background,
pagination at bottom.
```

### Screen 19 — Admin CRUD LMS (desktop)

```
Desktop admin page "Kelola LMS", two-column layout: left panel (~35% width)
lists course modules as cards with edit/delete icon buttons and a "+ Tambah
Modul" button in #488451 at top; right panel (~65% width) shows a form to
edit the selected module — title, description, video/text content upload
area, and a quiz builder section with repeatable question blocks (question
text + 3 answer options + correct-answer radio selector), "Simpan" button
bottom-right.
```

### Screen 20 — Admin CRUD Simpanan (desktop)

```
Desktop admin page "Kelola Simpanan" with top tabs: Pokok / Wajib / Sukarela
/ SHU Settings. Main content: full-width data table of transactions per
member with columns Nama Anggota, Jenis, Nominal, Tanggal, Status, Aksi
(edit/delete icons). "+ Input Transaksi" button top-right in #488451 opens a
centered modal form. Separate "SHU Settings" tab view shows a form card to
set SHU calculation parameters per closing period.
```

### Screen 21 — Admin CRUD E-Voting (desktop)

```
Desktop admin page "Kelola E-Voting", full-width list of poll sessions as
table rows with status badge (Draft/Aktif/Selesai), edit/delete icons, and a
"+ Buat Voting Baru" button top-right in #488451 opening a centered modal
form (judul, deskripsi, tanggal mulai/selesai, opsi jawaban). Clicking an
active session opens a two-column detail view: left shows session info,
right shows a live result chart and participation list.
```

### Screen 22 — Admin CRUD E-RAT (desktop)

```
Desktop admin page "Kelola E-RAT", full-width list/table of RAT sessions
with date, quorum target, status columns, and "+ Buat Sesi RAT" button
top-right in #488451 opening a form modal (judul, tanggal, lokasi, agenda
list builder, quorum target). Selecting a session opens a detail view with a
live quorum gauge card, "Generate/Regenerate QR" button, and a real-time
attendance table (Nama, Waktu Scan) below.
```

---

## 5. Catatan Pemakaian di Google Stitch

1. Paste **Master Prompt** dulu (bagian 3) sebagai konteks awal project di Stitch bila tools mendukung "project description"/system context — pastikan menegaskan "desktop web layout" agar Stitch tidak default ke mobile.
2. Generate satu-per-satu memakai prompt di bagian 4, urut dari flow anggota lalu admin, agar Stitch konsisten mengikuti gaya dari layar sebelumnya.
3. Jika Stitch menyediakan opsi upload style reference, unggah nilai hex palette di atas agar warna konsisten antar layar.
4. Setelah semua layar digenerate, cek konsistensi: warna hanya 4 token di atas, radius card konsisten, tipografi konsisten, dan pastikan tidak ada layar yang ter-render sebagai mobile app UI.
