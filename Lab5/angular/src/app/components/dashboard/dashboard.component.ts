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
  added: Array<any>;
  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit() {
    this.getItems();
    this.added = [];
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
    var qty = (<HTMLInputElement>document.getElementById("entrd_qty")).value
    this.added.push({id, qty})
    console.log(this.added)
  }

  showCart(){
    this.authService.showCart(this.added).subscribe(res => {
      
    });
  }
}
