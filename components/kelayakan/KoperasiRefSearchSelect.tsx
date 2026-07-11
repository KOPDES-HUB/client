"use client";

import { AppIcon } from "@/components/ui/app-icon";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KoperasiTransaksiOption } from "@/types/transaksiPenjualan";

interface KoperasiRefSearchSelectProps {
  value: string;
  onChange: (koperasiRef: string) => void;
  options: KoperasiTransaksiOption[];
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultQuery?: string;
}

export default function KoperasiRefSearchSelect({
  value,
  onChange,
  options,
  isLoading = false,
  disabled = false,
  placeholder = "KOP-",
  defaultQuery = "KOP-",
}: KoperasiRefSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(defaultQuery);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.koperasi_ref === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.koperasi_ref.toLowerCase().includes(q) ||
        (o.nama_koperasi?.toLowerCase().includes(q) ?? false),
    );
  }, [options, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selected) {
      setQuery(selected.label);
    } else if (!value) {
      setQuery(defaultQuery);
    }
  }, [selected, value, defaultQuery]);

  const handleSelect = (option: KoperasiTransaksiOption) => {
    onChange(option.koperasi_ref);
    setQuery(option.label);
    setOpen(false);
  };

  const handleInputChange = (next: string) => {
    setQuery(next);
    setOpen(true);

    if (!next.trim()) {
      onChange("");
      return;
    }

    if (value) {
      const stillMatches =
        selected &&
        (selected.label === next || selected.koperasi_ref === next);
      if (!stillMatches) onChange("");
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <AppIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setOpen(true)}
          disabled={disabled || isLoading}
          placeholder={isLoading ? "Memuat daftar koperasi..." : placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-outline-variant/50 bg-surface-bg text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
        />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          disabled={disabled || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-on-surface-variant hover:bg-surface-bg disabled:opacity-50"
          aria-label="Buka daftar koperasi"
        >
          <AppIcon name={open ? "expand_less" : "expand_more"} className="text-[20px]" />
        </button>
      </div>

      {open && !isLoading && (
        <ul className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-mint-200 bg-white shadow-lg py-1" data-lenis-prevent>
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-on-surface-variant">
              Tidak ada koperasi yang cocok
            </li>
          ) : (
            filtered.map((option) => {
              const active = option.koperasi_ref === value;
              return (
                <li key={option.koperasi_ref}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-on-surface hover:bg-surface-bg"
                    }`}
                  >
                    <span className="block font-mono text-xs text-on-surface-variant">
                      {option.koperasi_ref}
                    </span>
                    {option.nama_koperasi && (
                      <span className="block mt-0.5">{option.nama_koperasi}</span>
                    )}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
