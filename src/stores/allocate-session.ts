import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { allocateSessions } from '@/constant/allocate-session';
import { AllocateSession } from '@/types/allocate-session';

type AllocateSessionStore = {
  allocateSessionList: AllocateSession[];
  setAllocateSessionList: (allocateSessionList: AllocateSession[]) => void;
  addAllocateSession: (allocateSession: AllocateSession) => void;
  removeAllocateSession: (allocateSessionId: number) => void;
};

export const useAllocateSessionStore = create<AllocateSessionStore>()(
  persist(
    (set) => ({
      allocateSessionList: allocateSessions,
      setAllocateSessionList: (allocateSessionList) =>
        set({ allocateSessionList }),
      addAllocateSession: (allocateSession) =>
        set((state) => ({
          allocateSessionList: [...state.allocateSessionList, allocateSession],
        })),
      removeAllocateSession: (allocateSessionId) =>
        set((state) => ({
          allocateSessionList: state.allocateSessionList.filter(
            (allocateSession) => allocateSession.id !== allocateSessionId,
          ),
        })),
    }),
    {
      name: 'allocate-session-storage',
    },
  ),
);
