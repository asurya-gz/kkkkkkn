"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BuatSurat({ onSubmit, onCancel, latestNoSurat }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomor_surat: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nomor_ktp: "",
    nomor_kk: "",
    nomor_hp: "",
    email: "",
    pekerjaan: "",
    alamat: "",
    keperluan: "",
    tujuan: "",
    masa_berlaku: "",
    keterangan: "",
    kepala_desa: "",
  });

  useEffect(() => {
    if (latestNoSurat) {
      setFormData((prev) => ({
        ...prev,
        nomor_surat: latestNoSurat,
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
      const requiredFields = [
        "nomor_surat",
        "nama",
        "tempat_lahir",
        "tanggal_lahir",
        "nomor_ktp",
        "nomor_kk",
        "nomor_hp",
        "email",
        "pekerjaan",
        "alamat",
        "keperluan",
        "tujuan",
        "masa_berlaku",
        "keterangan",
        "kepala_desa",
      ];

      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(
          `Field berikut harus diisi: ${missingFields.join(", ")}`
        );
      }

      const response = await axios.post(
        "http://147.93.111.133:4000/api/create-skck",
        formData
      );

      if (response.data.success) {
        onSubmit(response.data);
        alert("Surat keterangan SKCK berhasil dibuat!");
        setFormData({
          nomor_surat: "",
          nama: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          nomor_ktp: "",
          nomor_kk: "",
          nomor_hp: "",
          email: "",
          pekerjaan: "",
          alamat: "",
          keperluan: "",
          tujuan: "",
          masa_berlaku: "",
          keterangan: "",
          kepala_desa: "",
        });
      } else {
        throw new Error(
          response.data.message || "Gagal membuat surat pengantar SKCK"
        );
      }
    } catch (error) {
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
      <h2 className="text-2xl font-bold mb-6">Buat Surat Pengantar SKCK</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nomor Surat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Surat
          </label>
          <input
            type="text"
            name="nomor_surat"
            value={formData.nomor_surat}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            disabled
          />
          <p className="mt-1 text-sm text-gray-500">
            Nomor surat digenerate otomatis
          </p>
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor KTP
            </label>
            <input
              type="text"
              name="nomor_ktp"
              value={formData.nomor_ktp}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor KK
            </label>
            <input
              type="text"
              name="nomor_kk"
              value={formData.nomor_kk}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor HP
            </label>
            <input
              type="tel"
              name="nomor_hp"
              value={formData.nomor_hp}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Informasi SKCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keperluan
            </label>
            <textarea
              name="keperluan"
              value={formData.keperluan}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tujuan
            </label>
            <textarea
              name="tujuan"
              value={formData.tujuan}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Masa Berlaku
            </label>
            <input
              type="text"
              name="masa_berlaku"
              placeholder="Masukkan tanggal (contoh: 09-02-2024 s/d 09-02-2029)"
              value={formData.masa_berlaku}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keterangan
            </label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kepala Desa
            </label>
            <input
              type="text"
              name="kepala_desa"
              value={formData.kepala_desa}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
