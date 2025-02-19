"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BuatSurat({ onSubmit, onCancel, latestNoSurat }) {
  const [counter, setCounter] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    noSurat: "",
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    kewarganegaraan: "Indonesia",
    agama: "Islam",
    pekerjaan: "",
    namaPerusahaan: "",
    nomorInduk: "",
    bagian: "",
    alamat: "",
    suratBukti: "",
    keperluan: "",
    kepalaDesa: "",
  });

  useEffect(() => {
    if (latestNoSurat) {
      setFormData((prev) => ({
        ...prev,
        noSurat: latestNoSurat,
      }));
    }
  }, [latestNoSurat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mapping formData ke format API
      const apiData = {
        no_surat: formData.noSurat,
        nama: formData.nama,
        tempat_lahir: formData.tempatLahir,
        tanggal_lahir: formData.tanggalLahir,
        kewarganegaraan: formData.kewarganegaraan,
        agama: formData.agama,
        pekerjaan: formData.pekerjaan,
        nama_perusahaan: formData.namaPerusahaan,
        nomor_induk: formData.nomorInduk,
        bagian: formData.bagian,
        alamat: formData.alamat,
        surat_bukti: formData.suratBukti,
        keperluan: formData.keperluan,
        kepala_desa: formData.kepalaDesa,
      };

      console.log("Data yang akan dikirim:", apiData);

      // Validasi field wajib
      const requiredFields = [
        "no_surat",
        "nama",
        "tempat_lahir",
        "tanggal_lahir",
        "kewarganegaraan",
        "agama",
        "pekerjaan",
        "nama_perusahaan",
        "nomor_induk",
        "bagian",
        "alamat",
        "surat_bukti",
        "keperluan",
        "kepala_desa",
      ];

      const missingFields = requiredFields.filter((field) => !apiData[field]);
      if (missingFields.length > 0) {
        throw new Error(
          `Field berikut harus diisi: ${missingFields.join(", ")}`
        );
      }

      // Mengirim data ke API tanpa header
      const response = await axios.post(
        "http://147.93.111.133:4000/api/create-suratcuti",
        apiData
      );

      console.log("Response dari server:", response.data);

      if (response.data.success) {
        onSubmit(response.data); // Fungsi callback setelah submit berhasil
        alert("Surat cuti berhasil dibuat!");

        // Reset form setelah berhasil
        setFormData({
          noSurat: "",
          nama: "",
          tempatLahir: "",
          tanggalLahir: "",
          kewarganegaraan: "Indonesia",
          agama: "Islam",
          pekerjaan: "",
          namaPerusahaan: "",
          nomorInduk: "",
          bagian: "",
          alamat: "",
          suratBukti: "",
          keperluan: "",
          kepalaDesa: "",
        });

        // Increment nomor surat
        setCounter((prev) => prev + 1);
      } else {
        throw new Error(response.data.message || "Gagal membuat surat cuti");
      }
    } catch (error) {
      // Menangani berbagai jenis error dari axios
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        alert(
          `Gagal: ${
            error.response.data.message || "Terjadi kesalahan di server"
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Tidak ada respon dari server. Cek koneksi atau server Anda.");
      } else {
        console.error("Error setting up request:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Buat Surat Cuti Kerja</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nomor Surat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Surat
            </label>
            <input
              type="text"
              name="noSurat"
              value={formData.noSurat}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
              disabled
            />
            <p className="mt-1 text-sm text-gray-500">
              Nomor surat digenerate otomatis
            </p>
          </div>
        </div>

        {/* Data Pribadi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tempat Lahir
              </label>
              <input
                type="text"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kewarganegaraan & Agama
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="kewarganegaraan"
                value={formData.kewarganegaraan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pekerjaan
            </label>
            <input
              type="text"
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Informasi Pekerjaan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Perusahaan
            </label>
            <input
              type="text"
              name="namaPerusahaan"
              value={formData.namaPerusahaan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Induk Karyawan
            </label>
            <input
              type="text"
              name="nomorInduk"
              value={formData.nomorInduk}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bagian
            </label>
            <input
              type="text"
              name="bagian"
              value={formData.bagian}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Surat Bukti Diri
            </label>
            <input
              type="text"
              name="suratBukti"
              value={formData.suratBukti}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: KTP - 3311052507020002"
              required
            />
          </div>
        </div>

        {/* Alamat dan Keperluan */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kepala Desa
            </label>
            <input
              type="text"
              name="kepalaDesa"
              value={formData.kepalaDesa}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nama Kepala Desa"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keperluan
            </label>
            <textarea
              name="keperluan"
              value={formData.keperluan}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mohon Cuti Kerja untuk keperluan saudara menikah pada tanggal..."
              required
            />
          </div>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">↻</span>
                <span>Memproses...</span>
              </>
            ) : (
              "Buat Surat"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
