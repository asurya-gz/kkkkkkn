-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Feb 2025 pada 11.32
-- Versi server: 8.0.34
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kknihsan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `batastanah`
--

CREATE TABLE `batastanah` (
  `id` int NOT NULL,
  `nomor_surat` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `kewarganegaraan` varchar(50) DEFAULT NULL,
  `agama` varchar(50) DEFAULT NULL,
  `pekerjaan` varchar(100) DEFAULT NULL,
  `tempat_tinggal` varchar(255) DEFAULT NULL,
  `surat_bukti_diri` varchar(255) DEFAULT NULL,
  `keperluan` text,
  `keterangan_lain_lain` text,
  `kepala_desa` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tujuan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `batastanah`
--

INSERT INTO `batastanah` (`id`, `nomor_surat`, `nama`, `tempat_lahir`, `tanggal_lahir`, `kewarganegaraan`, `agama`, `pekerjaan`, `tempat_tinggal`, `surat_bukti_diri`, `keperluan`, `keterangan_lain_lain`, `kepala_desa`, `created_at`, `updated_at`, `tujuan`) VALUES
(1, '590/414/VII/2022', 'John Doe', 'Jakarta', '1990-01-01', 'WNI', 'Islam', 'Engineer', 'Jl. Merdeka No. 10, Jakarta', 'KTP', 'Membuat Surat Batas Tanah', 'Tidak ada', 'Budi Santoso', '2025-02-08 11:23:34', '2025-02-08 11:23:34', NULL),
(3, '590/500/VII/2022', 'John Doe', 'Jakarta', '1990-01-01', 'WNI', 'Islam', 'Engineer', 'Jl. Merdeka No. 10, Jakarta', 'KTP', 'Membuat Surat Batas Tanah', 'Tidak ada', 'Budi Santoso', '2025-02-08 11:28:03', '2025-02-08 11:28:03', NULL),
(6, '590/501/II/2025', 'Agung Surya Permana', 'Pandeglang', '2025-01-28', 'Indonesia', 'Islam', 'PNS', 'zdvsdv', 'ashcbhjavcjhsvchjedce', 'asvesf', 'svrr', 'shbcjsd', '2025-02-08 13:41:16', '2025-02-08 13:41:16', 'dsv jsdhjcv');

-- --------------------------------------------------------

--
-- Struktur dari tabel `belummenikah`
--

CREATE TABLE `belummenikah` (
  `id` int NOT NULL,
  `nomor_surat` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tempat_lahir` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `kewarganegaraan` varchar(50) NOT NULL,
  `agama` varchar(50) NOT NULL,
  `pekerjaan` varchar(100) NOT NULL,
  `nomor_hp` varchar(20) DEFAULT NULL,
  `alamat` text NOT NULL,
  `keperluan` text NOT NULL,
  `kepala_desa` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `belummenikah`
--

INSERT INTO `belummenikah` (`id`, `nomor_surat`, `nama`, `tempat_lahir`, `tanggal_lahir`, `kewarganegaraan`, `agama`, `pekerjaan`, `nomor_hp`, `alamat`, `keperluan`, `kepala_desa`, `created_at`) VALUES
(2, '474.2/001/2025', 'Agung Surya', 'Semarang', '1995-08-15', 'Indonesia', 'Islam', 'Software Developer', '081234567890', 'Jl. Diponegoro No. 10, Semarang', 'Pengajuan KTP', 'Budi Santoso', '2025-02-08 18:47:30'),
(3, '474.2/003/2025', 'Agung Surya', 'Semarang', '1995-08-15', 'Indonesia', 'Islam', 'Software Developer', '081234567890', 'Jl. Diponegoro No. 10, Semarang', 'Pengajuan KTP', 'Budi Santoso', '2025-02-08 18:47:36'),
(4, '474.2/002/2025', 'Agung Surya', 'Semarang', '1995-08-15', 'Indonesia', 'Islam', 'Software Developer', '081234567890', 'Jl. Diponegoro No. 10, Semarang', 'Pengajuan KTP', 'Budi Santoso', '2025-02-08 18:47:40'),
(5, '474.2/004/2025', 'Agung Surya Permana', 'Pandeglang', '2025-01-28', 'Indonesia', 'Islam', 'PNS', '085776130245', 'KP. SODONG PINTU RT 005 RW 003', 'sdvsdvd', 'savsvd', '2025-02-08 18:57:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `domisili`
--

CREATE TABLE `domisili` (
  `id` int NOT NULL,
  `nomor_surat` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `bukti_diri` varchar(100) DEFAULT NULL,
  `agama` varchar(50) DEFAULT NULL,
  `pekerjaan` varchar(100) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `domisili` varchar(255) DEFAULT NULL,
  `kepala_desa` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `domisili`
--

INSERT INTO `domisili` (`id`, `nomor_surat`, `nama`, `tempat_lahir`, `tanggal_lahir`, `bukti_diri`, `agama`, `pekerjaan`, `alamat`, `domisili`, `kepala_desa`, `created_at`, `updated_at`) VALUES
(3, '474.4/001/2024', 'Siti Rahmawati', 'Yogyakarta', '1992-05-20', 'KTP', 'Islam', 'Guru', 'Jl. Merpati No. 10, Yogyakarta', 'Jl. Anggrek No. 5, Sleman', 'Agus Wijaya', '2025-02-08 15:59:30', '2025-02-08 15:59:30'),
(4, '474.4/002/2024', 'Siti Rahmawati', 'Yogyakarta', '1992-05-20', 'KTP', 'Islam', 'Guru', 'Jl. Merpati No. 10, Yogyakarta', 'Jl. Anggrek No. 5, Sleman', 'Agus Wijaya', '2025-02-08 15:59:37', '2025-02-08 15:59:37'),
(5, '474.4/003/2025', 'Agung Surya Permana', 'Pandeglang', '2025-01-27', 'dsvsdv', 'Islam', 'PNS', 'saketi', 'sddfbv', 'fbdfb', '2025-02-08 16:12:09', '2025-02-08 16:12:09'),
(6, '474.4/004/2025', 'Agung Surya Permana', 'Pandeglang', '2025-01-26', 'dsvsdv', 'Islam', 'PNS', 'sadfsev', 'sfdbdfb', 'fbdfb', '2025-02-08 16:12:23', '2025-02-08 16:12:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `domisiliusaha`
--

CREATE TABLE `domisiliusaha` (
  `id` int NOT NULL,
  `nomor_surat` varchar(50) NOT NULL,
  `nama_perusahaan` varchar(150) NOT NULL,
  `alamat_perusahaan` text,
  `kepala_desa` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `domisiliusaha`
--

INSERT INTO `domisiliusaha` (`id`, `nomor_surat`, `nama_perusahaan`, `alamat_perusahaan`, `kepala_desa`, `created_at`, `updated_at`) VALUES
(6, '474/001/II/2025', 'PT Sukses Makmur', 'Jl. Pemuda No. 20, Semarang', 'Budi Santoso', '2025-02-08 14:41:21', '2025-02-08 14:41:21'),
(7, '474/002/II/2025', 'PT Sukses Makmur', 'Jl. Pemuda No. 20, Semarang', 'Budi Santoso', '2025-02-08 14:41:24', '2025-02-08 14:41:24'),
(8, '474/003/II/2025', 'google', 'KP. SODONG PINTU RT 005 RW 003', 'shbcjsd', '2025-02-08 14:55:28', '2025-02-08 14:55:28'),
(9, '474/004/II/2025', 'google', 'KP. SODONG PINTU RT 005 RW 003', 'shbcjsd', '2025-02-08 15:06:29', '2025-02-08 15:06:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `keteranganusaha`
--

CREATE TABLE `keteranganusaha` (
  `id` int NOT NULL,
  `nomor_surat` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tempat_lahir` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `pekerjaan` varchar(100) NOT NULL,
  `tempat_tinggal` varchar(255) NOT NULL,
  `surat_bukti_diri` varchar(100) NOT NULL,
  `jenis_usaha` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `lama_usaha` varchar(50) NOT NULL,
  `alamat_usaha` varchar(255) NOT NULL,
  `kepala_desa` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `keteranganusaha`
--

INSERT INTO `keteranganusaha` (`id`, `nomor_surat`, `nama`, `tempat_lahir`, `tanggal_lahir`, `pekerjaan`, `tempat_tinggal`, `surat_bukti_diri`, `jenis_usaha`, `status`, `lama_usaha`, `alamat_usaha`, `kepala_desa`, `created_at`, `updated_at`) VALUES
(2, '581/011/2025', 'John Doe', 'Jakarta', '1990-01-01', 'Wiraswasta', 'Jl. Merdeka No. 123', 'KTP', 'Toko Kelontong', 'Aktif', '5 tahun', 'Jl. Sudirman No. 456', 'Budi Santoso', '2025-02-08 13:17:32', '2025-02-08 13:17:32'),
(3, '581/012/2025', 'Agung Surya Permana', 'Pandeglang', '2025-01-28', 'PNS', 'sacdc', 'ashcbhjavcjhsvchjedce', 'sdvsfvb', 'sdvsfdv', '2vsf', 'saketi', 'shbcjsd', '2025-02-08 13:41:52', '2025-02-08 13:41:52'),
(4, '581/013/2025', 'Agung Surya Permana', 'Pandeglang', '2025-02-10', 'PNS', 'xdvdsv', 'ashcbhjavcjhsvchjedce', 'sdvsfvb', 'sdvsfdv', '2vsf', 'zsvdsdv', 'shbcjsd', '2025-02-08 13:42:32', '2025-02-08 13:42:32'),
(5, '581/014/2025', 'Agung Surya Permana', 'Pandeglang', '2025-01-27', 'PNS', 'asfa', 'ashcbhjavcjhsvchjedce', 'sdvsfvb', 'sdvsfdv', '2vsf', 'savd', 'shbcjsd', '2025-02-08 13:45:42', '2025-02-08 13:45:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `skck`
--

CREATE TABLE `skck` (
  `id` int NOT NULL,
  `nomor_surat` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `pekerjaan` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `nomor_ktp` varchar(20) NOT NULL,
  `nomor_kk` varchar(20) NOT NULL,
  `nomor_hp` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `keperluan` varchar(255) NOT NULL,
  `tujuan` varchar(255) NOT NULL,
  `masa_berlaku` varchar(50) NOT NULL,
  `keterangan` text,
  `kepala_desa` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `skck`
--

INSERT INTO `skck` (`id`, `nomor_surat`, `nama`, `tempat_lahir`, `tanggal_lahir`, `pekerjaan`, `alamat`, `nomor_ktp`, `nomor_kk`, `nomor_hp`, `email`, `keperluan`, `tujuan`, `masa_berlaku`, `keterangan`, `kepala_desa`, `created_at`, `updated_at`) VALUES
(4, '331/001/2025', 'Agung Surya Permana', 'Pandeglang', '2025-02-03', 'PNS', 'zvsadv', '00000000098989789', '20293993', '085776130223', 'agungsuryapermana@students.undip.ac.id', 'asva', 'savdd', '9dbjdhbjdhbvjhsdbvc', 'sdvsd', 'mnsbcjhas', '2025-02-08 19:38:45', '2025-02-08 19:38:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `suratcutikerja`
--

CREATE TABLE `suratcutikerja` (
  `id` int NOT NULL,
  `no_surat` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempat_lahir` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `kewarganegaraan` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Indonesia',
  `agama` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Islam',
  `pekerjaan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_perusahaan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_induk` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bagian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `surat_bukti` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keperluan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `kepala_desa` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `suratcutikerja`
--

INSERT INTO `suratcutikerja` (`id`, `no_surat`, `nama`, `tempat_lahir`, `tanggal_lahir`, `kewarganegaraan`, `agama`, `pekerjaan`, `nama_perusahaan`, `nomor_induk`, `bagian`, `alamat`, `surat_bukti`, `keperluan`, `kepala_desa`, `created_at`, `updated_at`) VALUES
(14, '850/001/2025', 'Agung Surya Permana', 'Pandeglang', '2025-01-29', 'Indonesia', 'Islam', 'PNS', 'google', '231234253454656', 'dvdfdbfgbgb', 'KP. SODONG PINTU RT 005 RW 003', 'KTP - 343254353544566', 'zscdsc', 'dfdbfgbdefbd', '2025-02-08 13:40:43', '2025-02-08 13:40:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(2, 'John Doe', 'admin@example.com', '$2a$10$LSeLTGLuOhhy4nd4tJd3huvNUdYuA6Y2YKXTVoG//f65inlzAKDBq', 'admin', '2025-02-02 02:26:30', '2025-02-02 12:49:47'),
(4, 'agungkirim', 'henri@gmail.com', '$2a$10$zSNqow.SjWEEQxmVa40nPek3wiOcGzyj5VV09z9B4wUWaVlCZivPm', 'staff', '2025-02-03 11:38:52', '2025-02-03 11:38:52'),
(5, 'agungk', 'agungkdp208@gmail.com', '$2a$10$OR7l53hsMpkll/vVNPoZpOnMefHpKQKDKXxgkCklQbpQDaBtNYwwm', 'staff', '2025-02-03 11:40:31', '2025-02-03 11:40:31'),
(6, 'dbdhcd', 'agungsuryapermana@students.undip.ac.id', '$2a$10$TfCfmhNP/INXsmY/tA4h8OGv3tYXhgF/KN6tyLIoOX6IQyDpVOpru', 'staff', '2025-02-03 11:43:03', '2025-02-03 11:43:03'),
(7, 'agungkirim', 'rianafadilah@students.undip.ac.id', '$2a$10$IEKixjukKgrhRe5V5UO26u5C1DsmeEsKyrEW1aN7nHdSZwv2iV2ma', 'staff', '2025-02-03 11:43:21', '2025-02-03 11:43:21'),
(8, 'kumaha', 'agungriri8@gmail.com', '$2a$10$8EhBxYLsV6q7WLwetBsbWuPXa.NeDfKgfFt8DHaoxgWRBmot4vqmG', 'staff', '2025-02-03 11:47:51', '2025-02-03 11:47:51'),
(9, 'agungkdp208@gmail.com', 'jnnnnndoe@example.com', '$2a$10$mZVesPx095mNpG.Stj00VeoXkc8d2id9bd1Axm05u6PB3RwpELIBa', 'staff', '2025-02-03 11:58:39', '2025-02-03 11:58:39'),
(10, 'cscswc', 'kateguhan@gail.com', '$2a$10$uWz0kceNMFpsN9asBbs2LeXXRaVWBocGzRMY2dmsOEYem1dSn1rP.', 'staff', '2025-02-03 12:44:53', '2025-02-03 12:44:53');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `batastanah`
--
ALTER TABLE `batastanah`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `belummenikah`
--
ALTER TABLE `belummenikah`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `domisili`
--
ALTER TABLE `domisili`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `domisiliusaha`
--
ALTER TABLE `domisiliusaha`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `keteranganusaha`
--
ALTER TABLE `keteranganusaha`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nomor_surat` (`nomor_surat`);

--
-- Indeks untuk tabel `skck`
--
ALTER TABLE `skck`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `suratcutikerja`
--
ALTER TABLE `suratcutikerja`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_no_surat` (`no_surat`),
  ADD KEY `idx_nama` (`nama`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `batastanah`
--
ALTER TABLE `batastanah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `belummenikah`
--
ALTER TABLE `belummenikah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `domisili`
--
ALTER TABLE `domisili`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `domisiliusaha`
--
ALTER TABLE `domisiliusaha`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `keteranganusaha`
--
ALTER TABLE `keteranganusaha`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `skck`
--
ALTER TABLE `skck`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `suratcutikerja`
--
ALTER TABLE `suratcutikerja`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
