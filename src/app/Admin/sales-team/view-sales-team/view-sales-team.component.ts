import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FullSalesTeam } from 'src/app/model/full-sales-team.model';
import { SalesTeam } from 'src/app/model/Sales-team.model';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-view-sales-team',
  templateUrl: './view-sales-team.component.html',
  styleUrls: ['./view-sales-team.component.scss'],
})
export class ViewSalesTeamComponent implements OnInit {
  salesTeam: FullSalesTeam;
  constructor(private rest: RestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const salesTeamId = +params['salesTeamId'];
      this.rest.getSalesTeamById(salesTeamId).subscribe((data) => {
        this.salesTeam = data;
        console.log(this.salesTeam);
      });
    });
  }
}
