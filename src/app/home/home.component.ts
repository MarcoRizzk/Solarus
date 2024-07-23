import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../dtos/employee.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allEmployees: Employee[] = [];
  selectedEmployees: Employee[] = [];
  sorting = '';
  isPanelExpanded = false;
  constructor(private employeesService: EmployeesService) {}
  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe((result) => {
      this.allEmployees = result;
    });
  }

  togglePanel() {
    this.isPanelExpanded = !this.isPanelExpanded;
  }

  onCheckboxChange(employee: Employee) {
    const findSelectedEmployee = this.selectedEmployees.find(
      (emp) => emp.serial === employee.serial
    );

    if (!findSelectedEmployee) {
      this.selectedEmployees.push(employee);
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(
        (selected) => selected.serial !== employee.serial
      );
    }
  }

  sortBy(type: string) {
    if (type === this.sorting) {
      this.allEmployees.reverse();
    } else if (type === 'name') {
      this.allEmployees.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    } else if (type === 'serial') {
      this.allEmployees.sort((a, b) => a.serial - b.serial);
    } else if (type === 'status') {
      this.allEmployees.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
    } else if (type === 'userSerial') {
      this.allEmployees.sort((a, b) => a.userSerial - b.userSerial);
    } else if (type === 'userAuthority') {
      this.allEmployees.sort((a, b) => {
        if (a.userAuthority < b.userAuthority) return -1;
        if (a.userAuthority > b.userAuthority) return 1;
        return 0;
      });
    } else if (type === 'function') {
      this.allEmployees.sort((a, b) => {
        if (a.function < b.function) return -1;
        if (a.function > b.function) return 1;
        return 0;
      });
    } else if (type === 'vip') {
      this.allEmployees.sort((a, b) => {
        if (a.vip === b.vip) return 0;
        return a.vip ? -1 : 1;
      });
    } else if (type === 'mobile') {
      this.allEmployees.sort((a, b) => {
        if (a.mobile < b.mobile) return -1;
        if (a.mobile > b.mobile) return 1;
        return 0;
      });
    }
    this.sorting = type;
  }
}
