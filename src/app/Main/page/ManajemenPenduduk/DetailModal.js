"use client";
import React from "react";

const DetailModal = ({ isOpen, onClose, resident }) => {
  if (!isOpen || !resident) return null;

  const formatTanggalLahir = (tanggal) => {
    if (!tanggal) return "-";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const InfoField = ({ label, value }) => (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-base text-gray-900 bg-gray-50 p-2 rounded-md">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Detail Penduduk
              </h3>
              <p className="text-sm text-gray-500 mt-1">NIK: {resident.nik}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8">
            <div className="space-y-1">
              <InfoField label="Nama Lengkap" value={resident.nama} />
              <InfoField label="Tempat Lahir" value={resident.tempat_lahir} />
              <InfoField
                label="Tanggal Lahir"
                value={formatTanggalLahir(resident.tanggal_lahir)}
              />
              <InfoField label="Jenis Kelamin" value={resident.jenis_kelamin} />
              <InfoField label="Agama" value={resident.agama} />
              <InfoField
                label="Status Perkawinan"
                value={resident.status_perkawinan}
              />
            </div>

            <div className="space-y-1">
              <InfoField label="Pekerjaan" value={resident.pekerjaan} />
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Informasi Alamat
                </h4>
                <p className="text-sm text-gray-900 mb-2">{resident.alamat}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Desa/Kelurahan</p>
                    <p className="text-sm font-medium">
                      {resident.desa_kelurahan}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
