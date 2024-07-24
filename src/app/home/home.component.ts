import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../dtos/employee.dto';
import { EmployeeFilter } from '../dtos/employee-filter.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allEmployees: Employee[] = [];
  selectedEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchedEmployees: Employee[] = [];
  shownEmployees: Employee[]=[]
  showFiltered = false;
  showSearched = false;
  allFunctions: Set<string> = new Set();
  allConditions: Set<string> = new Set();
  allAuthorities: Set<string> = new Set();
  filter: EmployeeFilter = { function: [], status: [], userAuthority: [] };
  searchTxt = '';

  sorting = '';
  isFilterExpanded = false;
  isSearchExpanded = false;
  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe((result) => {
      this.allEmployees = this.shownEmployees = result;
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
    this.initializeFiltersFromUrl();
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
    let filterArray: string[] = [];

    if (type === 'function') {
      filterArray = this.filter.function;
    } else if (type === 'condition') {
      filterArray = this.filter.status;
    } else if (type === 'authority') {
      filterArray = this.filter.userAuthority;
    }

    const index = filterArray.indexOf(option);
    if (index > -1) {
      filterArray.splice(index, 1);
    } else {
      filterArray.push(option);
    }
  }
  private updateUrlParams() {
    const params: any = {
      status: this.filter.status.length ? this.filter.status.join(',') : null,
      userAuthority: this.filter.userAuthority.length
        ? this.filter.userAuthority.join(',')
        : null,
      function: this.filter.function.length
        ? this.filter.function.join(',')
        : null,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === null) {
        delete params[key];
      }
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: '',
    });
  }

  sortBy(type: string) {
    if (type === this.sorting) {
      this.shownEmployees.reverse();
    } else if (type === 'name') {
      this.shownEmployees.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    } else if (type === 'serial') {
      this.shownEmployees.sort((a, b) => a.serial - b.serial);
    } else if (type === 'status') {
      this.shownEmployees.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
    } else if (type === 'userSerial') {
      this.shownEmployees.sort((a, b) => a.userSerial - b.userSerial);
    } else if (type === 'userAuthority') {
      this.shownEmployees.sort((a, b) => {
        if (a.userAuthority < b.userAuthority) return -1;
        if (a.userAuthority > b.userAuthority) return 1;
        return 0;
      });
    } else if (type === 'function') {
      this.shownEmployees.sort((a, b) => {
        if (a.function < b.function) return -1;
        if (a.function > b.function) return 1;
        return 0;
      });
    } else if (type === 'vip') {
      this.shownEmployees.sort((a, b) => {
        if (a.vip === b.vip) return 0;
        return a.vip ? -1 : 1;
      });
    } else if (type === 'mobile') {
      this.shownEmployees.sort((a, b) => {
        if (a.mobile < b.mobile) return -1;
        if (a.mobile > b.mobile) return 1;
        return 0;
      });
    }
    this.sorting = type;
  }

  applyFilter() {
    this.showFiltered = true;
    this.updateUrlParams();
    this.employeesService.getEmployees(this.filter).subscribe((result) => {
      this.filteredEmployees=this.shownEmployees = result;
    });
  }

  private initializeFiltersFromUrl() {
    this.route.queryParams.subscribe((params) => {
      this.filter.status = params['status'] ? params['status'].split(',') : [];
      this.filter.userAuthority = params['userAuthority']
        ? params['userAuthority'].split(',')
        : [];
      this.filter.function = params['function']
        ? params['function'].split(',')
        : [];
    });
    this.applyFilter();
  }
  applySearch() {
    if (this.searchTxt !== '') {
      this.showSearched = true;
      const dataToSearchIn = this.showFiltered
        ? this.filteredEmployees
        : this.allEmployees;
      const searchTxtLower = this.searchTxt.toLowerCase();
      this.searchedEmployees= this.shownEmployees = dataToSearchIn.filter((employee) =>
        Object.values(employee).some((value) =>
          value.toString().toLowerCase().includes(searchTxtLower)
        )
      );
    } else {
      this.showSearched = false;
      this.shownEmployees = this.showFiltered? this.filteredEmployees: this.allEmployees
    }
  }
}
