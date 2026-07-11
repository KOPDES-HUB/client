"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { KoperasiData } from "@/types/koperasi";

// Fix Leaflet default icon issue with webpack/Next.js
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "/leaflet/marker-icon.png",
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    shadowUrl: "/leaflet/marker-shadow.png",
  });
}

/** Custom pin marker — green for default, dark for selected */
function createPinIcon(isSelected: boolean, isNearest: boolean) {
  const bg = isSelected ? "#122114" : isNearest ? "#3a6b41" : "#488451";
  const pulse =
    isSelected || isNearest
      ? `<span style="
        position:absolute; inset:-6px; border-radius:50% 50% 50% 0;
        border:2px solid ${bg}; opacity:0.25;
        animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite;
      "></span>`
      : "";

  return L.divIcon({
    className: "",
    html: `
      <style>
        @keyframes ping {
          75%, 100% { transform: scale(1.6) rotate(-45deg); opacity: 0; }
        }
      </style>
      <div style="position:relative; width:32px; height:32px;">
        ${pulse}
        <div style="
          width:32px; height:32px;
          background:${bg};
          border:3px solid white;
          border-radius:50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 3px 10px rgba(0,0,0,0.35);
          transition: background 0.2s;
        "></div>
        <div style="
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%) rotate(0deg);
          width:8px; height:8px;
          background:white;
          border-radius:50%;
          margin-top:-2px;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
    tooltipAnchor: [16, -24],
  });
}

/** Auto-fly to selected koperasi */
function MapFlyTo({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 9, { duration: 1.4 });
    }
  }, [center, map]);
  return null;
}

interface KoperasiMapProps {
  koperasiList: KoperasiData[];
  selectedId: string | null;
  nearestId: string | null;
  onSelect: (koperasi: KoperasiData) => void;
}

export default function KoperasiMap({
  koperasiList,
  selectedId,
  nearestId,
  onSelect,
}: KoperasiMapProps) {
  const selected = koperasiList.find((k) => k.koperasi_ref === selectedId);
  const selectedCenter = selected
    ? ([selected.koordinat[0], selected.koordinat[1]] as [number, number])
    : null;

  return (
    <MapContainer
      center={[-2.5, 118]}
      zoom={5}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapFlyTo center={selectedCenter} />

      {koperasiList.map((k) => (
        <Marker
          key={k.koperasi_ref}
          position={[k.koordinat[0], k.koordinat[1]]}
          icon={createPinIcon(
            k.koperasi_ref === selectedId,
            k.koperasi_ref === nearestId,
          )}
          eventHandlers={{
            click: () => onSelect(k),
            mouseover: (e) => e.target.openTooltip(),
            mouseout: (e) => e.target.closeTooltip(),
          }}
        >
          {/* Hover tooltip — compact name card */}
          <Tooltip
            direction="top"
            offset={[0, -30]}
            opacity={1}
            permanent={false}
            className="simpul-tooltip"
          >
            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "10px 14px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                border: "1px solid #bddbc2",
                minWidth: "200px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#488451",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {k.bentuk_koperasi}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#121c28",
                  marginBottom: "4px",
                }}
              >
                {k.nama_koperasi}
              </div>
              <div style={{ fontSize: "12px", color: "#526352" }}>
                {k.alamat_lengkap}
              </div>
              <div
                style={{
                  marginTop: "8px",
                  paddingTop: "8px",
                  borderTop: "1px solid #e5eeff",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                    }}
                  >
                    Kategori
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#121c28",
                    }}
                  >
                    {k.kategori_usaha}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                    }}
                  >
                    Status
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#488451",
                    }}
                  >
                    {k.status_registrasi}
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "11px",
                  color: "#71796f",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ fontSize: "11px" }}>📍</span>
                {k.koordinat_dibulatkan}
              </div>
            </div>
          </Tooltip>

          {/* Click popup — richer detail */}
          <Popup offset={[0, -28]} closeButton={false} className="simpul-popup">
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                padding: "4px",
                minWidth: "260px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#122114",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#b1f2b5", fontSize: "18px" }}>🌿</span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#121c28",
                      lineHeight: 1.2,
                    }}
                  >
                    {k.nama_koperasi}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#488451",
                      fontWeight: 600,
                    }}
                  >
                    {k.bentuk_koperasi}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                {[
                  { label: "NIK Koperasi", value: k.nik_koperasi },
                  { label: "Kategori", value: k.kategori_usaha },
                  { label: "Modal Awal", value: k.modal_awal },
                  { label: "Status", value: k.status_registrasi },
                  { label: "Kode Pos", value: k.kode_pos },
                  { label: "Koordinat", value: k.koordinat_dibulatkan },
                ].map((d) => (
                  <div
                    key={d.label}
                    style={{
                      background: "#f5f6f5",
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {d.label}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#121c28",
                        marginTop: "2px",
                      }}
                    >
                      {d.value}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "#f5f6f5",
                  borderRadius: "8px",
                  padding: "8px",
                  marginBottom: "10px",
                  fontSize: "12px",
                  color: "#526352",
                  lineHeight: 1.5,
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Tentang
                </div>
                {k.tentang_koperasi}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#71796f",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <span>📍</span>
                <span>{k.alamat_lengkap}</span>
              </div>

              <button
                onClick={() => onSelect(k)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#488451",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#3a6b41")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#488451")
                }
              >
                Pilih Koperasi Ini →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
