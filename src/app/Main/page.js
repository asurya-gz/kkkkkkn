"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  ChevronDown,
  ChevronRight,
  Home,
  FileCheck,
  Home as HomeIcon,
  Baby,
  UserMinus,
  Lock,
  LogOut,
  Settings,
  FileText,
  UserPlus,
  Building,
  Heart,
  FileSignature,
  Globe,
} from "lucide-react";

import Dashboard from "./page/Dashboard/page";
import GantiPassword from "./page/GantiPassword/page";
import ManajemenAkun from "./page/ManajemenAkun/page";
import SuratCutiKerja from "./page/SuratCutiKerka/page";
import SuratBatasTanah from "./page/SuratBatasTanah/page";
import SuratKeteranganUsaha from "./page/SuratKeteranganUsaha/page";
import SuratKeteranganDomisiliUsaha from "./page/DomisiliUsaha/page";
import SuratDomisili from "./page/Domisili/page";
import SuratBelumMenikah from "./page/BelumMenikah/page";
import PengantarSkck from "./page/Skck/page";

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || !role) {
      window.location.href = "/Keluar";
    } else {
      setIsLoading(false);
    }
  }, []);

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const menuItems = [
    { title: "LAYANAN SURAT", isHeader: true },
    {
      icon: <FileText size={18} />,
      title: "Administrasi Kependudukan",
      id: "administrasi-kependudukan",
      hasSubmenu: false,
      submenu: [
        {
          icon: <FileText size={18} />,
          title: "Blangko KK",
          id: "blangko-kk",
        },
        {
          icon: <FileText size={18} />,
          title: "Formulir Biodata Keluarga",
          id: "biodata-keluarga",
        },
        {
          icon: <FileText size={18} />,
          title: "Formulir Pendaftaran Peristiwa Kependudukan",
          id: "form-peristiwa-kependudukan",
        },
        {
          icon: <FileText size={18} />,
          title: "Surat Pernyataan Perubahan Data Kependudukan",
          id: "perubahan-data-kependudukan",
        },
        {
          icon: <FileText size={18} />,
          title: "Surat Pernyataan Perubahan Elemen Data",
          id: "perubahan-elemen-data",
        },
      ],
    },
    {
      icon: <Baby size={18} />,
      title: "Kelahiran dan Kematian",
      id: "kelahiran-kematian",
      hasSubmenu: false,
      submenu: [
        {
          icon: <Baby size={18} />,
          title: "Blangko Kelahiran",
          id: "blangko-kelahiran",
        },
        {
          icon: <UserMinus size={18} />,
          title: "Blangko Kematian",
          id: "blangko-kematian",
        },
        {
          icon: <FileCheck size={18} />,
          title: "SPTJM Kebenaran Data Kelahiran",
          id: "sptjm-kelahiran",
        },
        {
          icon: <FileCheck size={18} />,
          title: "Surat Permohonan Akta Kelahiran",
          id: "permohonan-akta-kelahiran",
        },
        {
          icon: <FileCheck size={18} />,
          title: "Surat Pernyataan Nama Yang Dikehendaki",
          id: "pernyataan-nama",
        },
      ],
    },
    {
      icon: <UserPlus size={18} />,
      title: "Perpindahan Penduduk",
      id: "perpindahan-penduduk",
      hasSubmenu: false,
      submenu: [
        {
          icon: <FileText size={18} />,
          title: "Blangko Pindah",
          id: "blangko-pindah",
        },
        {
          icon: <FileText size={18} />,
          title: "Formulir Pendaftaran Perpindahan Penduduk",
          id: "form-pindah-penduduk",
        },
        {
          icon: <FileText size={18} />,
          title: "Pindah Datang Antar Desa/Kelurahan",
          id: "pindah-antar-desa",
        },
        {
          icon: <FileText size={18} />,
          title: "Formulir Pendaftaran Penduduk Non Permanen",
          id: "penduduk-non-permanen",
        },
      ],
    },
    {
      icon: <Heart size={18} />,
      title: "Perkawinan",
      id: "perkawinan",
      hasSubmenu: true,
      submenu: [
        {
          icon: <FileText size={18} />,
          title: "Surat Keterangan Belum Pernah Menikah",
          id: "belum-menikah",
        },
      ],
    },
    {
      icon: <Building size={18} />,
      title: "Surat Keterangan",
      id: "surat-keterangan",
      hasSubmenu: true,
      submenu: [
        {
          icon: <FileText size={18} />,
          title: "Surat Keterangan Domisili",
          id: "keterangan-domisili",
        },
        {
          icon: <FileText size={18} />,
          title: "Surat Keterangan Domisili Usaha",
          id: "domisili-usaha",
        },
        {
          icon: <FileText size={18} />,
          title: "Surat Keterangan Usaha",
          id: "keterangan-usaha",
        },
        {
          icon: <FileText size={18} />,
          title: "Surat Keterangan Batas Tanah",
          id: "batas-tanah",
        },
        {
          icon: <FileText size={18} />,
          title: "Surat Keterangan Cuti Kerja",
          id: "cuti-kerja",
        },
      ],
    },
    {
      icon: <FileSignature size={18} />,
      title: "Surat Pengantar",
      id: "surat-pengantar",
      hasSubmenu: true,
      submenu: [
        {
          icon: <FileText size={18} />,
          title: "Surat Pengantar SKCK",
          id: "pengantar-skck",
        },
      ],
    },
    {
      icon: <Globe size={18} />,
      title: "Lainnya",
      id: "lainnya",
      hasSubmenu: false,
      submenu: [
        {
          icon: <FileText size={18} />,
          title: "Surat Kuasa",
          id: "surat-kuasa",
        },
        {
          icon: <FileText size={18} />,
          title: "Formulir Pelaporan Pencatatan Sipil",
          id: "pelaporan-pencatatan-sipil",
        },
        {
          icon: <FileText size={18} />,
          title: "SPTJM Kebenaran Data Nama",
          id: "sptjm-nama",
        },
      ],
    },
    { title: "PENGATURAN", isHeader: true },
    {
      icon: <Settings size={18} />,
      title: "Manajemen Akun",
      id: "manajemen-akun",
    },
    { title: "AKUN", isHeader: true },
    { icon: <Lock size={18} />, title: "Ganti Password", id: "ganti-password" },
    { icon: <LogOut size={18} />, title: "Keluar", id: "keluar" },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <Dashboard />;
      case "ganti-password":
        return <GantiPassword />;
      case "manajemen-akun":
        return <ManajemenAkun />;
      case "manajemen-penduduk":
        return <ManajemenPenduduk />;
      case "cuti-kerja":
        return <SuratCutiKerja />;
      case "batas-tanah":
        return <SuratBatasTanah />;
      case "keterangan-usaha":
        return <SuratKeteranganUsaha />;
      case "domisili-usaha":
        return <SuratKeteranganDomisiliUsaha />;
      case "keterangan-domisili":
        return <SuratDomisili />;
      case "belum-menikah":
        return <SuratBelumMenikah />;
      case "pengantar-skck":
        return <PengantarSkck />;
      default:
        return <Dashboard />;
    }
  };

  const renderMenuItem = (item) => {
    if (item.isHeader) {
      return (
        <div
          key={item.title}
          className="text-xs font-semibold text-gray-400 pt-4 pb-2"
        >
          {item.title}
        </div>
      );
    }

    if (item.hasSubmenu) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleGroup(item.id)}
            className="flex items-center gap-2 px-2 py-2 text-sm rounded-lg w-full text-gray-600 hover:bg-gray-50"
          >
            {item.icon}
            <span>{item.title}</span>
            {expandedGroups[item.id] ? (
              <ChevronDown size={16} className="ml-auto" />
            ) : (
              <ChevronRight size={16} className="ml-auto" />
            )}
          </button>
          {expandedGroups[item.id] && (
            <div className="ml-4 space-y-1">
              {item.submenu.map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => setActiveContent(subItem.id)}
                  className={`flex items-center gap-2 px-2 py-2 text-sm rounded-lg w-full ${
                    activeContent === subItem.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {subItem.icon}
                  <span>{subItem.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => {
          if (item.id === "keluar") {
            window.location.href = "/Keluar";
          } else {
            setActiveContent(item.id);
          }
        }}
        className={`flex items-center gap-2 px-2 py-2 text-sm rounded-lg w-full ${
          activeContent === item.id
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        {item.icon}
        <span>{item.title}</span>
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Memeriksa status login...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-[1]">
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
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </header>

      <div className="flex pt-16 h-full bg-gray-100">
        {/* Sidebar with updated menu rendering */}
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
              {menuItems.map((item) => renderMenuItem(item))}
            </nav>
          </div>
        </aside>

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
