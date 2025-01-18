import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SISFO Desa | Sistem Informasi Desa Kateguhan",
  description:
    "Sistem Informasi Manajemen Administrasi Desa untuk pelayanan yang lebih baik",
  authors: [{ name: "Admin Desa" }],
  keywords: [
    "sistem informasi desa",
    "administrasi desa",
    "pelayanan desa",
    "surat menyurat desa",
  ],
  icons: {
    icon: [{ url: "/logo.png" }],
    apple: [{ url: "/logo.png" }],
    shortcut: ["/logo.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "SISFO Desa | Sistem Informasi Desa Kateguhan",
    description:
      "Sistem Informasi Manajemen Administrasi Desa untuk pelayanan yang lebih baik",
    siteName: "SISFO Desa",
    url: "https://kkncek.vercel.app/", // Sesuaikan dengan URL website Anda
    images: [
      {
        url: "/og-image.png", // Gambar untuk social media sharing
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
