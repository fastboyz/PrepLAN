import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/models/user';

@Component({
  selector: 'profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public formData: FormData;
  constructor() { }

  ngOnInit(): void {
    this.formData = new FormData();
  }

  editUser(event: Event) {

  }

  cancel() {

  }
}
