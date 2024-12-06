import { Printer } from './printer';

export enum PaperSize {
  A3 = 'A3',
  A4 = 'A4',
  A5 = 'A5',
  A6 = 'A6',
}

export enum PrintStatus {
  PRINTING = 'Printing',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export type PrintSession = {
  id: number;
  printer: Printer;
  paperSize: PaperSize;
  printStatus: PrintStatus;
  quantity: number;
  createdAt: Date;
};
