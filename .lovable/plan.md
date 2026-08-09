# Cucumelon Landing Page Improvements

Prioritas perbaikan berdasarkan impact terbesar dengan effort terkecil.

## 1. Rarity badges with color coding

Update `NFTCard` dan `CollectionGrid` supaya rarity badge punya warna sendiri:
- Common = abu-abu
- Uncommon = hijau emerald
- Rare = biru
- Epic = ungu
- Legendary = emas/kuning

Ini langsung bikin grid koleksi terasa lebih "NFT-native" dan mudah dibaca.

## 2. Glitch headline effect on hero

Tambahkan efek glitch/flicker tipis pada headline "CUCUMELON" di `Hero.tsx`.
- Hanya CSS animation (tidak perlu library baru).
- Jangan sampai mengganggu readability.
- Memperkuat aesthetic pixel-art retro Web3.

## 3. Countdown timer for "Minting Soon"

Ganti badge "MINTING SOON" statis di `Hero.tsx` dengan countdown timer:
- Target tanggal ditulis di `src/lib/constants.ts`.
- Timer menampilkan hari, jam, menit, detik.
- Setelah waktu habis, teks berubah menjadi "MINT IS LIVE".
- Dibungkus dengan `ClientOnly` / `useHydrated` untuk menghindari hydration mismatch.

## 4. NFT lightbox / detail modal

Saat kartu NFT diklik, muncul modal/dialog besar:
- Gambar karakter pixel art dalam ukuran besar.
- Nama, rarity badge berwarna, dan ID.
- Tombol "View on OpenSea".
- Menggunakan shadcn Dialog yang sudah tersedia di project.

## 5. OG image & meta tags

Update `src/routes/index.tsx` head metadata:
- Title dan deskripsi unik untuk CUCUMELON.
- `og:image` dan `twitter:image` menggunakan hero character asset.
- `og:type`, `twitter:card`, canonical URL.

## Out of scope (bisa ditambahkan nanti)

- Email waitlist (membutuhkan backend/storage).
- Connect wallet button (membutuhkan integrasi wallet).
- Sound effects (menambah kompleksitas dan preferensi user).
- Custom cursor.

## Expected result

Landing page tetap one-page, terasa lebih hidup, lebih mirip brand Web3 NFT premium, dan lebih siap dibagikan di sosial media.
