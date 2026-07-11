"use client";

import { AppIcon } from "@/components/ui/app-icon";
import TopBar from "@/components/layout/TopBar";
import Link from "next/link";
import { useState } from "react";

const lessons = [
  { id: 1, title: "Pengantar Koperasi & Sejarah", duration: "15 mnt", done: true },
  { id: 2, title: "Prinsip Dasar Pembukuan", duration: "20 mnt", done: true },
  { id: 3, title: "Neraca Koperasi", duration: "25 mnt", done: true },
  { id: 4, title: "Laporan Laba Rugi", duration: "20 mnt", done: false, current: true },
  { id: 5, title: "Arus Kas Koperasi", duration: "18 mnt", done: false },
  { id: 6, title: "Audit & Pengawasan Internal", duration: "22 mnt", done: false },
];

const quizQuestions = [
  {
    q: "Apa yang dimaksud dengan Simpanan Pokok dalam koperasi?",
    options: [
      "Simpanan yang dibayar sekali saat menjadi anggota",
      "Simpanan yang dibayar setiap bulan",
      "Simpanan sukarela berdasarkan kemampuan",
    ],
    correct: 0,
  },
  {
    q: "Prinsip utama koperasi yang membedakannya dari perusahaan biasa adalah?",
    options: [
      "Mengutamakan keuntungan maksimal",
      "Satu anggota satu suara",
      "Saham terbuka untuk publik",
    ],
    correct: 1,
  },
  {
    q: "SHU (Sisa Hasil Usaha) dibagikan berdasarkan?",
    options: [
      "Jumlah simpanan saja",
      "Partisipasi anggota dalam usaha koperasi",
      "Lamanya menjadi anggota",
    ],
    correct: 1,
  },
];

export default function LMSDetailPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  return (
    <>
      <TopBar
        title="Detail Modul"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "LMS", href: "/dashboard/lms" },
          { label: "Dasar Pembukuan Koperasi" },
        ]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full">
        {!showQuiz ? (
          // Course View
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left: Video + Info */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-inverse-surface rounded-2xl shadow-md overflow-hidden group cursor-pointer border border-mint-200">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-inverse-surface flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <AppIcon name="play_circle" className="text-white text-4xl" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <AppIcon name="schedule" className="text-white text-[14px]" />
                  <span className="text-white text-label-xs">20:15</span>
                </div>
              </div>

              {/* Module info */}
              <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-primary-fixed rounded-full text-label-xs font-label-xs text-on-primary-fixed-variant">Modul 4 dari 6</span>
                  <span className="px-2.5 py-1 bg-tertiary-fixed rounded-full text-label-xs font-label-xs text-on-tertiary-fixed-variant">Akuntansi</span>
                </div>
                <h1 className="text-headline-lg font-headline-lg text-on-surface mb-3">
                  Laporan Laba Rugi Koperasi
                </h1>
                <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                  Memahami struktur laporan laba rugi koperasi, cara membacanya, dan bagaimana menggunakannya
                  untuk pengambilan keputusan manajemen koperasi yang efektif.
                </p>

                {/* Key points */}
                <div className="space-y-2">
                  <h3 className="text-label-sm font-label-sm text-on-surface mb-2">Yang akan Anda pelajari</h3>
                  {[
                    "Komponen pendapatan dan beban koperasi",
                    "Cara menghitung SHU (Sisa Hasil Usaha)",
                    "Standar pelaporan keuangan koperasi",
                    "Analisis laporan untuk pengambilan keputusan",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2">
                      <AppIcon name="check_circle" className="text-primary text-[16px] mt-0.5" />
                      <span className="text-body-md text-on-surface">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Lesson List (Sticky) */}
            <div className="col-span-12 lg:col-span-4 space-y-4 lg:sticky lg:top-20">
              {/* Overall progress */}
              <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-label-sm font-label-sm text-on-surface">Progress Kursus</span>
                  <span className="text-primary font-bold text-label-sm">50%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-mint-200 to-primary rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>

              {/* Lesson list */}
              <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md overflow-hidden">
                <div className="p-4 border-b border-outline-variant/30">
                  <h3 className="text-label-sm font-label-sm text-on-surface">Daftar Modul</h3>
                </div>
                <div className="divide-y divide-outline-variant/20">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                        lesson.current
                          ? "bg-primary/5 border-l-2 border-primary"
                          : "hover:bg-surface-bg"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        lesson.done ? "bg-primary" : lesson.current ? "border-2 border-primary" : "border-2 border-outline-variant"
                      }`}>
                        {lesson.done && (
                          <AppIcon name="check" className="text-white text-[12px]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-label-xs leading-tight ${lesson.current ? "text-primary font-bold" : lesson.done ? "text-on-surface-variant" : "text-on-surface"}`}>
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">{lesson.duration}</p>
                      </div>
                      {lesson.current && (
                        <AppIcon name="play_circle" className="text-primary text-[16px]" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Quiz Button */}
                <div className="p-4 border-t border-outline-variant/30">
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="w-full py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all shadow-md"
                  >
                    Mulai Kuis (3 Soal)
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Quiz View
          <div className="max-w-2xl mx-auto">
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all ${
                    i < currentQ ? "w-3 h-3 bg-primary" :
                    i === currentQ ? "w-4 h-4 bg-primary ring-2 ring-primary/30" :
                    "w-3 h-3 bg-outline-variant"
                  }`}
                ></div>
              ))}
            </div>

            <div className="bg-surface-card rounded-2xl border border-mint-200 shadow-md p-8">
              <div className="mb-2">
                <span className="text-label-xs font-label-xs text-on-surface-variant">
                  Soal {currentQ + 1} dari {quizQuestions.length}
                </span>
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-8">
                {quizQuestions[currentQ].q}
              </h2>

              <div className="space-y-3 mb-8">
                {quizQuestions[currentQ].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 text-body-md transition-all ${
                      !answered ? "border-outline-variant hover:border-primary hover:bg-primary/5 cursor-pointer" :
                      idx === quizQuestions[currentQ].correct ? "border-primary bg-primary/10 text-primary" :
                      idx === selectedAnswer ? "border-red-400 bg-red-50 text-red-600" :
                      "border-outline-variant opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        !answered ? "border-outline-variant" :
                        idx === quizQuestions[currentQ].correct ? "border-primary bg-primary" :
                        idx === selectedAnswer ? "border-red-400 bg-red-400" :
                        "border-outline-variant"
                      }`}>
                        {answered && (idx === quizQuestions[currentQ].correct || idx === selectedAnswer) && (
                          <AppIcon name={idx === quizQuestions[currentQ].correct ? "check" : "close"} className="text-white text-[10px]" />
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button onClick={() => setShowQuiz(false)} className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                  ← Kembali ke Modul
                </button>
                {answered && currentQ < quizQuestions.length - 1 && (
                  <button onClick={nextQuestion} className="px-6 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all">
                    Lanjut →
                  </button>
                )}
                {answered && currentQ === quizQuestions.length - 1 && (
                  <Link href="/dashboard/lms" className="px-6 py-3 bg-primary text-white rounded-xl text-label-sm font-label-sm hover:bg-primary-container transition-all">
                    Selesai ✓
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
