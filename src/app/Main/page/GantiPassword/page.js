"use client";
import React, { useState } from "react";
import { KeyRound, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const GantiPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Password saat ini harus diisi";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Password baru harus diisi";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password baru minimal 8 karakter";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Ambil email dari cookie
    const email = Cookies.get("email"); // Sesuaikan dengan nama cookie yang Anda gunakan

    if (!email) {
      setErrors({
        submit: "Sesi login tidak valid. Silakan login ulang.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/change-password",
        {
          email: email,
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccessMessage("Password berhasil diubah!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setErrors({
          submit: response.data.message || "Gagal mengubah password",
        });
      }
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-gray-600">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <KeyRound className="w-6 h-6" />
          Ganti Password
        </h2>
        <p className="text-gray-600 mt-1">
          Silakan masukkan password lama dan password baru Anda
        </p>
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <Check className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password Saat Ini
          </label>
          <div className="relative">
            <input
              type={passwordVisibility.currentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.currentPassword
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
              }`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {passwordVisibility.currentPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password Baru
          </label>
          <div className="relative">
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.newPassword
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
              }`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {passwordVisibility.newPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.confirmPassword
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
              }`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {passwordVisibility.confirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium 
            ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-200"
            }
          `}
        >
          {isSubmitting ? "Memproses..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};

export default GantiPassword;
