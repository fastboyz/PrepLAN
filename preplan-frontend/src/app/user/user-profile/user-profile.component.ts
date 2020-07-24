import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public formData: FormData;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.formData = new FormData();
  }

  editUser(event: any) {
    this.userService.updateProfile(event).subscribe();
  }

  cancel() {

  }
}
