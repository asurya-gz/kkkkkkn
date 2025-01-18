"use client";
import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function Keluar() {
  const [countdown, setCountdown] = useState(3);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFadeOut(true);
          // Redirect after fade animation
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all duration-500 hover:scale-105">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 mb-4">
            <img
              src="/logo.png"
              alt="Logo Desa"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Sistem Informasi Desa
          </h1>
          <p className="text-gray-600">Desa Kateguhan</p>
        </div>

        {/* Logout Animation */}
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-blue-500 rounded-full p-4 flex items-center justify-center">
              <LogOut className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>

          {/* Loading Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 rounded-full h-2 transition-all duration-1000"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            ></div>
          </div>

          {/* Countdown Text */}
          <p className="text-gray-600 mb-4">
            Anda akan keluar dalam {countdown} detik
          </p>

          {/* Cancel Button */}
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Batal
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Sistem Informasi Desa Kateguhan</p>
          <p>Kabupaten Sukoharjo</p>
        </div>
      </div>
    </div>
  );
}
