import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reports-to-be-reviewed',
  templateUrl: './reports-to-be-reviewed.component.html',
  styleUrls: ['./reports-to-be-reviewed.component.css']
})
export class ReportsToBeReviewedComponent implements OnInit {
  reports: any;
  constructor(public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private router: Router, ) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void{
    this.apiService.get(this.apiUrls.reportsToBeReviewed).subscribe((res: any) => {
      if (res) {
        this.reports = res;
      }
    });
  }
  goToServiceReport(service: any): void{
    if (service.attrs.formId) {
      this.router.navigate(['serviceform/' + service.attrs.formId]);
    } else {
      this.router.navigate(['servicereport/' + service.id]);
    }
  }
}
