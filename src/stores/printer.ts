import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { printers } from '@/constant/printer';
import { Printer } from '@/types/printer';

type PrinterStore = {
  printerList: Printer[];
  setPrinterList: (printerList: Printer[]) => void;
};

export const usePrinterStore = create<PrinterStore>()(
  persist(
    (set) => ({
      printerList: printers,
      setPrinterList: (printerList) => set({ printerList }),
    }),
    {
      name: 'printer-storage',
    },
  ),
);
