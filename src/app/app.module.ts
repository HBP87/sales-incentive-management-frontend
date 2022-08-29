import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { SalespersonHomeComponent } from './SalesPerson/salesperson-home/salesperson-home.component';
import { AdminSidebarComponent } from './Admin/admin-sidebar/admin-sidebar.component';
import { SalespersonSidebarComponent } from './SalesPerson/salesperson-sidebar/salesperson-sidebar.component';
import { CommissionStructureComponent } from './Admin/commission-structure/commission-structure.component';
import { OneCommissionStructureComponent } from './Admin/commission-structure/one-commission-structure/one-commission-structure.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ConvertInfinityPipe } from './pipes/convert-infinity.pipe';
import { EditCommissionComponent } from './Admin/commission-structure/edit-commission/edit-commission.component';
import { SalesTeamComponent } from './Admin/sales-team/sales-team.component';
import { ViewSalesTeamComponent } from './Admin/sales-team/view-sales-team/view-sales-team.component';
import { VehicleComponent } from './SalesPerson/vehicle/vehicle.component';
import { PricePipe } from './pipes/price.pipe';
import { SalesComponent } from './SalesPerson/sales/sales.component';
import { SalesReportComponent } from './SalesPerson/sales/sales-report/sales-report.component';
import { QuotaComponent } from './Admin/quota/quota.component';
import { EditQuotaComponent } from './Admin/quota/edit-quota/edit-quota.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminHomeComponent,
    SalespersonHomeComponent,
    AdminSidebarComponent,
    SalespersonSidebarComponent,
    CommissionStructureComponent,
    OneCommissionStructureComponent,
    ConvertInfinityPipe,
    EditCommissionComponent,
    SalesTeamComponent,
    ViewSalesTeamComponent,
    VehicleComponent,
    PricePipe,
    SalesComponent,
    SalesReportComponent,
    QuotaComponent,
    EditQuotaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
