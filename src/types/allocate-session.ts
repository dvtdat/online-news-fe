import { Printer } from './printer';

export enum AllocateStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export type AllocateSession = {
  id: number;
  printer: Printer;
  status: AllocateStatus;
  quantity: number;
  createdAt: Date;
};
