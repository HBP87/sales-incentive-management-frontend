import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/model/sale.model';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  isReportShown = false;
  sales: Sale[];

  constructor(
    private userService: UserService,
    private rest: RestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.userService.user.name;
    this.rest.getSalesByUsername(username).subscribe((data) => {
      this.sales = data;
    });
  }

  toggleReport() {
    if (this.isReportShown) {
      this.router.navigate(['/salesperson/sales']);
    } else {
      this.router.navigate(['report'], { relativeTo: this.route });
    }
    this.isReportShown = !this.isReportShown;
  }
}
