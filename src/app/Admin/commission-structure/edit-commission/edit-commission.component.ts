import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Commission } from 'src/app/model/Commission.model';
import { RestService } from 'src/app/services/rest.service';
import { EventBrokerService } from 'src/app/services/ievent-listener.service';

@Component({
  selector: 'app-edit-commission',
  templateUrl: './edit-commission.component.html',
  styleUrls: ['./edit-commission.component.scss'],
})
export class EditCommissionComponent implements OnInit {
  commission: Commission;
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private router: Router,
    private _eventBroker: EventBrokerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const commisionId = +params['commission-id'];
      this.rest.getCommissionById(commisionId).subscribe((data) => {
        this.commission = data;
        this.initForm();
      });
    });
  }

  initForm() {
    this.form.setValue(this.commission);
    this.form.controls['id'].disable();
    this.form.controls['vehicleType'].disable();
  }

  onSubmit() {
    const newCommision: Commission = {
      id: this.commission.id,
      vehicleType: this.commission.vehicleType,
      ...this.form.value,
    };
    this.rest.updateOneCommission(newCommision).subscribe(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
      this._eventBroker.emit('commissionUpdated', true);
    });
  }
}
