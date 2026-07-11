/**
 * Helper untuk mensimulasikan panggilan API sungguhan (network delay + PRNG
 * yang deterministik) selama backend belum selesai deploy.
 */

export function mockDelay<T>(data: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/** mulberry32 PRNG — cepat & deterministik berdasarkan seed string. */
export function seededRandom(seedStr: string): () => number {
  let seed = hashString(seedStr) | 0;
  return function random() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomBetween(random: () => number, min: number, max: number): number {
  return min + random() * (max - min);
}

export function formatRupiahPlain(value: number): string {
  return `Rp ${Math.round(value).toLocaleString("id-ID")}`;
}
