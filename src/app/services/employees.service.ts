import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../dtos/employee.dto';
import { EmployeeFilter } from '../dtos/employee-filter.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly EMPLOYEES_URL = 'assets/employees.mock.json';

  constructor(private http: HttpClient) {}

  getEmployees(filter?: EmployeeFilter): Observable<Employee[]> {
    return this.http.get<{ employees: Employee[] }>(this.EMPLOYEES_URL).pipe(
      map((response) => {
        let employees = response.employees;
        if (filter) {
          employees = employees.filter(
            (employee) =>
              (!filter.status.length ||
                filter.status.includes(employee.status)) &&
              (!filter.userAuthority.length ||
                filter.userAuthority.includes(employee.userAuthority)) &&
              (!filter.function.length ||
                filter.function.includes(employee.function))
          );
        }
        return employees;
      })
    );
  }

  getEmployeeBySerial(serial: number): Observable<Employee | undefined> {
    return this.getEmployees().pipe(
      map((employees) =>
        employees.find((employee) => employee.serial === serial)
      )
    );
  }
}
