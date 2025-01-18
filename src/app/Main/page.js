"use client";
import React, { useState } from "react";
import {
  Menu,
  ChevronDown,
  Home,
  Sprout,
  Users,
  GraduationCap,
  Heart,
  Building2,
  Wallet,
  PieChart,
  Users2,
  Building,
  FileText,
  MapPin,
  Trophy,
} from "lucide-react";

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: "DATA DESA", isHeader: true },
    { icon: <Sprout size={18} />, title: "Data Potensi Desa" },
    { icon: <Building2 size={18} />, title: "Data Kemiskinan" },
    { icon: <GraduationCap size={18} />, title: "Data Pendidikan" },
    { icon: <Heart size={18} />, title: "Data Kesehatan" },
    { icon: <Users size={18} />, title: "Data Kependudukan" },
    { icon: <Building size={18} />, title: "Data Pembangunan Desa" },
    {
      icon: <Building2 size={18} />,
      title: "Data Pembangunan Kawasan Pedesaan",
    },
    { icon: <Wallet size={18} />, title: "Data Keuangan" },
    { icon: <PieChart size={18} />, title: "Data Ekonomi" },
    { icon: <Users2 size={18} />, title: "Data Sosial Budaya" },
    { icon: <Building2 size={18} />, title: "Data Pemerintahan Desa" },
    { icon: <FileText size={18} />, title: "Data Lain-lain" },
    { title: "FORMULIR INPUT", isHeader: true },
    { icon: <FileText size={18} />, title: "Profil desa" },
    { icon: <MapPin size={18} />, title: "Batas wilayah" },
    { icon: <Trophy size={18} />, title: "Prestasi Desa" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src="/api/placeholder/40/40"
              alt="Logo"
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                Sistem Informasi Desa
              </h1>
              <p className="text-sm text-gray-600">Kabupaten Sukoharjo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              2025
            </span>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
              <span>Keluarkan</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-sm w-64 min-h-[calc(100vh-64px)] transition-all duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <Home size={20} />
              <span className="font-medium">Dashboard</span>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item, index) =>
                item.isHeader ? (
                  <div
                    key={index}
                    className="text-xs font-semibold text-gray-400 pt-4 pb-2"
                  >
                    {item.title}
                  </div>
                ) : (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-2 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {item.hasSubmenu && (
                      <ChevronDown size={16} className="ml-auto" />
                    )}
                  </a>
                )
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              DASHBOARD INFOGRAFIK TAHUN 2025
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Data Cards */}
            {[
              {
                icon: <Sprout className="w-8 h-8 text-red-500" />,
                title: "Data Potensi Desa",
              },
              {
                icon: <Building2 className="w-8 h-8 text-red-500" />,
                title: "Data Kemiskinan",
              },
              {
                icon: <GraduationCap className="w-8 h-8 text-red-500" />,
                title: "Data Pendidikan",
              },
              {
                icon: <Heart className="w-8 h-8 text-red-500" />,
                title: "Data Kesehatan",
              },
              {
                icon: <Users className="w-8 h-8 text-red-500" />,
                title: "Data Kependudukan",
              },
              {
                icon: <Wallet className="w-8 h-8 text-red-500" />,
                title: "Data Keuangan",
              },
              {
                icon: <PieChart className="w-8 h-8 text-red-500" />,
                title: "Data Ekonomi",
              },
              {
                icon: <Users2 className="w-8 h-8 text-red-500" />,
                title: "Data Sosial Budaya",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-sm font-medium text-gray-800">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
