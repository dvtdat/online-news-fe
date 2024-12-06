import { PaperSize, PrintSession, PrintStatus } from "@/types/print-session";

import { printers } from "./printer";

export const printSessions: PrintSession[] = [
    {
        id: 1,
        printer: printers[1],
        paperSize: PaperSize.A4,
        printStatus: PrintStatus.COMPLETED,
        quantity: 10,
        createdAt: new Date()
    },
    {
        id: 2,
        printer: printers[0],
        paperSize: PaperSize.A4,
        printStatus: PrintStatus.COMPLETED,
        quantity: 5,
        createdAt: new Date()
    }
]