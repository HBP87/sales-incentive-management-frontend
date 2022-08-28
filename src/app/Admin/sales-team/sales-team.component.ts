import { Component, OnInit } from '@angular/core';
import { SalesTeam } from 'src/app/model/Sales-team.model';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-sales-team',
  templateUrl: './sales-team.component.html',
  styleUrls: ['./sales-team.component.scss'],
})
export class SalesTeamComponent implements OnInit {
  salesTeams: SalesTeam[];

  constructor(private rest: RestService) {}

  ngOnInit(): void {
    this.rest.getAllSalesTeam().subscribe((data) => {
      this.salesTeams = data;
    });
  }
}
