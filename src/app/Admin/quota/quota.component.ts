import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quota } from 'src/app/model/quota.model';
import {
  EventBrokerService,
  IEventListener,
} from 'src/app/services/ievent-listener.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-quota',
  templateUrl: './quota.component.html',
  styleUrls: ['./quota.component.scss'],
})
export class QuotaComponent implements OnInit {
  quotas: Quota[];
  public indicator: boolean = false;
  private _myEventListener: IEventListener;

  constructor(
    private rest: RestService,
    private router: Router,
    private _eventBroker: EventBrokerService
  ) {
    this._myEventListener = _eventBroker.listen<boolean>(
      'quotaUpdated',
      (value: boolean) => {
        this.indicator = value;
        this.ngOnInit();
      }
    );
  }

  ngOnInit(): void {
    this.rest.getAllQuota().subscribe((data) => {
      this.quotas = data;
    });
  }
}
