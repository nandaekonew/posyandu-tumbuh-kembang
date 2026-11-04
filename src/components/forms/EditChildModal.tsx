'use client';

import React, { useState, useEffect } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { Child, Gender } from '@/types';
import { X, Baby, User, Calendar, MapPin, BookOpen, Trash2 } from 'lucide-react';

interface EditChildModalProps {
  child: Child;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditChildModal({ child, isOpen, onClose }: EditChildModalProps) {
  const { updateChild, deleteChild, children } = usePosyanduStore();

  const [name, setName] = useState(child.name);
  const [nickname, setNickname] = useState(child.nickname || '');
  const [nik, setNik] = useState(child.nik || '');
  const [gender, setGender] = useState<Gender>(child.gender);
  const [birthDate, setBirthDate] = useState(child.birthDate);
  const [birthWeight, setBirthWeight] = useState(child.birthWeight?.toString() || '3.2');
  const [birthHeight, setBirthHeight] = useState(child.birthHeight?.toString() || '49.0');
  const [birthHeadCirc, setBirthHeadCirc] = useState(child.birthHeadCirc?.toString() || '33.5');
  const [bloodType, setBloodType] = useState(child.bloodType || 'O');
  const [fatherName, setFatherName] = useState(child.fatherName || '');
  const [motherName, setMotherName] = useState(child.motherName || '');
  const [posyanduName, setPosyanduName] = useState(child.posyanduName || 'Posyandu Melati');
  const [village, setVillage] = useState(child.village || '');
  const [address, setAddress] = useState(child.address || '');
  const [kiaBookNo, setKiaBookNo] = useState(child.kiaBookNo || '');

  useEffect(() => {
    setName(child.name);
    setNickname(child.nickname || '');
    setNik(child.nik || '');
    setGender(child.gender);
    setBirthDate(child.birthDate);
    setBirthWeight(child.birthWeight?.toString() || '3.2');
    setBirthHeight(child.birthHeight?.toString() || '49.0');
    setBirthHeadCirc(child.birthHeadCirc?.toString() || '33.5');
    setBloodType(child.bloodType || 'O');
    setFatherName(child.fatherName || '');
    setMotherName(child.motherName || '');
    setPosyanduName(child.posyanduName || 'Posyandu Melati');
    setVillage(child.village || '');
    setAddress(child.address || '');
    setKiaBookNo(child.kiaBookNo || '');
  }, [child]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) {
      alert('Nama dan Tanggal Lahir wajib diisi');
      return;
    }

    await updateChild({
      ...child,
      name,
      nickname: nickname || name.split(' ')[0],
      nik,
      gender,
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

  const handleDelete = async () => {
    if (children.length <= 1) {
      alert('Tidak dapat menghapus satu-satunya profil anak yang ada.');
      return;
    }
    if (confirm(`Yakin ingin menghapus profil balita "${child.name}" beserta riwayatnya?`)) {
      if (deleteChild) {
        await deleteChild(child.id);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">
              Ubah Data Profil Balita
            </span>
            <h2 className="text-xl font-bold">{child.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
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

          {/* Gender & NIK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('P')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    gender === 'P'
                      ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-400 font-extrabold'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  ♀ Perempuan
                </button>
                <button
                  type="button"
                  onClick={() => setGender('L')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    gender === 'L'
                      ? 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-400 font-extrabold'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  ♂ Laki-laki
                </button>
              </div>
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
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">BB Lahir (kg)</label>
              <input
                type="number"
                step="0.05"
                value={birthWeight}
                onChange={(e) => setBirthWeight(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">PB Lahir (cm)</label>
              <input
                type="number"
                step="0.1"
                value={birthHeight}
                onChange={(e) => setBirthHeight(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">LK Lahir (cm)</label>
              <input
                type="number"
                step="0.1"
                value={birthHeadCirc}
                onChange={(e) => setBirthHeadCirc(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Golongan Darah & No Buku KIA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Golongan Darah</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none"
              >
                <option value="-">Belum Diketahui (-)</option>
                <option value="A">Golongan A</option>
                <option value="B">Golongan B</option>
                <option value="AB">Golongan AB</option>
                <option value="O">Golongan O</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Buku KIA</label>
              <input
                type="text"
                value={kiaBookNo}
                onChange={(e) => setKiaBookNo(e.target.value)}
                placeholder="KIA-2024-..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
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

          {/* Posyandu & Kelurahan */}
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Kelurahan / Desa</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Rungkut Menanggal"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Domisili</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Jl. Rungkut Asri Timur No. 12, Surabaya"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            {children.length > 1 ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Profil</span>
              </button>
            ) : (
              <span className="text-[11px] text-slate-400 italic">Profil utama balita</span>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-200"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
