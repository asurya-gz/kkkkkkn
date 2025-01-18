"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ScrollText,
  TrendingUp,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("2025");

  // Data statistik surat
  const suratData = {
    2025: [
      { name: "Surat Keterangan Domisili", total: 150, growth: 15 },
      { name: "Surat Keterangan Usaha", total: 120, growth: -5 },
      { name: "Surat Keterangan Tidak Mampu", total: 100, growth: 10 },
      { name: "Surat Pengantar KTP", total: 80, growth: 25 },
      { name: "Surat Keterangan Kelahiran", total: 60, growth: 5 },
      { name: "Surat Kematian", total: 40, growth: 0 },
    ],
    2024: [
      { name: "Surat Keterangan Domisili", total: 130, growth: 10 },
      { name: "Surat Keterangan Usaha", total: 126, growth: 8 },
      { name: "Surat Keterangan Tidak Mampu", total: 91, growth: 12 },
      { name: "Surat Pengantar KTP", total: 64, growth: 15 },
      { name: "Surat Keterangan Kelahiran", total: 57, growth: 3 },
      { name: "Surat Kematian", total: 40, growth: 2 },
    ],
  };

  // Warna untuk charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  // Menghitung total surat untuk tahun yang dipilih
  const totalSurat = suratData[selectedYear].reduce(
    (acc, curr) => acc + curr.total,
    0
  );

  // Menghitung rata-rata pertumbuhan
  const avgGrowth = (
    suratData[selectedYear].reduce((acc, curr) => acc + curr.growth, 0) /
    suratData[selectedYear].length
  ).toFixed(1);

  return (
    <div className="bg-gray-50 min-h-screen p-6 text-gray-600">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Administrasi Surat Desa
          </h1>
          <div className="mt-4 flex items-center">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Surat</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {totalSurat}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ScrollText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rata-rata Pertumbuhan</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {avgGrowth}%
                  </h3>
                  {avgGrowth > 0 ? (
                    <ArrowUp className="w-5 h-5 text-green-500 ml-2" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-red-500 ml-2" />
                  )}
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Jenis Surat</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {suratData[selectedYear].length}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Distribusi Jenis Surat
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={suratData[selectedYear]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#0088FE" name="Jumlah Surat" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Proporsi Jenis Surat
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={suratData[selectedYear]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {suratData[selectedYear].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Growth Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pertumbuhan per Jenis Surat
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={suratData[selectedYear]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#8884d8"
                  name="Pertumbuhan (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
