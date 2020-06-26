import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  formData: any;
  constructor() { }

  ngOnInit(): void {
  }

  editUser(event: Event){

  }

  cancel(){

  }
}
