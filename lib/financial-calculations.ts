export interface CashflowYear {
  tahun: number;
  pendapatan: number;
  biaya: number;
}

export interface ProyeksiCashflowTahun {
  tahun: number;
  pendapatan: number;
  biayaOperasional: number;
}

export interface FeasibilityMetrics {
  npv: number;
  irr: number;
  paybackPeriod: number;
  bcr: number;
  layak: boolean;
}

export function netCashflow(cf: CashflowYear): number {
  return cf.pendapatan - cf.biaya;
}

export function proyeksiToCashflowYears(
  proyeksi: ProyeksiCashflowTahun[],
): CashflowYear[] {
  return proyeksi.map((p) => ({
    tahun: p.tahun,
    pendapatan: p.pendapatan,
    biaya: p.biayaOperasional,
  }));
}

export function calculateNPV(
  modalAwal: number,
  cashflows: CashflowYear[],
  discountRate: number,
): number {
  const r = discountRate / 100;
  const pv = cashflows.reduce(
    (sum, cf) => sum + netCashflow(cf) / Math.pow(1 + r, cf.tahun),
    0,
  );
  return pv - modalAwal;
}

function npvAtRate(
  modalAwal: number,
  cashflows: CashflowYear[],
  rate: number,
): number {
  const flows = [-modalAwal, ...cashflows.map((cf) => netCashflow(cf))];
  return flows.reduce(
    (sum, cf, t) => sum + cf / Math.pow(1 + rate, t),
    0,
  );
}

export function calculateIRR(
  modalAwal: number,
  cashflows: CashflowYear[],
): number {
  if (cashflows.length === 0) return NaN;

  const npvLow = npvAtRate(modalAwal, cashflows, -0.9999);
  const npvHigh = npvAtRate(modalAwal, cashflows, 5);

  if (npvLow * npvHigh > 0) return NaN;

  let low = -0.9999;
  let high = 5;

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const npv = npvAtRate(modalAwal, cashflows, mid);
    if (npv > 0) low = mid;
    else high = mid;
  }

  return ((low + high) / 2) * 100;
}

export function calculatePaybackPeriod(
  modalAwal: number,
  cashflows: CashflowYear[],
): number {
  let cumulative = -modalAwal;
  const sorted = [...cashflows].sort((a, b) => a.tahun - b.tahun);

  for (const cf of sorted) {
    const net = netCashflow(cf);
    const prevCumulative = cumulative;
    cumulative += net;

    if (cumulative >= 0 && net > 0) {
      const fraction = (0 - prevCumulative) / net;
      return cf.tahun - 1 + fraction;
    }
  }

  return sorted.length > 0 ? sorted[sorted.length - 1].tahun + 1 : Infinity;
}

export function calculateBCR(
  modalAwal: number,
  cashflows: CashflowYear[],
  discountRate: number,
): number {
  const r = discountRate / 100;
  let pvBenefits = 0;
  let pvCosts = modalAwal;

  for (const cf of cashflows) {
    pvBenefits += cf.pendapatan / Math.pow(1 + r, cf.tahun);
    pvCosts += cf.biaya / Math.pow(1 + r, cf.tahun);
  }

  return pvCosts === 0 ? 0 : pvBenefits / pvCosts;
}

export function assessFeasibility(
  modalAwal: number,
  cashflows: CashflowYear[],
  discountRate: number,
): FeasibilityMetrics {
  const npv = calculateNPV(modalAwal, cashflows, discountRate);
  const irr = calculateIRR(modalAwal, cashflows);
  const paybackPeriod = calculatePaybackPeriod(modalAwal, cashflows);
  const bcr = calculateBCR(modalAwal, cashflows, discountRate);
  const layak =
    npv > 0 &&
    !Number.isNaN(irr) &&
    irr > discountRate &&
    bcr > 1;

  return { npv, irr, paybackPeriod, bcr, layak };
}

export function calculateSwitchingValue(
  modalAwal: number,
  cashflows: CashflowYear[],
  discountRate: number,
  variable: "pendapatan" | "biaya",
): number {
  const baseNpv = calculateNPV(modalAwal, cashflows, discountRate);
  if (baseNpv <= 0) return 0;

  let low = 0;
  let high = 100;

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const adjusted = adjustCashflowVariable(cashflows, variable, mid);
    const npv = calculateNPV(modalAwal, adjusted, discountRate);
    if (npv > 0) low = mid;
    else high = mid;
  }

  return low;
}

export function adjustCashflowVariable(
  cashflows: CashflowYear[],
  variable: "pendapatan" | "biaya",
  percent: number,
): CashflowYear[] {
  return cashflows.map((cf) => ({
    ...cf,
    pendapatan:
      variable === "pendapatan"
        ? cf.pendapatan * (1 - percent / 100)
        : cf.pendapatan,
    biaya:
      variable === "biaya" ? cf.biaya * (1 + percent / 100) : cf.biaya,
  }));
}

export function applyRevenueChange(
  cashflows: CashflowYear[],
  percent: number,
): CashflowYear[] {
  const factor = 1 + percent / 100;
  return cashflows.map((cf) => ({
    ...cf,
    pendapatan: cf.pendapatan * factor,
  }));
}

export function applyCostChange(
  cashflows: CashflowYear[],
  percent: number,
): CashflowYear[] {
  const factor = 1 + percent / 100;
  return cashflows.map((cf) => ({
    ...cf,
    biaya: cf.biaya * factor,
  }));
}

export function applyBenefitDelay(
  cashflows: CashflowYear[],
  delayYears: number,
): CashflowYear[] {
  if (delayYears <= 0) return cashflows;

  const sorted = [...cashflows].sort((a, b) => a.tahun - b.tahun);
  return sorted.map((cf, idx) => {
    const sourceIdx = idx - delayYears;
    return {
      ...cf,
      pendapatan: sourceIdx >= 0 ? sorted[sourceIdx].pendapatan : 0,
    };
  });
}

export function applySensitivityScenarios(
  baseCashflows: CashflowYear[],
  options: {
    revenueEnabled: boolean;
    revenueChange: number;
    costEnabled: boolean;
    costChange: number;
    delayEnabled: boolean;
    delayYears: number;
  },
): CashflowYear[] {
  let flows = baseCashflows.map((cf) => ({ ...cf }));

  if (options.revenueEnabled) {
    flows = applyRevenueChange(flows, options.revenueChange);
  }
  if (options.costEnabled) {
    flows = applyCostChange(flows, options.costChange);
  }
  if (options.delayEnabled) {
    flows = applyBenefitDelay(flows, options.delayYears);
  }

  return flows;
}
