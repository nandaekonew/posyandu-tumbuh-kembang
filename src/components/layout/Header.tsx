'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { Child } from '@/types';
import { formatBirthOrder } from '@/lib/utils';
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-2xs">
        {/* Child Selector & Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsChildDropdownOpen(!isChildDropdownOpen)}
              className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-600 bg-slate-50/80 hover:bg-emerald-50/50 transition-all text-left shadow-2xs max-w-[210px] sm:max-w-none"
              aria-label="Pilih atau ubah data profil balita"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-700 text-white font-black flex items-center justify-center text-xs shadow-2xs flex-shrink-0">
                {activeChild ? (activeChild.nickname ? activeChild.nickname[0].toUpperCase() : 'A') : 'A'}
              </div>
              <div className="text-left min-w-0 truncate">
                <p className="text-[9px] sm:text-[10px] text-emerald-800 font-bold uppercase tracking-wider leading-none truncate">
                  {activeChild ? formatBirthOrder(activeChild.birthOrder).label : 'Profil Anak'}
                </p>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                    {activeChild ? activeChild.nickname || activeChild.name : 'Pilih Anak'}
                  </p>
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 font-bold flex-shrink-0">
                    {activeChild?.gender === 'P' ? '♀ P' : '♂ L'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 flex-shrink-0" aria-hidden="true" />
            </button>

            {/* Dropdown Menu (Responsif untuk layar HP maupun desktop) */}
            {isChildDropdownOpen && (
              <div className="absolute left-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Daftar Balita ({children.length})
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">Pilih / Edit Profil</span>
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
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-slate-900 truncate">{c.name}</p>
                              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 flex-shrink-0">
                                {formatBirthOrder(c.birthOrder).label}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500">
                              {c.gender === 'P' ? 'Perempuan' : 'Laki-laki'} • Lahir {c.birthDate}
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Cloud Sync Button */}
          {isCloudConnected && (
            <button
              onClick={() => syncWithCloud()}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 transition-colors"
              title="Sinkronkan dengan Database Supabase"
              aria-label="Sinkronkan data dengan database Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${isSyncing ? 'animate-spin' : ''}`} aria-hidden="true" />
              <span className="hidden sm:inline">{isSyncing ? 'Sinkronisasi...' : 'Sync Cloud'}</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => setIsAddVisitModalOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-2xs active:scale-95 transition-all"
            aria-label="Catat kunjungan posyandu baru"
          >
            <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" aria-hidden="true" />
            <span className="hidden sm:inline">Catat Posyandu</span>
            <span className="sm:hidden font-extrabold">+ Catat</span>
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
