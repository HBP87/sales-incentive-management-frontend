import { Vehicle } from './vehicle.model';

export interface Sale {
  id: number;
  vehicle: Vehicle;
  amount: number;
  orderDate: string;
}
