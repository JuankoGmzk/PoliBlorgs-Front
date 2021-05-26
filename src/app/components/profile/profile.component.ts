import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/Users/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCustomers().subscribe((data: User[]) => {
      this.user = data;
      console.log(data)
    })
  }
}
