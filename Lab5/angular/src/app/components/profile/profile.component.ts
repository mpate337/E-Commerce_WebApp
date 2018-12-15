import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  items: any;
  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.authService.getItems().subscribe(items => {
      this.items = items.items;
      // console.log(items.items,"abcd", this.items[0].item_name)
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
