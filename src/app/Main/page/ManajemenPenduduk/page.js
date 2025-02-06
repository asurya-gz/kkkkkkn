"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Eye } from "lucide-react";
import axios from "axios";
import { AddEditModal } from "./AddEditModal";
import DetailModal from "./DetailModal";
import { DeleteModal } from "./DeleteModal";

const initialFormData = {
  nik: "",
  nama: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  jenis_kelamin: "",
  alamat: "",
  desa_kelurahan: "",
  kecamatan: "",
  kabupaten_kota: "",
  provinsi: "",
  status_perkawinan: "",
  pekerjaan: "",
  agama: "",
};

export default function ManajemenPenduduk() {
  // State untuk data penduduk
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk pencarian dan modal
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Fetch data penduduk
  const fetchResidents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/all-penduduk"
      );
      setResidents(response.data.penduduk || []);
      setError(null);
    } catch (err) {
      setError("Gagal mengambil data penduduk");
      console.error("Error fetching residents:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data saat komponen dimount
  useEffect(() => {
    fetchResidents();
  }, []);

  // Filter penduduk berdasarkan pencarian
  const filteredResidents = residents.filter(
    (resident) =>
      resident.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.nik.includes(searchTerm)
  );

  const handleSubmit = async () => {
    try {
      await fetchResidents();
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // Handler untuk hapus penduduk
  const handleDelete = () => {
    setResidents(residents.filter((res) => res.id !== selectedResident.id));
    setIsDeleteDialogOpen(false);
    setSelectedResident(null);
  };

  // Reset form data
  const resetFormData = () => {
    setFormData(initialFormData);
    setSelectedResident(null);
  };

  // Handler untuk membuka modal detail
  const handleDetail = (resident) => {
    setSelectedResident(resident);
    setIsDetailDialogOpen(true);
  };

  // Handler untuk membuka modal delete
  const handleDeleteClick = (resident) => {
    setSelectedResident(resident);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 text-gray-600">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Manajemen Penduduk
      </h2>

      {/* Search and Add Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari NIK/Nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Tambah Penduduk
        </button>
      </div>

      {/* Residents Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NIK
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
                Alamat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Desa/Kelurahan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResidents.length > 0 ? (
              filteredResidents.map((resident) => (
                <tr key={resident.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resident.nik}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resident.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resident.tempat_lahir}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(resident.tanggal_lahir).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resident.alamat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resident.desa_kelurahan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDetail(resident)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Detail"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(resident)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data penduduk
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddEditModal
        isOpen={isAddDialogOpen || isEditDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          resetFormData();
        }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        mode={isAddDialogOpen ? "add" : "edit"}
      />

      <DetailModal
        isOpen={isDetailDialogOpen}
        onClose={() => {
          setIsDetailDialogOpen(false);
          setSelectedResident(null);
        }}
        resident={selectedResident}
      />

      <DeleteModal
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedResident(null);
        }}
        resident={selectedResident}
        onDelete={handleDelete}
      />
    </div>
  );
}
