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
  AreaChart,
  Area,
} from "recharts";
import {
  ScrollText,
  TrendingUp,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown,
  Download,
  Users,
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

  // Data statistik penduduk
  const populationData = {
    2025: [
      { month: "Jan", total: 5200, laki: 2600, perempuan: 2600 },
      { month: "Feb", total: 5220, laki: 2610, perempuan: 2610 },
      { month: "Mar", total: 5250, laki: 2620, perempuan: 2630 },
      { month: "Apr", total: 5280, laki: 2635, perempuan: 2645 },
      { month: "May", total: 5300, laki: 2645, perempuan: 2655 },
      { month: "Jun", total: 5320, laki: 2655, perempuan: 2665 },
    ],
    2024: [
      { month: "Jan", total: 5000, laki: 2500, perempuan: 2500 },
      { month: "Feb", total: 5020, laki: 2505, perempuan: 2515 },
      { month: "Mar", total: 5050, laki: 2520, perempuan: 2530 },
      { month: "Apr", total: 5080, laki: 2535, perempuan: 2545 },
      { month: "May", total: 5100, laki: 2545, perempuan: 2555 },
      { month: "Jun", total: 5120, laki: 2555, perempuan: 2565 },
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

  // Handle export data
  const handleExport = () => {
    const data = {
      suratData: suratData[selectedYear],
      populationData: populationData[selectedYear],
      summary: {
        totalSurat,
        avgGrowth,
        totalPenduduk:
          populationData[selectedYear][populationData[selectedYear].length - 1]
            .total,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard-data-${selectedYear}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 text-gray-600">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Administrasi Surat Desa
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Penduduk</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {
                    populationData[selectedYear][
                      populationData[selectedYear].length - 1
                    ].total
                  }
                </h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Population Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Statistik Penduduk
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={populationData[selectedYear]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="laki"
                  stackId="1"
                  stroke="#0088FE"
                  fill="#0088FE"
                  name="Laki-laki"
                />
                <Area
                  type="monotone"
                  dataKey="perempuan"
                  stackId="1"
                  stroke="#FF8042"
                  fill="#FF8042"
                  name="Perempuan"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

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
