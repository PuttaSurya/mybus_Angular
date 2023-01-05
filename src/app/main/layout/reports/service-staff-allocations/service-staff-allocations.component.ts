import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {AuthenticationService} from '../../../../services/authentication.service';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {error} from "protractor";

@Component({
  selector: 'app-service-staff-allocations',
  templateUrl: './service-staff-allocations.component.html',
  styleUrls: ['./service-staff-allocations.component.css']
})
export class ServiceStaffAllocationsComponent implements OnInit {
  public staffAllocationList: Array<any> = [];
  public currentServerDate: Date| undefined;
  public currentUser: any;
  public currentDate: any;
  public newDate: any = new Date();
  public allVehicles: Array <any> = [];
  public suppliersList: Array<any> = [];
  public listOfStaff: Array<any> = [];
  public driverOne: Array<any> = [];
  public  driverOneSelection: any;
  public driverTwo: Array<any> = [];
  public  driverTwoSelection: any;
  public cleaner: Array<any> = [];
  public conductor: Array<any> = [];
  public removedDriver: any = {};
  public query = {
    journeyDate: new Date(),
    fuelQuantity: '',
    fuelCost: '',
    cashCollection: '',
    vehicleRegNumber: '',
    driver1: null,
    driver2: null,
    conductor: null,
    cleaner: null,
    supplier: null
  };
  public vehicleNumber: '' | undefined;
  public allError = [];
  @ViewChild('addStaffModal')addStaffModal: any;

  constructor(private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private router: Router,
              private authService: AuthenticationService,
              private actRoute: ActivatedRoute,
              private location: Location,
              private  datePipe: DatePipe,
              private ngModalService: NgbModal) {
    this.currentDate = this.actRoute.snapshot.params.date || '';
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() - 1);
  }

  ngOnInit(): void {
    this.serviceReportStaffAllocation('');
  }

  serviceReportStaffAllocation(vehicleNum: any): void{
    const Date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.apiService.get(this.apiUrls.staffAllocation + '?travelDate=' + Date + '&vehicleNumber=' + vehicleNum).subscribe((res: any) => {
      if (res){
        this.staffAllocationList = res;
        // for (let a of this.staffAllocationList){
        //   let itemsOfstaffDetails: any = {
        //     driver1: '',
        //     driver1Mobile: '',
        //     driver2: '',
        //     driver2Mobile: '',
        //     cleaner: '',
        //     cleanerMobile: '',
        //     conductor: '',
        //     conductorMobile: ''
        //   };
        //   for (let items of a.staffDetails){
        //     // console.log(items);
        //     if (items.type.toUpperCase() === 'DRIVER'){
        //       if (itemsOfstaffDetails.driver1 === ''){
        //         itemsOfstaffDetails.driver1 = items.name;
        //         itemsOfstaffDetails.driver1Mobile = items.contactNumber;
        //       }else if (itemsOfstaffDetails.driver2 === ''){
        //         itemsOfstaffDetails.driver2 = items.name;
        //         itemsOfstaffDetails.driver2Mobile = items.contactNumber;
        //       }
        //     }else if (items.type.toUpperCase() === 'CLEANER'){
        //       itemsOfstaffDetails.cleaner = items.name;
        //       itemsOfstaffDetails.cleanerMobile = items.contactNumber;
        //     }else if (items.type.toUpperCase() === 'CONDUCTOR'){
        //       itemsOfstaffDetails.conductor = items.name;
        //       itemsOfstaffDetails.conductorMobile = items.contactNumber;
        //     }
        //   }
        //   a.staffDetails = itemsOfstaffDetails;
        // }
      }
    });
  }

  previousDate(): void {
    const currentDate = new Date(this.currentDate);
    const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
    this.currentDate = new Date(date);
    this.serviceReportStaffAllocation('');
  }

  nextDate(): void {
    const currentDate = new Date(this.currentDate);
    const todaydate: any = new Date();
    todaydate.setDate(todaydate.getDate() - 1);
    const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
    if (new Date(date) <= todaydate) {
      this.currentDate = currentDate;
      console.log('rt', this.currentDate, currentDate);
      this.serviceReportStaffAllocation('');
    }
  }
  getVehicles(): void {
    this.apiService.get(this.apiUrls.getAllVehicleNumbers).subscribe((res: any) => {
      if (res) {
        this.allVehicles = res;
      }
    });
  }
  getSuppliers(): void {
    this.apiService.get(this.apiUrls.suppliers).subscribe((res: any) => {
      if (res) {
        this.suppliersList = res;
      }
    });
  }
  getStaffList(): void {
    this.apiService.getAll(this.apiUrls.getStaffList, {}).subscribe((res: any) => {
      if (res) {
        this.listOfStaff = res.content;
        for (const item of this.listOfStaff){
          if (!(item.type === null) && item.type.toUpperCase() === 'DRIVER'){
            this.driverOne.push(item);
            this.driverTwo.push(item);
          }else if (!(item.type === null) && item.type.toUpperCase() === 'CLEANER'){
            this.cleaner.push(item);
          }else if (!(item.type === null) && item.type.toUpperCase() === 'CONDUCTOR'){
            this.conductor.push(item);
          }
        }
        this.listOfStaff = [];
      }
    });
  }
  add(): void{
    this.getStaffList();
    this.getVehicles();
    this.getSuppliers();
    this.close();
    this.ngModalService.open(this.addStaffModal, {size: 'lg', backdrop: 'static', keyboard: false, backdropClass: 'backdropClass'});
  }

  close(): void{
    this.ngModalService.dismissAll();
    this.query = {
      journeyDate: new Date(),
      fuelQuantity: '',
      fuelCost: '',
      cashCollection: '',
      vehicleRegNumber: '',
      driver1: null,
      driver2: null,
      conductor: null,
      cleaner: null,
      supplier: null
    };
  }

  save(): void{
    console.log(this.query);
    this.apiService.getAll(this.apiUrls.addServiceStaff, this.query).subscribe((res: any) => {
      if (res){
        Swal.fire('Success', 'Staff Added Successfully', 'success');
        this.ngModalService.dismissAll();
        this.serviceReportStaffAllocation('');
        console.log(res);
      }
    }, err => {
      this.allError = err;
    });
  }

  removedDriverFun(item: any, i: any): void {
    if (i === 1){
      const data = this.driverTwo.indexOf(item);
      this.driverTwo.splice(data, 1);
      if ( !(this.driverOneSelection === undefined) && !(item === this.driverOneSelection)){
        this.driverOne.push(this.driverOneSelection);
        this.driverTwo.push(this.driverOneSelection);
      }
      this.driverOneSelection = item;
    }else {
      const data = this.driverOne.indexOf(item);
      this.driverOne.splice(data, 1);
      if (!(this.driverTwoSelection === undefined) && !(item === this.driverTwoSelection)){
        this.driverOne.push(this.driverTwoSelection);
        this.driverTwo.push(this.driverTwoSelection);
      }
      this.driverTwoSelection = item;
    }
  }
}
