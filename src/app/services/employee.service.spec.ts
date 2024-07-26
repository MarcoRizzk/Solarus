import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EmployeesService } from './employees.service';
import { Employee } from '../dtos/employee.dto';
import { EmployeeFilter } from '../dtos/employee-filter.dto';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpMock: HttpTestingController;

  const mockEmployees: Employee[] = [
    {
      serial: 1,
      status: 'فعال',
      name: 'John Doe',
      userSerial: 123,
      userAuthority: 'admin',
      function: 'developer',
      mobile: '123-456-7890',
      vip: true,
    },
    {
      serial: 2,
      status: 'غير فعال',
      name: 'Jane Smith',
      userSerial: 456,
      userAuthority: 'user',
      function: 'designer',
      mobile: '987-654-3210',
      vip: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService],
    });

    service = TestBed.inject(EmployeesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch employees without filter', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('assets/employees.mock.json');
    expect(req.request.method).toBe('GET');
    req.flush({ employees: mockEmployees });
  });

  it('should fetch employees with filter', () => {
    const filter: EmployeeFilter = {
      status: ['فعال'],
      userAuthority: [],
      function: [],
    };

    service.getEmployees(filter).subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees).toEqual([mockEmployees[0]]);
    });

    const req = httpMock.expectOne('assets/employees.mock.json');
    expect(req.request.method).toBe('GET');
    req.flush({ employees: mockEmployees });
  });

  it('should fetch employee by serial', () => {
    service.getEmployeeBySerial(1).subscribe((employee) => {
      expect(employee).toEqual(mockEmployees[0]);
    });

    const req = httpMock.expectOne('assets/employees.mock.json');
    expect(req.request.method).toBe('GET');
    req.flush({ employees: mockEmployees });
  });
});
