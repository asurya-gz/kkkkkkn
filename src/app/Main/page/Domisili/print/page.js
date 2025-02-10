"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FileText, Download } from "lucide-react";

const PrintSurat = () => {
  const searchParams = useSearchParams();
  const noSurat = searchParams.get("noSurat");
  const [suratData, setSuratData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://147.93.111.133:4000/api/getno-domisili",
          {
            nomor_surat: noSurat,
          }
        );
        setSuratData(response.data.keteranganDomisili);
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data surat");
        setLoading(false);
      }
    };

    if (noSurat) {
      fetchData();
    }
  }, [noSurat]);

  const generateSurat = async () => {
    try {
      const response = await axios.post(
        "http://147.93.111.133:4000/api/generate-domisili",
        suratData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `domisili_${suratData.nama}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Gagal mengunduh surat:", err);
      alert("Terjadi kesalahan saat mengunduh surat");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Memuat...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );

  if (!suratData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Surat tidak ditemukan
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-md max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FileText size={48} className="text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Surat Anda Siap untuk Diunduh
        </h1>
        <p className="text-gray-600 mb-8">
          Klik tombol di bawah untuk mendapatkan surat Anda.
        </p>
        <div className="flex justify-center">
          <button
            onClick={generateSurat}
            className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            <Download className="mr-2" /> Generate Surat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintSurat;
