"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import { useState } from "react";

const modules = [
  { id: "1", title: "Dasar Pembukuan Koperasi",    lessons: 6, status: "Aktif" },
  { id: "2", title: "Manajemen Simpan Pinjam",      lessons: 4, status: "Aktif" },
  { id: "3", title: "Tata Kelola Koperasi Modern",  lessons: 5, status: "Aktif" },
  { id: "4", title: "Digital Marketing untuk UMKM", lessons: 8, status: "Draft" },
  { id: "5", title: "Literasi Keuangan Dasar",      lessons: 3, status: "Aktif" },
];

export default function AdminLMSPage() {
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [questions, setQuestions] = useState([
    { q: "Apa yang dimaksud dengan Simpanan Pokok?", options: ["Opsi A", "Opsi B", "Opsi C"], correct: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { q: "", options: ["", "", ""], correct: 0 }]);
  };

  return (
    <>
      <TopBar title="Kelola LMS" />

      <div className="p-8 max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-12 gap-8">
          {/* Left: Module List */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
              <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center">
                <h3 className="text-headline-md font-headline-md text-on-surface">Daftar Modul</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-label-xs font-label-xs hover:bg-primary-container transition-all">
                  <AppIcon name="add" className="text-[14px]" />
                  Tambah
                </button>
              </div>
              <div className="divide-y divide-outline-variant/20">
                {modules.map((mod) => (
                  <div
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                      selectedModule.id === mod.id ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-surface-bg"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`text-label-sm font-label-sm truncate ${selectedModule.id === mod.id ? "text-primary" : "text-on-surface"}`}>
                        {mod.title}
                      </p>
                      <p className="text-label-xs font-label-xs text-on-surface-variant mt-0.5">{mod.lessons} pelajaran</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        mod.status === "Aktif" ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-outline-variant/30 text-on-surface-variant"
                      }`}>{mod.status}</span>
                      <button className="w-6 h-6 rounded flex items-center justify-center hover:text-primary text-on-surface-variant transition-colors">
                        <AppIcon name="edit" className="text-[16px]" />
                      </button>
                      <button className="w-6 h-6 rounded flex items-center justify-center hover:text-error text-on-surface-variant transition-colors">
                        <AppIcon name="delete" className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-headline-md font-headline-md text-on-surface">Edit Modul</h3>
                <span className={`px-3 py-1 rounded-full text-label-xs font-label-xs ${
                  selectedModule.status === "Aktif" ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-outline-variant/30 text-on-surface-variant"
                }`}>{selectedModule.status}</span>
              </div>

              {/* Module Title */}
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface mb-2">Judul Modul</label>
                <input
                  type="text"
                  defaultValue={selectedModule.title}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface mb-2">Deskripsi</label>
                <textarea
                  rows={3}
                  placeholder="Deskripsikan tujuan dan isi modul ini..."
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              {/* Content Upload */}
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface mb-2">Konten (Video / Teks)</label>
                <div className="border-2 border-dashed border-mint-200 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                  <AppIcon name="upload_file" className="text-on-surface-variant text-4xl" />
                  <p className="text-label-sm font-label-sm text-on-surface">Drag & drop atau klik untuk upload</p>
                  <p className="text-label-xs font-label-xs text-on-surface-variant">MP4, PDF, maks 50MB</p>
                </div>
              </div>

              {/* Quiz Builder */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-label-sm font-label-sm text-on-surface">Builder Kuis</label>
                  <button onClick={addQuestion} className="flex items-center gap-1.5 px-3 py-1.5 border border-primary text-primary rounded-lg text-label-xs font-label-xs hover:bg-primary/5 transition-all">
                    <AppIcon name="add" className="text-[14px]" />
                    Tambah Soal
                  </button>
                </div>

                <div className="space-y-4">
                  {questions.map((q, qi) => (
                    <div key={qi} className="bg-surface-bg rounded-xl p-4 border border-outline-variant/30">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-label-xs font-label-xs text-on-surface-variant">Soal {qi + 1}</span>
                        <button
                          onClick={() => setQuestions(questions.filter((_, i) => i !== qi))}
                          className="text-error hover:opacity-70 transition-opacity"
                        >
                          <AppIcon name="delete" className="text-[16px]" />
                        </button>
                      </div>
                      <input
                        type="text"
                        defaultValue={q.q}
                        placeholder="Tulis pertanyaan..."
                        className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-white text-body-md text-on-surface mb-3 focus:outline-none focus:border-primary transition-all"
                      />
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${qi}`}
                              defaultChecked={oi === q.correct}
                              className="w-4 h-4 accent-[#488451]"
                            />
                            <input
                              type="text"
                              defaultValue={opt}
                              placeholder={`Opsi ${String.fromCharCode(65 + oi)}`}
                              className="flex-1 px-3 py-1.5 rounded-lg border border-outline-variant bg-white text-body-md text-on-surface focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30">
                <button className="px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-xl text-label-sm font-label-sm hover:border-on-surface transition-all">
                  Simpan sebagai Draft
                </button>
                <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md">
                  Simpan & Publikasikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
