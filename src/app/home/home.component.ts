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
  constructor(private employeesService: EmployeesService) {}
  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe((result) => {
      this.allEmployees = result;
    });
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
}
