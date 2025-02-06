"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic form validation
    if (!email || !password) {
      setError("Email dan password harus diisi.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      if (response.data && response.data.message === "Login berhasil!") {
        const { token, user } = response.data;

        // Store data in cookies
        Cookies.set("token", token, { expires: 1 });
        Cookies.set("role", user.role, { expires: 1 });
        Cookies.set("email", user.email, { expires: 1 });

        router.push("/Main");
      }
    } catch (error) {
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

      if (error.response) {
        // Handle specific error cases
        const status = error.response.status;
        const responseMessage = error.response.data?.message;

        if (status === 401) {
          errorMessage = "Email atau password salah.";
        } else if (status === 400) {
          errorMessage = responseMessage || "Data yang dimasukkan tidak valid.";
        } else if (status === 500) {
          errorMessage =
            "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
        }
      } else if (!navigator.onLine) {
        errorMessage = "Tidak ada koneksi internet. Periksa koneksi Anda.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-gray-600">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 relative">
            <img
              src="/logo.png"
              alt="Logo Desa"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Sistem Informasi Penyuratan Desa Kateguhan
          </h1>
          <p className="text-gray-600 mt-2">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // Clear error when user types
                  }}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                    error ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Masukkan email Anda"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(""); // Clear error when user types
                  }}
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                    error ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Masukkan password Anda"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white focus:ring-4 focus:ring-blue-300`}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
