import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Quota } from 'src/app/model/quota.model';
import { EventBrokerService } from 'src/app/services/ievent-listener.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-edit-quota',
  templateUrl: './edit-quota.component.html',
  styleUrls: ['./edit-quota.component.scss'],
})
export class EditQuotaComponent implements OnInit {
  quota: Quota;
  @ViewChild('f', { static: false }) form: NgForm;
  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private router: Router,
    private _eventBroker: EventBrokerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const location = params['location'];
      this.rest.getQuotaByLocation(location).subscribe((data) => {
        this.quota = data;
        // console.log(this.quota);
        this.initForm();
      });
    });
  }

  initForm() {
    this.form.setValue(this.quota);
    this.form.controls['id'].disable();
    this.form.controls['location'].disable();
  }
  onSubmit() {
    const id = this.quota.id;
    const newAmount = this.form.value.quotaAmount;
    this.rest.updateQuota(id, newAmount).subscribe(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
      this._eventBroker.emit('quotaUpdated', true);
    });
  }
}
