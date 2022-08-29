import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commission } from '../model/Commission.model';
import { FullSalesTeam } from '../model/full-sales-team.model';
import { Quota } from '../model/quota.model';
import { Sale } from '../model/sale.model';
import { SalesTeam } from '../model/Sales-team.model';
import { Vehicle } from '../model/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'http://localhost:8081';

  login(username: string, password: string) {
    const url = this.baseUrl + '/getToken';
    return this.http.post<{ token: string; authorities: string[] }>(url, {
      username: username,
      password: password,
    });
  }

  getAllCommissionByVehicleType(vehicleType: string) {
    const url = this.baseUrl + `/commission/${vehicleType}`;
    return this.http.get<Commission[]>(url);
  }

  getCommissionById(id: number) {
    const url = this.baseUrl + '/commission/get/' + id;
    return this.http.get<Commission>(url);
  }

  updateOneCommission(commission: Commission) {
    const url = this.baseUrl + '/commission/edit';
    return this.http.post<Commission>(url, commission);
  }

  getAllSalesTeam() {
    const url = this.baseUrl + '/sales-team';
    return this.http.get<SalesTeam[]>(url);
  }

  getSalesTeamById(id: number) {
    const url = this.baseUrl + '/sales-team/' + id;
    return this.http.get<FullSalesTeam>(url);
  }

  getAllVehicles() {
    const url = this.baseUrl + '/vehicle';
    return this.http.get<Vehicle[]>(url);
  }

  makeSale(vehicleId: number, username: string) {
    const url = this.baseUrl + '/sales/new';
    return this.http.post(url, { vehicleId: vehicleId, username: username });
  }

  getSalesByUsername(username: string) {
    const url = this.baseUrl + '/sales/' + username;
    return this.http.get<Sale[]>(url);
  }

  getAllQuota() {
    const url = this.baseUrl + '/quota';
    return this.http.get<Quota[]>(url);
  }

  getQuotaByLocation(location: string) {
    const url = this.baseUrl + '/quota/' + location;
    return this.http.get<Quota>(url);
  }

  updateQuota(quotaId: number, newQuotaAmount: number) {
    const url = this.baseUrl + '/quota/edit';
    const body = {
      quotaId: quotaId,
      newQuotaAmount: newQuotaAmount,
    };
    return this.http.post<Quota>(url, body);
  }

  getQuotaByUsername(username: string) {
    const url = this.baseUrl + '/quota/user/' + username;
    return this.http.get<Quota>(url);
  }
}
