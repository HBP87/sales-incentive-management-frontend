import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Commission } from 'src/app/model/Commission.model';
import { RestService } from 'src/app/services/rest.service';
import {
  EventBrokerService,
  IEventListener,
} from 'src/app/services/ievent-listener.service';

@Component({
  selector: 'app-one-commission-structure',
  templateUrl: './one-commission-structure.component.html',
  styleUrls: ['./one-commission-structure.component.scss'],
})
export class OneCommissionStructureComponent implements OnInit, OnDestroy {
  vehicleType: string;
  commissionModel: Commission[];
  public indicator: boolean = false;
  private _myEventListener: IEventListener;

  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private _eventBroker: EventBrokerService
  ) {
    this._myEventListener = _eventBroker.listen<boolean>(
      'commissionUpdated',
      (value: boolean) => {
        this.indicator = value;
        this.ngOnInit();
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.vehicleType = params['vehicle-type'];
      this.rest
        .getAllCommissionByVehicleType(this.vehicleType)
        .subscribe((data) => {
          this.commissionModel = data;
          console.log(this.commissionModel);
        });
    });
  }
  ngOnDestroy(): void {
    this._myEventListener.ignore();
  }
}
