import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: any;
  added: [any];
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

  addToCart(id){
    var ex = (<HTMLInputElement>document.getElementById("entrd_qty")).value
    console.log(this.added)
    this.added.push(ex, id)
    console.log(this.added)
  }
}
