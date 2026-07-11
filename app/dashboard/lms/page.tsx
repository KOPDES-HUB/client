import TopBar from "@/components/layout/TopBar";
import Link from "next/link";

const courses = [
  {
    id: "1",
    title: "Dasar Pembukuan Koperasi",
    desc: "Pelajari prinsip dasar pencatatan keuangan koperasi sesuai standar akuntansi.",
    modules: 6,
    quiz: true,
    progress: 65,
    badge: "Akuntansi",
    badgeColor: "bg-primary-fixed text-on-primary-fixed-variant",
  },
  {
    id: "2",
    title: "Manajemen Simpan Pinjam",
    desc: "Teknik pengelolaan simpanan dan pinjaman yang efektif dan transparan.",
    modules: 4,
    quiz: true,
    progress: 30,
    badge: "Keuangan",
    badgeColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  {
    id: "3",
    title: "Tata Kelola Koperasi Modern",
    desc: "Standar governance koperasi berbasis prinsip transparansi dan akuntabilitas.",
    modules: 5,
    quiz: true,
    progress: 100,
    badge: "Governance",
    badgeColor: "bg-secondary-container text-on-secondary-container",
  },
  {
    id: "4",
    title: "Digital Marketing untuk UMKM",
    desc: "Strategi pemasaran digital untuk produk-produk koperasi dan BUMDes.",
    modules: 8,
    quiz: false,
    progress: 0,
    badge: "Marketing",
    badgeColor: "bg-mint-200 text-on-surface",
  },
  {
    id: "5",
    title: "Literasi Keuangan Dasar",
    desc: "Memahami pengelolaan keuangan pribadi dan keluarga anggota koperasi.",
    modules: 3,
    quiz: true,
    progress: 0,
    badge: "Keuangan",
    badgeColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  {
    id: "6",
    title: "Hukum Koperasi Indonesia",
    desc: "Regulasi dan perundang-undangan yang mengatur koperasi di Indonesia.",
    modules: 4,
    quiz: false,
    progress: 0,
    badge: "Hukum",
    badgeColor: "bg-surface-container text-on-surface-variant",
  },
];

export default function LMSPage() {
  return (
    <>
      <TopBar
        title="LMS"
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Smart Cooperative Academy" },
        ]}
      />

      <div className="p-8 max-w-container-max mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">Smart Cooperative Academy</h1>
            <p className="text-body-md text-on-surface-variant mt-1">
              Tingkatkan kompetensi Anda dengan modul pelatihan koperasi terkurasi.
            </p>
          </div>
          {/* Filter Tabs */}
          <div className="flex bg-surface-card border border-mint-200 rounded-xl p-1 gap-1">
            {["Semua", "Sedang Berjalan", "Selesai"].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-label-sm font-label-sm transition-all ${
                  i === 0 ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">search</span>
          <input
            type="text"
            placeholder="Cari kursus..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-card text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-surface-card rounded-2xl border border-mint-200 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group flex flex-col overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="h-36 bg-gradient-to-br from-primary to-primary-container flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-white/30 text-8xl">school</span>
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/40 to-transparent"></div>
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-label-xs font-label-xs ${course.badgeColor}`}>
                  {course.badge}
                </span>
                {course.progress === 100 && (
                  <div className="absolute top-3 left-3 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-label-sm font-label-sm text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-body-md text-on-surface-variant text-[13px] leading-relaxed mb-4 flex-1">
                  {course.desc}
                </p>

                {/* Meta chips */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-surface-bg rounded-full text-label-xs font-label-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[12px]">layers</span>
                    {course.modules} Modul
                  </span>
                  {course.quiz && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-primary-fixed rounded-full text-label-xs font-label-xs text-on-primary-fixed-variant">
                      <span className="material-symbols-outlined text-[12px]">quiz</span>
                      Kuis
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-label-xs font-label-xs text-on-surface-variant">Progress</span>
                      <span className="text-label-xs font-label-xs text-primary font-bold">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-mint-200 to-primary transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <Link
                  href={`/dashboard/lms/${course.id}`}
                  className={`w-full py-2.5 rounded-xl text-label-sm font-label-sm text-center transition-all ${
                    course.progress === 100
                      ? "bg-tertiary-fixed text-on-tertiary-fixed-variant hover:opacity-90"
                      : course.progress > 0
                      ? "bg-primary text-white hover:bg-primary-container"
                      : "border border-primary text-primary hover:bg-primary/5"
                  }`}
                >
                  {course.progress === 100 ? "Selesai — Lihat Sertifikat" : course.progress > 0 ? "Lanjutkan" : "Mulai Kursus"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
