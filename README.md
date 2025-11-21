## Soal Test

1. Jelaskan apa itu REST API? REST (Representational State Transfer) API adalah sebuah Application
   Programming interface yang memiliki serangkaian aturan yang digunakan untuk menjembatani komunikasi antar aplikasi menggunakan methode HTTP

2. Apa itu CORS dan bagaimana cara menanganinya di backend?
   CORS (Cross Origin Resource Sharing) adalah mekanisme keamanan berbasis HTTP yang dapat mengatur jalannya akses sumber daya website (API, Gambar, Media, Text dll)

   dalam Backend, CORS dapat digunakan di dalam middleware utama aplikasi

   Ketika suatu resource atau API diakses oleh user, mekanisme cors dapat dipanggil untuk mengecek apakah sesuai dengan settingan cors yang ada di backend, jika tidak sesuai maka resource dari backend tidak dapat dikirim ke client

   contoh: API Google membuat settingan cors -> Allow CORS Origin = google.com, jika ada browser lain yang mengakses API Google dengan domain facebook.com maka API tidak dapat diteruskan ke client facebook.com

   Cors tidak hanya mengatur allow cors origin, cors juga mengatur http method, resource apa yang dapat diakses, dan masih banyak lagi

3. Jelaskan perbedaan antara SQL dan NoSQL database?
   SQL (Structured Query Language) adalah Database model relasional yang memiliki struktur table yang terstruktur, rigid berupa baris dan kolom
   bahasa SQL: MySQL, PostgreSQL, Oracle, SQL Server

   Sedangkan NoSQL database adalah database yang menggunakan model non relasional yang lebih fleksibel seperti dokumen, grafik, time series, key value dan lain-lain

4. Apa yang anda ketahui tentang middleware?
   Middleware adalah sebuah API yang menjembatani request aplikasi, sebelum suatu resource diteruskan ke layer logic utama, middleware dapat digunakan untuk melakukan tugas tertentu

# Backend

Tech Stack: Express.js, PostgreSQL

## Cara Menjalankan Server

1. **Install dependencies**  
   Pastikan Anda berada di direktori proyek, lalu jalankan:

   ```
   npm install
   ```

2. **Inisialisasi/migrasi database dengan Prisma**  
   Jalankan migrasi supaya tabel terbentuk di database:

   ```
   npx prisma migrate dev
   ```

   atau jika ingin hanya meng-generate Prisma Client:

   ```
   npx prisma generate
   ```

3. **Jalankan server**  
   Setelah semua dependency terpasang dan database siap, jalankan server dengan:
   ```
   npm run dev
   ```

Pastikan Anda sudah mengatur file `.env` sesuai setting database Anda sebelum menjalankan migrate atau server.

# Frontend

Tech Stack: React, Vite, TanStack Router, TanStack Query, Tailwind CSS, TypeScript

## Cara Menjalankan Frontend

1. **Install dependencies**  
   Pastikan Anda berada di direktori `client`, lalu jalankan:

   ```
   cd client
   npm install
   ```

2. **Generate API Client (Opsional)**  
   Jika backend sudah berjalan dan Anda ingin meng-generate ulang API client dari OpenAPI spec:

   ```
   npm run api
   ```

   Perintah ini akan mengambil OpenAPI spec dari `http://localhost:4000/docs-json` dan meng-generate TypeScript client menggunakan Orval.

3. **Jalankan development server**  
   Setelah semua dependency terpasang, jalankan development server dengan:

   ```
   npm run dev
   ```

   Server akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan).
