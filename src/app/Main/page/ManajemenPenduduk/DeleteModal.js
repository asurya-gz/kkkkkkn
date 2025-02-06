import React, { useState } from "react";
import axios from "axios";

export const DeleteModal = ({ isOpen, onClose, resident, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !resident) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete("http://localhost:4000/api/delete-penduduk", {
        data: { nik: resident.nik },
      });

      onDelete(); // Refresh data after successful deletion
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting resident:", error);
      setError("Gagal menghapus data penduduk");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Hapus Penduduk</h3>
        <p className="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus data penduduk <b>{resident.nama}?</b>
        </p>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};
