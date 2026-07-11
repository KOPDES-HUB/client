# KOPDESHUB — Client (Frontend)

Frontend web **SIMPUL Merah Putih**, platform digital tata kelola koperasi desa. Aplikasi ini menyediakan antarmuka untuk anggota, admin koperasi, dan kader — mencakup KTA digital, simpanan, e-voting, LMS, E-RAT, transaksi, dan fitur lainnya.

## Tech Stack

| Layer | Teknologi |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) + TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Komponen UI | [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| HTTP Client | [Axios](https://axios-http.com) (cookie-based auth) |
| State Management | [Zustand](https://zustand.docs.pmnd.rs) |
| Peta | [Leaflet](https://leafletjs.com) + [react-leaflet](https://react-leaflet.js.org) |
| Chart | [Recharts](https://recharts.org) |
| Animasi | [Framer Motion](https://www.framer.com/motion), [GSAP](https://gsap.com), [Lenis](https://lenis.darkroom.engineering) |
| Tema | [next-themes](https://github.com/pacocoursey/next-themes) (dark/light mode) |

## Arsitektur

```
Browser (localhost:3000)
        │
        ▼
┌─────────────────────────────────────┐
│           Next.js App Router        │
│  ┌─────────┬──────────┬───────────┐ │
│  │  Pages  │Components│   Hooks   │ │
│  │ (app/)  │(components/)│(hooks/)│ │
│  └────┬────┴────┬─────┴─────┬─────┘ │
│       │         │           │       │
│       ▼         ▼           ▼       │
│   Zustand   TanStack     Axios     │
│  (auth)     Query        (api)     │
└──────────────────┬──────────────────┘
                   │ HTTP + cookies
                   ▼
         Backend API (server/)
```

### Struktur Direktori

```
client/
├── app/                  # Routing & halaman (App Router)
│   ├── admin/            # Panel admin koperasi
│   ├── dashboard/        # Dashboard anggota
│   ├── kader/            # Portal kader
│   ├── cari-koperasi/    # Pencarian koperasi (peta)
│   ├── login/            # Autentikasi
│   ├── register/         # Registrasi anggota
│   └── scan/             # Scan QR (absensi RAT)
├── components/           # Komponen UI reusable
│   ├── layout/           # Sidebar, TopBar
│   ├── kta/              # Kartu & QR KTA
│   ├── map/              # Peta koperasi
│   └── ui/               # Primitif shadcn/ui
├── hooks/                # Custom React hooks
├── lib/                  # Konfigurasi (axios, utils)
├── types/                # Definisi TypeScript
└── utils/                # Helper functions
```

### Peran Halaman Utama

| Route | Deskripsi |
| --- | --- |
| `/` | Landing page |
| `/login`, `/register` | Autentikasi & pendaftaran anggota |
| `/cari-koperasi` | Cari koperasi berdasarkan lokasi |
| `/dashboard/*` | Fitur anggota (KTA, simpanan, voting, LMS, RAT, dll.) |
| `/admin/*` | Manajemen koperasi (anggota, transaksi, inventaris, dll.) |
| `/kader/*` | Portal kader |
| `/scan` | Scan QR untuk absensi |

## Prasyarat

- **Node.js** 20+
- **npm** (atau pnpm/yarn)
- Backend API sudah berjalan (lihat [`server/README.md`](../server/README.md))

## Menjalankan Aplikasi

### 1. Instal dependensi

```bash
cd client
npm install
```

### 2. Konfigurasi environment

Buat file `.env.local` di folder `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3006
```

> `NEXT_PUBLIC_API_URL` harus mengarah ke URL backend API. Pastikan port dan origin backend (`ALLOWED_ORIGINS`) sudah sesuai.

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Build production

```bash
npm run build
npm start
```

## Scripts

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan dev server dengan hot reload |
| `npm run build` | Build aplikasi untuk production |
| `npm start` | Menjalankan build production |
| `npm run lint` | Cek kode dengan ESLint |

## Catatan Pengembangan

- Autentikasi menggunakan **HTTP-only cookies** yang dikirim otomatis oleh Axios (`withCredentials: true`).
- State user disimpan di **Zustand** (`app/stores/auth-store.ts`).
- Semua request API melalui instance Axios di `lib/axios.ts`.
- Desain mengikuti design system **mint-leaf** — detail ada di [`DESIGN.md`](./DESIGN.md).
