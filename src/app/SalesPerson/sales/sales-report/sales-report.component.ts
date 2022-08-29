import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { Sale } from 'src/app/model/sale.model';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user.service';

// Chart.register(...registerables);
Chart.register(...[...registerables, Annotation]);

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss'],
})
export class SalesReportComponent implements OnInit {
  monthlyQuota: number;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  sales: Sale[];
  monthWiseRevenue: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private rest: RestService, private userService: UserService) {}

  ngOnInit(): void {
    const username = this.userService.user.name;
    this.rest.getSalesByUsername(username).subscribe((data) => {
      this.sales = data;
      for (let sale of this.sales) {
        const date = new Date(sale.orderDate);
        const month = date.getMonth();
        const amount = sale.amount;
        this.monthWiseRevenue[month] += amount;
      }
      this.rest.getQuotaByUsername(username).subscribe((data) => {
        this.monthlyQuota = data.quotaAmount;
        this.initChart();
      });
    });
  }

  initChart() {
    const options = {
      plugins: {
        autocolors: false,
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 60,
              yMax: 60,
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
            },
          },
        },
      },
    };
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [...this.months],
        datasets: [
          {
            label: 'Total Sales',
            data: [...this.monthWiseRevenue],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],

            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            stacked: true,
          },
        },
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xScaleID: 'x',
                yScaleID: 'y',
                yMin: this.monthlyQuota,
                yMax: this.monthlyQuota,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                drawTime: 'afterDatasetsDraw',
              },
            },
          },
        },
      },
    });
  }
}
