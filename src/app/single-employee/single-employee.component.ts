import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss'],
})
export class SingleEmployeeComponent implements OnInit {
  employeeId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && typeof id === 'number') {
        this.employeeId = +id;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
