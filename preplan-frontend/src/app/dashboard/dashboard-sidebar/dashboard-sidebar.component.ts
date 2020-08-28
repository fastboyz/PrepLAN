import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
  isOrganizer: boolean;
  constructor(private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getRole().subscribe(data => {
      if (data.name == 'organizer') {
        this.isOrganizer = true;
      } else {
        this.isOrganizer = false;
      }
    });
  }

  redirectHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async redirectTo(uri: string) {
    await this.router.navigate([uri]);
    if (this.authService.getRefreshedValue() == 0) {
      this.authService.setRefreshedValue("1");
      window.location.reload();
    }
  }
}
