"use client";
import React, { useState } from "react";
import { Search, Plus, Printer, Trash2 } from "lucide-react";
import BuatSurat from "./BuatSurat";

export default function SuratCutiKerja() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suratCuti, setSuratCuti] = useState([
    {
      id: 1,
      noSurat: "SCK/001/2025",
      namaPegawai: "John Doe",
      tanggalMulai: "2025-02-10",
      tanggalSelesai: "2025-02-15",
      jenisCuti: "Cuti Tahunan",
      tanggalPengajuan: "2025-02-01",
    },
    {
      id: 2,
      noSurat: "SCK/002/2025",
      namaPegawai: "Jane Smith",
      tanggalMulai: "2025-02-20",
      tanggalSelesai: "2025-02-22",
      jenisCuti: "Cuti Sakit",
      tanggalPengajuan: "2025-02-15",
    },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrint = (id) => {
    console.log("Printing surat with id:", id);
  };

  const handleDelete = (id) => {
    setSuratCuti(suratCuti.filter((surat) => surat.id !== id));
  };

  const handleFormSubmit = (formData) => {
    const newSurat = {
      id: suratCuti.length + 1,
      noSurat: formData.noSurat,
      namaPegawai: formData.nama,
      tanggalMulai: formData.tanggalCuti,
      tanggalSelesai: formData.tanggalCuti,
      jenisCuti: "Cuti Regular",
      tanggalPengajuan: new Date().toISOString().split("T")[0],
    };

    setSuratCuti([...suratCuti, newSurat]);
    setIsModalOpen(false);
  };

  const filteredSurat = suratCuti.filter(
    (surat) =>
      surat.noSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.namaPegawai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 text-gray-600">
        <h2 className="text-2xl font-bold mb-6">Surat Cuti Kerja</h2>

        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari surat..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
            Buat Surat
          </button>
        </div>

        {filteredSurat.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4">
            Tidak ada surat yang ditemukan
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No Surat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Pegawai
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Cuti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis Cuti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSurat.map((surat) => (
                  <tr key={surat.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {surat.noSurat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {surat.namaPegawai}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(surat.tanggalMulai).toLocaleDateString()} -{" "}
                      {new Date(surat.tanggalSelesai).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {surat.jenisCuti}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePrint(surat.id)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Cetak surat"
                        >
                          <Printer size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(surat.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Hapus surat"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <BuatSurat
                onSubmit={handleFormSubmit}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
