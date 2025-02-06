"use client";
import React, { useState } from "react";
import axios from "axios";

export default function AddEditDialog({
  isOpen,
  isAdd,
  formData,
  onSubmit,
  onClose,
  onChange,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isAdd) {
      try {
        setIsLoading(true);

        // Prepare registration data with default values
        const registrationData = {
          email: formData.email,
          nama: formData.name,
          password: "kateguhan123", // Default password
          role: "staff", // Default role
        };

        console.log("Registering user with data:", registrationData);

        const response = await axios.post(
          "http://147.93.111.133:4000/api/register",
          registrationData
        );

        if (response.data && response.status === 201) {
          onSubmit(e); // Call the parent's onSubmit to handle success
          onClose(); // Close the dialog
        }
      } catch (error) {
        console.error("Registration error:", error);

        let errorMessage = "Terjadi kesalahan saat menambah pengguna.";

        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage =
                error.response.data.message ||
                "Data tidak valid. Periksa kembali input Anda.";
              break;
            case 409:
              errorMessage = "Email sudah terdaftar.";
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
        setIsLoading(false);
      }
    } else {
      // Handle edit case
      onSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {isAdd ? "Tambah Akun" : "Edit Akun"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  onChange({ ...formData, name: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? "border-red-300" : "border-gray-300"
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  onChange({ ...formData, email: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? "border-red-300" : "border-gray-300"
                }`}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}

            {isAdd && (
              <div className="text-sm text-gray-500">
                Password default: kateguhan123
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
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
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
