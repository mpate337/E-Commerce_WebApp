import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this.authService.getUsers().subscribe(users => {
      this.users = users.users;
      console.log(users,"abcd")
    },
    err => {
      console.log(err);
      return false;
    });
  }

  deactivateUser(id) {
    this.authService.deactivateUser(id).subscribe(res => {
      console.log('Deleted');
      window.location.reload()
    });
  }

}
