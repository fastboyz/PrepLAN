import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
  }

  redirectHome(){
    this.router.navigate(['/']);
  }
  
  logOut(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
