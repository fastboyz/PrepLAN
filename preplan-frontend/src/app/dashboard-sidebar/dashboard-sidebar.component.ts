import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  redirectHome(){
    this.router.navigate(['/']);
  }
}
