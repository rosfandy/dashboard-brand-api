# Brand Dashboard API

REST API backend untuk aplikasi Brand Dashboard. Dibangun menggunakan Express, TypeScript, Prisma ORM, dan PostgreSQL. Dilengkapi fitur web scraping menggunakan Puppeteer dan Cheerio.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express v5
- **ORM**: Prisma v7 (dengan PostgreSQL adapter)
- **Database**: PostgreSQL
- **Scraping**: Puppeteer, Cheerio
- **Logging**: Morgan

## Project Structure

```
backend/
├── config/
│   └── prisma.ts               # Inisialisasi Prisma client
├── controller/
│   ├── category.controller.ts  # Handler endpoint kategori
│   ├── product.controller.ts   # Handler endpoint produk
│   └── scrape.controller.ts    # Handler endpoint scraping
├── routes/
│   ├── routes.ts               # Router utama (menggabungkan semua route)
│   ├── category.route.ts       # Route /category
│   ├── product.route.ts        # Route /product
│   ├── scrape.route.ts         # Route /scrape
│   └── hello.route.ts          # Route /hello (health check)
├── service/
│   ├── category.service.ts     # Logika bisnis kategori
│   ├── product.service.ts      # Logika bisnis produk
│   └── scrape.service.ts       # Logika bisnis scraping
├── prisma/
│   ├── schema/
│   │   ├── schema.prisma       # Konfigurasi datasource & generator Prisma
│   │   ├── category.prisma     # Definisi model Category
│   │   └── product.prisma      # Definisi model Product
│   └── migrations/             # File migrasi database (auto-generated)
├── generated/
│   └── prisma/                 # Tipe Prisma client (auto-generated)
├── prisma.config.ts            # Konfigurasi path schema Prisma
├── index.ts                    # Entry point aplikasi
├── tsconfig.json
├── package.json
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Database PostgreSQL

### Installation

1. Install semua dependensi:
   ```bash
   npm install
   ```

2. Salin file konfigurasi environment dan sesuaikan isinya:
   ```bash
   cp .env.example .env
   ```

3. Jalankan migrasi database:
   ```bash
   npx prisma migrate dev
   ```

4. Jalankan server development:
   ```bash
   npm run dev
   ```

### Scripts

| Script | Keterangan |
|--------|------------|
| `npm run dev` | Menjalankan server development dengan ts-node |
| `npm run build` | Mengkompilasi TypeScript ke folder `dist/` |
| `npm start` | Menjalankan hasil kompilasi |

## API Endpoints

### Category

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/category` | Ambil semua kategori |
| `GET` | `/api/category/:id` | Ambil kategori berdasarkan ID |

### Product

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/product` | Ambil semua produk |
| `GET` | `/api/product?categoryId=1` | Ambil produk berdasarkan kategori |
| `GET` | `/api/product/:id` | Ambil produk berdasarkan ID |

### Scraping

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET` | `/api/scrape/category` | Scrape & simpan semua kategori |
| `GET` | `/api/scrape/category/:category/product` | Scrape & simpan produk berdasarkan slug kategori |
