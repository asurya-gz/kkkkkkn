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
  FileCheck,
  UserCheck,
  Truck,
  Home as HomeIcon,
  Briefcase,
  Baby,
  UserMinus,
  User,
  Lock,
  LogOut,
  History,
  Settings,
} from "lucide-react";

import Dashboard from "./page/Dashboard/page";
import PotensiDesa from "./page/PotensiDesa/page";

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");

  const menuItems = [
    { title: "KEPENDUDUKAN", isHeader: true },
    {
      icon: <Users2 size={18} />,
      title: "Manajemen Penduduk",
      id: "manajemen-penduduk",
    },
    { title: "ADMINISTRASI SURAT", isHeader: true },
    {
      icon: <History size={18} />,
      title: "Riwayat Pembuatan Surat",
      id: "riwayat-surat",
    },
    { title: "LAYANAN SURAT", isHeader: true },
    {
      icon: <FileCheck size={18} />,
      title: "Surat Keterangan Miskin",
      id: "surat-miskin",
    },
    {
      icon: <UserCheck size={18} />,
      title: "Surat Keterangan Domisili",
      id: "surat-domisili",
    },
    {
      icon: <Truck size={18} />,
      title: "Surat Izin Usaha",
      id: "surat-usaha",
    },
    {
      icon: <HomeIcon size={18} />,
      title: "Surat Kepemilikan Tanah",
      id: "surat-tanah",
    },
    {
      icon: <Briefcase size={18} />,
      title: "Surat Keterangan Kerja",
      id: "surat-kerja",
    },
    {
      icon: <Baby size={18} />,
      title: "Surat Keterangan Kelahiran",
      id: "surat-kelahiran",
    },
    {
      icon: <UserMinus size={18} />,
      title: "Surat Keterangan Kematian",
      id: "surat-kematian",
    },
    { title: "PENGATURAN", isHeader: true },
    {
      icon: <Settings size={18} />,
      title: "Manajemen Akun",
      id: "manajemen-akun",
    },
    { title: "AKUN", isHeader: true },
    { icon: <User size={18} />, title: "Profil", id: "profil" },
    { icon: <Lock size={18} />, title: "Ganti Password", id: "ganti-password" },
    { icon: <LogOut size={18} />, title: "Keluar", id: "keluar" },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <Dashboard />;
      case "surat-miskin":
        return <PotensiDesa />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Fixed Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                Sistem Informasi Desa Kateguhan
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

      {/* Main container below fixed header */}
      <div className="flex pt-16 h-full bg-gray-100">
        {/* Fixed Sidebar */}
        <aside
          className={`bg-white shadow-sm w-64 fixed left-0 top-16 bottom-0 overflow-y-auto transition-all duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          <div className="p-4">
            <button
              onClick={() => setActiveContent("dashboard")}
              className={`flex items-center gap-2 text-blue-600 mb-4 w-full ${
                activeContent === "dashboard" ? "font-medium" : ""
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>
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
                  <button
                    key={index}
                    onClick={() => setActiveContent(item.id)}
                    className={`flex items-center gap-2 px-2 py-2 text-sm rounded-lg w-full ${
                      activeContent === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {item.hasSubmenu && (
                      <ChevronDown size={16} className="ml-auto" />
                    )}
                  </button>
                )
              )}
            </nav>
          </div>
        </aside>

        {/* Scrollable Main Content */}
        <main
          className={`flex-1 p-6 overflow-y-auto ml-64 bg-gray-100 ${
            !isOpen ? "ml-0" : ""
          }`}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
