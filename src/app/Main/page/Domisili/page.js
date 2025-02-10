"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Printer, Trash2, X, AlertCircle } from "lucide-react";
import BuatSurat from "./BuatSurat";
import { useRouter } from "next/navigation";

export default function SuratDomisili() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suratdomisili, setSuratdomisili] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [suratToDelete, setSuratToDelete] = useState(null);
  const [latestNoSurat, setLatestNoSurat] = useState("");

  useEffect(() => {
    fetchSuratdomisili();
  }, []);

  const generateNextNoSurat = (lastNoSurat = "") => {
    try {
      const currentYear = new Date().getFullYear();

      if (!lastNoSurat) {
        return `474.4/001/${currentYear}`;
      }

      const parts = lastNoSurat.split("/");
      if (parts.length !== 3) {
        return `474.4/001/${currentYear}`;
      }

      const prefix = "474.4";
      const lastNumber = parseInt(parts[1]);
      const nextNumber = (lastNumber + 1).toString().padStart(3, "0");

      return `${prefix}/${nextNumber}/${currentYear}`;
    } catch (err) {
      console.error("Error generating next number:", err);
      const currentYear = new Date().getFullYear();
      return `474.4/001/${currentYear}`;
    }
  };

  const fetchSuratdomisili = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://147.93.111.133:4000/api/all-domisili"
      );

      if (response.data.success) {
        const data = response.data.keteranganDomisili || []; // Updated to match API response

        if (data.length > 0) {
          const sortedSurat = data.sort((a, b) => {
            // Extract the number part from nomor_surat
            const numA = parseInt(a.nomor_surat.split("/")[1]) || 0;
            const numB = parseInt(b.nomor_surat.split("/")[1]) || 0;
            return numB - numA;
          });

          setSuratdomisili(sortedSurat);

          // Generate next number based on the last surat
          const nextNoSurat = generateNextNoSurat(sortedSurat[0].nomor_surat);
          setLatestNoSurat(nextNoSurat);
        } else {
          setSuratdomisili([]);
          setLatestNoSurat(generateNextNoSurat());
        }
      } else {
        setError(response.data.message || "Failed to fetch data");
        setSuratdomisili([]);
        setLatestNoSurat(generateNextNoSurat());
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setSuratdomisili([]);
      setLatestNoSurat(generateNextNoSurat());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrint = (surat) => {
    const baseUrl = window.location.origin;
    const printUrl = `${baseUrl}/Main/page/Domisili/print?noSurat=${surat.nomor_surat}`;
    window.open(printUrl, "_blank");
  };

  const handleDeleteClick = (surat) => {
    setSuratToDelete(surat);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(
        "http://147.93.111.133:4000/api/delete-domisili",
        {
          data: {
            nomor_surat: suratToDelete.nomor_surat,
          },
        }
      );

      if (response.data.success) {
        alert("Berhasil Menghapus Surat!");
        await fetchSuratdomisili();
        setIsDeleteDialogOpen(false);
        setSuratToDelete(null);
      } else {
        setError("Failed to delete surat");
      }
    } catch (err) {
      console.error("Error deleting surat:", err);
      setError("Error deleting surat: " + err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await fetchSuratdomisili();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating surat:", err);
    }
  };

  const filteredSurat = suratdomisili.filter(
    (surat) =>
      surat.nomor_surat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 text-gray-600">
        <h2 className="text-2xl font-bold mb-6">Surat Keterangan Domisili</h2>

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

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            Error: {error}
          </div>
        ) : filteredSurat.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>Tidak ada surat yang ditemukan</span>
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
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tempat Lahir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Lahir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domisili
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
                      {surat.nomor_surat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {surat.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {surat.tempat_lahir}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(surat.tanggal_lahir).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {surat.domisili}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePrint(surat)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Cetak surat"
                        >
                          <Printer size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(surat)}
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
                  <X size={24} />
                </button>
              </div>
              <BuatSurat
                onSubmit={handleFormSubmit}
                onCancel={() => setIsModalOpen(false)}
                latestNoSurat={latestNoSurat}
              />
            </div>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsDeleteDialogOpen(false)}
            />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-red-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Konfirmasi Hapus
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                Apakah anda yakin akan menghapus surat dengan nomor surat{" "}
                {suratToDelete?.nomor_surat}?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
