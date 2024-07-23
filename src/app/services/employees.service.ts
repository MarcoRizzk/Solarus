// src/app/services/employees.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../dtos/employee.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly EMPLOYEES_URL = 'assets/employees.mock.json';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<{ employees: Employee[] }>(this.EMPLOYEES_URL)
      .pipe(map((response) => response.employees));
  }

  getEmployeeBySerial(serial: number): Observable<Employee | undefined> {
    return this.getEmployees().pipe(
      map((employees) =>
        employees.find((employee) => employee.serial === serial)
      )
    );
  }
}
