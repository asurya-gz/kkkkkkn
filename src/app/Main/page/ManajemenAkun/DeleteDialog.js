"use client";
import React, { useState } from "react";
import axios from "axios";

export default function DeleteDialog({ isOpen, email, onConfirm, onClose }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");

      console.log("Attempting to delete email:", email);

      // Using DELETE request with data in the config object
      const response = await axios.delete(
        "http://localhost:4000/api/delete-user",
        {
          data: { email: email }, // This is the correct way to send data with DELETE
        }
      );

      console.log("Delete response:", response);

      if (response.data.success) {
        onConfirm();
        onClose();
      } else {
        setError("Gagal menghapus pengguna. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Delete error:", error);

      let errorMessage = "Terjadi kesalahan saat menghapus pengguna.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Data tidak valid. Pastikan email benar.";
            break;
          case 404:
            errorMessage = "Pengguna tidak ditemukan.";
            break;
          case 403:
            errorMessage =
              "Anda tidak memiliki izin untuk menghapus pengguna ini.";
            break;
          case 500:
            errorMessage =
              "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      }
      setError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Hapus Akun</h3>
        <p className="text-gray-600 mb-4">
          Anda yakin ingin menghapus akun {email}?
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
