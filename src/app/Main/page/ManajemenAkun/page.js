"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Lock, Trash2, ShieldAlert } from "lucide-react";
import AddEditDialog from "./AddEditDialog";
import ResetPasswordDialog from "./ResetPasswordDialog";
import DeleteDialog from "./DeleteDialog";
import Cookies from "js-cookie";
import axios from "axios";

export default function ManajemenAkun() {
  const [hasAccess, setHasAccess] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const userRole = Cookies.get("role");
    setHasAccess(userRole === "admin");

    axios
      .get("http://localhost:4000/api/all-users")
      .then((response) => {
        setAccounts(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (!hasAccess) {
    return (
      <div className="bg-white rounded-lg shadow p-6 min-h-[400px] flex flex-col items-center justify-center text-gray-600">
        <ShieldAlert size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Akses Terbatas
        </h2>
        <p className="text-center text-gray-600">
          Maaf, Anda tidak memiliki hak akses untuk menggunakan fitur ini.
          <br />
          Silahkan hubungi administrator untuk mendapatkan akses.
        </p>
      </div>
    );
  }

  const filteredAccounts = accounts.filter((account) =>
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccounts([
      ...accounts,
      {
        id: Date.now(),
        nama: formData.name,
        email: formData.email,
      },
    ]);
    setIsAddDialogOpen(false);
    setFormData({ name: "", email: "" });
  };

  const handleDelete = () => {
    setAccounts(accounts.filter((acc) => acc.id !== selectedAccount.id));
    setIsDeleteDialogOpen(false);
    setSelectedAccount(null);
  };

  const handleResetPassword = () => {
    console.log("Reset password for:", selectedAccount.email);
    setIsResetPasswordDialogOpen(false);
    setSelectedAccount(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 text-gray-600">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Manajemen Akun
      </h2>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Tambah Akun
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">{account.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsResetPasswordDialogOpen(true);
                      }}
                      className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                    >
                      <Lock size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddEditDialog
        isOpen={isAddDialogOpen}
        isAdd={true}
        formData={formData}
        onSubmit={handleSubmit}
        onChange={setFormData}
        onClose={() => {
          setIsAddDialogOpen(false);
          setFormData({ name: "", email: "" });
        }}
      />

      <ResetPasswordDialog
        isOpen={isResetPasswordDialogOpen}
        email={selectedAccount?.email}
        onConfirm={handleResetPassword}
        onClose={() => setIsResetPasswordDialogOpen(false)}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        email={selectedAccount?.email}
        onConfirm={handleDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}
