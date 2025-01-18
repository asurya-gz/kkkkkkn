"use client";
import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye } from "lucide-react";

export default function ManajemenPenduduk() {
  // Sample data - replace with your actual data source
  const [residents, setResidents] = useState([
    {
      id: 1,
      nik: "3311092509990001",
      nama: "Budi Santoso",
      tempatLahir: "Sukoharjo",
      tanggalLahir: "1999-09-25",
      jenisKelamin: "Laki-laki",
      alamat: "Jl. Mawar No. 10",
      rt: "02",
      rw: "03",
      agama: "Islam",
      statusPerkawinan: "Belum Kawin",
      pekerjaan: "Wiraswasta",
    },
    // Add more sample data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    rt: "",
    rw: "",
    agama: "",
    statusPerkawinan: "",
    pekerjaan: "",
  });

  // Filter residents based on search term
  const filteredResidents = residents.filter(
    (resident) =>
      resident.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.nik.includes(searchTerm)
  );

  // Handle form submit for add/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddDialogOpen) {
      setResidents([...residents, { id: Date.now(), ...formData }]);
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen) {
      setResidents(
        residents.map((res) =>
          res.id === selectedResident.id ? { ...res, ...formData } : res
        )
      );
      setIsEditDialogOpen(false);
    }
    setFormData({
      nik: "",
      nama: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      alamat: "",
      rt: "",
      rw: "",
      agama: "",
      statusPerkawinan: "",
      pekerjaan: "",
    });
  };

  // Handle delete resident
  const handleDelete = () => {
    setResidents(residents.filter((res) => res.id !== selectedResident.id));
    setIsDeleteDialogOpen(false);
    setSelectedResident(null);
  };

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
                Jenis Kelamin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alamat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResidents.map((resident) => (
              <tr key={resident.id}>
                <td className="px-6 py-4 whitespace-nowrap">{resident.nik}</td>
                <td className="px-6 py-4 whitespace-nowrap">{resident.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {resident.jenisKelamin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {resident.alamat}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedResident(resident);
                        setIsDetailDialogOpen(true);
                      }}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedResident(resident);
                        setFormData(resident);
                        setIsEditDialogOpen(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedResident(resident);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
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

      {/* Add/Edit Dialog */}
      {(isAddDialogOpen || isEditDialogOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
            <h3 className="text-lg font-semibold mb-4">
              {isAddDialogOpen ? "Tambah Penduduk" : "Edit Penduduk"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIK
                  </label>
                  <input
                    type="text"
                    value={formData.nik}
                    onChange={(e) =>
                      setFormData({ ...formData, nik: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData({ ...formData, nama: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tempatLahir: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tanggalLahir: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) =>
                      setFormData({ ...formData, jenisKelamin: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agama
                  </label>
                  <select
                    value={formData.agama}
                    onChange={(e) =>
                      setFormData({ ...formData, agama: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat
                  </label>
                  <input
                    type="text"
                    value={formData.alamat}
                    onChange={(e) =>
                      setFormData({ ...formData, alamat: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RT
                  </label>
                  <input
                    type="text"
                    value={formData.rt}
                    onChange={(e) =>
                      setFormData({ ...formData, rt: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RW
                  </label>
                  <input
                    type="text"
                    value={formData.rw}
                    onChange={(e) =>
                      setFormData({ ...formData, rw: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status Perkawinan
                  </label>
                  <select
                    value={formData.statusPerkawinan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        statusPerkawinan: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Status</option>
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Kawin">Kawin</option>
                    <option value="Cerai Hidup">Cerai Hidup</option>
                    <option value="Cerai Mati">Cerai Mati</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    value={formData.pekerjaan}
                    onChange={(e) =>
                      setFormData({ ...formData, pekerjaan: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setIsEditDialogOpen(false);
                    setFormData({
                      nik: "",
                      nama: "",
                      tempatLahir: "",
                      tanggalLahir: "",
                      jenisKelamin: "",
                      alamat: "",
                      rt: "",
                      rw: "",
                      agama: "",
                      statusPerkawinan: "",
                      pekerjaan: "",
                    });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      {isDetailDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detail Penduduk</h3>
              <button
                onClick={() => setIsDetailDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">NIK</p>
                <p className="font-medium">{selectedResident.nik}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nama</p>
                <p className="font-medium">{selectedResident.nama}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tempat Lahir</p>
                <p className="font-medium">{selectedResident.tempatLahir}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal Lahir</p>
                <p className="font-medium">{selectedResident.tanggalLahir}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jenis Kelamin</p>
                <p className="font-medium">{selectedResident.jenisKelamin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Agama</p>
                <p className="font-medium">{selectedResident.agama}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="font-medium">{selectedResident.alamat}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">RT</p>
                <p className="font-medium">{selectedResident.rt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">RW</p>
                <p className="font-medium">{selectedResident.rw}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status Perkawinan</p>
                <p className="font-medium">
                  {selectedResident.statusPerkawinan}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pekerjaan</p>
                <p className="font-medium">{selectedResident.pekerjaan}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsDetailDialogOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Hapus Penduduk</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus data penduduk{" "}
              {selectedResident.nama}?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
