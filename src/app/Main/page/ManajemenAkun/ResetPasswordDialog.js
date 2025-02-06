"use client";
import React from "react";
import axios from "axios";

export default function ResetPasswordDialog({
  isOpen,
  email,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://147.93.111.133:4000/api/change-password-email",
        {
          email: email,
        }
      );
      alert(response.data.message); // Menampilkan pesan sukses
      onConfirm(); // Panggil onConfirm setelah sukses
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
        <p className="text-gray-600 mb-6">
          Anda yakin ingin mereset password untuk akun {email}?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            onClick={handleResetPassword}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
