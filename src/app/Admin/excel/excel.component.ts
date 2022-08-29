import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss'],
})
export class ExcelComponent implements OnInit {
  error: string | null;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.error = 'Please select a file';
      return;
    }
    this.error = null;
  }
}
