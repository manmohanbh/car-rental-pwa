// src/types/car.ts
export interface Car {
  id?: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuelType: string;
  imageUrl?: string;
  description: string;
  available: boolean;
  ownerId?: string;
  createdAt?: any;
  updatedAt?: any;
}