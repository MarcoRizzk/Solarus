import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../dtos/employee.dto';
import { EmployeeFilter } from '../dtos/employee-filter.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allEmployees: Employee[] = [];
  selectedEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  showFiltered = false;
  allFunctions: Set<string> = new Set();
  allConditions: Set<string> = new Set();
  allAuthorities: Set<string> = new Set();
  filter: EmployeeFilter = { function: [], status: [], userAuthority: [] };

  sorting = '';
  isFilterExpanded = false;
  isSearchExpanded = false;
  constructor(private employeesService: EmployeesService) {}
  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe((result) => {
      this.allEmployees = result;
      result.forEach((item) => {
        this.allFunctions.add(item.function);
      });
      result.forEach((item) => {
        this.allConditions.add(item.status);
      });
      result.forEach((item) => {
        this.allAuthorities.add(item.userAuthority);
      });
    });
  }

  toggleFilterPanel() {
    this.isSearchExpanded = false;
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  toggleSearchPanel() {
    this.isFilterExpanded = false;
    this.isSearchExpanded = !this.isSearchExpanded;
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

  onFilterCheckboxChange(type: string, option: string) {
    if (type === 'function') {
      const findFunction = this.filter.function.find((itm) => itm === option);
      if (findFunction) {
        this.filter.function = this.filter.function.filter(
          (itm) => itm !== option
        );
      } else {
        this.filter.function.push(option);
      }
    }
    if (type === 'condition') {
      const findStatus = this.filter.status.find((itm) => itm === option);
      if (findStatus) {
        this.filter.status = this.filter.status.filter((itm) => itm !== option);
      } else {
        this.filter.status.push(option);
      }
    }
    if (type === 'authority') {
      const findAuthority = this.filter.userAuthority.find(
        (itm) => itm === option
      );
      if (findAuthority) {
        this.filter.userAuthority = this.filter.userAuthority.filter(
          (itm) => itm !== option
        );
      } else {
        this.filter.userAuthority.push(option);
      }
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

  applyFilter() {
    this.showFiltered = true;
    this.employeesService.getEmployees(this.filter).subscribe((result) => {
      this.filteredEmployees = result;
    });
  }
}
