export interface Stamp {
  id: string;
  name: string;
  price: number;
  country: string;
  year: number;
  bbox: [number, number, number, number]; // [x, y, width, height] в процентах
}