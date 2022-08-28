import { SalesTeam } from './Sales-team.model';

export interface salesPerson {
  id: number;
  name: string;
  username: string;
  password: string;
  designation: string;
  salesTeam: SalesTeam;
  personAbove: salesPerson;
  sales: any[];
  commissionAmount: number;
}
