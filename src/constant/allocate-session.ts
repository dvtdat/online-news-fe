import { AllocateSession, AllocateStatus } from '@/types/allocate-session';

import { printers } from './printer';

export const allocateSessions: AllocateSession[] = [
  {
    id: 1,
    printer: printers[0],
    status: AllocateStatus.COMPLETED,
    quantity: 10,
    createdAt: new Date('2024-12-01'),
  },
  {
    id: 2,
    printer: printers[0],
    status: AllocateStatus.COMPLETED,
    quantity: 10,
    createdAt: new Date('2024-12-01'),
  },
];
