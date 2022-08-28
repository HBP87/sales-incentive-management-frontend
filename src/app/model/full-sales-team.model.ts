import { salesPerson } from './sales-person.model';

export interface FullSalesTeam {
  id: number;
  name: string;
  location: string;
  salesPeople: salesPerson[];
}
