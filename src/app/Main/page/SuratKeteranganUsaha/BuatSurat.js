"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BuatSuratDomisiliUsaha({
  onSubmit,
  onCancel,
  latestNoSurat,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomor_surat: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    pekerjaan: "",
    tempat_tinggal: "",
    surat_bukti_diri: "",
    jenis_usaha: "",
    status: "",
    lama_usaha: "",
    alamat_usaha: "",
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
      // Validasi field wajib
      const requiredFields = [
        "nomor_surat",
        "nama",
        "tempat_lahir",
        "tanggal_lahir",
        "pekerjaan",
        "tempat_tinggal",
        "surat_bukti_diri",
        "jenis_usaha",
        "status",
        "lama_usaha",
        "alamat_usaha",
        "kepala_desa",
      ];

      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(
          `Field berikut harus diisi: ${missingFields.join(", ")}`
        );
      }

      const response = await axios.post(
        "http://147.93.111.133:4000/api/create-keteranganusaha",
        formData
      );

      console.log("Response dari server:", response.data);

      if (response.data.success) {
        onSubmit(response.data);
        alert("Surat keterangan usaha berhasil dibuat!");

        // Reset form
        setFormData({
          nomor_surat: "",
          nama: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          pekerjaan: "",
          tempat_tinggal: "",
          surat_bukti_diri: "",
          jenis_usaha: "",
          status: "",
          lama_usaha: "",
          alamat_usaha: "",
          kepala_desa: "",
        });
      } else {
        throw new Error(
          response.data.message || "Gagal membuat surat keterangan usaha"
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
      <h2 className="text-2xl font-bold mb-6">Buat Surat Keterangan Usaha</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nomor Surat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                name="tempat_lahir"
                value={formData.tempat_lahir}
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
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempat Tinggal
            </label>
            <textarea
              name="tempat_tinggal"
              value={formData.tempat_tinggal}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Informasi Usaha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Surat Bukti Diri
            </label>
            <input
              type="text"
              name="surat_bukti_diri"
              value={formData.surat_bukti_diri}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: KTP - 3311052507020002"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Usaha
            </label>
            <input
              type="text"
              name="jenis_usaha"
              value={formData.jenis_usaha}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Usaha
            </label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lama Usaha
            </label>
            <input
              type="text"
              name="lama_usaha"
              value={formData.lama_usaha}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: 2 Tahun"
              required
            />
          </div>
        </div>

        {/* Alamat Usaha dan Kepala Desa */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Usaha
            </label>
            <textarea
              name="alamat_usaha"
              value={formData.alamat_usaha}
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
              name="kepala_desa"
              value={formData.kepala_desa}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nama Kepala Desa"
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
