import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle.model';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private rest: RestService, private userService: UserService) {}

  ngOnInit(): void {
    this.rest.getAllVehicles().subscribe((data) => {
      this.vehicles = data;
    });
  }

  findClass(type: string) {
    if (type === '2 Wheeler') {
      return 'two-wheeler';
    } else if (type === '3 Wheeler') {
      return 'three-wheeler';
    } else if (type === '4 Wheeler') {
      return 'four-wheeler';
    } else {
      return 'commercial';
    }
  }

  makeSale(vehicleId: number) {
    const username = this.userService.user.name;
    this.rest.makeSale(vehicleId, username).subscribe((data) => {
      this.ngOnInit();
    });
  }
}
