'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { Child } from '@/types';
import { calculateDetailedAge } from '@/lib/whoGrowthStandards';
import {
  Users,
  PlusCircle,
  Baby,
  Check,
  Calendar,
  MapPin,
  Heart,
  BookOpen,
  Edit,
  Trash2,
  UserCheck,
} from 'lucide-react';
import AddChildModal from '@/components/forms/AddChildModal';
import EditChildModal from '@/components/forms/EditChildModal';

export default function KelolaAnakPage() {
  const { children, activeChildId, setActiveChildId } = usePosyanduStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedChildForEdit, setSelectedChildForEdit] = useState<Child | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Registrasi Pasien Balita
            </span>
            <span className="text-xs text-slate-400 font-medium">Buku KIA Online</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Data Anak & Anggota Keluarga
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola profil anak-anak yang dipantau tumbuh kembangnya di Posyandu
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-200 transition-all active:scale-95 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Daftarkan Anak Baru</span>
        </button>
      </div>

      {/* Grid of Children */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children.map((child) => {
          const isActive = child.id === activeChildId;
          const ageDetail = calculateDetailedAge(
            child.birthDate,
            new Date().toISOString().split('T')[0]
          );

          return (
            <div
              key={child.id}
              className={`p-5 rounded-3xl border transition-all space-y-4 ${
                isActive
                  ? 'bg-gradient-to-br from-white to-emerald-50/40 border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {child.nickname ? child.nickname[0].toUpperCase() : 'A'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {child.gender === 'P' ? '♀ Perempuan' : '♂ Laki-laki'}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Aktif Dipilih
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">{child.name}</h3>
                    <p className="text-xs text-slate-500">
                      Panggilan: <strong className="text-slate-700">{child.nickname}</strong> • Usia:{' '}
                      <strong className="text-emerald-700">{ageDetail.text}</strong>
                    </p>
                  </div>
                </div>

                {/* Tombol Edit Profil Langsung */}
                <button
                  type="button"
                  onClick={() => setSelectedChildForEdit(child)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ubah Data</span>
                </button>
              </div>

              {/* Data Detail Anak */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Tgl Lahir</span>
                  <span className="font-semibold text-slate-800">{child.birthDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">BB / PB Lahir</span>
                  <span className="font-semibold text-slate-800">
                    {child.birthWeight} kg / {child.birthHeight} cm
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Gol. Darah</span>
                  <span className="font-semibold text-slate-800">{child.bloodType || 'O'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Nama Ayah</span>
                  <span className="font-semibold text-slate-800">{child.fatherName || '-'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Nama Ibu</span>
                  <span className="font-semibold text-slate-800">{child.motherName || '-'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">No. Buku KIA</span>
                  <span className="font-mono text-slate-700 text-[11px]">{child.kiaBookNo || '-'}</span>
                </div>
              </div>

              {/* Footer Kartu & Pilih Profil */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 truncate max-w-[220px]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{child.posyanduName}</span>
                </div>

                {!isActive && (
                  <button
                    type="button"
                    onClick={() => setActiveChildId(child.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Pilih Sebagai Aktif</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddChildModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      )}
      {selectedChildForEdit && (
        <EditChildModal
          child={selectedChildForEdit}
          isOpen={!!selectedChildForEdit}
          onClose={() => setSelectedChildForEdit(null)}
        />
      )}
    </div>
  );
}
