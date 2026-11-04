'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { Child } from '@/types';
import {
  PlusCircle,
  RefreshCw,
  Baby,
  ChevronDown,
  Check,
  Edit,
  UserPlus,
  ShieldCheck,
} from 'lucide-react';
import AddVisitModal from '../forms/AddVisitModal';
import AddChildModal from '../forms/AddChildModal';
import EditChildModal from '../forms/EditChildModal';

export default function Header() {
  const {
    children,
    activeChildId,
    setActiveChildId,
    getActiveChild,
    isCloudConnected,
    isSyncing,
    syncWithCloud,
  } = usePosyanduStore();

  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const [isAddVisitModalOpen, setIsAddVisitModalOpen] = useState(false);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [childToEdit, setChildToEdit] = useState<Child | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeChild = getActiveChild();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsChildDropdownOpen(false);
      }
    }
    if (isChildDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChildDropdownOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
        {/* Child Selector & Info */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsChildDropdownOpen(!isChildDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border border-slate-200 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/50 transition-all text-left shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {activeChild ? (activeChild.nickname ? activeChild.nickname[0].toUpperCase() : 'A') : 'A'}
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">
                  Profil Anak
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {activeChild ? activeChild.nickname || activeChild.name : 'Pilih Anak'}
                  </p>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {activeChild?.gender === 'P' ? '♀ Putri' : '♂ Putra'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            </button>

            {/* Dropdown Menu (Tidak tertutupi karena Header berada di kolom kanan dan z-index tinggi) */}
            {isChildDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Daftar Balita ({children.length})
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">Pilih / Edit Profil</span>
                </div>

                {/* List Anak */}
                <div className="max-h-64 overflow-y-auto py-1 px-1.5 space-y-1">
                  {children.map((c) => {
                    const isSelected = c.id === activeChildId;
                    return (
                      <div
                        key={c.id}
                        className={`w-full px-3 py-2 rounded-2xl flex items-center justify-between transition-colors ${
                          isSelected ? 'bg-emerald-50/80 border border-emerald-200/80' : 'hover:bg-slate-50'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveChildId(c.id);
                            setIsChildDropdownOpen(false);
                          }}
                          className="flex-1 text-left flex items-center gap-2.5 min-w-0"
                        >
                          <span
                            className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {c.nickname ? c.nickname[0].toUpperCase() : 'A'}
                          </span>
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-900 truncate">{c.name}</p>
                            <p className="text-[10px] text-slate-500">
                              {c.gender === 'P' ? 'Perempuan' : 'Laki-laki'} • {c.birthDate}
                            </p>
                          </div>
                        </button>

                        {/* Tombol Edit Anak & Checkmark */}
                        <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsChildDropdownOpen(false);
                              setChildToEdit(c);
                            }}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-emerald-100/60 transition-colors"
                            title={`Ubah data profil ${c.nickname}`}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons: Tambah Anak & Edit Profil Aktif */}
                <div className="pt-2 px-2 border-t border-slate-100 space-y-1 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChildDropdownOpen(false);
                      setIsAddChildModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100/80 rounded-2xl transition-colors"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-600" />
                    <span>+ Daftarkan Anak Baru</span>
                  </button>

                  {activeChild && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsChildDropdownOpen(false);
                        setChildToEdit(activeChild);
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ubah Profil {activeChild.nickname}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Posyandu Badge */}
          {activeChild && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              <Baby className="w-3.5 h-3.5 text-emerald-600" />
              <span>{activeChild.posyanduName}</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Cloud Sync Button */}
          {isCloudConnected && (
            <button
              onClick={() => syncWithCloud()}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-800 transition-colors"
              title="Sinkronkan dengan Database Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? 'Sinkronisasi...' : 'Supabase Sync'}</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => setIsAddVisitModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-200 hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Catat Posyandu</span>
          </button>
        </div>
      </header>

      {/* Modals */}
      {isAddVisitModalOpen && (
        <AddVisitModal isOpen={isAddVisitModalOpen} onClose={() => setIsAddVisitModalOpen(false)} />
      )}
      {isAddChildModalOpen && (
        <AddChildModal isOpen={isAddChildModalOpen} onClose={() => setIsAddChildModalOpen(false)} />
      )}
      {childToEdit && (
        <EditChildModal
          child={childToEdit}
          isOpen={!!childToEdit}
          onClose={() => setChildToEdit(null)}
        />
      )}
    </>
  );
}
