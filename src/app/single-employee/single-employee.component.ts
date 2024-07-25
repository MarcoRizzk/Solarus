import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../dtos/employee.dto';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss'],
})
export class SingleEmployeeComponent implements OnInit {
  employeeSerial!: number;
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.employeeSerial = +id;
        this.employeeService
          .getEmployeeBySerial(this.employeeSerial)
          .subscribe((res) => {
            if (res) {
              this.employee = res;
            } else {
              this.router.navigate(['/home']);
            }
          });
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
}
