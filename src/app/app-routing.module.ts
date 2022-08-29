import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { CommissionStructureComponent } from './Admin/commission-structure/commission-structure.component';
import { EditCommissionComponent } from './Admin/commission-structure/edit-commission/edit-commission.component';
import { OneCommissionStructureComponent } from './Admin/commission-structure/one-commission-structure/one-commission-structure.component';
import { EditQuotaComponent } from './Admin/quota/edit-quota/edit-quota.component';
import { QuotaComponent } from './Admin/quota/quota.component';
import { SalesTeamComponent } from './Admin/sales-team/sales-team.component';
import { ViewSalesTeamComponent } from './Admin/sales-team/view-sales-team/view-sales-team.component';
import { LoginComponent } from './login/login.component';
import { SalesReportComponent } from './SalesPerson/sales/sales-report/sales-report.component';
import { SalesComponent } from './SalesPerson/sales/sales.component';
import { SalespersonHomeComponent } from './SalesPerson/salesperson-home/salesperson-home.component';
import { VehicleComponent } from './SalesPerson/vehicle/vehicle.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'commission-structure',
        component: CommissionStructureComponent,
        children: [
          {
            path: ':vehicle-type',
            component: OneCommissionStructureComponent,
            children: [
              {
                path: ':commission-id/edit',
                component: EditCommissionComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'sales-team',
        component: SalesTeamComponent,
        children: [
          { path: 'view/:salesTeamId', component: ViewSalesTeamComponent },
        ],
      },
      {
        path: 'quota',
        component: QuotaComponent,
        children: [{ path: ':location/edit', component: EditQuotaComponent }],
      },
    ],
  },
  {
    path: 'salesperson',
    component: SalespersonHomeComponent,
    children: [
      { path: 'vehicle', component: VehicleComponent },
      {
        path: 'sales',
        component: SalesComponent,
        children: [{ path: 'report', component: SalesReportComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
