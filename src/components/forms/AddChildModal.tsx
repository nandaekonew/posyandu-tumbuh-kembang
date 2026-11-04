'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { Gender } from '@/types';
import { X, Baby, User, Calendar, MapPin, BookOpen } from 'lucide-react';

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddChildModal({ isOpen, onClose }: AddChildModalProps) {
  const { addChild } = usePosyanduStore();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nik, setNik] = useState('');
  const [birthOrder, setBirthOrder] = useState<number>(1);
  const [gender, setGender] = useState<Gender>('P');
  const [birthDate, setBirthDate] = useState('2024-01-27');
  const [birthWeight, setBirthWeight] = useState('3.2');
  const [birthHeight, setBirthHeight] = useState('49.0');
  const [birthHeadCirc, setBirthHeadCirc] = useState('33.5');
  const [bloodType, setBloodType] = useState('O');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [posyanduName, setPosyanduName] = useState('Posyandu Melati RW 05');
  const [village, setVillage] = useState('');
  const [address, setAddress] = useState('');
  const [kiaBookNo, setKiaBookNo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) {
      alert('Nama dan Tanggal Lahir wajib diisi');
      return;
    }

    await addChild({
      name,
      nickname: nickname || name.split(' ')[0],
      nik,
      gender,
      birthOrder: Number(birthOrder) || 1,
      birthDate,
      birthWeight: parseFloat(birthWeight) || 3.0,
      birthHeight: parseFloat(birthHeight) || 50.0,
      birthHeadCirc: parseFloat(birthHeadCirc) || 34.0,
      bloodType,
      fatherName,
      motherName,
      posyanduName,
      village,
      address,
      kiaBookNo,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">
              Registrasi Pasien Balita Baru
            </span>
            <h2 className="text-xl font-bold">Tambah Data Anak</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Nama Lengkap & Panggilan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Anak *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="misal: Delisa Zafira Widianto"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Panggilan</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="misal: Delisa"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Gender, Urutan Kelahiran & NIK */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('P')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors ${
                    gender === 'P'
                      ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-400'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  ♀ Perempuan
                </button>
                <button
                  type="button"
                  onClick={() => setGender('L')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors ${
                    gender === 'L'
                      ? 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-400'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  ♂ Laki-laki
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Urutan Kelahiran *</label>
              <select
                value={birthOrder}
                onChange={(e) => setBirthOrder(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                <option value={1}>Anak Pertama (ke-1)</option>
                <option value={2}>Anak Kedua (ke-2)</option>
                <option value={3}>Anak Ketiga (ke-3)</option>
                <option value={4}>Anak Keempat (ke-4)</option>
                <option value={5}>Anak Kelima (ke-5)</option>
                <option value={6}>Anak Keenam (ke-6)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">NIK Anak (16 Digit)</label>
              <input
                type="text"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="357801..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Tanggal Lahir & Ukuran Lahir */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">Tgl Lahir *</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">BB Lahir (kg)</label>
              <input
                type="number"
                step="0.05"
                value={birthWeight}
                onChange={(e) => setBirthWeight(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">PB Lahir (cm)</label>
              <input
                type="number"
                step="0.1"
                value={birthHeight}
                onChange={(e) => setBirthHeight(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">LK Lahir (cm)</label>
              <input
                type="number"
                step="0.1"
                value={birthHeadCirc}
                onChange={(e) => setBirthHeadCirc(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>

          {/* Nama Ayah & Ibu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Ayah</label>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder="misal: Nanda Eko Widianto"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Ibu</label>
              <input
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                placeholder="misal: Dina Rahmawati"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Posyandu & No Buku KIA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Posyandu</label>
              <input
                type="text"
                value={posyanduName}
                onChange={(e) => setPosyanduName(e.target.value)}
                placeholder="Posyandu Melati RW 05"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">No. Buku KIA</label>
              <input
                type="text"
                value={kiaBookNo}
                onChange={(e) => setKiaBookNo(e.target.value)}
                placeholder="KIA-2024-..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-200"
            >
              Simpan Data Anak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
