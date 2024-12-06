import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { printSessions } from '@/constant/print-session';
import { PrintSession } from '@/types/print-session';

type PrintSessionStore = {
  printSessionList: PrintSession[];
  setPrintSessionList: (printSessionList: PrintSession[]) => void;
  addPrintSession: (printSession: PrintSession) => void;
  removePrintSession: (printSessionId: number) => void;
};

export const usePrintSessionStore = create<PrintSessionStore>()(
  persist(
    (set) => ({
      printSessionList: printSessions,
      setPrintSessionList: (printSessionList) => set({ printSessionList }),
      addPrintSession: (printSession) =>
        set((state) => ({
          printSessionList: [...state.printSessionList, printSession],
        })),
      removePrintSession: (printSessionId) =>
        set((state) => ({
          printSessionList: state.printSessionList.filter(
            (printSession) => printSession.id !== printSessionId,
          ),
        })),
    }),
    {
      
      name: 'print-session-storage',
    },
  ),
);
