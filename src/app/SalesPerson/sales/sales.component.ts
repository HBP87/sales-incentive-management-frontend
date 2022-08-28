import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/model/sale.model';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  sales: Sale[];

  constructor(private userService: UserService, private rest: RestService) {}

  ngOnInit(): void {
    const username = this.userService.user.name;
    this.rest.getSalesByUsername(username).subscribe((data) => {
      this.sales = data;
    });
  }
}
