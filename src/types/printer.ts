export enum Status {
  GOOD = 'Đang hoạt động',
  STOPPED = 'Không hoạt động',
}

export enum PrinterType {
  TOSHIBA = 'Toshiba',
  HP = 'HP',
  CANON = 'Canon',
  EPSON = 'Epson',
}

export enum Location {
  A2_CS1 = 'A2-CS1',
  A3_CS1 = 'A3-CS1',
  A4_CS1 = 'A4-CS1',
  A5_CS1 = 'A5-CS1',
  B1_CS1 = 'B1-CS1',
  B2_CS1 = 'B2-CS1',
  B3_CS1 = 'B3-CS1',
  B4_CS1 = 'B4-CS1',
  B5_CS1 = 'B5-CS1',
  B6_CS1 = 'B6-CS1',
  B7_CS1 = 'B7-CS1',
  B8_CS1 = 'B8-CS1',
  B9_CS1 = 'B9-CS1',
  B10_CS1 = 'B10-CS1',
  B11_CS1 = 'B11-CS1',
  B12_CS1 = 'B12-CS1',
  C1_CS1 = 'C1-CS1',
  C2_CS1 = 'C2-CS1',
  C3_CS1 = 'C3-CS1',
  C4_CS1 = 'C4-CS1',
  C5_CS1 = 'C5-CS1',
  C6_CS1 = 'C6-CS1',
  H1_CS2 = 'H1-CS2',
  H2_CS2 = 'H2-CS2',
  H3_CS2 = 'H3-CS2',
  H6_CS2 = 'H6-CS2',
}

export type Printer = {
  id: number;
  name: string;
  status: Status;
  type: PrinterType;
  location: Location;
  paperAvailable: number;
};
